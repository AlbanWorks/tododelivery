import './styles/global.css'
import DataProvider from "../provider"


function MyApp({ Component, pageProps }) {
  return (
    <DataProvider>
      <Component {...pageProps}/>
    </DataProvider>
  )
}

export default MyApp
