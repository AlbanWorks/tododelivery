import {React, useState, useEffect,useContext} from 'react'
import classes from './ProductFeed.module.css'
import { DataContext } from '../../provider'
import {getCollection} from "../FirestoreMethods"
import Product from './Product';
const ProductFeed = ({category}) => {

    //const [productos, setProductos] = useState([]);
    const {Products} = useContext(DataContext)
    const {setProducts} = useContext(DataContext)

useEffect(() => {
    const fetchData = async () =>{
        const ProductList = await getCollection(category)
        console.log(ProductList)
        setProducts(ProductList)  
    }
    fetchData()
}, [])
    
    return (
        <div className={classes.ProductFeed}>
            {Products.map((item,index)=>
                <Product key={index} LocalProduct = {item} />
            )}  
        </div>
    )
}
//<Mensaje key={index} autor={item.Nickname} mensaje={item.mensaje}/>
export default ProductFeed

/*
key={index} 
title={item["title"]} 
price={item["price"]}  
stock={item["stock"]} 
picUrl={item["picUrl"]}
id={item["ID"]}
*/