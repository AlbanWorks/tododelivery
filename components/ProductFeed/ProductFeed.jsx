import {React, useState, useEffect,useContext} from 'react'
import classes from './ProductFeed.module.css'
import { DataContext } from '../../provider'
import {getCollection} from "../FirestoreMethods"
import Product from './Product';
import Spinner from '../Spinner/Spinner'

const ProductFeed = ({category}) => {

    const {Products} = useContext(DataContext)
    const {setProducts} = useContext(DataContext)
    const [ProductsFetched , SetProductsFetched] = useState(false)

    useEffect(() => {
        const fetchData = async () =>{
            const ProductList = await getCollection(category)
            console.log(ProductList)
            setProducts(ProductList)  
            SetProductsFetched(true)
        }
        fetchData()
    }, [])
    
    return (
        <div className={classes.ProductFeed}>{
ProductsFetched ? (
    Products.map((item,index)=>
    <Product key={index} LocalProduct = {item} />
)
):(
<Spinner/>
)
        }
           
             
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