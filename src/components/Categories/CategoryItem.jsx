import { Link } from "react-router-dom";
import styled from "styled-components";


const onClickButton = (e) => {
    window.scrollTo(0, 0)
}
// categorias: Perro - Gato - Peces - Aves
const CategoryItem = ({ item }) => {
    return (
        <Container>
            <Image src={item.img} />
            <Info>
                <Title>{item.title}</Title>
                {
                    item.id === 1 ?
                        <Link to='/products'>
                           <Button onClick={onClickButton}>Tienda</Button>
                        </Link>
                        : item.id === 2 ? 
                        <Link to='/products'>
                           <Button onClick={onClickButton}>Tienda</Button>
                        </Link> 
                        : item.id === 3 ?
                        <Link to='/products'>
                          <Button onClick={onClickButton}>Tienda</Button>
                        </Link> 
                        : 
                        <Link to='/products'>
                           <Button onClick={onClickButton}>Tienda</Button>
                        </Link> 
                }
            </Info>
        </Container>
    );
};

export default CategoryItem;

const Container = styled.div`
  flex: 1;
  margin: 3px;
  height: 70vh;
  position: relative;
  border-radius: 10px;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;

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

const Title = styled.h1`
    color:#f7dbd3;
    margin-bottom: 20px;
    
`;

const Button = styled.button`
padding: 10px;
font-size: 20px;
background: #0ACF83;
cursor: pointer;
border-radius: 12px;
`;