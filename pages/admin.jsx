import Head from 'next/head'
import classes from './styles/pageStyles.module.css'
import AdminFeed from "../components/Admin/AdminFeed"


export default function Admin() {

  return (
  <div className={classes.PageContainer}>
  <Head>
  <title>Todo Delivery-Admin</title>
  </Head>
  <AdminFeed/>
  </div>
  )
}