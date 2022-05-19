/* 

//simplemente hago uso de la API de telegram luego de haber registrado mi bot con botfather
//Así se inicia el bot con telegraf:

const { Telegraf } = require('telegraf')
//debo guardar el token en una variable de entorno --> process.env.BOT_TOKEN
const bot = new Telegraf('5079902652:AAFX8bBD_cpqxAUA1JZf2UfOiqfBmYGuts4')
bot.start((ctx) => ctx.reply('aerodrom'))
bot.launch() 

*/


//por ahora presicindí de telegraf, todo funciona con la api pelada, desinstalar telegraf please

const michat_id = 5098488588  //la ID del chat entre mi numero y el bot

//el mensaje se envia directamente con una solicitud http a la API 
//invoca al metodo sendMessage de la API --> https://core.telegram.org/bots/api#sendmessage

const EnviarTelegram = async (msj) =>{
  try{
    //debo pasar el url a utf-8 porque a veces hay acentos y cosas y arroja error en la API
    const mensajeUTF8= encodeURIComponent(msj)
    const request = await fetch(`https://api.telegram.org/bot5079902652:AAFX8bBD_cpqxAUA1JZf2UfOiqfBmYGuts4/sendMessage?chat_id=${michat_id}&text=${mensajeUTF8}`)
    const response = await request.json();
    if(response.ok === true){
      return {enviado:"ok"}
    }
    else{
      return {error: JSON.stringify(response)}
    }
  }
  catch(err){
    return {error: JSON.stringify(err)}
  }
}

export default EnviarTelegram 