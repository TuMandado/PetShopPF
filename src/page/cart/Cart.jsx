import React from "react";
import NavbarCart from "../../components/navbar/Navbar Cart";
import { Cart as Carrito } from "../../components/cart/cart";

const Cart = () => {
  return (
    <div>
      <NavbarCart />
      <Carrito />
    </div>
  );
};

export default Cart;
