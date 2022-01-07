import {firestore} from '../../FirebaseAdminConfig'
import {db} from '../../firebaseConfig'
import { collection, get, doc, getDoc, setDoc, updateDoc } from "firebase-admin/firestore"


export default async function handler(req, res) {
    
    const getProduct = async () => {
        const docRef = firestore.doc('frutas/anana');
        const docSnap = await docRef.get();
        if (docSnap.exists) {
            return docSnap.data();
        }     
        else {
        // doc.data() will be undefined in this case
         return "no existe"
        }
    }

    if(req.method ==='POST'){
       //const datos = await getProduct("frutas","anana") 
      // console.log(datos)
        const deira = await getProduct()
        res.status(200).json(deira)
    }

   

}