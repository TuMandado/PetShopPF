import React from "react";
import styled from "styled-components";

const MainPet = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  position: static;
  left: 0%;
  top: 0%;
  bottom: 0%;
`;

const Image = styled.img`
  width: 210px;
  height: 210px;
  border-radius: 8px;
  box-shadow: 5px 2px 18px -3px rgba(110, 110, 110, 0.11);
  position: relative;
  margin-top: 8px;
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
`;

const Description = styled.p`
  position: static;
  width: 220px;
  height: 80px;
  overflow: hidden;
  left: 0px;
  margin-top: 3px;
  top: 12px;
  font-family: "Poppins";
  font-style: normal;
  font-weight: 500;
  font-size: 13px;
  line-height: 20px;
  color: #151515;
`;

const Ubicacion = styled.p`
  font-family: "Poppins";
  font-style: normal;
  font-weight: 500;
  font-size: 13px;
  line-height: 20px;
  color: #eb8d70;
  margin: 5px;
`;

//A los Pets les falta el Titulo. Por ejm: "Gato negro perdido en el puerto" para mostrar previo a la descripcion. (para revisar con los chicos)

const Pet = ({
  state,
  owner,
  category,
  sexo,
  description,
  ubicacion,
  photos,
}) => {
  return (
    <MainPet>
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
        <Description>{description}</Description>
      </div>
      <div>
        <Ubicacion>Aqui va la ubicacion </Ubicacion>
      </div>
    </MainPet>
  );
};
export default Pet;
