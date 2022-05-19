import React from 'react'
import { useRouter } from 'next/router'
import classes from'./CategoryMenu.module.css'

const CategoryMenu = () => {

    const router = useRouter()

    const goTo = (direction) => router.push(direction)
    
    return (
        <div className={classes.Container}>
            <div className={classes.Menu} >
                <h2 className={classes.MenuTitle}> Categorías </h2>
                <button className={classes.Button}
                onClick={()=>goTo('/frutas')} > 
                    Frutas 
                </button>
                <button className={classes.Button}
                onClick={()=>goTo('/golosinas')} > 
                    Golosinas 
                </button>
                <button className={classes.Button}>Mercadería General</button>
                <button className={classes.Button}>Art Limpieza</button>
            </div>
            <div className={classes.Ball}/>
        </div>
    )
}

export default CategoryMenu
