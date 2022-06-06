
import Head from 'next/head'
import classes from './styles/pageStyles.module.css'
import MainNavbar from "../components/Navbar/MainNavbar"
import CategoryMenu from '../components/CategoryMenu/CategoryMenu'
import ClosedAlert from '../components/ClosedAlert/ClosedAlert'


export default function Home() {

  return (
    <div className={classes.PageContainer}>
       <Head>
    <title>TuDelivery</title>
      </Head>
      <MainNavbar/>
      <CategoryMenu/>
      <ClosedAlert/>
    </div>
  )
}
