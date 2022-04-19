import React from 'react';
import {Link,useNavigate} from 'react-router-dom'
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTotalPets, getTotalCategoryPets, postPets} from '../../redux/actions/index';



const PetCreated = ()=> {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const pets = useSelector((state) => state.clientReducer.pets)
    console.log('esto es pets', pets)
    const petsCategory = useSelector((state) => state.clientReducer.categoryPets)
    console.log('esto es petsCategory', petsCategory)

    const [errors, setErrors] = useState({})
    const [input, setInput] = useState({
        name : '',
        owner : '',
        sexo: '',
        description: '',
        photos: '',
        ubicacion : '',
        category:[]
    })

    function handleChange(e) {
        setInput({
            ...input,
            [e.target.name] : e.target.value
        })
        console.log(input)
    }

    function handleSelect(e) {
        setInput({
            ...input,
            category: input.category.includes(e.target.value)? 
            input.category :
            [...input.category, e.target.value]
        })
    }

    function handleDelete (e) {
        setInput({
            ...input,
            category: input.category.filter(category => category !== e)
        })

    }

    function handleSubmit(e) {
        e.preventDefault()
        if(input.name.trim() === '') {
            return alert('Ingrese un nombre')
    } else {
        console.log(input)
        dispatch(postPets(input))
        alert('Animal creado con exito!')
        setInput({
            name : '',
            owner : '',
            sexo: '',
            description: '',
            photos: '',
            ubicacion : '',
            category:[]
        })
        navigate('/pets')
    }
}


    useEffect(() => {
        dispatch(getTotalPets());
        dispatch(getTotalCategoryPets())

    },[dispatch])

    return (
        <div>
           <div>
               <h1>Publica tu mascota perdida!</h1>
               <br />
               <form onSubmit={e => handleSubmit(e)}>
                   <div>
                   <label> Nombre de la mascota: </label>
                   <br />
                   <input type="text"
                   value={input.name}
                   name='name'
                   placeholder='Nombre de la mascota'
                   onChange={e => handleChange(e)}
                   
                   />

                   </div>
                   <div>
                       <label>Dueño: </label>
                       <br />
                       <input type="text"
                       value={input.owner}
                       name= 'owner'
                       placeholder='nombre del dueño'
                       onChange={e => handleChange(e)}

                       />
                   </div>
                   <div>
                       <label >Sexo: </label>
                       <br />
                       <input type="text"
                       value={input.sexo}
                       name='sexo'
                       placeholder='elige el sexo de la mascota'
                       onChange={e => handleChange(e)}
                       />
                   </div>
                   <div>
                       <select onChange={e => handleSelect(e)}>
                           <option disabled> Seleccion de categoria</option>
                           {
                               petsCategory?.map(e => (
                                   <option value={e.data}> {e.data}</option>
                               ))
                           }
                       </select>
                       <ul>
                           <li>
                               {input.category.map((e) => (
                                  <div>
                                      {e + ' '}
                                      <button type='button' onChange={() => handleDelete(e)}>
                                          X
                                      </button>
                                  </div>
                               ))}
                           </li>
                       </ul>
                   </div>
                   <div>
                       <label >Agrege una imagen de su mascota</label>
                       <br />
                       <input type="text"
                       value={input.photos}
                       name= 'photos'
                       placeholder='agregue una imagen de su mascota'
                       onChange={e => handleChange(e)}
                       />

                   </div>
                   <div>
                   <label >Agrege una Descripcion</label>
                       <br />
                       <input type="text"
                       value={input.description}
                       name= 'description'
                       placeholder='agregue una descripcion'
                       onChange={e => handleChange(e)}
                       />
                   </div>
                   <button type='submit'>Crear Mascota</button>
               </form> 
               <Link to='/pets'>
               
               <button> Volver a mascotas</button>
               </Link>
           </div>

        </div>
    )
}

export default PetCreated