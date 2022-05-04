import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { getMyOrders } from '../../redux/actions/index'


const MainContainer = styled.div`
    width: 70%;
    max-height: 80%;
    margin-left: 40vh;
    margin-right: auto;
    margin-top: 2.8%;
    overflow-y: scroll;
    border-radius: 8px;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
`

const OrderContainer = styled.div`
    width: 95%;
    font-family: "Poppins";
    font-style: normal;
    margin: 1em;
    border: 4px solid #e5e5e5;
    position: relative;
    background: white;
    border-radius: 8px;
    
`

const OrderStatus = styled.span`
    position: absolute;
    left: 1%;
    top: 10%;
`
const OrderDate = styled.span`
    position: absolute;
    right: 5%;
    top:10%;

`

const OrderProducts = styled.div`
    margin-left: 10%;
    margin-top: 5%;
`

const OrderProductSpan = styled.p`
    position: absolute;
    left: 1%;
    top: 50%;
`


const OrderUl = styled.ul`
    padding: 1em;
    
`
const OrderLi = styled.li`
    margin-bottom: 0.5em;
    cursor: pointer;
    transition: 0.2s ease;
    &:hover {
        color: #0acf83;
        font-weight: 600;
    }
`
const OrderPrice = styled.span`
    position: absolute;
    right: 5%;
    bottom: 15%;
    font-weight: 600;
`

const Error = styled.h1`
    font-family: "Poppins";
    font-style: normal;
    font-size: 2em;
    padding: 1em;
    text-align: center;
`

const MyOrders = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(state => state.clientReducer.user)
  const orders = useSelector(state => state.clientReducer.userOrders)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user) {
      dispatch(getMyOrders(user.uid))
        .then(e => setLoading(false))
    }
    setTimeout(() => {
      setLoading(false)
    }, 2000)
  }, [user])

  const goToProductDetail = (e, id) => {
    navigate(`/product/${id}`)
  }

  return (
    <MainContainer>
      {
        loading
          ? <Error> Cargando... </Error>
          : !user
            ? <Error> Inicia Sesion Para Continuar </Error>
            :
            orders.length
              ? orders.map(el => {
                let totalPrice = 0;
                el.data.items.forEach(el => {
                  let individualPrice = el.price.match(/\d+.\d+(?=,)/g)
                  individualPrice = individualPrice && parseInt(individualPrice[0].split('.').join(''))
                  typeof individualPrice === 'number' ? totalPrice += individualPrice : totalPrice = "No disponible"

                })

                return <OrderContainer>
                  <OrderStatus> Estado: {el.data.status === 'approved' && 'Aprobada'}  </OrderStatus>
                  <OrderDate>  Fecha: {el.data.createdAt.slice(3, 10) + '/' + el.data.createdAt.slice(11, 15)} </OrderDate>
                  <OrderProductSpan> Productos: </OrderProductSpan>
                  <OrderProducts>
                    <OrderUl>
                      {el.data.items.map(el => (
                          <OrderLi onClick={e => goToProductDetail(e, el.id)}> {el.title} ({el.quantity} {el.quantity === 1 ? "Unidad" : "Unidades"}) </OrderLi>
                        ))
                      }
                    </OrderUl>
                  </OrderProducts>
                  <OrderPrice>
                    Total: $ {
                      el.data.total
                        ? el.data.total
                        : totalPrice
                    }
                  </OrderPrice>
                </OrderContainer>
              })
              : <Error> No has comprado nada aun.  </Error>
      }
    </MainContainer>
  )
}

export default MyOrders;