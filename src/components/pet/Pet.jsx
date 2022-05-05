import React from "react";
import styled from "styled-components";

const NombreSpan = styled.span`
  display: inline-block;
  &::after {
    content: "";
    width: 0px;
    height: 1px;
    display: block;
    background: black;
    transition: color 0.2s ease;
    transition: width 0.3s;
  }
`;

const ContainerPets = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  padding: 16px;
  width: 288px;
  height: 520px;
  border: 1px solid #d1d1d1;
  box-sizing: border-box;
  border-radius: 12px;
  margin: 0px 32px;
  margin-bottom: 4em;
  &:hover {
    padding: 15px;
    cursor: pointer;
    border: 2px solid #0acf83;
  }
  &:hover ${NombreSpan} {
    transition: color 0.2s ease;
    color: #0acf83;
    &::after {
      background: #0acf83;
      width: 100%;
    }
  }
`;

const Image = styled.img`
  object-fit: cover;
  width: 250px;
  height: 230px;
  border-radius: 8px;
  align-items: center;
  margin-top: 8px;
  position: relative;
`;

const State = styled.h4`
  position: static;
  left: 20%;
  right: 20%;
  top: 0%;
  bottom: 0%;
  font-family: "Poppins";
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  line-height: 18px;
  color: #0acf83;
  background: #f4f8ec;
  border-radius: 10px;
  margin: 2px;
`;

const Category = styled.h4`
  font-family: "Poppins";
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  line-height: 18px;
  color: #151515;
  background: #f5f5f5;
  border-radius: 10px;
  margin: 2px;
`;

const Sexo = styled.h4`
  font-family: "Poppins";
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  line-height: 18px;
  color: #eb8d70;
  background: #f5f5f5;
  border-radius: 10px;
  margin: 2px;
`;

const TagContainer = styled.div`
  display: flex;
  margin-bottom: 2px;
  margin-top: 8px;
`;

const Description = styled.p`
  overflow: hidden;
  max-height: 120px;
  max-width: 216px;
  margin-top: 4px;
  top: 11px;
  font-family: "Open Sans";
  font-style: normal;
  font-weight: 500;
  font-size: 13px;
  line-height: 16px;
  position: static;
  margin-bottom: 6px;
  margin-top: 9px;
  line-height: 20px;
  color: #151515;
`;

const Nombre = styled.h3`
  font-family: "Poppins";
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: 20px;
  color: #575757;
  margin: 2px;
`;

const Ubicacion = styled.p`
  font-family: "Poppins";
  font-style: normal;
  font-weight: 500;
  font-size: 13px;
  line-height: 20px;
  color: #eb8d70;
`;

//A los Pets les falta el Titulo. Por ejm: "Gato negro perdido en el puerto" para mostrar previo a la descripcion. (para revisar con los chicos)

const Pet = ({ state, name, category, sexo, description, city, photos }) => {
  return (
    <ContainerPets>
      <div>
        <Image src={photos} alt="Photo not found" />
      </div>
      <TagContainer>
        <div>
          <State>
            {state === "encontrado"
              ? "Encontrado"
              : state === "perdido"
              ? "Perdido"
              : state === "en adopcion"
              ? "En Adopcion"
              : state}
          </State>
        </div>
        <div>
          <Category>
            {category === "gato"
              ? "Gato"
              : category === "perro"
              ? "Perro"
              : category}
          </Category>
        </div>
        <div>
          <Sexo>{sexo === "male" ? "Macho" : "Hembra"}</Sexo>
        </div>
      </TagContainer>
      <div>
        <Nombre>
          Me llamo: <NombreSpan>{name} </NombreSpan>{" "}
        </Nombre>
      </div>
      <div>
        <Description>{description}</Description>
      </div>
      <div>
        <Ubicacion>Ciudad: {city} </Ubicacion>
      </div>
    </ContainerPets>
  );
};
export default Pet;
