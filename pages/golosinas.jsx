import Head from 'next/head'
import classes from './styles/pageStyles.module.css'
import ProductFeed from "../components/ProductFeed/ProductFeed"
import Navbar from "../components/Navbar/Navbar"
import Cart from '../components/Cart/Cart'
import ClosedAlert from '../components/ClosedAlert/ClosedAlert'

export default function Golosinas() {

  return (
    <div className={classes.PageContainer}>
       <Head>
    <title>TuDelivery-golosinas</title>
      </Head>
      <Navbar/>
      <ProductFeed category={"golosinas"}/>
      <Cart/>
      <ClosedAlert/>
    </div>
  )
}