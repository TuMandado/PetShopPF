import React from 'react'
import styled from "styled-components";


const Container = styled.div`
  height: 3em;
  background: #29d9c2;
  color: #FFFFFF;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Poppins';
    font-style: normal;
    font-weight: 600;
    font-size: 15px;
    line-height: 48px;
  padding-right: 20px;
  width: cover;
`;

const Announcement = () => {
  return <Container> Colabora con adopciones, mascotas perdidas o encontradas y obtene beneficios en nustra tienda  </Container>;
};

export default Announcement;