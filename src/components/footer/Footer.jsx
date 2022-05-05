import {
  Facebook,
  Instagram,
  MailOutline,
  Pinterest,
  Twitter,
} from "@material-ui/icons";
// import WhatsAppIcon from '@mui/icons-material/WhatsApp'
import styled from "styled-components";
import { Link } from "react-router-dom";
// import mercadoPago from "../../img/MPlogo.png";
// import ReactWhatsapp from 'react-whatsapp';

const Footer = () => {
  const onClickLink = (e) => {
    window.scrollTo(0, 0);
  };

  return (
    <Container>
      <Left>
        <Title>PETSHOP</Title>
        <Desc>
          Gracias por visitar nuestra app-web y contribuir a encontrarle un
          hogar a las mascotas.
        </Desc>
        <SocialContainer>
          <SocialIcon color="151515">
            <Facebook />
          </SocialIcon>
          <SocialIcon color="151515">
            <Instagram />
          </SocialIcon>
          <SocialIcon color="151515">
            <Twitter />
          </SocialIcon>
          <SocialIcon color="151515">
            <Pinterest />
          </SocialIcon>
        </SocialContainer>
      </Left>
      <Center>
        <Title>Links directos</Title>
        <List>
          <Link onClick={onClickLink} to="/" style={linkListItems}>
            <ListItem>Home</ListItem>
          </Link>
          <Link onClick={onClickLink} to="/cart" style={linkListItems}>
            <ListItem>Carro de compras</ListItem>
          </Link>
          <Link onClick={onClickLink} to="/pets" style={linkListItems}>
            <ListItem>Mascotas</ListItem>
          </Link>
          <Link onClick={onClickLink} to="/products" style={linkListItems}>
            <ListItem>Tienda</ListItem>
          </Link>
          <Link onClick={onClickLink} to="/createdPet" style={linkListItems}>
            <ListItem>Publicar mascota</ListItem>
          </Link>
          {/* <Link to='/createdProduct'>
                        <button>createdProduct</button>
                      </Link> */}

          {/* <ListItem>Mi cuenta</ListItem> */}
          {/* <ListItem>Lista de deseos</ListItem> */}
          <Link onClick={onClickLink} to="/about" style={linkListItems}>
            <ListItem>¿Quiénes somos?</ListItem>
          </Link>
        </List>
      </Center>
      <Right>
        <Title>Contacto</Title>
        {/* <ContactItem>
          <Link onClick={onClickLink} to='/mapa' style={linkListItems}>
            <Room style={{ marginRight: '10px' }} /> &nbsp; Av. 9 de Julio,
            C1043 CABA, Argentina
          </Link>
        </ContactItem> */}
        <ContactItem>
          {/* <WhatsAppIcon
            style={{ marginRight: '10px', background: 'none', border: 'none' }}
            number='+01 101 10 01'
            message='Bienvenido a Tu tienda de mascotas!!!'
          /> */}
          +54 9 11 0000 0000
        </ContactItem>
        <ContactItem>
          <MailOutline style={{ marginRight: "10px" }} /> petShop@gmail.com
        </ContactItem>
        {/* <Payment src={mercadoPago} /> */}
      </Right>
    </Container>
  );
};

export default Footer;

const Container = styled.div`
  display: flex;
  background: #29d9c2;
  border-top-left-radius: 24px;
  border-top-right-radius: 24px;
  font-family: "Poppins";
  font-style: normal;
  font-size: 15px;
  line-height: 22px;
  clear: both;
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

const Desc = styled.p`
  margin-bottom: 1em;
`;

const SocialContainer = styled.div`
  display: flex;
`;

const SocialIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  color: #29d9c2;
  background-color: #${(props) => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
`;

const Center = styled.div`
  flex: 1;
  padding: 20px;
`;

const Title = styled.h3`
  font-weight: 500;
  margin-bottom: 1em;
  font-family: "Poppins";
  font-style: normal;
`;

const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  font-family: "Poppins";
  font-style: normal;
`;

const ListItem = styled.li`
  margin-bottom: 10px;
  width: 50%;
  font-family: "Poppins";
  font-style: normal;
  &:hover {
    font-weight: 500;
    color: #ffffff;
  }
`;

const Right = styled.div`
  flex: 1;
  padding: 20px;
`;

const ContactItem = styled.div`
  margin-bottom: 20px;
  display: flex;
  align-items: center;
`;

const Payment = styled.img`
  height: 50%;
  padding: 0.5em;
  border-radius: 12px;
  background-color: #fff8f8;
`;

const linkListItems = {
  textDecoration: "none",
  color: "inherit",
  width: "50%",
};
