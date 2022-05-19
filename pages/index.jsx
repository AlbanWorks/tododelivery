
import Head from 'next/head'
import classes from './styles/pageStyles.module.css'
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
