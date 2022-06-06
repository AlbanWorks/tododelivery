import {React, useState, useEffect, useRef, Fragment} from 'react'
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
        navRef.current.style.marginTop= "-100%"
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
                <li className={classes.Li}><a href="">Golosinas</a></li>
                <li className={classes.Li}><a href="">Gasoleo</a></li>
                <li className={classes.Li}><a href="">Golosinas</a></li>
                <li className={classes.Li}><a href="">Golosinas</a></li>
                
            </ul>
        </nav>
        </Fragment>
    )
}

export default Navbar
