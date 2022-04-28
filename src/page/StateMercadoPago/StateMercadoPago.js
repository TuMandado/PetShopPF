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

