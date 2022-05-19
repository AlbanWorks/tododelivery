import Head from 'next/head'
import classes from './styles/pageStyles.module.css'
import ProductFeed from "../components/ProductFeed/ProductFeed"
import Navbar from "../components/Navbar/Navbar"
import Cart from '../components/Cart/Cart'

export default function Frutas() {

  return (
    <div className={classes.PageContainer}>
       <Head>
    <title>Todo Delivery-frutas</title>
      </Head>
      <Navbar/>
      <ProductFeed category={"frutas"}/>
      <Cart/>
    </div>
  )
}