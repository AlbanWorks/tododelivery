import {firestore} from '../../FirebaseAdminConfig'
import {db} from '../../firebaseConfig'


export default async function handler(req, res) {
    
    const getProduct = async (category, ID) => {
        const docRef = doc(firestore, category, ID);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return docSnap.data();
        }     
        else {
        // doc.data() will be undefined in this case
         return false
        }
    }

    if(req.method ==='POST'){
       //const datos = await getProduct("frutas","anana") 
      // console.log(datos)
       console.log(firestore)
        res.status(200).json(firestore)
    }

   

}