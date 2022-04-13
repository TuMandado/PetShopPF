import React from 'react'
import styled from "styled-components";


const Container = styled.div`
  height: 30px;
  background-color: #92C064;
  color: #067A4D;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 500;
  padding-right: 20px;
  width: cover;
`;

const Announcement = () => {
  return <Container> Colabora con adopciones, mascotas perdidas o encontradas y obtene beneficios en nustra tienda  </Container>;
};

export default Announcement;