import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getReviewsByProductFront, porductScore } from '../../redux/actions/reviewsActions'
import styled from "styled-components";
import { star } from '../../data'
import icoUser from "../../assets/user.png";

const Reviews = ({ id }) => {
    const dispatch = useDispatch()
    const productReviews = useSelector(state => state.reviewsReducer.productReviews)
    const productScore = useSelector(state => state.reviewsReducer.productScore)


    useEffect(() => {
        dispatch(getReviewsByProductFront(id))
    }, [])

    useEffect(() => {
        dispatch(porductScore(id))
    }, [])

    let reviewsByTime = [];

    if (productReviews) {
        reviewsByTime = productReviews.sort(function (a, b) {
            if (a.data.createdAt > b.data.createdAt) {
                return 1
            }
            if (a.data.createdAt < b.data.createdAt) {
                return -1
            }
            return 0
        })
    }

    return (
        <MainContainer>
            <ReviewSectionTitle> Opiniones </ReviewSectionTitle>
            {reviewsByTime.length ? reviewsByTime.map(el => {
                const stars = [false, false, false, false, false]
                for (let i = 0; i < el.data.score; i++) {
                    stars[i] = true;
                }
                return (
                    <ReviewContainer>
                        {el.data.displayName
                            ? <UserTitle> <img src={icoUser} style={profilePic} alt="" /> {el.data.displayName} </UserTitle>
                            : <UserTitle> <img src={icoUser} style={profilePic} alt="" /> {el.data.email} </UserTitle>}
                        <UserScore>{stars.map(el => el ? star.full : star.empty)}</UserScore>
                        <UserReview>{el.data.review}</UserReview>
                    </ReviewContainer>
                )
            }) : (<NoReviewMsg>No hay comentarios todavia, ¡Se el primero en dejar tu opinion!</NoReviewMsg>)}
        </MainContainer>
    )
}

const MainContainer = styled.div`
    
`
const ReviewSectionTitle = styled.h1`
font-family: 'Poppins';
font-style: normal;
font-weight: 600;
font-size: 20px;
line-height: 27px;
margin-bottom: 1em;
`
const ReviewContainer = styled.div`
border: 2px solid #e5e5e5;
border-radius: 8px;
width: 60%;
margin-bottom: 0.5em;
padding: 1em;
position: relative;

`
const UserTitle = styled.p`
font-family: 'Poppins';
font-style: normal;
font-size: 18px;
line-height: 27px;
`
const UserScore = styled.p`
position: absolute;
top: 25%;
right: 5%;
`
const UserReview = styled.p`
font-family: 'Poppins';
font-style: normal;
line-height: 27px;
margin-top: 1em;
margin-left: 1.5em;
`
const NoReviewMsg = styled.p`
font-family: 'Poppins';
font-style: normal;
font-weight: 600;
font-size: 18px;
line-height: 27px;
`

const profilePic = {
    width: "auto",
    height: "1em",
    borderRadius: "2rem",
    border: "1px solid black",
  };


export default Reviews
