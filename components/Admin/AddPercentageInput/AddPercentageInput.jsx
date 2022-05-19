import { makePublicRouterInstance } from 'next/dist/client/router'
import {React,useState} from 'react'
import classes from './AddP.module.css'


const AddPercentageInput = ({alcambiar}) => {
const [Number,setNumber] = useState(0)
const[Brand,setBrand] = useState("todas")

const action = (e)=>{
  e.preventDefault()
  alcambiar(parseFloat(Number),Brand)
}

  return (
    <form className={classes.container} onSubmit={(e)=>{action(e)}}>
        <label className={classes.label}><b>+</b></label>
        <input className={classes.inputNumber} type="number" defaultValue={Number} onChange={(e)=>setNumber(e.target.value)}/>
        <label className={classes.label}><b>%</b></label>
        <label className={classes.label}><b>Marca:</b></label>
        <input className={classes.inputText} type="text" defaultValue={Brand} onChange={(e)=>setBrand(e.target.value)}/>
        <button className={classes.button}>ok</button>
    </form>
  )
}

export default AddPercentageInput