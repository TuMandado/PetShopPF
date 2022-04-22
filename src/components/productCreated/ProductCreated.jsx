import React from 'react';
import {Link, useNavigate} from 'react-router-dom'
import { useDispatch, useSelector  } from 'react-redux';
import { useState, useEffect } from 'react';
import { postProduct, getTotalProducts,getProductCategory, getProductAnimalCategory } from '../../redux/actions/adminActions';

function validadora (input) {
    let error = {}
    if(!input.name || input.name.length < 3 || input.name.search(/^[^$%&|<>#]*$/)) {
        error.name = 'ingrese un nombre por favor'
    } else if (!input.image) {
        error.image = 'ingrese una imagen plis'
    } else if (!input.brand) {
        error.brand = 'ingrese una marca por favor'
    }else if (!input.animalCategory) {
        error.animalCategory = 'por favor ingrese una categoria de animal'
    } else if (input.category.length === 0) {
        error.category = 'ingrese una categoria porfitas'
    } else if (!input.subCategory) {
        error.subCategory = 'ingrese sub categoria'
    } else if (!input.price || input.price < 0 ) {
        error.price = 'ingrese precio adecuado por favor'
    } 
     

    return error

}

const ProductCreated = () => {
    const dispatch = useDispatch()
    const navegate = useNavigate()
    const product = useSelector((state) => state.adminReducer.products)
    console.log('esto es product', product)
    const category = useSelector((state) => state.adminReducer.categories)
    console.log('esto es category',category)
    const animalCategory = useSelector((state) => state.adminReducer.animalCategory)
    console.log('esto es animalCategory', animalCategory)


    const [errors, setErrors] = useState({})
    const [input, setInput] = useState({
        name: '',
        image: '',
        brand:'',
        animalCategory: '',
        category: '',
        price: '',
        subCategory: '',
        delete: false
    })
    function handleChange(e) {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
        setErrors(
            validadora({
                ...input,
                [e.target.name] : e.target.value
            })
        )
        console.log(input)
    }

    function handleSelect(e) {
        setInput({
            ...input,
            animalCategory: e.target.value
        })
        // input.animalCategory.includes(e.target.value)? 
        //     input.animalCategory :
        //     [...input.animalCategory, e.target.value]

    }

    // function handleDelete (e) {
    //     setInput({
    //         ...input,
    //         category: input.category.filter(category => category !== e)
    //     })

    // }
    // function handleDelete2 (e) {
    //     setInput({
    //         ...input,
    //         animalCategory: input.animalCategory.filter(animalCategory => animalCategory !== e)
    //     })

    // }

    function handleSubmit (e) {
        e.preventDefault()
        if(input.name.trim() === '' || input.name.search(/^[^$%&|<>#]*$/)) {
            return alert('Ingrese un nombre adecuado')
        } else if (
            product.find(e => e.data.name.toLowerCase().trim() === input.name.toLowerCase().trim())
        ) {
            return alert(`El Producto ${input.name} ya existe`)
        } else if (input.image.trim() === '' || input.image.search(/(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|jpeg|gif|png|svg)/gi) ) {
            return alert ('por favor ingrese imagen')
        } else if (input.brand.trim() === '' || input.brand.search(/^[^$%&|<>#]*$/)) {
            return alert('ingrese una marca')
        } else if (input.animalCategory.trim() === '') {
            return alert('selecciona una categoria de animal por favor')
        }  else if (input.category.trim() === '') {
            return alert('selecciona una categoria por favor')
        }   else if (input.price.trim() === '' || input.price < 1) {
            return alert('precio inadecuado ')
        } else if (input.subCategory.trim() === '' || input.subCategory.search(/^[^$%&|<>#]*$/)) {
            return alert('ingrese sub categoria')
        }
        
        
        
        else {
            console.log(input)
            dispatch(postProduct(input))
            alert('Producto creado con exito!')
            setInput({
                name: '',
                image: '',
                animalCategory: '',
                category: '',
                price: '',
                subCategory: '',
                delete: false
            })
            navegate('/products')

            
        }

    }

    function handleSelect2(e) {
        setInput({
            ...input,
            category: e.target.value
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
                     value={input.name}
                     name="name" 
                     placeholder='nombre del producto'
                     onChange={(e) => handleChange(e) }
                    
                    />
                     {
                       errors.name && (
                           <p>{errors.name}</p>
                       )
                   }
                </div>
                <div>
                    <label> Agrege una imagen </label>
                    <br />
                    <input type="text"
                    value={input.image}
                    name= 'image'
                    onChange={(e) => handleChange(e) }
                    placeholder='agrege imagen'
                    />
                     {
                       errors.image && (
                           <p>{errors.image}</p>
                       )
                   }
                </div>
                <div>
                    <label >Nombre de la marca : </label>
                    <br />
                    <input type="text"
                    value={input.brand}
                    name='brand'
                    onChange={(e)=> handleChange(e)}
                    placeholder='agrege marca'
                    />
                    {
                       errors.brand && (
                           <p>{errors.brand}</p>
                       )
                   }
                </div>
                <div>
                    <select onChange={e => handleSelect(e)}>
                       {
                           animalCategory?.map(e => (
                               <option value={e.data.name}>{e.data.name}</option>
                           ))
                       }

                    </select>
                    {
                       errors.animalCategory && (
                           <p>{errors.animalCategory}</p>
                       )
                   }
                    <div>
                    {/* <ul>
                           <li>
                               {input.animalCategory?.map((e) => (
                                  <div>
                                      {e + ' '}
                                      <button type='button' onClick={() => handleDelete2(e)}>
                                          X
                                      </button>
                                  </div>
                               ))}
                           </li>
                       </ul> */}

                    </div>

                    
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
                    <div>

                    {/* <ul>
                           <li>
                               {input.category?.map((e) => (
                                  <div>
                                      {e + ' '}
                                      <button type='button' onClick={() => handleDelete(e)}>
                                          X
                                      </button>
                                  </div>
                               ))}
                           </li>
                       </ul> */}
                       {
                       errors.category && (
                           <p>{errors.category}</p>
                       )
                   }

                    </div>
                    
                </div>
                <div>
                    <label>Agrega una Sub categoria</label>
                    <br />
                    <input type="text"
                    value={input.subCategory}
                    name='subCategory'
                    onChange={(e) => handleChange(e) }
                    placeholder='agrege sub categoria'
                    />
                    {
                       errors.subCategory && (
                           <p>{errors.subCategory}</p>
                       )
                   }
                </div>
                <div>
                    <label>Agrega Precio: </label>
                    <br />
                    <input type="number"
                    value={input.price}
                    name='price'
                    onChange={(e) => handleChange(e) }
                    placeholder='agrege precio'
                    
                    />
                       {
                       errors.price && (
                           <p>{errors.price}</p>
                       )
                   }
                </div>
                <button type='submit'>Crear producto</button>
            </form>
            <Link to='/admin'><button>volver al administrador</button></Link>
            
        </div>
    )
}

export default ProductCreated