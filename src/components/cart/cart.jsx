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

    return(
        <div>
            {console.log("carrito contiene:",openCart)}
            <h1>Soy un cart</h1>
            {openCart ? (<h1>algo</h1>):(<h1>no hay nada</h1>)}
        </div>
    )
} 