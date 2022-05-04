import React from "react";
import axios from "axios";

const API_KEY = `14b18b363e37b42c3c4ca85a63bfe1a6`;

const postMap = async (number, street, city, country) => {
  console.log("ENTRO EN POSTMAP=>", number, street, city);
  const numberEntero = Number(number);
  let dataMap = await axios({
    method: "GET",
    url: `http://api.positionstack.com/v1/forward?access_key=${API_KEY}&query=${numberEntero} ${street}, ${city}`,
  })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.log("Este es el error del map =>", error);
    });
  //   console.log("DATAMAP=>", dataMap.data.data);
  const dataMapFilter = await dataMap.data.data.filter(
    (e) => e.country === country
  );
  console.log("DATA FILTER=>", dataMapFilter);
  return dataMapFilter;
};
// 1600 Pennsylvania Ave NW, Washington DC
export default postMap;
