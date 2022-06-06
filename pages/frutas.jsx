import Head from 'next/head'
import classes from './styles/pageStyles.module.css'
import ProductFeed from "../components/ProductFeed/ProductFeed"
import Navbar from "../components/Navbar/Navbar"
import Cart from '../components/Cart/Cart'
import ClosedAlert from '../components/ClosedAlert/ClosedAlert'

export default function Frutas() {

  return (
    <div className={classes.PageContainer}>
       <Head>
    <title>TuDelivery-frutas</title>
      </Head>
      <Navbar/>
      <ProductFeed category={"frutas"}/>
      <Cart/>
      <ClosedAlert/>
    </div>
  )
}