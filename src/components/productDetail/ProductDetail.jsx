import React from 'react';
import { useEffect } from 'react';
import {Link, useParams} from 'react-router-dom'
import { useDispatch, useSelector  } from 'react-redux';
import {getDetailProducts, detailVacio} from '../../redux/actions'

const  ProductDetail = ()  => {
    const dispatch = useDispatch()
    const {uid} = useParams()

    useEffect(() => {
        dispatch(getDetailProducts(uid))
        return function () {
            dispatch(detailVacio())
        }
    }, [dispatch,uid])

    const product = useSelector(state => state.details)
    console.log('esto es product', product)

    return (
        <div>
            
        </div>

    )



}

export default ProductDetail