import React, { useRef, useEffect, useState } from 'react';
import styled from "styled-components";

import mapboxgl from 'mapbox-gl'; 
mapboxgl.accessToken = 'pk.eyJ1IjoiZWxwZXRzaG9wIiwiYSI6ImNsMjlncGJxbDBqNDkzanI0cnVybXd6ZmgifQ.uaeW8vMBaz9ycj-wvzbMIg';

const MapContainer = {
    height: "400px",
    weight: "auto",

};

const SidebarComponent = styled.div`
    background-color: rgba(35, 55, 75, 0.9);
    color: #fff;
    padding: 6px 12px;
    font-family: monospace;
    z-index: 1;
    position: absolute;
    top: 0;
    left: 0;
    margin: 12px;
    border-radius: 4px; 
`;

const Map = ()=>{
    const mapContainer = useRef(null) ;
    const map = useRef(null);
    const [lng, setLng] = useState(-70.9);
    const [lat, setLat] = useState(42.35);
    const [zoom, setZoom] = useState(9);
     
    useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
    container: mapContainer.current,
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [lng, lat],
    zoom: zoom
    });
    });
     
    useEffect(() => {
    if (!map.current) return; // wait for map to initialize
    map.current.on('move', () => {
    setLng(map.current.getCenter().lng.toFixed(4));
    setLat(map.current.getCenter().lat.toFixed(4));
    setZoom(map.current.getZoom().toFixed(2));
    });
    });
    
     
    return (
    <div>
    
    <SidebarComponent>
    Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
    </SidebarComponent>
    
    {/* <MapContainer innerRef={mapContainer}/> */}
        
    
    <div style={MapContainer} ref={mapContainer}  />
    </div>
    );
}

export default Map