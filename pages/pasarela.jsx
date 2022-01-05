import react from 'react'
import Head from 'next/head'
import classes from './styles/pageStyles.module.css'
import Navbar from '../components/Navbar/Navbar'
import GatewayUI from '../components/GatewayUI/GatewayUI'

const pasarela = () => { 
    
    return (
        <div className={classes.PageContainer} >
             <Head>
                <meta charset="utf-8" />
                <link rel="icon" href="%PUBLIC_URL%/favicon.png" />
                <meta name="description" content="Web site created using create-react-app"/>
                <link rel="preconnect" href="https://fonts.googleapis.com"/>
                <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
                <link 
                href="https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@200&display=swap" 
                rel="stylesheet"
                />
                <script src="https://kit.fontawesome.com/87e51fd4dd.js" crossorigin></script>
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