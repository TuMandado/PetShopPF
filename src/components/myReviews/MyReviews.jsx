import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { getReviewsByUserFront } from '../../redux/actions/reviewsActions';
import icoUser from "../../assets/user.png";
import { editUserReview, removeReview, } from "../../redux/actions/reviewsActions";
import { star } from "../../data";
import { useNavigate } from 'react-router-dom';



const MyReviews = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(state => state.clientReducer.user)
  const userReviews = useSelector(state => state.reviewsReducer.userReviews)
  const [editMode, setEditMode] = useState(0)
  const [reviewEdit, setReviewEdit] = useState("")
  const [starsEdit, setStarsEdit] = useState([false, false, false, false, false])
  let starId = 0;

  useEffect(() => {
    if (user) {
      dispatch(getReviewsByUserFront(user.uid))
    }
  }, [user])

  const editReview = (e, id, prevData) => {
    if (editMode === id) setEditMode(0)
    else {
      setReviewEdit(prevData)
      setEditMode(id)
    }
  }

  const deleteReview = (id) => {
    dispatch(removeReview(id))
      .then(el => window.location.reload(true))
  }

  const editStars = (e) => {
    const newStars = [false, false, false, false, false]
    for (let i = 0; i < e.currentTarget.id; i++) {
      newStars[i] = true;
    }
    setStarsEdit(newStars)
  }

  const handleReviewEdit = (e) => {
    setReviewEdit(e.target.value)
  }

  const acceptEditReview = (el) => {
    let editedScore = 0;
    for (let i = 0; i < starsEdit.length; i++) {
      if (starsEdit[i] === true) editedScore += 1;
    }
    el.data.review = reviewEdit
    el.data.score = editedScore.toString()
    dispatch(editUserReview(el.uid, el.data))
      .then(el => setEditMode(0))
  }

  const goToProductDetail = (id) => {
    navigate(`/product/${id}`)
  }


  return (
    <MainContainer>
      {
        userReviews.length
          ? userReviews.map(el => {
            const stars = [false, false, false, false, false];
            for (let i = 0; i < el.data.score; i++) {
              stars[i] = true;
            }
            return <ReviewContainer>
              {el.data.displayName ? (
                <UserTitle>
                  {" "}
                  <img src={icoUser} style={profilePic} alt="" />{" "}
                  {el.data.displayName}{" "}
                </UserTitle>
              ) : (
                <UserTitle>
                  {" "}
                  <img src={icoUser} style={profilePic} alt="" />{" "}
                  {el.data.email}{" "}
                </UserTitle>
              )}
              {
                editMode !== el.uid
                && <EditButton
                  onClick={e => editReview(e, el.uid, el.data.review)}
                  src="https://www.svgrepo.com/show/29974/pencil.svg"
                  alt="404"
                />
              }
              <RemoveButton
                onClick={e => deleteReview(el.uid)}
                src="https://icons-for-free.com/download-icon-delete+remove+trash+trash+bin+trash+can+icon-1320073117929397588_512.png"
                alt="404"
              />
              {
                editMode === el.uid
                  ? <UserScoreInput>
                    {starsEdit.map(el => {
                      starId = starId + 1
                      return <>
                        <RadioInput type="radio" id={starId} />
                        <RadioInputsLabels onClick={e => editStars(e)} id={starId} for={starId}>{el ? star.full : star.empty}</RadioInputsLabels>
                      </>

                    })}
                  </UserScoreInput>
                  : <UserScore>
                    {stars.map((el) => (el ? star.full : star.empty))}
                  </UserScore>
              }
              {
                editMode === el.uid
                  ? <>
                    <UserReviewInput value={reviewEdit} onChange={e => handleReviewEdit(e)} />
                    {
                      starsEdit[0] === true
                      &&
                      <AcceptReviewChange onClick={e => acceptEditReview(el)} src="https://cdn-icons.flaticon.com/png/512/1055/premium/1055183.png?token=exp=1651549185~hmac=762c284879830a646cdf9fd0e8282bc4" alt="404" />
                    }
                    <CancelReviewChange onClick={e => editReview(e)} src="https://cdn-icons-png.flaticon.com/512/838/838412.png" alt="404" />
                  </>
                  : <UserReview>{el.data.review}</UserReview>
              }
              <ProductDetail onClick={e => goToProductDetail(el.data.productUid)}> Ir al Producto </ProductDetail>
            </ReviewContainer>
          })
          : <NoReviewMsg>
            No has dejado ninguna reseña aun.
          </NoReviewMsg>
      }
    </MainContainer>
  )
}

