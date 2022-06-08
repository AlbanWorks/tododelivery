//simplemente hago uso de la API de telegram luego de haber registrado mi bot con botfather 
//por ahora presicindí de telegraf, funciona con la api pelada, desinstalar telegraf please

const michat_id = 5098488588  //la ID del chat entre mi numero y el bot

const EnviarTelegram = async (ticket) =>{
  const msj = ConstructMessage(ticket)
  try{
    //debo pasar el url a utf-8 porque a veces hay acentos y cosas y arroja error en la API
    const mensajeUTF8= encodeURIComponent(msj)
    const request = await fetch(`https://api.telegram.org/bot5079902652:AAFX8bBD_cpqxAUA1JZf2UfOiqfBmYGuts4/sendMessage?chat_id=${michat_id}&text=${mensajeUTF8}`)
    const response = await request.json();
    if(response.ok === true){
      return {sended: true}
    }
    else{
      return {error: JSON.stringify(response)}
    }
  }
  catch(err){
    return {error: JSON.stringify(err)}
  }
}


const ConstructMessage = (Ticket) =>{
  let msj = `🔴 PEDIDO dia ${Ticket.ID_Date}:\n\n`
  Ticket.validatedList.forEach(p => {
    msj = msj.concat(`${p.amount} ${p.title}\n`)
  });
  msj = msj.concat(`\n Para: ${Ticket.infoAdicional.Direction}, ${Ticket.infoAdicional.Indications}`)
  msj = msj.concat(`\n\nTotal: $${Ticket.precioTotal}`)
  
  return msj
  }
//cuando el server se reinicia, tambien se vuelve a 0 el contador numOrder, esto por supuesto es provisorio.

  const NotificarReinicioTelegram = async (msj) =>{
    const mensajeReinicio = encodeURIComponent(`\n 🕒 Contador Reiniciado, motivo: ${msj}\n`)
    const request = await fetch(`https://api.telegram.org/bot5079902652:AAFX8bBD_cpqxAUA1JZf2UfOiqfBmYGuts4/sendMessage?chat_id=${michat_id}&text=${mensajeReinicio}`)
  }


export {EnviarTelegram, NotificarReinicioTelegram} 