
import Head from 'next/head'
import classes from './styles/pageStyles.module.css'
import ProductFeed from "../components/ProductFeed/ProductFeed"
import MainNavbar from "../components/Navbar/MainNavbar"
import Cart from '../components/Cart/Cart'
import CategoryMenu from '../components/CategoryMenu/CategoryMenu'
export default function Home() {

  return (
    <div className={classes.PageContainer}>
       <Head>
    <title>Todo Delivery</title>
      </Head>
      <MainNavbar/>
      <CategoryMenu/>
      <Cart/>
    </div>
  )
}
/*
<button onClick={()=>{setProduct("uva", {peso:1, grosor:45, nombre:"josefa"}); console.log("hecho")}} >add new doc</button>
   <button onClick={getdatos} >get doc</button>
   <button onClick={updatedatos} >update</button>
*/ 