import Head from 'next/head'
import classes from './styles/pageStyles.module.css'
import FanctButton from '../components/Test/FanctButton'

const test = () => {
  return (
    <div className={classes.PageContainer}>
    <Head>
  <title>Todo Delivery-Admin</title>
  </Head>
    <FanctButton/>
    </div>
  )
}

export default test