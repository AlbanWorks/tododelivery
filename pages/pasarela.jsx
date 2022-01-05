import react from 'react'
import Head from 'next/head'
import classes from './styles/pageStyles.module.css'
import Navbar from '../components/Navbar/Navbar'
import GatewayUI from '../components/GatewayUI/GatewayUI'

const pasarela = () => { 
    
    return (
        <div className={classes.PageContainer} >
             <Head>
                <title>Todo Delivery-envíos</title>
            </Head>
            <GatewayUI/>
        </div>
    )
}

export default pasarela
/*
 <Navbar/>
<h1>esta es la Pasarela</h1>
                {CartProducts.map((item,index)=>
                    <p key={index} >{item.amount +" "+ item.title}</p>
                )} 
            <p>Dirección</p>
            <input type="text" />
            <p>Datos Adicionales</p>
            <input type="text" />
            <button>Comprar</button>
            <button onClick={()=>{router.push('/')}} >volvar</button>
*/