import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import FileBase from "react-file-base64";
import postMap from "../../firebase/Map/index";
import Swal from "sweetalert2";
import {
  getTotalPets,
  getTotalCategoryPets,
  postPets,
  getStatePet,
} from "../../redux/actions/index";
import imgBackground from "../../assets/patrones_pet.png";
import styled from "styled-components";

// import { getDetailUser } from "../../redux/actions/adminActions"

function validadora(input) {
  let error = {};
  if (
    !input.name ||
    input.name.length < 3 ||
    input.name.search(/^[^$%&|<>#]*$/)
  ) {
    error.name = "Debes ingresar un nombre. ¡Solo debe contener letras!";
  } else if (!input.owner) {
    error.owner = "Por favor, ingresa el nombre del dueño.";
  } else if (input.sexo === "masculino" || input.sexo === "femenino") {
    error.sexo = "¿Se ingreso el sexo correcto?";
  } else if (input.category.length === 0) {
    // error.category = "Por favor, Ingresa una categoria.";
  } else if (!input.photos) {
    error.sexo = "Falta ingresar una imagen";
  } else if (!input.description) {
    error.description = "Ingrese una descripcion por favor.";
  } else if (!input.number) {
    error.number = "Ingresa la altura de la calle.";
  } else if (!input.street) {
    error.street = "Ingresa en nombre de la calle.";
  } else if (!input.city) {
    error.city = "Ingresa el nombre de la ciudad.";
  } else if (!input.state || input.state.search(/^[^$%&|<>#]*$/)) {
    error.state = "¿En qué estado se encuentra la mascota?";
  }

  return error;
}

const PetCreated = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let pets = useSelector((state) => state.clientReducer.pets);
  console.log("esto es pets", pets);
  const petsCategory = useSelector((state) => state.clientReducer.categoryPets);
  // console.log('esto es petsCategory', petsCategory)
  const state = useSelector((state) => state.clientReducer.statePets);
  console.log("esto es statePets", state);
  const user = useSelector((state) => state.clientReducer.user);
  console.log("user", user);

  const [errors, setErrors] = useState({});

  const [input, setInput] = useState({
    name: "",
    owner: "",
    sexo: "",
    description: "",
    photos: "",
    ubicacion: "",
    state: "",
    category: "",
    city: "",
    street: "",
    country: "Argentina",
    number: "",
    lat: "",
    lng: "",
    userId: "",
    userPhone: "",
    userOwnName: "",
    delete: false,
  });

  // useEffect(() => {
  //   dispatch(getDetailUser());

  // },[])

  const getBaseFile = (files) => {
    setInput((input) => ({ ...input, photos: files.base64 }));
  };

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
      userId: user.uid,
      userPhone: user.phoneNumber,
      userOwnName: user.name,
    });
    setErrors(
      validadora({
        ...input,
        [e.target.name]: e.target.value,
      })
    );

    console.log(input);
  }

  function handleSelect(e) {
    setInput({
      ...input,
      category: e.target.value,
    });
  }

  function handleSelect2(e) {
    setInput({
      ...input,
      state: e.target.value,
    });
  }

  function handleSelect3(e) {
    setInput({
      ...input,
      sexo: e.target.value,
    });
  }

  // function handleDelete (e) {
  //     setInput({
  //         ...input,
  //         category: input.category.filter(category => category !== e)
  //     })

  // }

  const getLocation = async (number, street, city) => {
    if (number && street && city) {
      console.log("INGRESO =>", number, street, city);
      return await postMap(number, street, city, "Argentina");
    } else {
      console.log("ERROR");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (input.name.trim() === "" || input.name.search(/^[^$%&|<>#]*$/)) {
      return Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Por favor, ingresa un nombre.¡Recordá que solo debe contener letras!",
        showConfirmButton: true,
      });
    } /* else if (
      pets.find(
        (e) =>
          e.data.name.toLowerCase().trim() === input.name.toLowerCase().trim()
      )
    ) {
      return Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `La mascota ${input.name} ya existe. ¡Intenta uno parecido!`,
        showConfirmButton: true,
      });
    }*/ else if (
      input.owner.trim() === "" ||
      input.owner.search(/^[^$%&|<>#]*$/)
    ) {
      return Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Por favor, ingrese el nombre del dueño.",
        showConfirmButton: true,
      });
    } else if (input.sexo.trim() === "" || input.sexo.search(/^[^$%&|<>#]*$/)) {
      return Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Ingresa el sexo adecuado.",
        showConfirmButton: true,
      });
    } else if (input.category.trim() === "") {
      return Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Por favor, selecciona una categoria de animal.",
        showConfirmButton: true,
      });
    } else if (input.photos.trim() === "") {
      return Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Falta una iamgen. ¡Intenta cargarla!.",
        showConfirmButton: true,
      });
    } else if (
      input.description.trim() === "" ||
      input.description.search(/^[^$%&|<>#]*$/)
    ) {
      return Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Por favor, ingrese una descripcion adecuada.",
        showConfirmButton: true,
      });
    } else if (input.state.trim() === "") {
      return Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Por favor, ingrese el estado de su mascota.",
        showConfirmButton: true,
      });
    } else if (input.number.trim() === "") {
      return Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Por favor, ingresa la altura de la calle.",
        showConfirmButton: true,
      });
    } else if (input.street.trim() === "") {
      return Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Por favor, ingresa el nombre de la calle.",
        showConfirmButton: true,
      });
    } else if (input.city.trim() === "") {
      return Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Debes ingreasr el nombre de la ciudad.",
        showConfirmButton: true,
      });
    } else {
      console.log(
        "INPUTS PARA GEOLOC=>",
        input.number,
        input.street,
        input.city
      );
      const geo = await getLocation(input.number, input.street, input.city);
      dispatch(
        postPets({ ...input, lat: geo[0].latitude, lng: geo[0].longitude })
      );
      Swal.fire({
        position: "center",
        icon: "success",
        title: "¡Excelente!",
        text: "Mascota creada con éxito.",
        showConfirmButton: true,
      });
      if (user) {
        setInput({
          name: "",
          owner: "",
          sexo: "",
          description: "",
          photos: "",
          ubicacion: "",
          state: "",
          category: "",
          userId: "",
          city: "",
          street: "",
          lat: "",
          lng: "",
          country: "Argentina",
          number: "",
          delete: false,
          userPhone: "",
          userOwnName: "",
        });
      }
      navigate("/pets");
    }
  };
  console.log("ES INPUT=>", input);

  useEffect(() => {
    dispatch(getTotalPets());
    dispatch(getTotalCategoryPets());
    dispatch(getStatePet());
  }, [dispatch]);

  const containerStyle = {
    backgroundImage: `url(${imgBackground})`,
    width: "100%",
    height: "120vh",
  };

  const btnStyle = {
    height: "36px",
    width: "105px",
  };

  return (
    <div style={containerStyle}>
      <div>
        <TitleContainer>
          <Title>¡Publica una mascota!</Title>
        </TitleContainer>

        <br />
        <InfoForm onSubmit={handleSubmit}>
          <FormContent>
            <div>
              <Label> ¿Cómo se llama? </Label>
              <br />
              <Input
                type="text"
                value={input.name}
                name="name"
                placeholder="Nombre de la mascota"
                onChange={(e) => handleChange(e)}
              />
              {errors.name && <p>{errors.name}</p>}
            </div>
            <div>
              <Label>Dueño: </Label>
              <br />
              <Input
                type="text"
                value={input.owner}
                name="owner"
                placeholder="Nombre del dueño"
                onChange={(e) => handleChange(e)}
              />
              {errors.owner && <p>{errors.owner}</p>}
            </div>
            <div>
              <Label>Ciudad: </Label>
              <br />
              <Input
                type="text"
                value={input.city}
                name="city"
                placeholder="Tu ciudad"
                onChange={(e) => handleChange(e)}
              />
              {errors.city && <p>{errors.city}</p>}
            </div>
            <div>
              <Label>Calle: </Label>
              <br />
              <Input
                type="text"
                value={input.street}
                name="street"
                placeholder="Tu calle"
                onChange={(e) => handleChange(e)}
              />
              {errors.street && <p>{errors.street}</p>}
            </div>
            <div>
              <Label>Numero de calle: </Label>
              <br />
              <Input
                type="number"
                value={input.number}
                name="number"
                placeholder="Altura de la calle"
                onChange={(e) => handleChange(e)}
              />
              {errors.number && <p>{errors.number}</p>}
            </div>
            <div>
              <Label>Sexo: </Label>
              <br />
              <Select defaultValue="Elegir" onChange={(e) => handleSelect3(e)}>
                <Options disabled>Elegir</Options>
                <Options value="male">Male</Options>
                <Options value="female">Female</Options>
              </Select>
              {/* {<h3> {input.sexo? false : <p>se necesita un sexo</p>}</h3>} */}
              {errors.sexo && <p>{errors.sexo}</p>}
            </div>
            <div>
              <Label>¿Qué animal es? </Label>
              <br />
              <Select defaultValue="Elegir" onChange={(e) => handleSelect(e)}>
                <Options disabled>Elegir</Options>
                {petsCategory?.map((e) => (
                  <Options value={e.data.name}> {e.data.name}</Options>
                ))}
              </Select>
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
              {errors.category && <p>{errors.category}</p>}
            </div>
            <div>
              <Label>¿Cuál es el estado de la mascota?</Label>
              <br />
              <Select defaultValue="Elegir" onChange={(e) => handleSelect2(e)}>
                <Options disabled>Elegir</Options>
                {state?.map((e) => (
                  <Options> {e}</Options>
                ))}
              </Select>
            </div>
            <div>
              <Label>Agrega una foto de la mascota</Label>
              <br />
              <UploadImageContainer>
                <FileBase
                  name="file"
                  type="file"
                  multiple={false}
                  onDone={getBaseFile}
                />
              </UploadImageContainer>

              {errors.photos && <p>{errors.photos}</p>}
            </div>

            <div>
              <Label>¡Contanos sobre la mascota!</Label>
              <br />
              <InputDescription
                type="text"
                value={input.description}
                name="description"
                placeholder="Agrega una descripcion corta."
                onChange={(e) => handleChange(e)}
              />
              {errors.description && <p>{errors.description}</p>}
            </div>
            <BtnToCreate type="submit">Publicar ahora</BtnToCreate>
          </FormContent>
        </InfoForm>
        <BtnContainer>
          <BtnToPets onClick={() => window.history.back()}> {"<"} Volver </BtnToPets>
        </BtnContainer>
      </div>
    </div>
  );
};

