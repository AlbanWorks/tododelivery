import {React, useState} from 'react'
import {setProduct, uploadPicture, getImageURL} from "./FirestoreMethods"

const FormularioPrueba = () => {
const [ID, setID] = useState("")
const [title, setTitle] = useState("")
const [price, setPrice] = useState(undefined)
const [stock, setStock] = useState(undefined)
const [picture, setPicture] = useState(null)
//const [picUrl, setPicUrl] = useState("www.yourhpoto.com/product01")

const pack = (title,price,stock,picUrl) =>{
   return{
       title, 
       price, 
       stock,
       picUrl
   }
}

const sendData = async (e) =>{
    e.preventDefault() 
    await uploadPicture(picture)
    const picURL = await getImageURL(picture)
    setProduct(ID, pack(title,price,stock,picURL))
}

const printLocalData = (e) =>{
    e.preventDefault() 
     console.log(ID , pack(title,price,stock))
}

    return (
        <div>
            <form onSubmit={sendData} className={"form"}>
                <input type="text" onChange={e => setID(e.target.value)} placeholder= "ID" />
                <input type="text" onChange={e => setTitle(e.target.value)} placeholder= "titulo del producto"/>
                <input type="number" onChange={e => setPrice(e.target.value)} placeholder= "precio"/>
                <input type="number" onChange={e => setStock(e.target.value)} placeholder= "cantidad"/>
                <input type="file" onChange={e => setPicture(e.target.files[0])}/>
                <button>Agregar Producto</button>
            </form>
        </div>
      
    )
}

export default FormularioPrueba
