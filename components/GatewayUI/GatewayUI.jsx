import React,{useState,useContext} from 'react'
import classes from './GatewayUI.module.css'
import { DataContext } from '../../provider'
import { useRouter } from 'next/router'
import Navbar from '../Navbar/Navbar'
import TicketListener from '../TicketListener/TicketListener'


const GatewayUI = () => {

    const router = useRouter()
    const {CartProducts} = useContext(DataContext)
    const [Direction, setDirection] = useState("") 
    const [AditionalData, setAditionalData] = useState("none") 
    const [RevicedInfo, setRecivedInfo] = useState({}) 
    const [OrdenEnviada, setOrdenEnviada] = useState(false) 
    const [DirectionTitle, setDirectionTitle] = useState("Dirección *") 

    const EnviarListaDeCompra = async () =>{
        if(theseAreCorrect(Direction,AditionalData)){
            const Orden = CrearOrdenDeCompra()
            setOrdenEnviada(true)
            const buyReq = await fetch("./api/hello",{
                method: 'POST',
                body: JSON.stringify(Orden) 
            })
            const buyRes = await buyReq.json();
            console.log(buyRes)
            setRecivedInfo(buyRes)
        }
        else alertInputError()
    }
    
    const CrearOrdenDeCompra = () => {
        let lista =[]
        CartProducts.forEach(product => {
            const category = product["category"]
            const ID = product["ID"]
            const amount = product["amount"]
            lista.push({category, ID, amount})  
        });
        const infoAdicional={Direction, AditionalData}
        const orden ={lista, infoAdicional}
        return orden
    
    }
    const theseAreCorrect = (dir, adata)=>{
     if(typeof dir ==='string' 
     && dir.length > 12 
     && dir.length < 100
     && typeof adata ==='string'
     && adata.length < 150)return true
     else return false
    }
    const alertInputError= ()=>{
        setDirectionTitle("Por favor coloque datos válidos")
        setTimeout(() => {
            setDirectionTitle("Direccion *")
        }, 1500);
    }
    return (
        <div className={classes.PageContainer} >
              <Navbar/>
            <div className={classes.Container} >
            <TicketListener info={RevicedInfo} className={classes.TListener} />
            {
            OrdenEnviada ? (
              <div className={classes.GatewayUI} >
                  <div className={classes.Botonera} >
                    <button 
                        onClick={()=>{router.push('/')}} 
                        className={classes.ButtonVolver}
                    > Volver </button>
                </div>
              </div>
            ):(
            <div className={classes.GatewayUI} >
                <div className={classes.AditionalDataContainer} >
                <p className={classes.Title} >{DirectionTitle}</p>
                <input 
                    type="text" 
                    onChange={(e)=>{setDirection(e.target.value)}} 
                    className={classes.InputText}
                />
                <p className={classes.Title} >JOTOS Adicionales, ayudanos a encontrarte</p>
                <input 
                    type="text" 
                    placeholder='ej: Descripción de la casa' 
                    onChange={(e)=>{setAditionalData(e.target.value)}}
                    className={classes.InputText}
                />
                </div>
                <div className={classes.Botonera} >
                    <button 
                        onClick={() => EnviarListaDeCompra()} 
                        className={classes.ButtonComprar}
                    > Comprar </button>
                    <button 
                        onClick={()=>{router.push('/')}} 
                        className={classes.ButtonVolver}
                    > Volver </button>
                </div>
            </div>
            )
           }
           </div>
        </div>
    )
}

export default GatewayUI
/*

*/