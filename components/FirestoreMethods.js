import {db, storage} from '../firebaseConfig'
import { collection, getDocs, doc, getDoc, setDoc, updateDoc } from "firebase/firestore"
import {ref, uploadBytesResumable, getDownloadURL } from "@firebase/storage"

const setProduct = async (ID, product) => {
    try {
        await setDoc(doc(db, "products", ID), product);
    } catch (err) {
        console.log("error al guardar producto" , err)
    }
}

const uploadPicture = async (file) =>{
    try {
        const storageRef = ref(storage, '/'+ file.name)
        const uploadTask = await uploadBytesResumable(storageRef, file)
    } catch (err) {
        console.log("error al subir imagen", err)
    }
}

const getImageURL = async (file)=>{
    const storageRef = ref(storage, '/'+ file.name)
    try {
        let ImageURL = await getDownloadURL(storageRef)
        return ImageURL
    } catch (err) {
        console.log("error al descargar imagen", err)
    }
}
  
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

const updateProduct = async (ID, updates ) => {
    const docRef = doc(db, "users", ID);
    await updateDoc(docRef, updates); 
}

const getCollection = async (Collection) => {
    try{
        const querySnapshot = await getDocs(collection( db, Collection ));
    let ArrayOfDocs = []
    querySnapshot.forEach((doc) => {
        let docSnapshot = doc.data()
        //adding document id as parameter
        docSnapshot["ID"] = doc.id
        ArrayOfDocs.push(docSnapshot) 
    });
    return ArrayOfDocs
    }
    catch(err){
        console.log("cacha el error")
        return err
    }
}

export { setProduct, uploadPicture, getImageURL, getProduct, getCollection, updateProduct }  