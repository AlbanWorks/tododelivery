import React,{useState, useEffect} from 'react'
import classes from './TicketListener.module.css'

const TicketListener = ({info}) => {
    const infoi = {err: "no des bola vos"}
const totalProducto= (item)=>{
return item.amount * item.price
}

const LenghtOf= (obj)=> { return Object.keys(obj).length}

return (<div className={classes.Container} >{
     LenghtOf(info) === 0 ? (
       <></>
     ) 
     : info.err ? (
<div>{info.err}</div>
     ):(
        <div className={classes.Container} >
            {info.productosValidados.map((item,index)=>
            <div key={index} className={classes.Product} >
                <p className={classes.Title} >{item.amount+" "+ item.title}</p>
                <p className={classes.Price} >$ {item.price * item.amount}</p>
            </div> 
            )}
            <p className={classes.TotalPrice} >Total:{" $"+ info.precioTotal}</p> 
            <p className={classes.Direction} >{info.infoAdicional.Direction}</p>
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