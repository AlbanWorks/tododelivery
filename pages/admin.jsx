import React from 'react'
import FormularioPrueba from '../components/FormularioPrueba'
//import ProductsFeed from "../components/ProductsFeed"
import { useRouter } from 'next/router'

const Admin = () => {
    const router = useRouter()
    return (
        <div>
           <h1>ESTE ES AFMIN</h1>
           <button onClick={() => router.push('/')}> vovler</button>
<FormularioPrueba/>
        </div>
    )
}

export default Admin
