import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { filterAllPets, resetPetFilters } from "../../redux/actions/index.js";

const Container = styled.div`
  width: 16em;
  overflow-x: hidden;
  z-index: 1;
  padding-left: 1.6em;
  float: left;
  padding-left: 3em;
  margin-bottom: 3em;
`;

const H3 = styled.h3`
  font-family: "Poppins";
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 27px;
  color: #151515;
  margin: 16px 0px;
  margin-left: 40px;
`;

const H4 = styled.h3`
  font-family: "Poppins";
  font-style: normal;
  font-weight: 600;
  font-size: 15px;
  line-height: 25px;
  color: #151515;
  margin: 16px 0px;
  margin-left: 40px;
  margin-top: 90px;
`;

const BlockContainer = styled.div`
  padding-top: 1em;
  padding-bottom: 1em;
`;

const IndividualContainer = styled.div`
  margin-bottom: 0.5em;
`;

const Label = styled.label`
  font-family: "Poppins";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 19px;
  margin: 12px 0px;
  &:hover {
    cursor: pointer;
    color: #0acf83;
    font-weight: 600;
  }
`;

const Input = styled.input`
  margin-left: 15.5%;
  -webkit-appearance: none;
  appearance: none;
  font: inherit;
  color: currentColor;
  width: 1.15em;
  height: 1.15em;
  border: 1.5px solid #d1d1d1;
  border-radius: 1em;
  &:checked {
    background-color: #0acf83;
    border: 1.5px solid #067a4d;
    transition: 0.25s ease;
  }
`;
const FilterButton = styled.button`
  display: inline-block;
  padding: 12px 16px;
  background: #0acf83;
  border: 2px solid #067a4d;
  box-sizing: border-box;
  border-radius: 12px;
  font-family: "Poppins";
  font-style: normal;
  font-weight: 700;
  font-size: 15px;
  line-height: 22px;
  color: #ffffff;
  margin-left: 40px;
  margin-top: 2em;
  transition: 0.15s ease;
  &:hover {
    transition: 0.15s ease;
    color: #0acf83;
    background: none;
    cursor: pointer;
  }
`;

const ResetButton = styled.button`
  background: none;
  border: none;
  display: inline-block;
  padding: 6px 12px;
  font-family: "Poppins";
  font-style: normal;
  font-weight: 700;
  font-size: 15px;
  line-height: 22px;
  color: #a9a9a9;
  &:hover {
    transition: 0.15s ease;
    color: #0acf83;
    cursor: pointer;
    text-decoration: underline;
  }
`;

const BtnToPets = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 35px;
  width: 150px;
  border-radius: 12px;
  margin: 5px 0px;
  margin-left: 38px;
  font-family: "Poppins";
  font-style: normal;
  font-weight: 600;
  font-size: 15px;
  line-height: 22px;
  background: #edeeee;
  border: 1px solid #edeeee;
  box-sizing: border-box;
  position: absolute;
  cursor: pointer;
  transition: 0.2s ease;
  &:hover {
    color: #0acf83;
  }
`;

export const AsidePets = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const allPets = useSelector((state) => state.clientReducer.backupPets);
  const user = useSelector((state) => state.clientReducer.user);
  const allPetsSpecies = useSelector(
    (state) => state.clientReducer.petsSpecies
  );
  const [filters, setFilters] = useState({
    animal: "",
    gender: "",
    state: "",
    owner: "",
  });
  //Filtrado por el Estado de la mascota:
  const handleFiltersChanges = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const navigateToFormPets = (e) => {
    e.preventDefault();
    if (!user) {
      return Swal.fire({
        title: "¡Logueate!",
        text: " Debes estar logeado o registrado para publicar. ¿Deseas continuar?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#0acf83",
        cancelButtonColor: "#e6704b",
        confirmButtonText: "Ir al login!",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate(`/login`);
        }
      });
    } else navigate(`/createdPet`);
  };

  const onSubmitFilters = (e) => {
    e.preventDefault();
    dispatch(resetPetFilters());
    dispatch(
      filterAllPets(
        allPets,
        filters.animal,
        filters.gender,
        filters.state,
        filters.owner
      )
    );
  };

  const resetFilters = (e) => {
    setFilters({
      animal: "",
      gender: "",
      state: "",
      owner: "",
    });
    dispatch(resetPetFilters());
  };

  const handleUncheck = (e) => {
    if (filters[e.target.name] === e.target.value)
      setFilters({ ...filters, [e.target.name]: "" });
  };

  return (
    <Container>
      <H3> Estado </H3>
      <BlockContainer onChange={(e) => handleFiltersChanges(e)}>
        <IndividualContainer>
          <Input
            checked={filters.state === "encontrado"}
            type="radio"
            name="state"
            value="encontrado"
            id="encontrado"
            onClick={(e) => handleUncheck(e)}
          />
          <Label for="encontrado" onClick={(e) => handleUncheck(e)}>
            {" "}
            Encontrado{" "}
          </Label>
        </IndividualContainer>
        <IndividualContainer>
          <Input
            checked={filters.state === "perdido"}
            type="radio"
            name="state"
            value="perdido"
            id="perdido"
            onClick={(e) => handleUncheck(e)}
          />
          <Label for="perdido" onClick={(e) => handleUncheck(e)}>
            {" "}
            Perdido{" "}
          </Label>
        </IndividualContainer>
        <IndividualContainer>
          <Input
            checked={filters.state === "en adopcion"}
            type="radio"
            name="state"
            value="en adopcion"
            id="adopcion"
            onClick={(e) => handleUncheck(e)}
          />
          <Label for="adopcion" onClick={(e) => handleUncheck(e)}>
            {" "}
            En Adopcion{" "}
          </Label>
        </IndividualContainer>
      </BlockContainer>
      <H3> Animal </H3>
      <BlockContainer onChange={(e) => handleFiltersChanges(e)}>
        {allPetsSpecies.map((el) => (
          <IndividualContainer>
            <Input
              checked={filters.animal === el}
              type="radio"
              name="animal"
              value={el}
              id={el}
              onClick={(e) => handleUncheck(e)}
            />
            <Label for={el} onClick={(e) => handleUncheck(e)}>
              {" "}
              {el}{" "}
            </Label>
          </IndividualContainer>
        ))}
      </BlockContainer>
      <H3> Género </H3>
      <BlockContainer onChange={(e) => handleFiltersChanges(e)}>
        <IndividualContainer>
          <Input
            checked={filters.gender === "male"}
            type="radio"
            name="gender"
            value="male"
            id="macho"
            onClick={(e) => handleUncheck(e)}
          />
          <Label for="macho" onClick={(e) => handleUncheck(e)}>
            {" "}
            Macho{" "}
          </Label>
        </IndividualContainer>
        <IndividualContainer>
          <Input
            checked={filters.gender === "female"}
            type="radio"
            name="gender"
            value="female"
            id="hembra"
            onClick={(e) => handleUncheck(e)}
          />
          <Label for="hembra" onClick={(e) => handleUncheck(e)}>
            {" "}
            Hembra{" "}
          </Label>
        </IndividualContainer>
      </BlockContainer>
      <div>
        <FilterButton onClick={(e) => onSubmitFilters(e)}>Filtrar</FilterButton>
        <ResetButton onClick={(e) => resetFilters(e)}>Reiniciar</ResetButton>
      </div>
      <H4>¿Querés poblicar una mascota?</H4>
      <BtnToPets onClick={(e) => navigateToFormPets(e)}>
        Ir al formulario {">"}
      </BtnToPets>
    </Container>
  );
};
