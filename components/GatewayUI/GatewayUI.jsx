import React,{useState,useContext,useRef} from 'react'
import classes from './GatewayUI.module.css'
import { DataContext } from '../../provider'
import { useRouter } from 'next/router'
import Navbar from '../Navbar/Navbar'
import TicketListener from '../TicketListener/TicketListener'


const GatewayUI = () => {


    const {CartProducts} = useContext(DataContext)
    const {setCartProducts} = useContext(DataContext)
    const [Direction, setDirection] = useState("") 
    const [AditionalData, setAditionalData] = useState("none") 
    const [RevicedInfo, setRecivedInfo] = useState({}) 
    const [OrdenEnviada, setOrdenEnviada] = useState(false) 
    //const [DirectionTitle, setDirectionTitle] = useState("Dirección *")
    const DirectionTitle =useRef()

    const EnviarListaDeCompra = async () =>{
        if(theseAreCorrect(Direction,AditionalData)){
            const Orden = CrearOrdenDeCompra()
            setOrdenEnviada(true)
            const buyReq = await fetch("/api/hello",{
                method: 'POST',
                body: JSON.stringify(Orden) 
            })
            const buyRes = await buyReq.json();
            setRecivedInfo(buyRes)
            DecideIfCartSouldBeEmptied(buyRes)
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
     && dir.length > 9 
     && dir.length < 100
     && typeof adata ==='string'
     && adata.length < 150)return true
     else return false
    }
    const alertInputError= ()=>{
        DirectionTitle.current.style.color = "red"
        setTimeout(() => {
            DirectionTitle.current.style.color = "black"
        }, 1500);
    }
    const DecideIfCartSouldBeEmptied = (buyRes)=>{
        if(!buyRes.err) setCartProducts([])
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
                <p className={classes.Title} ref={DirectionTitle}>Dirección</p>
                <input 
                    type="text" 
                    onChange={(e)=>{setDirection(e.target.value)}} 
                    className={classes.InputText}
                />
                <p className={classes.Title} >Datos Adicionales, ayudanos a encontrarte</p>
                <input 
                    type="text" 
                    placeholder='ej: Descripción de la casa, tu nombre, etc.' 
                    onChange={(e)=>{setAditionalData(e.target.value)}}
                    className={classes.InputText}
                />
                </div>
                <div className={classes.Botonera} >
                    <button 
                        onClick={() => EnviarListaDeCompra()} 
                        className={classes.ButtonComprar}
                    > Hacer Pedido </button>
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