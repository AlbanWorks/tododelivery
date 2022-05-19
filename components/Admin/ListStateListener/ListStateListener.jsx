import {React,Fragment} from 'react'
import Spinner from '../../Spinner/Spinner'
import classes from './ListState.module.css'

const ListStateListener = ({ListState}) => {

return (
    <Fragment>
    {
    ListState === "idle"?(
        <></>)
    :ListState === "saved"?(
        <span className={classes.Ok}> PRODUCTOS GUARDADOS</span>)
    :ListState === "save error"?(
        <span className={classes.Warning}>Error al Guardar</span>)
    :ListState === "local error"?(
        <span className={classes.Warning}>Corrija Todos Los Errores</span>)	
    :ListState === "saving"?(
        <Spinner/>)
    :(<></>)  
    }
    </Fragment>
  )
}

export default ListStateListener