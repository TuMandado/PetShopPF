import React from 'react';
import {Link,useNavigate} from 'react-router-dom'
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTotalPets, getTotalCategoryPets, postPets} from '../../redux/actions/index';

function validadora (input) {
    let error = {}
    if(!input.name || input.name.length <3) {
        error.name = 'ingrese un nombre por favor'
    } else if (!input.owner) {
        error.owner = 'ingrese el nombre del dueño'
    } else if ((input.sexo === 'masculino') || (input.sexo === 'femenino')) {
        error.sexo = 'se ingreso el sexo correcto?'
    } else if (input.category.length === 0) {
        error.category = 'ingrese una categoria porfitas'
    } else if (!input.photos) {
        error.sexo = 'ingrese una imagen porfitas'
    } else if (!input.description) {
        error.description = 'ingrese una descripcion por favor'
    } 

    return error

}

const PetCreated = ()=> {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    let pets = useSelector((state) => state.clientReducer.pets)
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
        state: '',
        category:'',
        delete: false
    })

    function handleChange(e) {
        setInput({
            ...input,
            [e.target.name] : e.target.value
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
        if(input.name.trim() === '' ||  input.name.search(/^[^$%&|<>#]*$/)) {
            return alert('Ingrese nombre adecuado')
    }  else if (
        pets.find(e => e.data.name.toLowerCase().trim() === input.name.toLowerCase().trim())
    ) {
        return alert(`El Producto ${input.name} ya existe`)
    } else if (input.owner.trim() === ''||  input.name.search(/^[^$%&|<>#]*$/) ) {
        return alert ('por favor ingrese dueño')
    } else if (input.sexo.trim() === ''||  input.name.search(/^[^$%&|<>#]*$/) ) {
        return alert ('por favor ingrese sexo adecuado')
    } else if (input.category.trim() === '') {
        return alert('selecciona una categoria de animal por favor')
    } 
    
    
    
    else {
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
            state: '',
            category:'',
            delete:false
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
                   {
                       errors.name && (
                           <p>{errors.name}</p>
                       )
                   }

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
                       {
                       errors.owner && (
                           <p>{errors.owner}</p>
                       )
                   }
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
                       {/* {<h3> {input.sexo? false : <p>se necesita un sexo</p>}</h3>} */}
                        {
                       errors.sexo && (
                           <p>{errors.sexo}</p>
                       )
                   }
                   </div>
                   <div>
                       <select onChange={e => handleSelect(e)}>
                           <option disabled> Seleccion de categoria</option>
                           {
                               petsCategory?.map(e => (
                                   <option value={e.data.name}> {e.data.name}</option>
                               ))
                           }
                       </select>
                       {/* <ul>
                           <li>
                               {input.category.map((e) => (
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
                   <div>
                       <label >Agrege una imagen de su mascota</label>
                       <br />
                       <input type="text"
                       value={input.photos}
                       name= 'photos'
                       placeholder='agregue una imagen de su mascota'
                       onChange={e => handleChange(e)}
                       />
                       {
                                errors.photos && (
                                    <p>{errors.photos}</p>
                                )
                       }

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
                           {
                               
                               errors.description && (
                                <p>{errors.description}</p>
                            )

                           }
                   </div>
                   <div>
                       <select >
                           <option disabled > Seleccione su estado</option>
                       </select>
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