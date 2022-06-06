import React,{useState,useContext,useRef} from 'react'
import classes from './OrdersUI.module.css'
import { DataContext } from '../../provider'
import { useRouter } from 'next/router'
import Navbar from '../Navbar/Navbar'
import TicketListener from './TicketListener/TicketListener'
import {checkFormat, CreateOrder, SendOrder,ConstructMessage} from './OrderMethods'

const GatewayUI = () => {
    
    const {CartProducts,setCartProducts} = useContext(DataContext)
    const [Direction, setDirection] = useState("") 
    const [Indications, setIndications] = useState("") 
    const [OrderState, setOrderState] = useState({notSended:"orden aun no enviada"})
    const [Response, setResponse] = useState()  
    const [DirectionTitle, setDirectionTitle] = useState("Dirección *")
    const DirectionRef =useRef()
    const router = useRouter() 

    const InitSendingPorcess = async () =>{
        const formatChecking = checkFormat(Direction,Indications)
        if(formatChecking.notPassed){
            alertInputError()
            return
        }
       
        const Order = CreateOrder(CartProducts,Direction,Indications)
        
        setOrderState({waitingResponse:"esperando respuesta del server"})
        const res = await SendOrder(Order)
        setResponse(res)
        if(res.err){
            setOrderState({ErrorResponse:"el server ha respondido con un error"})
            return
        }
        setOrderState({SuccesfulResponse:"el server ha respondido exitosamente"})
        setCartProducts([])
       // SendWhatsapp(res)
    }

    const alertInputError= ()=>{
        DirectionRef.current.style.color = "red"
        setDirectionTitle("Coloque una dirección válida")
        setTimeout(() => {
            if(DirectionRef.current !== null) DirectionRef.current.style.color = "black"
            setDirectionTitle("Dirección *")
        }, 2000);
    }

    const SendWhatsapp = (res)=>{
        const message = ConstructMessage(res)
        router.push(`https://api.whatsapp.com/send?text=${message}&phone=+543814015520`)
     }
    
    return (
        <div className={classes.PageContainer} >
            <div className={classes.Container} >
                <TicketListener info={Response} OrderState={OrderState}  className={classes.TListener}/>{

                OrderState.notSended ?(
                <>
                    <div className={classes.AditionalDataContainer} >
                        <p className={classes.Title} ref={DirectionRef}>{DirectionTitle}</p>
                        <input 
                            type="text" 
                            onChange={(e)=>{setDirection(e.target.value)}} 
                            className={classes.InputText}
                        />
                        <p className={classes.Title} >Indicaciónes, ayudanos a encontrarte (opc)</p>
                        <input 
                            type="text" 
                            placeholder='Nombre, descripción de tu casa, etc.' 
                            onChange={(e)=>{setIndications(e.target.value)}}
                            className={classes.InputText}
                        />
                    </div>
                    <div className={classes.Botonera} >
                        <button 
                            onClick={() => InitSendingPorcess()} 
                            className={classes.ButtonComprar}
                        > Hacer Pedido </button>
                        <button 
                            onClick={()=>{router.push('/')}} 
                            className={classes.ButtonVolver}
                        > Volver </button>
                    </div>
                </>)

                :OrderState.waitingResponse ?(

                <>
                    <div className={classes.Botonera} >
                        <button 
                            onClick={()=>{router.push('/')}} 
                            className={classes.ButtonVolver}
                        > Volver </button>
                    </div>
                </>)
                :OrderState.ErrorResponse ?( // ERROR EN LA RESPUESTA 
                <>
                     <button 
                            onClick={()=>{router.push('/')}} 
                            className={classes.ButtonVolver}
                    > Volver </button>
                </>)
                :(//RESPUESTA EXITOSA
                <>
                    <div className={classes.Botonera} >
                        <button 
                            onClick={() => {SendWhatsapp(Response)}} 
                            className={classes.ButtonComprar}
                        > Ir a Whatsapp </button>
                    </div>

                </>
                )
                }
           </div>
        </div>
    )
}
export default GatewayUI
