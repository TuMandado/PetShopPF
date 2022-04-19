import {firebase, db} from '../credenciales'
import { doc, setDoc, Timestamp, deleteDoc, getDoc, getDocs, collection, updateDoc } from "firebase/firestore";

import {mercadopago} from 'mercadopago'
// const {REACT_APP_ACCESS_TOKEN} = process.env;
const REACT_APP_ACCESS_TOKEN = "TEST-5909391637745101-041518-e07a43a5f92224ee501bc4d9feca4624-191706246";


console.log(REACT_APP_ACCESS_TOKEN)
mercadopago.configure({
    access_token: REACT_APP_ACCESS_TOKEN
})
export const mercadoPago=(title,quantity,unit_price)=>{

    const id_orden=1

        const carrito =[
            { title: 'prod1', quantity:2, price:10.5},
            { title: 'prod2', quantity:5, price:10.5},
            { title: 'prod3', quantity:3, price:10.5},
         ]
    
       
        const items = carrito.map(i=>{ // mapeo elementos del carrito
            title=i.title
            unit_price=i.price
            quantity=i.quantity
    
        })
    
        // objeto de preferencia
    
        let preference ={
            item:items, // item para vender
            external_reference:  `${id_orden}`,// id orden compra
            parament_methods:{  // metodos de pago
                excludeds_payment_types:[ // excluimos el pago por cajero automatico
                    {
                        id:'atm'
                    }
                ],
                installments:3, // cant maxima de cuotas
            },
            back_Urls: {
                        success: 'http://localhost:3001/mercadopago/pagos',
                        failure: 'http://localhost:3001/mercadopago/pagos',
                        pending: 'http://localhost:3001/mercadopago/pagos',
            },
        }
    
        mercadopago.preferences.create(preference)
            .then(function(response){
                    console.info('respondio')
                    //Este valor reemplazará el string"<%= global.id %>" en tu HTML
                    global.id = response.body.id;
                    console.log("response.body    :",response.body)
                    global.init_point = response.body.sandbox_init_point;
                    //console.log(response.body);
                    // res.json({ id: global.id }); // responde con id del boton p/ pagar
                    console.log(global.id)
            })
            .catch(function(error){
                console.log(error);
            })
        
        
}
