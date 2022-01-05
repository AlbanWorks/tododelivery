import React,{useState, useEffect,useContext} from 'react'
import { DataContext } from '../../provider'
import classes from './CartButton.module.css'

const CartButton = (props) => {
    /*
    en este usé la misma tecnica para pasar info del hijo al padre, pasar una funcion como prop,
    a falta de una convención que conozca, estas propiedades las pondré en español en el padre para
    distinguirlas de los metodos nativos
    */ 
    const {CartProducts} = useContext(DataContext)
    const [TotalProducts, setTotalProducts] = useState(0) 
    

    useEffect(() => {
        let total = 0
        CartProducts.forEach(product => {
            total += product.amount
        });
        setTotalProducts(total)
    }, [CartProducts])

    return (
        <button onClick={()=>props.alClickar()} className={classes.CartButton}>
            <i className={"fas fa-shopping-cart"}></i>
            {
                TotalProducts > 0 ?(
                    <p className={classes.Notification}>{TotalProducts}</p>
                ):(
                    <></>
                )
            }
        </button> 
    )
}

export default CartButton
// <p className={classes.Notification}>{TotalProducts}</p> 