import React, { useState } from "react";
import { signInUsuario, registrarUsuario } from "../../firebase/auth";
import styled from "styled-components";

const Login = () => {
  const [isRegistrando, setIsRegistrando] = useState(false);

  const submitHandler = (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    const role = "Cliente";

    if (isRegistrando) {
      registrarUsuario(email, password, role);
    } else {
      signInUsuario(email, password);
    }
  };

  return (
    <div>
      <div>
        <h1>{isRegistrando ? "Registrarse" : "Iniciar sesion"}</h1>
        <form onSubmit={submitHandler}>
          <label>
            Email:
            <input type="email" id="email" />
          </label>

          <label>
            Password:
            <input type="password" id="password" />
          </label>

          <input
            type="submit"
            value={isRegistrando ? "Registrar" : "Iniciar sesion"}
          />
        </form>

        <button onClick={() => setIsRegistrando(!isRegistrando)}>
          {isRegistrando ? "Ya tengo un cuenta" : "Quiero registrarme"}
        </button>
      </div>
    </div>
  );
};

export default Login;
