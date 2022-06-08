import {React, useState, useEffect, useRef, Fragment} from 'react'
import Link from 'next/link'
import classes from './Navbars.module.css'

const Navbar = () => {

    const [ActiveMenu, setActiveMenu] = useState(false)
    const [ButtonText, setButtonText] = useState("Categorías")    
    const navRef= useRef();
    const buttonRef= useRef();

useEffect(() => {
    if(ActiveMenu){
        navRef.current.style.marginTop= "0"
        setButtonText("Cerrar")
    }
    else{
        navRef.current.style.marginTop= "-150%"
        setButtonText("Categorías")
    }
}, [ActiveMenu])


    return (
        <Fragment>
        <header className={classes.Header}>
           <h1 className={classes.Title} >TD</h1>
           <button className={classes.CategoryButton} ref={buttonRef} onClick={()=>setActiveMenu(!ActiveMenu)}>{ButtonText}</button>
        </header>
        <nav className={classes.Nav} ref={navRef}>
            <ul className={classes.Ul}>
                <li className={classes.Li}><Link href="/golosinas"><a>Golosinas y Galletas</a></Link></li>
                <li className={classes.Li}><Link href="/panaderiaymerienda"><a>Panadería</a></Link></li>
                <li className={classes.Li}><Link href="/heladosypostres"><a>Helados y Postres</a></Link></li>
                <li className={classes.Li}><Link href="/mercaderiageneral"><a>Mercadería General</a></Link></li>
                <li className={classes.Li}><Link href="/bebidasalcoholicas"><a>Bebidas Alcohólicas</a></Link></li>
                <li className={classes.Li}><Link href="/jugosygaseosas"><a>Jugos y Gaseosas</a></Link></li>
            </ul>
        </nav>
        </Fragment>
    )
}

export default Navbar