export default PetCreated;

const TitleContainer = styled.div`
  height: 60px;
  width: 100%;
  text-align: center;
`;

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
`;

const FormContent = styled.div`
  text-align: center;
  margin: auto;
`;

const InfoForm = styled.form`
  box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
  margin-top: 2px;
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 1fr;
  grid-row-gap: 15px;
  grid-column-gap: 2px;
  background: rgba(255, 255, 255, 0.808);
  max-width: 650px;
  margin-right: 30%;
  margin-left: 30%;
  padding-bottom: 100px;
  border-radius: 12px;
  padding: 15px;
`;

const UploadImageContainer = styled.div`
  width: 280px;
  height: 20px;
  padding: 12px;
  margin-top: 8px;
  margin-bottom: 8px;
`;

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
`;

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
`;

const Options = styled.option`
  color: #1b1b1b;
  font-size: 15px;
  font-family: "Poppins";
  font-style: normal;
  text-align: center;
  width: 280px;
  height: 40px;
`;

const InputDescription = styled.textarea`
  width: 280px;
  height: 130px;
  resize: none;
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
  overflow: scroll
  
  &::-webkit-input-placeholder {
    color: #a9a9a9;
    padding: 12px;
    resize: none;
  }
`;

const BtnContainer = styled.div`
  height: 50px;
  width: 100%;
  text-align: center;
  padding-top: 10px;
`;

const BtnToCreate = styled.button`
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
    cursor: pointer;
  }
`;

const BtnToPets = styled.button`
position: absolute;
top: 9%;
left: 20%;
  margin-top: 5px;
  width: 105px;
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
    cursor: pointer;
  }
`;

const Label = styled.label`
  margin-top: 5px;
  margin-bottom: 5px;
  font-family: "Poppins";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
`;
