import {React, useState} from 'react'
import {getCollection, setProduct, addProduct, deleteProduct} from "../../firebase/FirestoreMethods"
import classes from './AdminFeed.module.css'
import { checkInput, checkList, SaveChanges, handleErrorStyles} from './adminMethods'
import Spinner from '../Spinner/Spinner'
import AddPercentageInput from './AddPercentageInput/AddPercentageInput'
import ListStateListener from './ListStateListener/ListStateListener'

const AdminFeed = () => {

  	const [ProductList, SetProductList] = useState([])
  	const [ListState, SetListState] = useState("idle")
	const [Category, SetCategory] = useState("Seleccione Categoría")
	const [productsFetched, SetProductsFetched] = useState(false)
	const [changingPercentage , setChangingP] = useState(false)  

  	const fetchProductList = async (category) =>{
		SetProductsFetched(false)
		SetListState("idle")
		SetCategory(category)
    	const fetchedProdList = await getCollection(category)
    	SetProductList(fetchedProdList)
		SetProductsFetched(true)
  	}
//manejo de errores y cambio de valores en la lista local
	const hanldeChanges = (e,index) => { 
		const errors = checkInput(e.target)
		handleErrorStyles(errors, e.target)
    	SetProductList(SaveChanges(e.target,index, ProductList))
  	} 

  	const addField = () => {
    	const newEmptyProduct ={title:"titulo", brand:"marca", price:"100",picFile:"",localid: new Date().getTime()}
		//new Date().getTime() le da un id único provisional para usar como key
    	SetProductList([...ProductList, newEmptyProduct])
  	}

	const RemoveField = (index) => {
    	const newProductList = [...ProductList]
		newProductList.splice(index,1)
		SetProductList(newProductList)
  	}

	// da o quita una propiedad,delete, la cual es leida antes de enviarse la productList
	//en caso de tener la propiedad delete, se da la orden de eliminar el producto de firebase
	const handleDeleteCheckbox = (e, index) => {
		const newProductList = [...ProductList]
		if(e.target.checked) newProductList[index].delete = true; 
		else delete newProductList[index].delete
		SetProductList(newProductList)
	}

	const AddPercentage = (Number,Brand) => {
		setChangingP(true)
		const newProductList = [...ProductList]
		newProductList.forEach(product => {
			if(product.brand === Brand || Brand === "todas"){
				const intPrice = parseInt(product.price)
				const newPrice = Math.round((intPrice / 100 * Number) + intPrice)
				product.price = newPrice.toString()
			}
		})
		SetProductList(newProductList)
		setTimeout(()=>{setChangingP(false)},700) 
		//chapuzero al mango esto, pero no pude hacer que re renderice la lista de otra manera...
	}

	 //método fiero, darle algo de amor 
  	const Submit = async (productList) =>{
		const errors = checkList(productList);if(errors){SetListState("local error");return} 
    	SetListState("saving")
    	for (let product of productList) {
			if(product.delete){
				const deleteProd = await  deleteProduct(Category, product.ID, product.picRoute)
        		if(deleteProd.err){SetListState("save error");return}
			}
      		else if(product.ID){//producto ya existente, actualizar
        		const updateProduct = await setProduct(product,Category, product.ID)
        		if(updateProduct.err){SetListState("save error");return}
      		}
      		else{ 
				//inmutabilidad, crea una copia del producto, error si remuevo localid del original,keys 
				const product_toSend = JSON.parse(JSON.stringify(product)) //copia profunda, pero metodo assingn() puede andar 
				product_toSend.picFile = product.picFile //picFile se corrompe con JSON y con assign, la reasigno aqui y ya...
				delete product_toSend.localid //remover el id provisional (local) y enviar a firestore
        		const newProduct = await addProduct(product_toSend,Category)
        		if(newProduct.err){SetListState("save error");return}
      		}
    	}
		const refetch = await fetchProductList(Category)
    	SetListState("saved")
  	}
  
  	return (
    	<div className={classes.container} >
			<div className={classes.menu} > 
				<button className={classes.menuButton} onClick={()=> fetchProductList("golosinas")}>Golosinas</button>
				<button className={classes.menuButton} onClick={()=> fetchProductList("frutas")}>Frutas</button>
			</div>
        	<div className={classes.grid}>
			<label className={classes.CategoryLabel} >{Category}</label>
      		{
        	productsFetched && changingPercentage === false ?(
				ProductList.map((product,index) => 
				<div key={product.ID?(product.ID):(product.localid)} className={classes.product} >
					<input 
						className={classes.title_input} 
						type="text"   
						name="title" 
						defaultValue={product.title}  
						onChange={(e)=>hanldeChanges(e,index)}
					/>
				  	<input 
						className={classes.brand_input} 
						type="text"   
						name="brand" 
						defaultValue={product.brand}  
						onChange={(e)=>hanldeChanges(e,index)}
					/>
				  	<input 
						className={classes.price_input} 
						type="number" 
						name="price" 
						defaultValue={product.price}  
						onChange={(e)=>hanldeChanges(e,index)}
					/>
					<label htmlFor={`${product.ID||product.id}`} className={product.ID?(classes.picLabel_old):(classes.picLabel_new)}>
						<i className={"fa-solid fa-image"}></i>
						<input 
							className={classes.picFileInput} 
							id={`${product.ID||product.id}`} 
							type="file"  
							name="picFile" 
							accept="image/*"  
							onChange={(e)=>hanldeChanges(e,index)}
						/> 
					</label>
				  	{
				  	product.ID?(
						<div className={classes.checkboxContainer}>
							<input 
							    className={classes.deleteCheckbox}
								type="checkbox" 
								onChange={(e)=>handleDeleteCheckbox(e, index)}
							/> 
						</div>)
				  	:(
						<button onClick={()=> RemoveField(index)} className={classes.DeleteLocalButton} >
							<i className={"fa-solid fa-circle-xmark"}></i>
						</button>)
				  	}
					{product.delete ? (<div className={classes.Tacha}/>):(<></>)}  
				</div>
				))
			:Category==="Seleccione Categoría"?(<></>)
			:(
				<div className={classes.SpinnerContainer}><Spinner/></div> )
      		}
        	</div>
			<button onClick={addField} className={classes.AddButton} >Agregar Producto</button>
			<AddPercentageInput alcambiar={(Number,Brand)=>AddPercentage(Number,Brand)}/>
			<button onClick={()=>Submit(ProductList)} className={classes.SaveButton} >Guardar Cambios</button>
        	<ListStateListener ListState={ListState}/>
    	</div>
  	)
}

export default AdminFeed

/*
SOBRE ESTE COMPONENTE GIGANTE

al iniciar, cargar los datos de firebase o agregar un campo nuevo, este componente desconoce si el estado
de cada campo es erroneo o no, presupone para cada caso el estado (erroneo o no) que debería tener y
lo refleja en los estilos.

es solo cuando cambia un campo (onchange) que se evalúan los errores localmente y se reflejan luego en los estilos.
Solo cuando ya no haya mas errores se procederá a setear en firebase toda la lista producto por producto, 
dicho proceso tambien está sujeto a errores, sin embargo, he pensado que la manera mas sensata de reflejar
estos errores es listar los productos con errores sin interrumpir la subida del resto e informar luego los productos 
que sufrieron un error al ser enviados para que puedan ser borrados o modificados luego.

soy consciente de lo improvisado de este componente, me gustaría refactorizarlo luego.

*/