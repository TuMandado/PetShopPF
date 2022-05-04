import { useState } from "react";
import styled from "styled-components";



const SidebarContainer = styled.div`
    width: 15%;
    overflow-x: hidden;
    float: left;
    z-index: 1;
    height: 80%;
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    font-family: "Poppins";
    font-style: normal;
    font-weight: 600;
    font-size: 1.2em;
    margin-top: 1em;
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
    border: 4px solid  #e5e5e5;
`

const SidebarOptionsReviews = styled.p`
    margin: 1em;
    padding: 1em;
    width: 90%;
    border-radius: 8px;
    cursor: pointer;
    transition: 0.2s ease;
    ${props => props.option === 'Reviews'
        ? ` background: #0acf83;
            color: white;
            margin-left: 2em;
            `
        : ` border: 4px solid #e5e5e5;
            &:hover {
            color: #0acf83;
            }`
    }
   
`
const SidebarOptionsOrders = styled.p`
    margin: 1em;
    padding: 1em;
    width: 90%;
    border-radius: 8px;
    cursor: pointer;
    transition: 0.2s ease;
    ${props => props.option === 'Orders'
        ? ` background: #0acf83; 
            color:white;
            margin-left: 2em;
            `
        : ` 
            border: 4px solid #e5e5e5;
            &:hover {
            color: #0acf83;
            }`
    }
   
`
const SidebarOptionsModify = styled.p`
    margin: 1em;
    padding: 1em;
    width: 90%;
    border-radius: 8px;
    transition: 0.2s ease;
    cursor: pointer;
    ${props => props.option === 'Modify'
        ? ` background: #0acf83;
            color:white;
            margin-left: 2em;
            `
        :   `border: 4px solid #e5e5e5;
            &:hover {
            color: #0acf83;
            }`
    }

`

const UserSidebar = ({handleChange}) => {
    const [option, setOption] = useState("Orders")

    const changeOption = (e) => {
        setOption(e.target.id)
        handleChange(e.target.id)
    }

    return (
        <SidebarContainer>
            <SidebarOptionsOrders option={option} id="Orders" onClick={e => changeOption(e)}> Mis Compras </SidebarOptionsOrders>
            <SidebarOptionsReviews option={option} id="Reviews" onClick={e => changeOption(e)}> Mis Reseñas </SidebarOptionsReviews>
            <SidebarOptionsModify option={option} id="Modify" onClick={e => changeOption(e)}> Modificar Usuario </SidebarOptionsModify>
        </SidebarContainer>
    );
};

export default UserSidebar;
