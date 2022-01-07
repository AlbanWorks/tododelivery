import admin from 'firebase-admin'
import { getFirestore } from "firebase-admin/firestore"
import { initializeApp, cert } from "firebase-admin/app";

//debo proteger los parámetros debajo con variables de entorno, en especial privateKey
//abajo doy acceso a firebase desde el servidor
//1- inicializo la app, en realidad doy acceso desde el backend a firebase
// para evitar que se vuelva a inicializar debo comprobar cada vez que la uso, desconozco si hay
//una solucion mas elegante.

   
const admis = initializeApp({
        credential: cert({
            projectId: "delivery-ecomerce-template",
            clientEmail: "firebase-adminsdk-r0860@delivery-ecomerce-template.iam.gserviceaccount.com",
            privateKey: "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDfe2BBsFr6GToq\nMooptD3gL1uiXaPLeGozYTT4V6QnURTDk7mBu5zJ9DIdDTIOqWS2g9K98b38Gepm\nIIwh7Qldond9Q+Xcp/+fLWvfXNG2CaD2KW/b3ArjS2sNFe0e1fvHOXIkTXgZEACq\n8DwLB9tD+31T/H5zsN60dYPuwuZioGdtqsQU98DFD9qatVhCnaa5ydYFCB7hra2J\nTTVNL7IcPywHSErJW3r1iCSPGft1sNoWKVknt05alzC6Ui48enR6dteMMFph7gwj\nftRPJa5EdBYCMmmONs81jHFSx1K9MyHEaUMn7uVWOmDZiH1cYuV3jF1QfEppCf1K\nbsUeAicfAgMBAAECggEAAwEtaeZ0a4/vRAmGzR6D6R4kjCL00syZpkJNbDv/oowh\noceDVPi+UOYcQCZoJ+Hc66nu8ISYoYXzOtBGiu1WBq1cSQOGPEpW0pTRh5KVAeBt\nCrBuJwOuHVmHyHpd4Kcku6i+SFY4hZTZuB1KSkHl5QBP60TtG6JqPBmLCTb27t+c\nHKVqjC1OMTaZDkyeXvmjnWgUYbUMvR7rWKhcrmKzIK9LMX9r5daS7dMqL89bqXdF\nXaRVSoUoqQB2b3CPwF31+7sMoHT7eVPGHlbElGMKbK1PKEzrQtmuyZsor+QvKcay\nuZnML71GruYyjAr/30MFCYaJJ758vKIKufIIp7hfcQKBgQD0FqWGimIJOJW/CRXS\noJgdKKR73Rjigw4qOgqrM9jU1OR8nC96w9ki2L5gK9FSC70cUYD7NHZjEXdzccC2\nsc3vpVxbbtqfFZneAUgLqwiJ0OOH3Dox6Tt2rkS030rCduixI1Jhz3JYnZ9xlY5l\nJDYlvkth9wM9qj4m5zHlQWms/QKBgQDqY0u4p+AeHvBghZRZ6UxjK3r2VgFgzJyq\nXXwAKi1L/iTwJAam2bnnyF/gk+eEDLUhQXwQB9kkox/GF7nL+ypBEHYgtHdCy2rf\n2SCQlgUVCbDixvjtAoU7jTxaIuolj2sobGG1UVjJfYfa7BtOP7ph0SNHIcroU/kn\njKlMVnQtSwKBgFww5YoAYHDdJ2oFE3H/aBSzUhTaeFitaT83tunc5kvUsQwDrccv\ni6amuJj4U9IqTt4QRqgas5BNe5Fl6ITYeVDHYy/Bmd82OGxqjXyit9HdzOJ2oqBR\nWD1GKvspz0HNyauGDMqWoLipqBwtgZ/f4ne0/SHeOyIiV+E3t1fAsho9AoGAdcZt\nTx0z1Y7QVH/qun8rPg2kHNG8oYpPEqAk5eRLnIrYvr4rhX2UF66s1qkbRVQpU8uW\n7mszJmC9X4med6v+YHFIGkj0QGD8k/yDi4OGjDqxYlJ+1IFWt0TR1a0DoNn/C3Hi\navy0M5LbSBsp4VjOa8ZuBpkpXzKK2N+qVkx+1h8CgYEAlRUeRN6FPBJ7ODfYLfOZ\nLcpkhEKKm9fli2DKndXLGhNb23HwNLrIX/5RVhErA9iwuS2tZ8YTpkccGaPnTyTS\nErJZwmzinl12Vn98Nv5uiZBD1rWhouVZ3vT71RpbKxeOBAk5MSTvYLdy/CTM8xJc\nEJzQZeZrqMbGKPI6RJ5dCkw=\n-----END PRIVATE KEY-----\n",
        }),
    })
    
 //2- ahora  puedo solicitar los distintos servicios, necesito firestore

const firestore =   getFirestore(admis);

export {firestore}