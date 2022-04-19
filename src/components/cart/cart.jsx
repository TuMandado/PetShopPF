import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { openCartFront } from "../../redux/actions/cartActions";

export function Cart (){
const user = useSelector((state)=> state.clientReducer.user)
const openCart = useSelector((state)=> state.cartReducer.openCart)
const dispatch = useDispatch()


useEffect(()=>{
    dispatch(openCartFront(user));
},[dispatch])

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
            {console.log("ahora que paso?",openCart)}
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
        </div>
    )
} 