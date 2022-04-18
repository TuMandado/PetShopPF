import React from 'react';
import "./adminProduct.css";
import Chart from "../../components/chart/Chart"
import {productData} from "../../dummyData"
import { Publish } from "@material-ui/icons";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useParams } from "react-router";
import FileBase from 'react-file-base64';



import { getDetailProducts, detailVacio } from "../../../redux/actions";
import Navbar from '../../../components/navbar/Navbar';
import AdminSidebar from '../../components/adminSidebar/AdminSidebar';



export default function Product() {
    return (
    <div >
        <Navbar/>
        <div className="container">
          <AdminSidebar /> 
    <div className="productList">
      <div className="product">
        <div className="productTitleContainer">
          <h1 className="productTitle">Producto</h1>
          <Link to="/newproduct">
            <button className="productAddButton">Crear</button>
          </Link>
        </div>
        <div className="productTop">
            {/* <div className="productTopLeft">
                <Chart data={productData} dataKey="Sales" title="Sales Performance"/>
            </div> */}
            <div className="productTopRight">
                <div className="productInfoTop">
                    <img src="https://www.timberline.com.ar/416/correa-para-2-perros.jpg"  width="200px"  />
                    <span className="productName">Correa para 2 perros</span>
                </div>
                <div className="productInfoBottom">
                    <div className="productInfoItem">
                        <span className="productInfoKey">id:</span>
                        <span className="productInfoValue">123</span>
                    </div>
                    <div className="productInfoItem">
                        <span className="productInfoKey">Precio:</span>
                        <span className="productInfoValue">$1500</span>
                    </div>
                    <div className="productInfoItem">
                        <span className="productInfoKey">activo:</span>
                        <span className="productInfoValue">si</span>
                    </div>
                    <div className="productInfoItem">
                        <span className="productInfoKey">stock:</span>
                        <span className="productInfoValue">123</span>
                    </div>
                </div>
            </div>
        </div>
        <div className="productBottom">
            <form className="productForm">
                <div className="productFormLeft">
                    <label>Nombre del Producto</label>
                    <input type="text" placeholder="Apple AirPod" />
                    <label>Stock</label>
                    <select name="inStock" id="idStock">
                        <option value="yes">si</option>
                        <option value="no">No</option>
                    </select>
                    <label>Active</label>
                    <select name="active" id="active">
                        <option value="yes">si</option>
                        <option value="no">No</option>
                    </select>
                </div>
                <div className="productFormRight">
                    <div className="productUpload">
                        <img src="https://www.timberline.com.ar/416/correa-para-2-perros.jpg" alt="" className="productUploadImg" />
                        <label for="file">
                            <Publish/>
                        </label>
                        <input type="file" id="file" style={{display:"none"}} />
                    </div>
                    <button className="productButton">Modificar</button>
                </div>
            </form>
        </div>
      </div>
      </div> 
    </div>
    </div>

    );
}
  

 {/* const AdminProduct = () => {

  const dispatch = useDispatch();
  const uid = useParams();
  console.log("uid", uid);
  const product = useSelector((state) => state.clientReducer.backupDetail);
  console.log("esto es product", product);

  const [state, setState] = useState({
        name: '',
        animalCategory: '',
        brand: '',
        price: '',
        subCategory: [],
        stock: 0,
        image: '',
    })

    const getBaseFile = files => {
        setState(prevState => ({ ...prevState, image: files.base64 }))  
    }

    useEffect(() => {
        dispatch(getDetailProducts(uid.id));
        return function () {
          dispatch(detailVacio());
        };
      }, [dispatch, uid]);


    useEffect(() => {
        if (!product.name) {
            
            setState({

                name: product ? product.name : '',
                brand: product ? product.brand : '',
                animalCategory: product ? product.animalCategory : '',
                price: product ? product.price : '',
                subCategory: product ? product.subCategory : '',
                stock: product ? product.stock : '',
                image: product ? product.image : '',

            })
        }
    }, [product])


    function hundleInputChange(e) {
        e.preventDefault()
        setState({
            ...state,
            [e.target.name]: e.target.value
        });
    }

    // function hundleInputCategory(e) {
    //     e.preventDefault()
    //     setCategory(e.target.value)
    // }

    function hundleOnSubmit(e) {
        e.preventDefault()
        console.log(uid.id, state)
        // dispatch(putProduct(id, state))
        setState({
            name: '',
            animalCategory: '',
            brand: '',
            price: '',
            subCategory:'',
            stock: '',
            image: '',
        })

    }
    
    // function hundleOnCategory(e) {
    //     setCategory(e.target.value)
    //     setState({
    //         ...state,
    //         categories: [...state.categories, categories.slice(0, -1)]
    //     });

    //     setCategory('')
    // }


    // function disabled() {
    //     return (
    //         !state.title || !state.categories ||
    //         !state.price || !state.weight || !state.descriptions ||
    //         !state.image || !state.stock)
    // }
     
    return (
        
        <div >
        <Navbar/>
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
                            <h3 className="productInfoValue">$ {product && product.price}</h3>
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
                            placeholder="nombre"
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
                                value={state.description}
                                onChange={(e) => hundleInputChange(e)}
                                name='animalCategory'
                                type="text"
                                placeholder="tipo de animal"
                            />       
                        </div>
                        <label>Marca</label>
                        <div className="addProductItem">
                            <input
                                value={state.brand}
                                onChange={(e) => hundleInputChange(e)}
                                name='brand'
                                type="text"
                                placeholder="marca"
                            />       
                        </div>
                        
                        <label>Categoria</label>
                        <input
                            onChange={(e) => hundleInputChange(e)}
                            value={state.subCategory}
                            type='text'
                            name="subCategory"
                            onKeyUp={event => {
                                if (event.key === ',') {
                                    hundleInputChange(event)
                                }
                            }}
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
                            placeholder="precio" />

                        <label>Stock</label>
                        <input
                            onChange={(e) => hundleInputChange(e)}
                            value={state.stock}
                            name='stock'
                            type="number"
                            placeholder="stock" />
                        
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

export default AdminProduct */}
