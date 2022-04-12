import React from "react";
// import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { getProductName } from "../../redux/actions/index";

export const Navbar = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  //Handle del Input y Search
  function handleInputChange(e) {
    e.preventDefault();
    setName(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(getProductName(name));
    setName("");
  }

  return (
    <div>
      <nav>
        <div>
          <img src="" alt="logo-petshop" />
        </div>
        <div>
          <input
            value={name}
            onChange={(e) => handleInputChange(e)}
            type="text"
            placeholder="¿Qué vas a llevar hoy?"
          />
          <button onClick={(e) => handleSubmit(e)} type="submit">
            Buscar
          </button>
          <div>
            <span>Loggin</span>
            <span>Carrito</span>
          </div>
        </div>
      </nav>
    </div>
  );
};
