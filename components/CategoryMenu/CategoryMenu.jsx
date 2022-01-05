import React from 'react'
import { useRouter } from 'next/router'
import classes from'./CategoryMenu.module.css'

const CategoryMenu = () => {

    const router = useRouter()

    const goTo = (direction) => router.push(direction)
    
    
    return (
        <div className={classes.Container}>
            <div className={classes.Menu} >
                <button className={classes.ButtonApple} onClick={()=>goTo('/frutas')} > 
                    <i class="fas fa-apple-alt"></i>
                    Frutas 
                </button>
                <button className={classes.ButtonCookie} onClick={()=>goTo('/golosinas')} > 
                    <i class="fas fa-cookie"></i>
                    Golosinas 
                </button>
            </div>
        </div>
    )
}

export default CategoryMenu
