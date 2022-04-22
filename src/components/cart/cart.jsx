import React, { useEffect } from "react";
import axios from 'axios'
import { useDispatch, useSelector } from "react-redux";
import { openCartFront } from "../../redux/actions/cartActions";
import mercadopago from 'mercadopago'
// import { useQuery } from 'react-query'

const REACT_APP_ACCESS_TOKEN = 'TEST-5909391637745101-041518-e07a43a5f92224ee501bc4d9feca4624-191706246'
// Get the current url
const url = window.location.href.split("//")[1].split("/")[0].replace (/^/,'https://');

export function Cart (){
const user = useSelector((state)=> state.clientReducer.user)
const openCart = useSelector((state)=> state.cartReducer.openCart)
const dispatch = useDispatch()

 
    useEffect(()=>{
        dispatch(openCartFront(user));
    },[dispatch])

    const MercadoPagoConfiguration = async () => {
        await mercadopago.configure({
            access_token: REACT_APP_ACCESS_TOKEN
        })
        const id_orden=1
        const carrito =[
            { title: 'prod1', quantity:2, price:10.5},
            { title: 'prod2', quantity:5, price:10.5},
            { title: 'prod3', quantity:3, price:10.5},
        ]
        const items = carrito.map(i=>{ // mapeo elementos del carrito
            return {
                title: i.title,
                unit_price: i.price,
                quantity: i.quantity
            }
        })
        let preference ={
            items:items, // item para vender
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
                        success:'http://localhost:3000/StateMercadoPago',
                        failure:'http://localhost:3000/StateMercadoPago',
                        pending:'http://localhost:3000/StateMercadoPago',
            },
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

    const handleSubmit = () => {
        MercadoPagoConfiguration()
    }

let items = []

if(openCart){
    if(user && openCart[0]){
        console.log(openCart)
        items = openCart[0].data.items
    }else{
        items = openCart.items
    }
}

    return(
        <div>
            {console.log("carrito contiene:",items)}
            <h1>Soy un cart</h1>
            {items && items.length ? items.map((el)=>{
                return (
                    <div>
                        {console.log(el)}
                        <h1>Producto :{el.title}</h1>
                        <h2>Precio:{el.price} </h2>
                        <h3>Cantidad:{el.cantidad}</h3>
                    </div>
                )
            }) :(<h1>no hay nada</h1>)}
            <button onClick={handleSubmit}>MP</button>
        </div>
    )
} 



