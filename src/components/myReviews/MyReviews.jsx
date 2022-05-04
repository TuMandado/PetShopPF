import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { getReviewsByUserFront } from '../../redux/actions/reviewsActions';


const MainContainer = styled.div`
`

const MyReviews = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.clientReducer.user)
    const userReviews = useSelector(state => state.reviewsReducer.userReviews)
    
    useEffect(() => {
        if(user) {
            dispatch(getReviewsByUserFront(user.uid))
        }
    }, [user])

    return (
        <MainContainer>

        </MainContainer>
    )
}

export default MyReviews;