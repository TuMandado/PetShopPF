import React from 'react';
import {Link, useNavigate} from 'react-router-dom'
import { useDispatch, useSelector  } from 'react-redux';
import { useState, useEffect } from 'react';
import { postProduct, getTotalProducts,getProductCategory, getProductAnimalCategory } from '../../redux/actions/adminActions';

const ProductCreated = () => {
    const dispatch = useDispatch()
    const navegate = useNavigate()
    const product = useSelector((state) => state.adminReducer.products)
    console.log('esto es product', product)
    const category = useSelector((state) => state.adminReducer.categories)
    // console.log('esto es category',category)
    const animalCategory = useSelector((state) => state.adminReducer.animalCategory)
    console.log('esto es animalCategory', animalCategory)


    const [erros, setErrors] = useState({})
    const [input, setInput] = useState({
        name: '',
        image: '',
        animalCategory: '',
        category: '',
        price: '',
        subCategory: ''
    })
    function handleChange(e) {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
        console.log(input)
    }

    function handleSelect(e) {
        setInput({
            ...input,
            animalCategory: input.animalCategory.includes(e.target.value)? 
            input.animalCategory :
            [...input.animalCategory, e.target.value]
        })

    }

    function handleSubmit (e) {
        e.preventDefault()
        if(input.name.trim() === '') {
            return alert('Ingrese un nombre')
        } else if (
            product.find(e => e.name.toLowerCase().trim() === input.name.toLowerCase().trim())
        ) {
            return alert(`El Producto ${input.name} ya existe`)
        } else {
            console.log(input)
            dispatch(postProduct(input))
            alert('Producto creado con exito!')
            setInput({
                name: '',
                image: '',
                animalCategory: '',
                category: '',
                price: '',
                subCategory: ''
            })
            navegate('/')

            
        }

    }

    function handleSelect2(e) {
        setInput({
            ...input,
            category: input.category.includes(e.target.value)? 
            input.category :
            [...input.category, e.target.value]
        })

    }


    useEffect(() => {
        dispatch(getTotalProducts())
        dispatch(getProductCategory())
        dispatch(getProductAnimalCategory())
    },[dispatch])



    return (
        <div>
            <h1>Crea un nuevo Producto</h1>
            <br />
            <form onSubmit={e => handleSubmit(e)}>
                <div>
                    <label > Nombre del Producto</label>
                    <br />
                    <input type="text"
                     name="name" 
                     value={input.name}
                     onChange={(e) => handleChange(e) }
                    
                    />
                </div>
                <div>
                    <label> Agrege una imagen </label>
                    <br />
                    <input type="text"
                    value={input.image}
                    name= 'image'
                    onChange={(e) => handleChange(e) }
                    />
                </div>
                <div>
                    <select onChange={e => handleSelect(e)}>
                       {
                           animalCategory?.map(e => (
                               <option value={e.data.name}>{e.data.name}</option>
                           ))
                       }

                    </select>

                </div>
                <div>
                    <select onChange={e => handleSelect2(e)}>
                        <option disabled>Seleccionar categorias: </option>
                        {
                            category?.map((g) => (
                                <option value={g}>{g}</option>
                            ))
                        }
                    </select>
                </div>
                <div>
                    <label>Agrega una Sub categoria</label>
                    <br />
                    <input type="text"
                    value={input.subCategory}
                    name='subCategory'
                    onChange={(e) => handleChange(e) }
                    />
                </div>
                <div>
                    <label>Agrega Precio</label>
                    <br />
                    <input type="number"
                    value={input.price}
                    name='price'
                    onChange={(e) => handleChange(e) }
                    
                    />
                </div>
                <button type='submit'>Crear producto</button>
            </form>
            <Link to='/'><button>volver al home</button></Link>
            
        </div>
    )
}

export default ProductCreated