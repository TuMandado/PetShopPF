import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { postReview } from '../../redux/actions/reviewsActions';
import styled from "styled-components";
import { star } from '../../data';

const FormReview = ({ user, id }) => {
    const dispatch = useDispatch()

    const [input, setInput] = useState({
        userUid: user.uid,
        email: user.email,
        displayName: user.displayName,
        productUid: id,
        score: 0,
        review: "",
        createdAt: Date(),
        delete: false,
        userDelete: false,
    })

    const [starClicked, setStarClicked] = useState([false, false, false, false, false])
    let starId = 0;


    function handleChange(e) {
        setInput({
            ...input,
            [e.target.name]: e.target.value,
        })
    }

    function handleSubmit(e) {
        e.preventDefault();
        dispatch(postReview(input))
        setInput({
            userUid: user.uid,
            email: user.email,
            displayName: user.displayName,
            productUid: id,
            score: 0,
            review: "",
            createdAt: Date(),
            delete: false,
            userDelete: false,
        })
        setStarClicked([false, false, false, false, false])
        alert('Guau')
    }

    const handleStarSelect = (e) => {
        const newStarClicked = [false, false, false, false, false]
        for (let i = 0; i < e.currentTarget.id; i++) {
            
            newStarClicked[i] = true;
        }
        setStarClicked(newStarClicked)
    }



    return (
        <MainContainer>
            <form onSubmit={(e) => handleSubmit(e)}>
                <ScoreLabel>Puntuación</ScoreLabel>
                <div>
                    {
                        starClicked.map(el => {
                            starId = starId + 1
                            return <>
                                <RadioInput type="radio" id={starId} value={starId} name="score" onChange={(e) => handleChange(e)} />
                                <RadioInputsLabels onClick={e => handleStarSelect(e)} id={starId} for={starId}>{el ? star.full : star.empty}</RadioInputsLabels>
                            </>

                        })
                    }
                </div>
                <ReviewLabel>Reseña</ReviewLabel>
                <div>
                    <TextAreaReview type="text" name="review" value={input.review} placeholder='Mi mascota dice que...' cols="30" rows="10" onChange={(e) => handleChange(e)} />
                </div>
                {
                    input.score ? <SendButton type='submit'>Enviar</SendButton> : null
                }
            </form>
        </MainContainer>
    )
}

export default FormReview;

const MainContainer = styled.div`
    position: absolute;
    right: 0;
    top: 5%;
    font-family: 'Poppins';
    font-style: normal;
    line-height: 27px;
    margin-bottom: 2em;

`
const ScoreLabel = styled.label`
    font-size: 16px;
`
const RadioInput = styled.input`
    display: none;
`
const RadioInputsLabels = styled.label`
    cursor: pointer;
`
const ReviewLabel = styled.label`
    font-size: 16px;
`
const TextAreaReview = styled.textarea`
    border: 2px solid #e5e5e5;
    border-radius: 8px;
    padding: 1em;
    resize: none;
    font-family: 'Poppins';
    font-style: normal;
    width: 100%;

`
const SendButton = styled.button`
display: flex;
  justify-content: center;
  align-items: center;
  font-family: "Poppins";
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  color: #ffff;
  background: #0acf83;
  padding: 0.4em;
  border: 2px solid #067a4d;
  box-sizing: border-box;
  border-radius: 8px;
  cursor: pointer;
  transition: 0.25s ease;
  &:hover {
    color: #0acf83;
    background: #F9F9F9;
  }
  
`
