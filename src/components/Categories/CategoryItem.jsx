import { Link } from "react-router-dom";
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';
import { homeFilter } from "../sidebar/Sidebar";


const onClickButton = (e) => {
    window.scrollTo(0, 0)
}
// categorias: Perro - Gato - Peces - Aves
const CategoryItem = ({ item }) => {
    const navigate = useNavigate();

    const goToStore = (animal) => {
        homeFilter(animal)
        navigate('/products')
        window.scrollTo(0, 0)
    }


    return (
        <Container onClick={e => goToStore(item.title)}>
            <Image src={item.img} />
            <Info>
                <Title> Ir a la Tienda </Title>
            </Info>
        </Container>
    );
};

export default CategoryItem;

const Title = styled.h1`
    font-family: 'Poppins';
    font-style: normal;
    font-size: 32px;
    line-height: 48px;
    opacity: 0;
    transition: opacity 0.5s ease;
    color: white;
`;
const Image = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 12px;
    transition: 0.3s ease;
`;

const Container = styled.div`
    flex: 1;
    margin: 3px;
    height: 70vh;
    position: relative;
    &:hover {
        cursor: pointer;
    }
    &:hover ${Image} {
        transition: 0.3s ease;
      filter: blur(6px);
    }
    &:hover ${Title} {
        opacity: 1
    }
`;


const Info = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`;


// const Button = styled.button`
// padding: 10px;
// font-size: 20px;
// background: #29d9c2;
// cursor: pointer;
// border: none;
// border-radius: 12px;
// font-family: 'Poppins';
//   font-style: normal;
//   font-size: 20px;
//   line-height: 22px;
// &:hover {
//     color: white;
// }
// `;