export default MyReviews;


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

const ReviewContainer = styled.div`
  border: 2px solid #e5e5e5;
  border-radius: 8px;
  width: 60%;
  margin-bottom: 0.5em;
  padding: 1em;
  position: relative;
  background: white;
  margin-left: auto;
  margin-right: auto;
`;

const profilePic = {
  width: "auto",
  height: "1em",
  borderRadius: "2rem",
  border: "1px solid black",
};

const UserTitle = styled.p`
  font-family: "Poppins";
  font-style: normal;
  font-size: 18px;
  line-height: 27px;
`;

const UserScore = styled.p`
  position: absolute;
  top: 20%;
  right: 15%;
`;
const UserReview = styled.p`
  font-family: "Poppins";
  font-style: normal;
  line-height: 27px;
  margin-top: 1em;
  margin-left: 1.5em;
`;

const UserReviewInput = styled.textarea`
  border: 2px solid #e5e5e5;
  border-radius: 8px;
  padding: 1em;
  resize: none;
  font-family: 'Poppins';
  font-style: normal;
  margin-top: 1em;
  margin-left: 1.5em;
  width: 80%;
`
const NoReviewMsg = styled.p`
  font-family: "Poppins";
  font-style: normal;
  font-weight: 600;
  font-size: 2em;
  line-height: 27px;
  padding: 1em;
  text-align: center;
`;

const EditButton = styled.img`
    width: 3%;
    position: absolute;
    right: 8%;
    top: 15%;
    cursor: pointer;
    transition: 0.2s ease;
    &:hover {
        width: 4%;
        top: 13%;
        right: 7.5%;
        filter: brightness(0) saturate(100%) invert(75%) sepia(42%) saturate(6572%) hue-rotate(114deg) brightness(100%) contrast(92%);
    }
`
const RemoveButton = styled.img`
    width: 3%;
    position: absolute;
    right: 3%;
    top: 15%;
    cursor: pointer;
    transition: 0.2s ease;
    &:hover {
        width: 4%;
        top: 13%;
        right: 2.5%;
        filter: brightness(0) saturate(100%) invert(75%) sepia(42%) saturate(6572%) hue-rotate(114deg) brightness(100%) contrast(92%);
    }   
`

const AcceptReviewChange = styled.img`
  width: 3.8%;
  position: absolute;
  top: 53%;
  right: 8%;
  transform: rotate(-5deg);
  transition: 0.2s ease;
  cursor: pointer;
  &:hover {
        width: 4.8%;
        top: 50%;
        right: 7.4%;
        filter: brightness(0) saturate(100%) invert(75%) sepia(42%) saturate(6572%) hue-rotate(114deg) brightness(100%) contrast(92%);
    }  
`
const CancelReviewChange = styled.img`
  width: 3.5%;
  position: absolute;
  top: 54%;
  right: 2.9%;
  transition: 0.2s ease;
  cursor: pointer;
  &:hover {
        width: 4.5%;
        top: 52%;
        right: 2.2%;
        filter: brightness(0) saturate(100%) invert(75%) sepia(42%) saturate(6572%) hue-rotate(114deg) brightness(100%) contrast(92%);
    }  

`
const UserScoreInput = styled.p`
  position: absolute;
  top: 18%;
  right: 15%;
`;

const RadioInput = styled.input`
    display: none;
`
const RadioInputsLabels = styled.label`
    cursor: pointer;
`

const ProductDetail = styled.p`
    font-family: "Poppins";
    font-style: normal;
    font-weight: 500;
    cursor: pointer;
    transition: 0.2s ease;
    position: absolute;
    top: 20%;
    left: 45%;
    &:hover {
        font-weight: 600;
        filter: brightness(0) saturate(100%) invert(75%) sepia(42%) saturate(6572%) hue-rotate(114deg) brightness(100%) contrast(92%);
    }
`
