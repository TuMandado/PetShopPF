import {
  Facebook,
  Instagram,
  MailOutline,
  Pinterest,
  Twitter
} from '@material-ui/icons'
// import WhatsAppIcon from '@mui/icons-material/WhatsApp'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import mercadoPago from '../../img/MPlogo.png'
// import ReactWhatsapp from 'react-whatsapp';


const Footer = () => {
  const onClickLink = e => {
    window.scrollTo(0, 0)
  }

  return (
    <Container>
      <Left>
        <Logo>PETSHOP</Logo>
        <Desc>
          Gracias por visitar nuestra app-web
          y contribuir a encontar o buscarle hogar a las mascotas .
        </Desc>
        <SocialContainer>
          <SocialIcon color='3B5999'>
            <Facebook />
          </SocialIcon>
          <SocialIcon color='E4405F'>
            <Instagram />
          </SocialIcon>
          <SocialIcon color='55ACEE'>
            <Twitter />
          </SocialIcon>
          <SocialIcon color='E60023'>
            <Pinterest />
          </SocialIcon>
        </SocialContainer>
      </Left>
      <Center>
        <Title>Links directos</Title>
        <List>
          <Link onClick={onClickLink} to='/' style={linkListItems}>
            <ListItem>Home</ListItem>
          </Link>
          <Link onClick={onClickLink} to='/cart' style={linkListItems}>
            <ListItem>Carro de compras</ListItem>
          </Link>
          <Link onClick={onClickLink} to='/pets' style={linkListItems}>
            <ListItem>Mascotas</ListItem>
          </Link>
          <Link onClick={onClickLink} to='/products' style={linkListItems}>
            <ListItem>Tienda</ListItem>
          </Link>
          {/* <ListItem>Mi cuenta</ListItem> */}
          {/* <ListItem>Lista de deseos</ListItem> */}
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
          <MailOutline style={{ marginRight: '10px' }} /> petShop@gmail.com
        </ContactItem>
        <Payment src={mercadoPago} />
      </Right>
    </Container>
  )
}

export default Footer

const Container = styled.div`
  display: flex;
  background-color: #d3f7db;
  
`

const Left = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px;
`

const Logo = styled.h1``

const Desc = styled.p`
  margin: 20px 0px;
`

const SocialContainer = styled.div`
  display: flex;
`

const SocialIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  color: white;
  background-color: #${props => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
`

const Center = styled.div`
  flex: 1;
  padding: 20px;
 
`

const Title = styled.h3`
  margin-bottom: 30px;
`

const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
`

const ListItem = styled.li`
  width: 50%;
  margin-bottom: 10px;
`

const Right = styled.div`
  flex: 1;
  padding: 20px;
 
`

const ContactItem = styled.div`
  margin-bottom: 20px;
  display: flex;
  align-items: center;
`

const Payment = styled.img`
  width: 200px;
  border-radius: 25px;
  background-color: #fff8f8;
  margin-right: 35%;
`

const linkListItems = {
  textDecoration: 'none',
  color: 'inherit',
  width: '50%'
}

