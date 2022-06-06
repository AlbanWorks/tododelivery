import {React, useRef,Fragment,useState, useEffect } from 'react'
import classes from "./ClosedAlert.module.css"

const ClosedAlert = () => {
  const[active, setActive] = useState(false)
const containerRef = useRef()

useEffect(() => {
    const date = new Date();
    const hour = date.getHours()
    if(hour >= 10){
        setActive(false)
    }
    else{
      setActive(true)
    }
}, [])



  return (
    <Fragment>
      {
        active?(
          <div className={classes.Container} ref={containerRef} >
        <div className={classes.Alert}>
             <h3 className={classes.Title} >Cerrado</h3>
             <p className={classes.Subtitle} >Horarios de Atención:</p>
             <p className={classes.HorarioAtencion} ><b>- de 10 de la mañana</b> <br /><b>- a 12 de la noche</b></p>
        </div>
     </div>
        )
        :(
          <></>
        )
      }
    </Fragment>
  )
}

export default ClosedAlert