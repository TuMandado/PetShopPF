import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navbar } from "../navbar/Navbar";
import { Loader } from "../../page/loader/Loader";
import Footer from "../../components/footer/Footer";
import { petDetails, detailVacio } from "../../redux/actions";
import styled from "styled-components";


const Hola = styled.div`
`
const Chau = styled.span`
`



return (
    <div>
        <button>Algo</button>
    </div>
                    </div >
                </div >
                <div>
                    <img src={pet.photos || "https://imgur.com/lhLYKao"} alt="imagen" />
                </div>
                <div>
                    <Link to="/pets">
                        <button>Volver</button>
                    </Link>
                </div>
            </div >

    {/* <Footer /> */ }
        </div >
            <Navbar />
            <div>
                <div>
                    <div>
                        <h1>{pet.name}</h1>
                    </div>
                    <div>
                        <div>
                            <h5>Animal: {pet.category}</h5>
                        </div>
                        <div>
                            <h5>Estado: {pet.state}</h5>
                        </div>
                        <div>
                            <h5>Sexo: {pet.sexo}</h5>
                        </div>
                    </div>
                    <div>
                        <div>
                            <p>{pet.description}</p>
                        </div>
                        <div>
             
    );
};
if (!pet.name) {
    return (
        <div>
            <div>
                <Navbar />
            </div>
            <div>
                <Loader />
            </div>
        </div>
    );
}


export default PetDetail;
