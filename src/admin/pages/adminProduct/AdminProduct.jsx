import React from 'react';
import "./adminProduct.css";
// import Chart from "../../components/chart/Chart"
// import {productData} from "../../dummyData"
import { Publish } from "@material-ui/icons";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from 'react-router';
import FileBase from 'react-file-base64';

import { getDetailProducts} from "../../../redux/actions";
// import { getDetailProducts } from "../../../redux/actions/adminActions";
import NavAdmin from "../../../components/navbar/NavAdmin";
import AdminSidebar from '../../components/adminSidebar/AdminSidebar';
import { putProduct } from '../../../redux/actions/adminActions';


  const AdminProduct = () => {
    const user = useSelector((state) => state.clientReducer.user);
    // If user role is not Admin, redirect to the home page
    useEffect(() => {
      console.log("user :",user);
      if (user && Object.keys(user).length > 0 && user.role.toLowerCase() !== "admin") {
        window.location.href = "/";
      }
      if (!user) {
        window.location.href = "/";
      }
    }, [user]);

    const dispatch = useDispatch();
    const navigate = useNavigate()
    const uid = useParams().productId;
    const product = useSelector((state) => state.clientReducer.details);

  useEffect(() => {
    dispatch(getDetailProducts(uid));
    console.log("uid 💥:", uid);
    
  }, [dispatch, uid]);

  const [state, setState] = useState({})

    const getBaseFile = files => {
        setState(prevState => ({ ...prevState, image: files.base64 }))  
    }

    useEffect(() => { 
            setState({

                name: product.name ? product.name : '',
                brand: product.brand ? product.brand : '',
                animalCategory: product.animalCategory ? product.animalCategory : '',
                price: product.price ? product.price : '',
                subCategory: product.subCategory ? product.subCategory : '',
                stock: product.stock ? product.stock : '',
                image: product.image ? product.image : '',
                delete: product.delete ? product.delete: false,
                description: product.description ? product.description : ''
            })
    }, [product])

    function hundleInputChange(e) {
        e.preventDefault()
        setState({
            ...state,
            [e.target.name]: e.target.value,
            delete: e.target.value== 1? true : false,
        });
    }

    // function hundleInputCategory(e) {
    //     e.preventDefault()
    //     setCategory(e.target.value)
    // }

    function hundleOnSubmit(e) {
      e.preventDefault()
      console.log(uid.id, state)
      dispatch(putProduct(uid, state))
      setState({
          name: '',
          animalCategory: '',
          brand: '',
          price: '',
          subCategory:'',
          stock: '',
          image: '',
          delete: false,
          description: ''
      }) 
      alert("Ha sido modificado con exito")
      navigate("/adminProducts")
    }

    // function disabled() {
    //     return (
    //         !state.title || !state.categories ||
    //         !state.price || !state.weight || !state.descriptions ||
    //         !state.image || !state.stock)
    // }
     
    return (
        
        <div >
        <NavAdmin/>
        <div className="container">
          <AdminSidebar /> 
        <div className="product">
            <div className="productTitleContainer">
                <h1 className="productTitle">Producto</h1>

            </div>
            <div className="productTop">
                <div className="productTopRight">
                    <div className="productInfoTop">
                        <img src={product && product.image} alt="https://imgur.com/lhLYKao" className="productInfoImg" />
                        <div className="productInfoBottom">
                            <span className="productName">{product && product.name}</span>
                            <h3 className="productInfoValue">{product && product.price}</h3>
                            <span className="productInfoKey">tipo de animal: </span>
                            <h5 className="productInfoValue">{product && product.animalCategory}</h5>
                            <span className="productInfoKey">marca: </span>
                            <h5 className="productInfoValue">{product && product.brand}</h5>
                            
                        </div>
                    </div>
                    <div className="productInfoBottom">
                        <div className="productInfoItem">
                            <span className="productInfoKey">Categoria:  </span>
                            <span className="productInfoValue">  {product && ' '+ product.subCategory + ' '}</span>
                        </div>
                        <div className="productInfoItem">
                            <span className="productInfoKey">id:</span>
                            <span className="productInfoValue">{product && product.id}</span>
                        </div>
                        <div className="productInfoItem">
                            <span className="productInfoKey">Stock:</span>
                            <span className="productInfoValue">{product && product.stock}</span>
                        </div>
                        <div className="productInfoItem">
                            <span className="productInfoKey">Activo:</span>
                            <span className="productInfoValue">{product && product.delete?"No":"Si"}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="productBottom">

                <form
                    onSubmit={(e) => hundleOnSubmit(e)}
                    className="productForm"
                >
                    <div className="productFormLeft">
                        <label>Nombre</label>
                        <input
                            onChange={(e) => hundleInputChange(e)}
                            value={state.name}
                            type="text"
                            name='name'
                            placeholder={state.name}
                            />

                        <label>Descripción</label>
                        <input
                            onChange={(e) => hundleInputChange(e)}
                            value={state.description}
                            type="text"
                            name='description'
                            placeholder={state.description}
                            />

                        <label>Imagen</label>
                        <div >
                            <FileBase
                                name='file'
                                type='file'
                                multiple={false}
                                onDone={getBaseFile}
                            />
                        </div>

                        <label>Tipo de animal</label>
                        <div className="addProductItem">
                            <input
                                value={state.animalCategory}
                                onChange={(e) => hundleInputChange(e)}
                                name='animalCategory'
                                type="text"
                                placeholder={state.animalCategory}
                            />       
                        </div>
                        <label>Marca</label>
                        <div className="addProductItem">
                            <input
                                value={state.brand}
                                onChange={(e) => hundleInputChange(e)}
                                name='brand'
                                type="text"
                                placeholder={state.brand}
                            />       
                        </div>
                        
                        <label>Categoria</label>
                        <input
                            onChange={(e) => hundleInputChange(e)}
                            value={state.subCategory}
                            type='text'
                            name={state.subCategory}
                           
                        />
                        <div>
                            <label>{state.categories + ' '}</label>
                        </div>

                        <label>Precio</label>
                        <input
                            onChange={(e) => hundleInputChange(e)}
                            value={state.price}
                            name='price'
                            type="text"
                            placeholder={state.price} />

                        <label>Stock</label>
                        <input
                            onChange={(e) => hundleInputChange(e)}
                            value={state.stock}
                            name='stock'
                            type="number"
                            placeholder={state.stock} />

                        <div className="addProductItem">
                           <label>Activo</label>
                             <select name='delete' id='active' onChange={(e) => hundleInputChange(e)}>
                                <option value={0}> Si </option>
                                <option value={1}> No </option>
                             </select>
                        </div>
                        
                            <button
                                className="productAddButton"
                                type='submit'
                            >
                                Modificar
                            </button>
                        
                    </div>
                </form>
            </div>
        </div>
        </div>
        </div>
    );
}

export default AdminProduct 
