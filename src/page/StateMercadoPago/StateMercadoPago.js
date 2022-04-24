import React from "react";
import {editCartFirebase} from '../../firebase/Cart/index'
import { useDispatch, useSelector } from "react-redux";

const StateMercadoPago =()=>{
    const dispatch = useDispatch();
    const querystring = window.location.search
    let info = querystring.slice(1)
    let arrayinfo= info.split('&')
    let infospliteada=[]
    let status
    const user = useSelector((state) => state.clientReducer.user);
    console.log('user',user)
    console.log('arrayinfo',arrayinfo)
    let infoMercadoPago ={}
    arrayinfo.map(i=>{
        
        infospliteada=i.split('=')
        infoMercadoPago={
            ...infoMercadoPago,
            [infospliteada[0]]:infospliteada[1]
        }
    }) 
    if (infoMercadoPago.status=== 'aproved'){
        // llamo a la funcion guardar carrito en bd 
        // poner en estado aproved
        status= {
            status:'aproved'
        }
        return dispatch(editCartFirebase(user.uid,status))

    }else if(infoMercadoPago.status === 'rejected'){
        // llamo a la funcion de guardar carrito 
        // status rejected
        // status_detail=> va el porque se rechazo
        status= {
            status:'rejected',
            cause:infoMercadoPago.status_detail // causa del rechazo
        }
        return dispatch(editCartFirebase(user.uid,status))

    }else if(infoMercadoPago.status === 'pending'){
        // funcion carrito 
        // status pending
        status={
            status:'pending'
        } 
        return dispatch(editCartFirebase(user.uid,status))
    }

return(
    <div>
        useparams
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