import React,{useState, useEffect,useContext} from 'react'
import { useRouter } from 'next/router'
import classes from './Cart.module.css'
import { DataContext } from '../../provider'
import CartProduct from './CartProduct'
import CartButton from './CartButton'

const Cart = () => {

    const {CartProducts} = useContext(DataContext)
    const {setCartProducts} = useContext(DataContext)
    const [Total, setTotal] = useState(0)  
    const [active, setActive] = useState(false) 
    const [EmptyCartAlert, setEmptyCartAlert] = useState(true)  
    const router = useRouter()
    

useEffect(() => {
    CalcularTotal()
    if(CartProducts.length > 0) setEmptyCartAlert(false)
}, [CartProducts])

const CalcularTotal = ()=>{
    let Precio = 0;
    CartProducts.forEach(product => {
        Precio += parseInt(product.price, 10) * product.amount;
    });
    setTotal(Precio)
}

const IniciarCompra= () =>{
    if(CartProducts.length > 0) router.push('/pasarela')
    else setEmptyCartAlert(true)
}

    return (
        <div>{
         active ? (
            <div className={classes.CartContainer} >
                <div className={classes.Cart} >
                    <h2 className={classes.Titulo} >Carrito de Compras</h2>
                   <div className={classes.ProductBill} >
                        {CartProducts.map((item,index)=>
                            <CartProduct key ={index} thisProdIndex= {index} product = {item}/>
                        )} {EmptyCartAlert ? (
<p>-El carrito está vacío...</p>
                        ):(
<></>
                        ) }
                   </div>
                   <h3 className={classes.Total}>Total ${Total}</h3>
                    <div className={classes.Botonera} >
                        <button onClick={() => setCartProducts([])} className={classes.ButtonVacia}>
                            Vaciar Carrito
                        </button>
                        <button onClick={() => IniciarCompra()} className={classes.ButtonCom}>
                            Iniciar Compra
                        </button> 
                        <button onClick={()=>setActive(false)} className={classes.ButtonVolver} >
                            Volver
                        </button>
                    </div>
                </div> 
            </div>
         ):(
            <CartButton alClickar={()=>setActive(true)}/>
         )
        }</div> 
    )
}


export default Cart

/*
<h2>ESTE ES EL CARRITO</h2>
            {CartProducts.map((item,index)=>
               <CartProduct key ={index} thisProdIndex= {index} product = {item}/>
            )} 
            <h3>Total ${Total}</h3>
            <button onClick={() => setCartProducts([])}>Vaciar Carrito</button>
            <button onClick={() => EnviarListaDeCompra()} >Comprar</button> 
*/