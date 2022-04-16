import React from "react";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Navbar } from "../navbar/Navbar";
import { Loader } from "../../page/loader/Loader";
import Footer from "../../components/footer/Footer";
import { getDetailProducts, detailVacio } from "../../redux/actions";

const ProductDetail = () => {
  const dispatch = useDispatch();
  const uid = useParams();
  console.log("uid", uid);

  useEffect(() => {
    dispatch(getDetailProducts(uid.id));
    return function () {
      dispatch(detailVacio());
    };
  }, [dispatch, uid]);

  const product = useSelector((state) => state.clientReducer.backupDetail);
  console.log("esto es product", product);

  if (!product.name) {
    return (
      <div>
        <div>
          <Navbar />
        </div>
        <div>
          <Loader />
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div>
        <h1>{product.name}</h1>
      </div>
      <div>
        <img src={product.image} alt="imagen not found" />
      </div>
      <div>
        <span>{product.animalCategory}</span>
      </div>
      <div>
        <p>{product.brand}</p>
      </div>
      <div>
        <p>{product.price}</p>
      </div>
      <div>
        <p>{product.subCategory}</p>
      </div>
      <div>
        <Link to="/">
          <button>Ir al Home</button>
        </Link>
      </div>
      <Footer />
    </div>
  );
};

export default ProductDetail;
