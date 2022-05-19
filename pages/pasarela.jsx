import Head from 'next/head'
import classes from './styles/pageStyles.module.css'
import OrdersUI from '../components/Orders/OrdersUI'

const pasarela = () => { 
    
    return (
        <div className={classes.PageContainer} >
             <Head>
                <title>Todo Delivery-pedidos</title>
            </Head>
            <OrdersUI/>
        </div>
    )
}

export default pasarela
