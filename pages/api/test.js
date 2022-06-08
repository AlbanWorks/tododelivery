import Firestore from '../../firebase/FirebaseAdminConfig'
import {EnviarTelegram, NotificarReinicioTelegram} from '../../Telegram/SendTelegramMessage'

//-------------------------Numero de Pedido del Día provisorio ---(pasar a DB)----------------
NotificarReinicioTelegram("reinicio del servidor")

//----------------------DATE ID (PROVISIONAL PARA RECONOCER LOS TICKETS EN WPP  Y TELEGRAM)------------------------------
const generateDate = () => {
  const argentinaUTCzone = -3 
  const UTCmiliseconds = new Date().getTime();
  const UTCmenos3_miliseconds = UTCmiliseconds + 3600000 * argentinaUTCzone
  const ArgentinaDATE = new Date(UTCmenos3_miliseconds)
  console.log(ArgentinaDATE.getUTCHours())
  return `${ArgentinaDATE.getUTCDate()} - ${ArgentinaDATE.getUTCHours()}:${ArgentinaDATE.getUTCMinutes()}:${ArgentinaDATE.getUTCSeconds()}`
}

//---------isOpen?-------------------------------------------------------------
//obtengo la hora UTC universal independiente del lugar donde se aloje el server y le resto 3 ya que
// la hora de argentina es UTC-3
const checkHour = ()=>{
  const ArgHours = new Date().getUTCHours()-3
  const horarioDeApertura = 10
  //el horario de cierre es a las 12, no hace falta validar pues vuelve a 0
  if(ArgHours >= horarioDeApertura){
    return true
  }
  else return false
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

  const createTicket = (validatedList, infoAdicional, ID_Date)=>{
    validatedList.push({ title: 'Envío', amount: 1, price: 100 }) //hacer bien el envio, con db y tal
    const precioTotal = CalcularTotal(validatedList)
    const Ticket = {validatedList, infoAdicional, precioTotal, ID_Date} //ESCRIBIR BIEN
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
    const IsOpen = checkHour()
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

    const ID_Date = generateDate()

    const Ticket = createTicket(Firebase_Validated_List, Parsed_Request.infoAdicional, ID_Date)
    
    const TelegramNotification = await EnviarTelegram(Ticket)
    if( ! TelegramNotification.sended){
      Response(res, 500, "el mensaje a Telegram no fue enviado")
      return
    }
    Response(res, 200, Ticket)

    }
  }


  export default handler


  