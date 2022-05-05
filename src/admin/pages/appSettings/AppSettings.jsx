import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../../../components/navbar/Navbar";
import AdminSidebar from "../../components/adminSidebar/AdminSidebar";
import styled from "styled-components";
import { setSettings } from "../../../redux/actions"; // Change the settings in the redux store
import { editSettingValues } from "../../../firebase/Settings"; // Change the settings in the firebase database

import "./adminHome.css";

// The AppSettings component is in charge of modifying the app settings

// The settings structure is the following:
// settings: {
//   useSalesAnalytics: false,
//   productsWeights: {
//     sales: 0.5,
//     hoverOnDetails: '0.5',
//     hoverOnCard: 0.5
//   },
//   useProductsHoverAnalytics: false,
//   useVisitsAnalytics: false,
//   useVisitDurationAnalytics: false
// }
const AppSettings = () => {
  var dispatch = useDispatch();
  var settings = useSelector((state) => state.clientReducer.settings);
  var [newSettings, setNewSettings] = useState({});

  // When settings is loaded, set the newSettings state
  useEffect(() => {
    if (settings && Object.keys(settings).length > 0) {
      console.log("LLego aqui");
      if (Object.keys(newSettings).length == 0) {
        setNewSettings(settings);
      }
    }
  }, [settings]);

  // // Console.log the settings
  // useEffect(() => {
  //   console.log("settings :", settings);
  // }, [settings]);

  // // Console.log the newSettings
  // useEffect(() => {
  //   console.log("newSettings :", newSettings);
  // }, [newSettings]);

  const checked = (value) => {
    return value ? "checked" : "";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    editSettingValues(newSettings)
      .then(() => {
        dispatch(setSettings(newSettings));
      })
      .then(() => {
        alert("Settings updated successfully");
      })
      .catch(() => {
        alert("Error updating settings");
      });
  };
  return (
    <div>
      <Navbar />
      <div className="container">
        <AdminSidebar />
        <div className="petList">
          <TitleContainer>
            <Title>Modifica las analiticas de tu App</Title>
          </TitleContainer>
          <br />
          <InfoForm onSubmit={(e) => handleSubmit(e)}>
            <FormContent>
              <div
                style={{
                  // Items should be aligned horizontally
                  display: "flex",
                  flexDirection: "row",
                  // Space between the items should be the maximum possible
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Label>Usar analiticas de ventas</Label>
                <Input
                  type="checkbox"
                  name="useSalesAnalytics"
                  checked={checked(newSettings.useSalesAnalytics)}
                  onChange={(e) => {
                    setNewSettings({
                      ...newSettings,
                      useSalesAnalytics: e.target.checked,
                    });
                  }}
                />
              </div>
              <div
                style={{
                  // Items should be aligned horizontally
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Label>Usar analiticas de productos</Label>
                <Input
                  type="checkbox"
                  name="useProductsHoverAnalytics"
                  checked={checked(newSettings.useProductsHoverAnalytics)}
                  onChange={(e) => {
                    setNewSettings({
                      ...newSettings,
                      useProductsHoverAnalytics: e.target.checked,
                    });
                  }}
                />
              </div>
              <div
                style={{
                  // Items should be aligned horizontally
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Label>Usar analiticas de visitas</Label>
                <Input
                  type="checkbox"
                  name="useVisitsAnalytics"
                  checked={checked(newSettings.useVisitsAnalytics)}
                  onChange={(e) => {
                    setNewSettings({
                      ...newSettings,
                      useVisitsAnalytics: e.target.checked,
                    });
                  }}
                />
              </div>
              <div
                style={{
                  // Items should be aligned horizontally
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Label>Usar analiticas de duración de visitas</Label>
                <Input
                  type="checkbox"
                  name="useVisitDurationAnalytics"
                  checked={checked(newSettings.useVisitDurationAnalytics)}
                  onChange={(e) => {
                    setNewSettings({
                      ...newSettings,
                      useVisitDurationAnalytics: e.target.checked,
                    });
                  }}
                />
              </div>
            </FormContent>
            <BtnCreated type="submit">Guardar</BtnCreated>
          </InfoForm>
        </div>
      </div>
    </div>
  );
};

export default AppSettings;

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
`;

const FormContent = styled.div`
  text-align: center;
  margin: auto;
`;

const Label = styled.label`
  width: 100%;
  margin-top: 5px;
  margin-bottom: 5px;
  font-family: "Poppins";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
`;
const Input = styled.input`
  width: 280px;
  height: 20px;
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

const UploadImageContainer = styled.div`
  width: 280px;
  height: 20px;
  padding: 12px;
  margin-top: 8px;
  margin-bottom: 8px;
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

const Option = styled.option`
  color: #1b1b1b;
  font-size: 15px;
  font-family: "Poppins";
  font-style: normal;
  text-align: center;
  width: 280px;
  height: 40px;
`;

const BtnCreated = styled.button`
  display: absolute;
  -webkit-flex-direction: row;
  -ms-flex-direction: row;
  flex-direction: row;
  margin-top: 5px;
  margin-left: 30%;
  position: relative;
  width: 40%;
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
`;