import React,{createContext,useState} from 'react';
// CREO EL CONTEXTO
export const DataContext = createContext();

//CREO UN COMPONENTE QUE ME PERMITA PROVEER LA INFORMACION A TODOS SUS HIJOS
//ESTE ES UN HIGHER ORDER COMPONENT

const DataProvider = ({children}) => {
//CREO LOS DATOS QUE VOY A COMPARTIR Y LOS MANDO EN EL PROVIDER CON value, UN OBJETO.

const[Products, setProducts] = useState([])
const[CartProducts, setCartProducts] = useState([])

    return (
        <DataContext.Provider value={{
            Products,
            setProducts,
            CartProducts,
            setCartProducts
        }}>
            {children}
        </DataContext.Provider>
    )
}

export default DataProvider

/*
Todo lo que este adentro del provider puede acceder a los datos y setearlos mediante las funciones
usando el hook useContext

const {data} = useContext(DataContext)

{data} la propiedad o funcion requerida entre corchetes, object destructuring.
(DataContext) es el nombre del contexto en el que se halla la propiedad.

*/ 
