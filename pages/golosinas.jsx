import Head from 'next/head'
import classes from './styles/pageStyles.module.css'
import ProductFeed from "../components/ProductFeed/ProductFeed"
import Navbar from "../components/Navbar/Navbar"
import Cart from '../components/Cart/Cart'

export default function Golosinas() {

  return (
    <div className={classes.PageContainer}>
       <Head>
      <meta charset="utf-8" />
    <link rel="icon" href="%PUBLIC_URL%/favicon.png" />
    <meta name="description" content="Web site created using create-react-app"/>
    <link rel="preconnect" href="https://fonts.googleapis.com"/>
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
<link href="https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@200&display=swap" rel="stylesheet"/>
<script src="https://kit.fontawesome.com/87e51fd4dd.js" crossorigin></script>
    <title>Todo Delivery-golosinas</title>
      </Head>
      <Navbar/>
      <ProductFeed category={"golosinas"}/>
      <Cart/>
    </div>
  )
}