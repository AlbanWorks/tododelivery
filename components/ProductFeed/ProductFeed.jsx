import {React, useState, useEffect,useContext} from 'react'
import classes from './ProductFeed.module.css'
import { DataContext } from '../../provider'
import {getCollection} from "../../firebase/FirestoreMethods"
import Product from './Product';
import Spinner from '../Spinner/Spinner'

const ProductFeed = ({category}) => {

    const {Products} = useContext(DataContext)
    const {setProducts} = useContext(DataContext)
    const [ProductsFetched , SetProductsFetched] = useState(false)

    useEffect(() => {
        const fetchData = async () =>{
            //trae la coleccion y le añade el campo ID a cada producto
            const ProductList = await getCollection(category)
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
                <div className={classes.SpinnerContainerPF} >
                    <Spinner/>
                </div>
            )}
        </div>
    )
}

export default ProductFeed
