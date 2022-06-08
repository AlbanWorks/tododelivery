import Firestore from '../../firebase/FirebaseAdminConfig'
import {EnviarTelegram, NotificarReinicioTelegram} from '../../Telegram/SendTelegramMessage'

//-------------------------Numero de Pedido del Día provisorio ---(pasar a DB)----------------

let numOrder = 0;
let currentDate = new Date()
NotificarReinicioTelegram("reinicio del servidor")

const handleNumOrder = async ()=>{
  const newDate = new Date()
  const hour=23, minute=59, second= 59;
  const oldDate = new Date
  (
    currentDate.getFullYear(), 
    currentDate.getMonth(), 
    currentDate.getDate(),
    hour,
    minute,
    second
  )
  //aqui va a haber un desface de una hora, considero usar moment js para solucionar estos entresijos pero por ahora no me molestan
  if(newDate > oldDate){
    numOrder = 0
    currentDate = newDate
    NotificarReinicioTelegram("cambio de fecha")
  }
  numOrder++
}
//---------isOpen?-------------------------------------------------------------

//esto está alojado en Washinton dc (gmt -4) y nosotros usamos la hora de bs as (gmt -3) allá es una hora mas temprano
const checkDate = ()=>{
  const currentDate = ToArgentinaTime(new Date())
  const horarioDeApertura = 10
  //el horario de cierre es a las 12, no hace falta validar pues vuelve a 0
  if(currentDate.getHours()>= horarioDeApertura){
    return true
  }
  else return false
}
const ToArgentinaTime = (date)=>{
  const numberOfMlSeconds = date.getTime();
  const addMlSeconds = 60 * 60000; //sumo una hora al tiempo de washinton dc
  const newDate = new Date(numberOfMlSeconds + addMlSeconds);
  return newDate
}
//-------------------------JSON validator---------------------------------------------
const ParseRequest = (request)=> {
try { 
    const parsedRequest = JSON.parse(request)
    return parsedRequest
    } 
catch(e) {
       return false
    }

}
//--------------------------List Format Validator-----------------------------------------
const isValidListFormat = (lista) =>{
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
//-------------------Firebase Validator-------------------------------------------------------

  const FirebaseValidation = async (list) =>{
    let ProductosValidados = []
    for(let productoLista of list){
     const productoFB = await getProduct(productoLista.category, productoLista.ID)
      if(productoFB && productoFB.stock === true){
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

//------------------------Ticket Creator----------------------------------------------------------

  const createTicket = (validatedList, infoAdicional,numOrder)=>{
    validatedList.push({ title: 'Envío', amount: 1, price: 100 }) //hacer bien el envio, con db y tal
    const precioTotal = CalcularTotal(validatedList)
    const Ticket = {validatedList, infoAdicional, precioTotal, numOrder} //ESCRIBIR BIEN
    return Ticket
  }
  
  const CalcularTotal = (validatedList)=>{
    let total = 0
    validatedList.forEach(product => {
      total += product.price * product.amount
    });
    return total
  }

//--------------------Response Handler--------------------------------------------------------------

  const Response = (res, code, data) =>{
    if(code >= 300 ){
      res.status(code).json({err: data})
      console.log(data)
    } 
    else res.status(code).json(data)
  }

//-------------------------------HANDLER---------------------------------------------------------------

const handler = async (req, res) => {
  if(req.method ==='POST'){
    const hour = new Date().getUTCHours()-3
    Response(res, 300, hour)
    return
   /* const IsOpen = checkDate()
    if(!IsOpen){
      Response(res, 300, "el local está cerrado")
      return
    }
    const Parsed_Request = ParseRequest(req.body)
    if(!Parsed_Request){
      Response(res, 500, "error de formato JSON")
      return
    }
     
    if(!isValidListFormat(Parsed_Request.lista)){
      Response(res, 400, "formato de lista invalido")
      return
    }

    const Firebase_Validated_List = await FirebaseValidation(Parsed_Request.lista)
    if(! Firebase_Validated_List){
      Response(res, 400, "Uno o mas productos ya no están disponibles")
      return
    }
    handleNumOrder()
    const Ticket = createTicket(Firebase_Validated_List, Parsed_Request.infoAdicional, numOrder)
    
    const TelegramNotification = await EnviarTelegram(Ticket)
    if( ! TelegramNotification.sended){
      Response(res, 500, "el mensaje a Telegram no fue enviado")
      if(numOrder > 1) numOrder--
      return
    }
    Response(res, 200, Ticket)
*/
    }
  }


  export default handler