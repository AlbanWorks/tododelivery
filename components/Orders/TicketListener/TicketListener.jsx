import React from 'react'
import classes from './TicketListener.module.css'
import Link from 'next/link'
import Spinner from '../../Spinner/Spinner'


const TicketListener = ({info, OrderState}) => {
    
return (
<div className={classes.Container} >{
     OrderState.notSended ? (
        <div className={classes.InfoContainer} > 
            <h2 className={classes.InfoTitle}>
                Danos algo de información antes de hacer tu pedido
            </h2>
            <p className={classes.Info}>
                Si olvidaste algo podes <Link href="/">volver</Link> y revisar tu carrito <b>antes de comprar.</b> 
            </p>
            <p className={classes.Info}>
                <b>🟢 Se abona al llegar el pedido</b>
            </p>
        </div>
     ) 
     : OrderState.ErrorResponse ? (
        <div className={classes.ErrorContainer} >
            <p className={classes.ErrorMessage}>
               Algo salió mal, su pedido no se realizó,podes <Link href="/">volver</Link> e intentarlo de nuevo
            </p>
            <i className={"fas fa-cogs"}></i>
        </div>    
     )
     : OrderState.waitingResponse ? (
            <Spinner/>
         ):(
        <div className={classes.TicketContainer} >
            <h3 className={classes.TicketTitle} >Todo en orden, solo falta un paso</h3>
            {info.validatedList.map((item,index)=>
            <div key={index} className={classes.Product} >
                <p className={classes.Title} >{item.amount+" "+ item.title}</p>
                <p className={classes.Price} >$ {item.price * item.amount}</p>
            </div> 
            )}
            <p className={classes.TotalPrice} ><b>Total: {"$"+ info.precioTotal}</b></p> 
            <p className={classes.Direction} > Para: {info.infoAdicional.Direction}</p>
            <div className={classes.Banner}>
                <p className={classes.EnCamino} >Confirme por Whatsapp con el botón de abajo, esto crea un mensaje automático, es necesario para comunicarnos en caso de imprevistos, muchas gracias </p>
            </div>
        </div>
     )


    }</div>)
}

export default TicketListener
