import { ArrowLeftOutlined, ArrowRightOutlined } from "@material-ui/icons";
import { useState } from "react";
import styled from "styled-components";
import { sliderItems } from "../../data";
import { Link } from "react-router-dom";

const Slider = () => {
  const [slideIndex, setSlideIndex] = useState(0);
  const handleClick = (direction) => {
    if (direction === "left") {
      setSlideIndex(slideIndex > 0 ? slideIndex - 1 : 2);
    } else {
      setSlideIndex(slideIndex < 2 ? slideIndex + 1 : 0);
    }
  };

  return (
    <Div>
      {/* <Title> ¿ ?</Title> */}
      <Container>
        <Arrow direction="left" onClick={() => handleClick("left")}>
          <ArrowLeftOutlined />
        </Arrow>
        <Wrapper slideIndex={slideIndex}>
          {sliderItems.map((item) => (
            <Slide bg={item.bg} key={item.id}>
              <ImgContainer>
                <Image src={item.img} />
              </ImgContainer>
              <InfoContainer>
                <Title>{item.title}</Title>
                <Desc>{item.desc}</Desc>
                <Link
                  to={
                    slideIndex === 1 || slideIndex === 2
                      ? "/createdPet"
                      : "/pets"
                  }
                >
                  <Button>
                    {item.id === 1 || item.id === 2
                      ? "Publicar mascota"
                      : "Ver mascotas"}
                  </Button>
                </Link>
              </InfoContainer>
            </Slide>
          ))}
        </Wrapper>
        <Arrow direction="right" onClick={() => handleClick("right")}>
          <ArrowRightOutlined />
        </Arrow>
      </Container>
    </Div>
  );
};

export default Slider;

const Div = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  @media (max-width: 320px) {
    display: none;
  }
  // @media (min-width: 390px) {
  //   display: none;

  //}
`;

const Container = styled.div`
  width: 100%;
  height: 70vh;
  display: flex;
  position: relative;
  overflow: hidden;
  // @media (min-width: 320px) {
  //   display: none;
  //   padding-top: 10px;
  // }
  // @media (min-width: 390px) {
  //   display: none;
  // }
`;

const Arrow = styled.div`
  width: 50px;
  height: 50px;
  background: #29d9c2;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  bottom: 0;
  left: ${(props) => props.direction === "left" && "10px"};
  right: ${(props) => props.direction === "right" && "10px"};
  margin: auto;
  cursor: pointer;
  opacity: 0.5;
  z-index: 2;
`;

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  transition: all 1.5s ease;
  transform: translateX(${(props) => props.slideIndex * -100}vw);
`;

const Slide = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
  background-color: #${(props) => props.bg};
`;

const ImgContainer = styled.div`
  width: 100%;
  flex: 2;
  align-self: stretch;
`;

const Image = styled.img`
  height: 70%;
  width: 100%;
  margin-left: 5px;
  border-radius: 12px;
`;
const InfoContainer = styled.div`
  flex: 1;
  padding: 50px;
  margin-bottom: 16%;
`;
const Title = styled.h1`
  font-family: "Poppins";
  font-style: normal;
  font-weight: 600;
  font-size: 40px;
  margin: 6px;
`;

const Desc = styled.p`
  margin: 50px 6px;
  font-family: "Poppins";
  font-style: normal;
  font-weight: 500;
  font-size: 19px;
  line-height: 25px;
  letter-spacing: 1.5px;
`;

const Button = styled.button`
  padding: 10px;
  font-size: 20px;
  background: #0acf83;
  cursor: pointer;
  border-radius: 12px;
  font-family: "Poppins";
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 22px;
  color: #ffffff;
  border: 2px solid #067a4d;
  &:hover {
    color: #0acf83;
    background: #f9f9f9;
  }
  // position: absolute;
  // width: 156px;
  // height: 64px;
  // left: 375px;
  // top: 448px;
`;

// <video  ref={vidRef} muted autoPlay loop src={videoLanding} />;
