import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { postReview } from '../../redux/actions/reviewsActions';

const FormReview = ({user, id}) => {
    const dispatch = useDispatch()

    const [input,setInput] = useState({
        userUid: user.uid,
        email: user.email,
        displayName: user.displayName,
        productUid: id,
        score: 1,
        review: "",
        createdAt: Date(),
        delete:false,
        userDelete:false,
    })
   

    function handleChange(e){
        setInput({
            ...input,
            [e.target.name]: e.target.value,
        })
    }

    function handleSubmit(e){
        e.preventDefault();
        dispatch(postReview(input))
        setInput({
            userUid: user.uid,
            email: user.email,
            displayName: user.displayName,
            productUid: id,
            score: 1,
            review: "",
            createdAt: Date(),
            delete:false,
            userDelete:false,
    })
    alert('Guau')
    }


  return (
    <div>
        <form onSubmit={(e)=>handleSubmit(e)}>
            {console.log("input", input)}
            <label>Score</label>
            <div>
                <input type="radio" id="1" value={1} name="score" onChange={(e)=>handleChange(e)}/>
                <label for="1">1</label>
                <input type="radio" id="2" value={2} name="score" onChange={(e)=>handleChange(e)}/>
                <label for="2">2</label>
                <input type="radio" id="3" value={3} name="score" onChange={(e)=>handleChange(e)}/>
                <label for="3">3</label>
                <input type="radio" id="4" value={4} name="score" onChange={(e)=>handleChange(e)}/>
                <label for="4">4</label>
                <input type="radio" id="5" value={5} name="score" onChange={(e)=>handleChange(e)}/>
                <label for="5">5</label>
            </div>
            <label>Reseña</label>
            <div>
                <textarea type="text" name="review" value={input.review} placeholder='Mi mascota dice que...' cols="30" rows="10" onChange={(e)=>handleChange(e)}/>
            </div>
            <button type='submit'>Enviar</button>

        </form>
    </div>
  )
}

export default FormReview
