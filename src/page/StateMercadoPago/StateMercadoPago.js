import React,{useEffect, useState} from "react";
import {editCartFirebase} from '../../firebase/Cart/index'
import {cartLoginFront, openCartFront} from '../../redux/actions/cartActions'
import { useDispatch, useSelector} from "react-redux";

const StateMercadoPago =()=>{
    const dispatch = useDispatch();
    const querystring = window.location.search
    let info = querystring.slice(1)
    let arrayinfo= info.split('&')
    let infospliteada=[]
    let status
   const user = useSelector((state) => state.clientReducer.user)
    const idcarrito = useSelector((state)=> state.cartReducer.openCart)
    const estado = useSelector((state)=> state)
    console.log('este es el estado', estado)

    
    
    console.log('user',user,idcarrito)
    console.log('arrayinfo',arrayinfo)
    let infoMercadoPago ={}
    arrayinfo.map(i=>{
        
        infospliteada=i.split('=')
        infoMercadoPago={
            ...infoMercadoPago,
            [infospliteada[0]]:infospliteada[1]
        }
    }) 
    console.log('mercadopago',infoMercadoPago.status)
    useEffect(()=>{
       
        

            if  (infoMercadoPago.status=== 'approved'){
                // llamo a la funcion guardar carrito en bd 
                // poner en estado aproved
                status= {
                    close:true,
                    status:'approved'
                }
               
                editCartFirebase(infoMercadoPago.external_reference, status)
        
            }else if(infoMercadoPago.status === 'rejected'){ // "status=rejected"
                // llamo a la funcion de guardar carrito 
                // status rejected
                // status_detail=> va el porque se rechazo
                status={
                        close:true,
                        status:'rejected',
                    }
                
                console.log('hola 2')
                editCartFirebase(infoMercadoPago.external_reference, status)
        
        
            }else if(infoMercadoPago.status === 'in_process'){
                // funcion carrito 
                // status pending
                status= {
                    close:true,
                    status:'in_process'
                }
                
                editCartFirebase(infoMercadoPago.external_reference, status)
        
            }
        
    },[])


return(
    <div>
    StateMercadoPago
    </div>
)
}
export default StateMercadoPago

//?collection_id=1247694445
//&
//collection_status=approved
//&payment_id=1247694445
//&status=approved
//&external_reference=1
//&payment_type=credit_card
//&merchant_order_id=4585814498
//&preference_id=191706246-707db8cb-ff92-463e-a12f-1d3cec2c639b
//&site_id=MLA
//&processing_mode=aggregator
//&merchant_account_id=null

// collection_id=1247781387
//&collection_status=in_process
//&payment_id=1247781387
//&status=in_process
//&external_reference=acuupr14rd6wffy97nf6v//
//&payment_type=credit_card
//&merchant_order_id=4620911549//
//&preference_id=191706246-ecfb65e7-f878-4794-9f4e-c34e8020cdd6
//&site_id=MLA&processing_mode=aggregator&merchant_account_id=null


//collection_id=1247781476
//&collection_status=rejected
//&payment_id=1247781476
//&status=rejected
//&external_reference=acuupr14rd6wffy97nf6v
//&payment_type=credit_card
//&merchant_order_id=4620979352
//&preference_id=191706246-bf7d2b8f-95a0-40c4-8cf7-ebb67bd8534c
//&site_id=MLA
//&processing_mode=aggregator
//&merchant_account_id=null