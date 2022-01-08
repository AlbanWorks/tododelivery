import Firestore from './backend/FirebaseAdminConfig'
import EnviarTelegram from '../../TelegramBot'



console.log("asies")

const LaListaEsValida = (lista) =>{
  if(lista !== undefined && 
    Array.isArray(lista) && 
    lista.length > 0 &&
    LosProductosSonValidos(lista)) return true
    else return false
}

const LosProductosSonValidos = (lista) =>{
  let resultado = true
  for (let producto of lista) {
    if(Object.keys(producto).length !== 3 ||
      typeof producto.category !== "string" || 
      typeof producto.ID !== "string" || 
      typeof producto.amount !== "number") { resultado = false ; break }
    }
  return resultado
}

const CrearTicket = async (orden) =>{
  const productosValidados = await ValidarEnFirebase(orden.lista)
  if(productosValidados){
    const precioTotal = CalcularTotal(productosValidados)
    const Ticket = {productosValidados, infoAdicional: orden.infoAdicional, precioTotal}
    //console.log(Ticket)
    return Ticket
  }
  else{
    return false
  } 
}
 
const ValidarEnFirebase = async (lista) =>{
  let ProductosValidados = []
  for(let productoLista of lista){
   const productoFB = await getProduct(productoLista.category, productoLista.ID)
    if(productoFB){
       ProductosValidados.push({
         title: productoFB.title, 
         amount: productoLista.amount, 
         price: parseInt(productoFB.price)
         })
    }
    else {
      ProductosValidados = false
      break
    }
  }
  return ProductosValidados
}

const CalcularTotal = (l)=>{
  let total = 0
  l.forEach(e => {
    total += e.price * e.amount
  });
  return total
}

const ConstruirMensaje = (Ticket) =>{
let msj = "PEDIDO:\n\n"
Ticket.productosValidados.forEach(p => {
  msj = msj.concat(`${p.amount} ${p.title}\n`)
});
msj = msj.concat(`\n${Ticket.infoAdicional.Direction}, ${Ticket.infoAdicional.AditionalData}`)
msj = msj.concat(`\n\nTotal: $${Ticket.precioTotal}`)

return msj
}

const NotificarAlAdmin = (Ticket) =>{
  const mensaje = ConstruirMensaje(Ticket)
  EnviarTelegram(mensaje)
}

const getProduct = async (category,ID ) => {
  const docRef = Firestore().doc(`${category}/${ID}`);
  const docSnap = await docRef.get();
  if (docSnap.exists) {
      return docSnap.data();
  }     
  else {
  // doc.data() will be undefined in this case
   return false
  }
}

const handler = async (req, res) => {

  if(req.method ==='GET'){
      res.status(200).json({hello: "andoi"})
  }

  if(req.method ==='POST'){
    try {
      const orden= JSON.parse(req.body);
      if(LaListaEsValida(orden.lista)){
      const Ticket = await CrearTicket(orden)
      if(Ticket){
        res.status(200).json(Ticket)
        //console.log(Ticket)
        NotificarAlAdmin(Ticket)
      }
      else  res.status(400).json({err: "productos inexistentes"})
      }
      else res.status(400).json({err: "lista inválida"})
    } 
    catch(e) {
      console.log(e)
      res.status(500).json({err: "error de formato JSON"})
    }
  }
}

export default handler

