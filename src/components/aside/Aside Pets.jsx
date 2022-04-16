import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import {
  filterOwner,
  filterState,
  filterCategory,
} from "../../redux/actions/index.js";

const AsideContainer = styled.aside`
  width: 250px;
  height: 100%;
  position: reñative;
  float: left;
  padding-left: 28px;
`;

export const AsidePets = () => {
  const dispatch = useDispatch();
  const petsObj = useSelector((state) => state.clientReducer.pets);
  console.log(petsObj);
  const allPets = { array: petsObj };

  //Filtrado por el Estado de la mascota:
  function handleFilterState(e) {
    e.preventDefault();
    const pets = {
      ...allPets,
      state: e.target.value,
    };
    console.log(pets);
    dispatch(filterState(pets));
  }

  return (
    <div>
      <AsideContainer>
        <h3>Filtrar por:</h3>
        <select defaultValue="all" onChange={(e) => handleFilterState(e)}>
          <option value="encontrado">Encontrados</option>
          <option value="perdido">Perdidos</option>
          <option value="en adopcion">En adopcion</option>
        </select>
      </AsideContainer>
    </div>
  );
};
