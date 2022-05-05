import React from 'react';
import {Link, useNavigate} from 'react-router-dom'
import { useDispatch, useSelector  } from 'react-redux';
import { useState, useEffect } from 'react';
import { postProduct, 
    getTotalProducts,
    getProductCategory,
    getProductAnimalCategory } from '../../redux/actions/adminActions';
import FileBase from 'react-file-base64';
import imgBackground from "../../assets/patrones_pet.png";
import styled from "styled-components";

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
    } else if (!input.stock || input.stock < 0) {
        error.stock = 'ingrese stock por favor'
    }
     

    return error

}

const ProductCreated = () => {
    const dispatch = useDispatch()
    const navegate = useNavigate()
    const product = useSelector((state) => state.adminReducer.products)
    console.log('esto es product', product)
    const category = useSelector((state) => state.adminReducer.categories)
    // console.log('esto es category',category)
    const animalCategory = useSelector((state) => state.adminReducer.animalCategory)
    // console.log('esto es animalCategory', animalCategory)


    const [errors, setErrors] = useState({})
    const [input, setInput] = useState({
        name: '',
        image: '',
        brand:'',
        animalCategory: '',
        category: '',
        price: '',
        subCategory: '',
        stock:'',
        delete: false
    })
    const getBaseFile = files => {
        setInput(prevInput => ({ ...prevInput, image: files.base64 }))
    }
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

    function handleChange2(e) {
        setInput({
            ...input, 
            price: e.target.value
        })
    }

    function handleSelect(e) {
        setInput({
            ...input,
            animalCategory: e.target.value + 's'
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
        } /*else if (
            product.find(e => e.data.name.toLowerCase().trim() === input.name.toLowerCase().trim())
        ) {
            return alert(`El Producto ${input.name} ya existe`)
        } */ else if (input.image.trim() === ''  ) {
            return alert ('por favor ingrese imagen')
        } else if (input.brand.trim() === '' || input.brand.search(/^[^$%&|<>#]*$/)) {
            return alert('ingrese una marca')
        } else if (input.animalCategory.trim() === '') {
            return alert('selecciona una categoria de animal por favor')
        }  else if (input.category.trim() === '') {
            return alert('selecciona una categoria por favor')
        }   else if (input.price.trim() === '' || input.price < 1 || input.price.search( /^[0-9]([.,][0-9]{1,3})?$/)) {
            return alert('precio inadecuado ')
        } else if (input.subCategory.trim() === '' || input.subCategory.search(/^[^$%&|<>#]*$/)) {
            return alert('ingrese sub categoria')
        } else if (input.stock < 0 ) {
            return alert('stock inadecuado')
        }
        // /^[0-9,$]*$/
        
        
        
        else {
            // console.log(input)
            dispatch(postProduct({...input, price: '$ ' + input.price + ',00'}))
            alert('Producto creado con exito!')
            // console.log({...input, price: '$ ' + input.price})
            setInput({
                name: '',
                image: '',
                animalCategory: '',
                category: '',
                price: '',
                subCategory: '',
                stock:'',
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

    const containerStyle = {
        backgroundImage: `url(${imgBackground})`,
        width: "100%",
        height: "100%",
    }



    return (
        <div style={containerStyle}>
            <div>
                <TitleContainer>
                <Title>Publica un nuevo producto!</Title>
                </TitleContainer>
            <br />
            <InfoForm onSubmit={e => handleSubmit(e)}>
                <FormContent>
                <div>
                    <Label > Nombre del Producto</Label>
                    <br />
                    <Input type="text"
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
                    {/* <label> Agrege una imagen </label>
                    <br /> */}
                    {/* <input type="text"
                    value={input.image}
                    name= 'image'
                    onChange={(e) => handleChange(e) }
                    placeholder='agrege imagen'
                    /> */}
                <div >
                  <Label>Agrege una foto del producto</Label>
                  <br />
                  <UploadImageContainer>
                  <FileBase
                      name='file'
                      type='file'
                      multiple={false}
                      onDone={getBaseFile}
                  />
                  </UploadImageContainer>
                </div>
                     {errors.image && (<p>{errors.image}</p>)}
                </div>
                <br />
                <div>
                    <Label >Nombre de la marca : </Label>
                    <br />
                    <Input type="text"
                    value={input.brand}
                    name='brand'
                    onChange={(e)=> handleChange(e)}
                    placeholder='Agrege marca'
                    />
                    {
                       errors.brand && (
                           <p>{errors.brand}</p>
                       )
                   }
                </div>
                <br />
                <div>
                    <Label>Elija la categora de animal</Label>
                    <Select onChange={e => handleSelect(e)}>
                       {
                           animalCategory?.map(e => (
                               <Option value={e.data.name}>{e.data.name + 's'}</Option>
                           ))
                       }

                    </Select>
                    {errors.animalCategory && (<p>{errors.animalCategory}</p>)}
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
                    <Label>Seleccione la categoria: </Label>
                    <Select onChange={e => handleSelect2(e)}>
                        <Option disabled>Seleccionar categorias: </Option>
                        {
                            category?.map((g) => (
                                <Option value={g}>{g}</Option>
                            ))
                        }
                    </Select>
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
                       {errors.category && (<p>{errors.category}</p>)}

                    </div>
                    
                </div>
                <div>
                    <Label>Agrega una Sub categoria</Label>
                    <br />
                    <Input type="text"
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
                    <Label>Agrega Precio: $</Label>
                    <br />
                    <Input type="text"
                    value= {input.price}
                    name='price'
                    onChange={(e) => handleChange2(e) }
                    placeholder='agrege precio'
                    
                    />
                       {
                       errors.price && (
                           <p>{errors.price}</p>
                       )
                   }
                </div>
                <br />
                <div>
                    <Label>Stock: </Label>
                    <br />
                    <Input type="number"
                    value=  { input.stock}
                    name='stock'
                    onChange={(e) => handleChange(e) }
                    placeholder='agrege stock'
                    
                    />
                       {
                       errors.stock && (
                           <p>{errors.stock}</p>
                       )
                   }
                </div>
                <br />
                <BtnCreated type='submit'>Crear producto</BtnCreated>

                </FormContent>
            </InfoForm>
            {/* <Link to='/admin'><button>volver al administrador</button></Link> */}
            </div>
            
        </div>
    )
}

export default ProductCreated

const TitleContainer = styled.div`
height: 60px;
width: 100%;
text-align: center;

`

const Title = styled.h1`
font-family: "Poppins";
font-style: normal;
font-weight: 600;
font-size: 35px;
margin: 0px auto;
padding-top: 18px;
color: #151515;
flex-grow: 0;
margin: 2px;
&:hover {
  color: #0acf83;
}
 `

const InfoForm = styled.form`
  box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
  margin-top: 2px;
  grid-template-rows: 1fr;
  grid-template-columns: 1fr;
  grid-row-gap: 15px;
  grid-column-gap: 2px;
  background: rgba(255, 255, 255, 0.808);
  max-width: 650px;
  max-height: 700px;
  margin-right: 30%;
  margin-left: 30%;
  padding-bottom: 100px;
  border-radius: 12px;
  padding: 15px;
  
`

const FormContent = styled.div`
  text-align: center;
  margin: auto;

`

const Label = styled.label`
margin-top: 5px;
  margin-bottom: 5px;
  font-family: "Poppins";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
`
const Input = styled.input`
width: 280px;
height: 40px;
color: black;
padding: 12px;
margin-top: 13px;
margin-bottom: 13px;
margin-right: 4px;
font-size: 12px;
font-family: "Poppins";
font-style: normal;
font-weight: 500;
background: none;
border: 1px solid #a9a9a9;
box-sizing: border-box;
border-radius: 8px;
&::-webkit-input-placeholder {
    color: #a9a9a9;
  }
`

const UploadImageContainer =  styled.div`
width: 280px;
height: 20px;
padding: 12px;
margin-top: 8px;
margin-bottom: 8px;

`

const Select = styled.select`
margin-top: 13px;
margin-bottom: 13px;
width: 280px;
height: 40px;
color: #1b1b1b;
font-size: 12px;
font-family: "Poppins";
font-style: normal;
background: none;
padding: 9px;
border: solid 1px;
border-color: #a9a9a9;
border-radius: 5px;
`

const Option = styled.option`
color: #1b1b1b;
font-size: 15px;
font-family: "Poppins";
font-style: normal;
text-align: center;
width: 280px;
height: 40px;
`

const BtnCreated = styled.button `
display: absolute;
  flex-direction: row;
  margin-top: 5px;
  position: relative;
  width: 145px;
  height: 35px;
  font-family: "Poppins";
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  color: #ffff;
  background: #0acf83;
  border: 2px solid #067a4d;
  box-sizing: border-box;
  border-radius: 8px;
  &:hover {
    color: #0acf83;
    background: #ffff;
    border: 3px solid #067a4d;
  }
`