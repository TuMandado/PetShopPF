import React from "react";

// const splitObj=(arrayinfo)=>{
//     let infomp={}
//     let sep=[]
//     for (let i = 0; i < arrayinfo.length; i++) {
//         sep=arrayinfo.split('=')
        
//     }
       
// }

const StateMercadoPago =()=>{
    const querystring = window.location.search
    let info = querystring.slice(1)
    let arrayinfo= info.split('&')
    let infospliteada=[]
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
    }else if(infoMercadoPago === 'rejected'){
        // llamo a la funcion de guardar carrito 
        // status rejected
        // status_detail=> va el porque se rechazo
    }else if(infoMercadoPago === 'pending'){
        // funcion carrito 
        // status pending
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