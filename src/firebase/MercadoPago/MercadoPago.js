import mercadopago from "mercadopago";
import React, { useEffect } from "react";
import axios from "axios";

const REACT_APP_ACCESS_TOKEN ="TEST-5909391637745101-041518-e07a43a5f92224ee501bc4d9feca4624-191706246";

// pasarela de pago
export const MercadoPagoConfiguration = async (carrito, id_order,user) => {
    await mercadopago.configure({
        access_token: REACT_APP_ACCESS_TOKEN
    })
    
    console.log(user)
    
    const items = carrito.map(i=>{ // mapeo elementos del carrito
      let price= i.price.slice(1)
      let price1= price.split('.')
      let price2=price1.join('')
      let pricefinally=price2.split(',')

       console.log('price',pricefinally)
        return {
            title: i.title,
            unit_price:Number(pricefinally[0]),
            quantity: i.quantity
        }
    })
    console.log('item',items,'id_order',id_order[0].uid)
    let preference ={
        items:items, // item para vender
        external_reference:  `${id_order[0].uid}`,// id orden compra
        parament_methods:{  // metodos de pago
            excludeds_payment_types:[ // excluimos el pago por cajero automatico
                {
                    id:'atm'
                }
            ],
            installments:3, // cant maxima de cuotas
        },
        back_Urls: {
                    success:'http://localhost:3000/StateMercadoPago',
                    failure:'http://localhost:3000/StateMercadoPago',
                    pending:'http://localhost:3000/StateMercadoPago',
        },
        
        payer:{
          name:user.name,
          email:user.email
        },
        statement_description:'petshop',
        capture:true,
        redirect:'http://localhost:3000/',
        binary_mode:true
        
        

    }
    axios({ /// anterior
      method: 'POST',
      url: 'https://api.mercadopago.com/checkout/preferences',
      data: preference,
      headers: {
          'cache-control': 'no-cache',
          'content-type': 'application/json',
          Authorization: `Bearer ${REACT_APP_ACCESS_TOKEN}`,
      },
  })
  .then((response) => {
      console.log('esta es la respuesta de mp', response)
      window.location.replace(response.data.sandbox_init_point)
  })
}



// consulta para el pago total  ( ultimos 12 meses)
export const MercadoPagoTotalPayments=()=>{ 
    
    axios({ 
        method: 'GET',
        url: 'https://api.mercadopago.com/V1/payments/search',
        headers: {
            'cache-control': 'no-cache',
            'content-type': 'application/json',
            Authorization: `Bearer ${REACT_APP_ACCESS_TOKEN}`,
        },
    })
    .then((response) => {
        console.log('esta es la respuesta de mp', response)
        response.results.map((r)=>{

            let date={
                id_car:r.external_reference,
                items:[r.additional_info.title,r.additional_info.quantity,r.additional_info.unit_price],
                status:r.status,
                clientdata:[r.collector.first_name,r.collector.last_name,r.collector.email],
                dateCreate:r.date_created
            }
            return date
        })
        
    })
    .catch((error)=>{
        console.log(error)
    })

}
//busqueda de pagos de un cliente en particular

export const MercadoPagoIdPayments=(id_order)=>{ 
    
    axios({ 
        method: 'GET',
        url: `https://api.mercadopago.com/V1/payments/${id_order}`,
        headers: {
            'cache-control': 'no-cache',
            'content-type': 'application/json',
            Authorization: `Bearer ${REACT_APP_ACCESS_TOKEN}`,
        },
    })
    .then((response) => {
        console.log('esta es la respuesta de mp', response)
        // response.results.map((r)=>{

        //     let date={
        //         id_car:r.external_reference,
        //         items:[r.additional_info.title,r.additional_info.quantity,r.additional_info.unit_price],
        //         status:r.status,
        //         clientdata:[r.collector.first_name,r.collector.last_name,r.collector.email],
        //         dateCreate:r.date_created
        //     }
        //     return date
        // })
        
    })
    .catch((error)=>{
        console.log(error)
    })

}




