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
        alert('Guau')
    }


    return (
        <MainContainer>
            <form onSubmit={(e) => handleSubmit(e)}>
                <ScoreLabel>Puntuación</ScoreLabel>
                <div>
                    <RadioInput type="radio" id="1" value={1} name="score" onChange={(e) => handleChange(e)} />
                    <RadioInputsLabels for="1">1</RadioInputsLabels>
                    <RadioInput type="radio" id="2" value={2} name="score" onChange={(e) => handleChange(e)} />
                    <RadioInputsLabels for="2">2</RadioInputsLabels>
                    <RadioInput type="radio" id="3" value={3} name="score" onChange={(e) => handleChange(e)} />
                    <RadioInputsLabels for="3">3</RadioInputsLabels>
                    <RadioInput type="radio" id="4" value={4} name="score" onChange={(e) => handleChange(e)} />
                    <RadioInputsLabels for="4">4</RadioInputsLabels>
                    <RadioInput type="radio" id="5" value={5} name="score" onChange={(e) => handleChange(e)} />
                    <RadioInputsLabels for="5">5</RadioInputsLabels>
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
    top: 10%;
`
const ScoreLabel = styled.label`
`
const RadioInput = styled.input`
`
const RadioInputsLabels = styled.label`
`
const ReviewLabel = styled.label`
`
const TextAreaReview = styled.textarea`
`
const SendButton = styled.button`
`
