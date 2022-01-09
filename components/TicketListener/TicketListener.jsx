import React from 'react'
import classes from './TicketListener.module.css'
import Link from 'next/link'
import Spinner from '../Spinner/Spinner'


const TicketListener = ({info}) => {
    //const info = {waiting:"el coño de tu mama"}
     

const LenghtOf= (obj)=> { return Object.keys(obj).length}

return (
<div className={classes.Container} >{
     LenghtOf(info) === 0 ? (
        <div className={classes.InfoContainer} > 
            <h2 className={classes.InfoTitle}>
                Danos algo de información antes de hacer tu pedido, te lo mandamos donde estés.
            </h2>
            <p className={classes.Info}>
                Si olvidaste algo podes <Link href="/">volver</Link> y revisar tu carrito <b>antes de comprar.</b> 
            </p>
            <p className={classes.Info}>
                Se abona al llegar el pedido, pronto contaremos con <b>Mercado Pago</b> y <b>Ualá</b>
            </p>
        </div>
     ) 
     : info.err ? (
        <div className={classes.ErrorContainer} >
            <p className={classes.ErrorMessage}>
               Algo salió mal, su pedido no se realizó,podes <Link href="/">volver</Link> e intentarlo de nuevo
            </p>
            <i className={"fas fa-cogs"}></i>
        </div>    
     )
     : info.waiting ? (
            <Spinner/>
         ):(
        <div className={classes.TicketContainer} >
            <h3 className={classes.TicketTitle} >TICKET:</h3>
            {info.productosValidados.map((item,index)=>
            <div key={index} className={classes.Product} >
                <p className={classes.Title} >{item.amount+" "+ item.title}</p>
                <p className={classes.Price} >$ {item.price * item.amount}</p>
            </div> 
            )}
            <p className={classes.TotalPrice} ><b>Total: {"$"+ info.precioTotal}</b></p> 
            <p className={classes.Direction} > Para: {info.infoAdicional.Direction}</p>
            <div className={classes.Banner}>
                <p className={classes.Moto} ><i className={"fas fa-motorcycle"}></i></p>
                <p className={classes.EnCamino} >Su pedido llegará pronto</p>
            </div>
        </div>
     )


    }</div>)
}

export default TicketListener
/*
<div className={classes.Container} >
            {info.map((item,index)=>
                <p>{item.amount+" "+ item.title+" $"+totalProducto(item)}</p>
            )}
            <p>Total:{calcularTotal(info)}</p> 
              <p>su pedido está en camino...</p>
        </div>
*/