import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { getTotalPets, getSpeciesPets, getStateAllPets } from "../../redux/actions";
import Pet from "../pet/Pet";
import { Loader } from "../../page/loader/Loader";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/footer/Footer";
import { AsidePets } from "../../components/aside/Aside Pets";
import styled from "styled-components";



const MainAllCards = styled.div`
  box-sizing: border-box;
  display: grid;
  place-content: left;
  grid-template-columns: repeat(auto-fit, minmax(21em, 21em));
  margin: 2px;
  justify-content: center;
  min-height: 68vh;
  margin-right: 10em;
  margin-bottom: 5em;
`;

const Pets = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const allPets = useSelector((state) => state.clientReducer.pets);
    const [loader, setLoader] = useState(true);
    // eslint-disable-next-line no-unused-vars
    const [error, setError] = useState(false);

    const navigatePet = (e) => {
        navigate(`/pets/${e.currentTarget.id}`);
      };

    useEffect(() => {

        dispatch(getSpeciesPets())
        dispatch(getTotalPets())
            .then((response) => {
                setLoader(false);
            })
            .catch((error) => setError(error.message));
    }, [dispatch]);

    if (loader) {
        return (
            <div>
                <Loader />
            </div>
        );
    }

    return (
        <div>
            <AsidePets />
            <MainAllCards>
                {allPets.length ? (
                    allPets.map((e) => {
                        return (
                            <div key={e.uid} id={e.uid} onClick={(e) => navigatePet(e)}>
                                <Pet
                                    state={e.data.state}
                                    category={e.data.category}
                                    sexo={e.data.sexo}
                                    name={e.data.name}
                                    description={e.data.description}
                                    photos={e.data.photos}
                                />
                            </div>
                        );
                    })
                ) : (
                    <div>
                        <h1>Error, no hay datos</h1>
                    </div>
                )}
                <div></div>
            </MainAllCards>
            <Footer />
        </div>
    );
};

export default Pets;
