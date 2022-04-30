import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import FileBase from "react-file-base64";
import {
  getTotalPets,
  getTotalCategoryPets,
  postPets,
  getStatePet,
} from "../../redux/actions/index";
import imgBackground from "../../assets/patrones_pet.png";
import styled from "styled-components";

function validadora(input) {
  let error = {};
  if (
    !input.name ||
    input.name.length < 3 ||
    input.name.search(/^[^$%&|<>#]*$/)
  ) {
    error.name = "ingrese un nombre por favor";
  } else if (!input.owner) {
    error.owner = "ingrese el nombre del dueño";
  } else if (input.sexo === "masculino" || input.sexo === "femenino") {
    error.sexo = "se ingreso el sexo correcto?";
  } else if (input.category.length === 0) {
    error.category = "ingrese una categoria porfitas";
  } else if (!input.photos) {
    error.sexo = "ingrese una imagen porfitas";
  } else if (!input.description) {
    error.description = "ingrese una descripcion por favor";
  } else if (!input.state || input.state.search(/^[^$%&|<>#]*$/)) {
    error.state = "ingrese un estado";
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
    delete: false,
  });

  const getBaseFile = (files) => {
    setInput((input) => ({ ...input, photos: files.base64 }));
  };

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
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

  function handleSelect3 (e) {
    setInput({
      ...input,
      sexo: e.target.value
    })
  }

  // function handleDelete (e) {
  //     setInput({
  //         ...input,
  //         category: input.category.filter(category => category !== e)
  //     })

  // }

  function handleSubmit(e) {
    e.preventDefault();
    if (input.name.trim() === "" || input.name.search(/^[^$%&|<>#]*$/)) {
      return alert("Ingrese nombre adecuado");
    } else if (
      pets.find(
        (e) =>
          e.data.name.toLowerCase().trim() === input.name.toLowerCase().trim()
      )
    ) {
      return alert(`El Producto ${input.name} ya existe`);
    } else if (
      input.owner.trim() === "" ||
      input.owner.search(/^[^$%&|<>#]*$/)
    ) {
      return alert("por favor ingrese dueño");
    } else if (input.sexo.trim() === "" || input.sexo.search(/^[^$%&|<>#]*$/)) {
      return alert("por favor ingrese sexo adecuado");
    } else if (input.category.trim() === "") {
      return alert("selecciona una categoria de animal por favor");
    } else if (
      input.photos.trim() === "" 
    ) {
      return alert("Por favor, Carga una imagen");
    } else if (
      input.description.trim() === "" ||
      input.description.search(/^[^$%&|<>#]*$/)
    ) {
      return alert(
        "por favor ingrese descripcion o ingrese una descripcion adecuada"
      );
    } else if (input.state.trim() === "") {
      return alert(
        "por favor ingrese el estado en el que se encuentra su mascota "
      );
    } else {
      console.log(input);
      dispatch(postPets(input));
      alert("Animal creado con exito!");
      setInput({
        name: "",
        owner: "",
        sexo: "",
        description: "",
        photos: "",
        ubicacion: "",
        state: "",
        category: "",
        delete: false,
      });
      navigate("/pets");
    }
  }

  useEffect(() => {
    dispatch(getTotalPets());
    dispatch(getTotalCategoryPets());
    dispatch(getStatePet());
  }, [dispatch]);

  const containerStyle = {
    backgroundImage: `url(${imgBackground})`,
    width: "100%",
    height: "100%",
  };

  return (
    <div style={containerStyle}>
      <div>
        <TitleContainer>
          <Title>¡Publica una mascota!</Title>
        </TitleContainer>

        <br />
        <InfoForm onSubmit={(e) => handleSubmit(e)}>
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
            <BtnToPets onClick={()=>window.history.back()}> Volver </BtnToPets>
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
  max-height: 700px;
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
    cursor:pointer
  }
`;

const BtnToPets = styled.button`
  display: absolute;
  flex-direction: row;
  margin-top: 5px;
  position: relative;
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
    cursor:pointer
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
