import React from "react";
import styled from "styled-components";

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
  transition: 0.25s ease;
  &:hover {
    transition: 0.5s ease;
    width: 290px;
    cursor: pointer;
    margin: 0px 10px;
    border: 1px solid #0acf83;
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
  &:hover {
    color: #0acf83;
  }
`;

const Ubicacion = styled.p`
  font-family: "Poppins";
  font-style: normal;
  font-weight: 500;
  font-size: 13px;
  line-height: 20px;
  color: #eb8d70;
  margin: 3px;
  padding-: 13px;
  padding-button: 12px;
`;

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 12px;
  background: #0acf83;
  border: 2px solid #067a4d;
  box-sizing: border-box;
  border-radius: 12px;
  font-family: "Poppins";
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  line-height: 22px;
  color: #ffffff;
  height: 31px;
  width: 120px;
  position: absolute;
  bottom: 6%;
  right: 5%;
`;

const ButtonContainer = styled.div`
  position: relative;
  margin-top: 34px;
`;
//A los Pets les falta el Titulo. Por ejm: "Gato negro perdido en el puerto" para mostrar previo a la descripcion. (para revisar con los chicos)

const Pet = ({
  state,
  owner,
  name,
  category,
  sexo,
  description,
  ubicacion,
  photos,
}) => {
  return (
    <ContainerPets>
      <div>
        <Image src={photos} alt="photo not found" />
      </div>
      <TagContainer>
        <div>
          <State>{state}</State>
        </div>
        <div>
          <Category>{category}</Category>
        </div>
        <div>
          <Sexo>{sexo}</Sexo>
        </div>
      </TagContainer>
      <div>
        <Nombre>Me llamo: {name}</Nombre>
      </div>
      <div>
        <Description>{description}</Description>
      </div>
      <div>
        <Ubicacion>Aqui va la ubicacion </Ubicacion>
      </div>
      <ButtonContainer>
        <Button>Ver detalles</Button>
      </ButtonContainer>
    </ContainerPets>
  );
};
export default Pet;
