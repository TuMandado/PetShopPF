import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import imgBackground from "../../assets/patrones_pet.png";

const About = () => {
  const navigate = useNavigate();
  const containerStyle = {
    backgroundImage: `url(${imgBackground})`,
  };

  const navigateToHome = (e) => {
    e.preventDefault();
    navigate(`/`);
  };
  //Hago el ejemplo conmigo. Luego le pido la info a c/u de ustedes.
  return (
    <div>
      <TitleContainer>
        <TextPetshop>PetShop Team</TextPetshop>
      </TitleContainer>
      <ContainerProfile style={containerStyle}>
        <InfoProfile>
          <Foto src="https://i.imgur.com/jfIhevT.jpg" alt="Francisco" />
          <Name>Francisco Molina</Name>
          <Position>Team: FrontEnd</Position>
          <Pet>Adopto a: Filo</Pet>
          <div>
            <span>
              <a href="https://www.linkedin.com/in/franciscomolina-dev/">
                <img
                  src="https://raw.githubusercontent.com/devicons/devicon/master/icons/linkedin/linkedin-original-wordmark.svg"
                  alt="linkedin"
                  width="90"
                  height="90"
                />
              </a>
            </span>
            {/* <span>
            //Si gustan, tambien el Github. 
            <a href="https://github.com/TheFranciscoMolina">
              <img
                src="https://raw.githubusercontent.com/devicons/devicon/master/icons/github/github-original-wordmark.svg"
                alt="github"
                width="45"
                height="45"
              />
            </a>
          </span> */}
          </div>
        </InfoProfile>
      </ContainerProfile>
      <BtnContainer>
        <BtnToHome onClick={(e) => navigateToHome(e)}>Ir a home</BtnToHome>
      </BtnContainer>
    </div>
  );
};

export default About;

const TitleContainer = styled.div`
  height: 60px;
  width: 100%;
  padding-top: 20px;
  text-align: center;
`;

const TextPetshop = styled.h1`
  font-size: 35px;
  font-family: "Poppins";
  font-style: normal;
  font-weight: 600;
  background: none;
  margin-right: 15px;
  &:hover {
    color: #0acf83;
  }
`;

const ContainerProfile = styled.div`
  display: block;
  position: relative;
  width: 380px;
  height: 520px;
  padding: 15px;
  margin: 15px 0px;
  border: 1px solid #d1d1d1;
  box-sizing: border-box;
  border-radius: 14px;
`;

const InfoProfile = styled.div`
  display: block;
  text-align: center;
  margin: auto;
`;

const Foto = styled.img`
  width: 260px;
  height: 260px;
  object-fit: cover;
  border: 2px solid #a9a9a9;
  border-radius: 200px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
  &:hover {
    border: 2px solid #067a4d;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
  }
`;

const Name = styled.h2`
  font-family: "Poppins";
  font-style: normal;
  font-weight: 600;
  font-size: 28px;
  margin: 0px auto;
  padding-top: 18px;
  color: #151515;
  flex-grow: 0;
  margin: 2px;
  &:hover {
    color: #0acf83;
  }
`;

const Position = styled.h4`
  font-family: "Poppins";
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  margin: 0px auto;
  padding-top: 15px;
  color: #151515;
`;
const Pet = styled.h4`
  font-family: "Poppins";
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  margin: 0px auto;
  padding-top: 15px;
  color: #151515;
`;

const BtnContainer = styled.div`
  height: 50px;
  width: 100%;
  text-align: center;
  padding-top: 10px;
  padding-bottom: 10px;
`;

const BtnToHome = styled.button`
  display: absolute;
  flex-direction: row;
  margin-top: 5px;
  position: relative;
  width: 105px;
  height: 35px;
  font-family: "Poppins";
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  color: #ffff;
  background: #0acf83;
  border: 2px solid #067a4d;
  box-sizing: border-box;
  border-radius: 8px;
  &:hover {
    color: #0acf83;
    background: #ffff;
    border: 3px solid #067a4d;
  }
`;
