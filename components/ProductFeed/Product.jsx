import React,{useState,useContext} from 'react'
import classes from './Product.module.css'
import AmountUI from '../AmountUI/AmountUI'
import { DataContext } from '../../provider'

const Product = ({LocalProduct}) => {
    
    const {CartProducts} = useContext(DataContext)
    const {setCartProducts} = useContext(DataContext)
    const [amount, setAmount] = useState(1)
    const [ButtonText, setButtonText] = useState("Añadir al Carrito")

    const AddToCart = (product) => {
        ChangeButtonText()
        //ver si el producto ya existe
        const IndexProd = CartProducts.indexOf(product)
        //si indexof da -1 no existe un producto igual
        if( IndexProd === -1){
            //le creo una propiedad que indique cuantos productos hay del mismo tipo
            product["amount"] = amount
            setCartProducts([ ... CartProducts, product ])
        }
        else{
            //el producto ya existe, solo le sumo ammont ++
            CartProducts[IndexProd]["amount"] += amount 
            setCartProducts([...CartProducts])
        }  
    }

    const ChangeButtonText= () =>{
        setButtonText("Añadiendo...")
        setTimeout(() => {
            setButtonText("Añadir al Carrito")
        }, 700);
    }

    return (
        <div className={classes.Product} >
            <div className={classes.ImgContainer} >
                <img src={LocalProduct["picUrl"]} alt="" width="100%"/>
            </div>
            <div className={classes.InfoContainer} >
                <h3 className={classes.Title} >{LocalProduct["title"]}</h3>
                <div className={classes.Price}  >${LocalProduct["price"]}</div>
               <div className={classes.UIContainer} >
                    <AmountUI alCambiar={(n)=>setAmount(n)}/>
                    <button onClick={()=>AddToCart(LocalProduct)} className={classes.Button} >
                        {ButtonText}
                    </button>
               </div>
            </div>
        </div>
    )
}

export default Product

/*
<p className={classes.Amount} >Cantidad:</p>
*/
