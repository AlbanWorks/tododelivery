import React from 'react'
import classes from './Navbars.module.css'

const MainNavbar = () => {
    return (
        <div className={classes.MainNavbarContainer}>
            <nav className={classes.MainNavbar}>
                <h1 className={classes.MainNavbarTitle} >Todo Delivery</h1>
            </nav>
            <div className={classes.Wave} >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                    <path fill="rgb(54, 98, 219)" fill-opacity="1" d="M0,224L80,234.7C160,245,320,267,480,234.7C640
                    ,203,800,117,960,106.7C1120,96,1280,160,1360,192L1440,224L1440,0L1360,0C1280,0,1120,0,
                    960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z">
                    </path>
                </svg>
            </div>
        </div>
        
        
    )
}

export default MainNavbar
