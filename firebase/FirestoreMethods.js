import {db, storage} from './firebaseConfig'
import { collection, getDocs, doc, getDoc, setDoc, updateDoc, addDoc, deleteDoc } from "firebase/firestore"
import {ref, uploadBytesResumable, getDownloadURL } from "@firebase/storage"


//haganme la atencion de borrar los clg si no les sirven
  
const getProduct = async (category, ID) => {
    const docRef = doc(db, category, ID);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        return docSnap.data();
    }     
    else {
    // doc.data() will be undefined in this case
     return false
    }
}

const setProduct = async (product, category, ID) => {
    // guarda los cambios de un producto existente
    const productWithPicUrl = await handlePicUpload(product)
    try {
        await setDoc(doc(db, category, ID), productWithPicUrl);
        return{saved:"product saved"}
    } catch (err) {
        console.log("error al guardar producto " , err)
        return{err}
    }
}

const addProduct = async (product, category) => {
    console.log("se activa ADD Product")
    // guarda los cambios de un producto nuevo, añade una ID automatica en firebase
    const productWithPicUrl = await handlePicUpload(product)
    try {
        await addDoc(collection(db, category), productWithPicUrl);
        return{saved:"product saved"}
    } 
    catch (err) {
        console.log("error al guardar producto " , err)
        return{err}
    }
}

const updateProduct = async (ID, updates ) => {
    const docRef = doc(db, "users", ID);
    await updateDoc(docRef, updates); //no usado, analizarlo
}

const handlePicUpload= async (product)=>{
    if(!product.picFile) return product
    const uploadPic = await uploadPicture(product.picFile)
    const picUrl = await getImageURL(product.picFile)
    //si paso algo raro le pongo el link a una imágen por defecto, (manejar estos errores luego)
    if(uploadPic.err || picUrl.err) product.picUrl = "https://firebasestorage.googleapis.com/v0/b/delivery-ecomerce-template.appspot.com/o/defaultProduct.jpg?alt=media&token=d2aa4b6f-3ff0-497c-b4de-30d3194d2319"
    else product.picUrl = picUrl
    delete product.picFile
    return product
}

const uploadPicture = async (file) =>{
    try {
        const storageRef = ref(storage, '/'+ file.name)
        const uploadTask = await uploadBytesResumable(storageRef, file)
        return{ok:"all right"}
    } catch (err) {
        console.log("error al subir imagen", err)
        return{err}
    }
}


const getImageURL = async (file)=>{
    const storageRef = ref(storage, '/'+ file.name)
    try {
        let ImageURL = await getDownloadURL(storageRef)
        return ImageURL
    } catch (err) {
        console.log("error al descargar imagen", err)
        return{err}
    }
}

const getCollection = async (Collection) => {
    const querySnapshot = await getDocs(collection( db, Collection ));
    let ArrayOfDocs = []
    querySnapshot.forEach((doc) => {
        let docSnapshot = doc.data()
        /*
        adding document ID and collection as a parameter, server will use it to validate buy orders.
        and ID is used in ADMIN for document updating.
        */
        docSnapshot["ID"] = doc.id
        docSnapshot["category"] = Collection
        ArrayOfDocs.push(docSnapshot) 
    });
    return ArrayOfDocs
}

const deleteProduct = async (category,ID) => {
    try {
        await deleteDoc(doc(db, category, ID));
        return{saved:"product deleted"}
    } 
    catch (err) {
        console.log("pal pingo a salido che ", err)
        return{error:"error has been ocurred "}
    }
}

export { addProduct, setProduct, uploadPicture, getImageURL, getProduct, getCollection, updateProduct, deleteProduct }  