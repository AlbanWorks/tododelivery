

//---- validaciones de formato en los inputs de info y direccion-----
const checkFormat = (Direction, Indications)=>{
    if(typeof Direction ==='string' 
    && Direction.length > 9 
    && Direction.length < 100
    && typeof Indications ==='string'
    && Indications.length < 150)return {passed: "TEST PASSED"}
    else return {notPassed: "TEST NOT PASSED"}
   }
//-------------------------------------------------------------------

const CreateOrder = (CartProducts, Direction, Indications) => {
    //RENOMBRAR LOS COMPONENTES CON CUIDADO (EN EL SERVER FIGURAN CON NOMBRES VIEJOS, CAMBIAR)
    let lista =[]
    CartProducts.forEach(product => {
        const category =    product["category"]
        const ID       =    product["ID"]
        const amount   =    product["amount"]

        lista.push({category, ID, amount})  
    });
    const infoAdicional={Direction, Indications}
    const order ={lista, infoAdicional}
    console.log("de la nueva", order)
    return order
}

const SendOrder = async (order)=>{
    const req = await fetch("/api/test",{method: 'POST',body: JSON.stringify(order)})
    const res = await req.json();
    return res
}

const ConstructMessage = (res)=>{
    let msj = `🟢 ¡Hola! he realizado un pedido\n\n${res.ID_Date}\n\n`
    msj = msj.concat(`Para: ${res.infoAdicional.Direction}, ${res.infoAdicional.Indications}\n tudelivery.com`)
  //debo pasar el url a utf-8 porque a veces hay acentos y cosas
  const mensajeUTF8= encodeURIComponent(msj)
  return mensajeUTF8
}

//-----------------localstorage values para evitar rellenar siempre, provisorios, lo ideal es usuario en firebase.

const getLocalStorageValues = (value)=>{
    const parsedData =  JSON.parse(localStorage.getItem("userDataTuDeliverees"))
    if(parsedData === null) return ""
    const LSvalue = parsedData[value]
    if(LSvalue === null) return ""
    else return LSvalue
} 

const setLocalStorageValues = (Direction, Indications)=>{
    const data = {Direction, Indications}
    localStorage.setItem("userDataTuDelivery", JSON.stringify(data))
}


export {checkFormat, CreateOrder, SendOrder, ConstructMessage, getLocalStorageValues, setLocalStorageValues}




  
    