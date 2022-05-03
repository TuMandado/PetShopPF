import React, { useEffect, useState } from "react";
import { Map, Marker } from "pigeon-maps";

// Use example
{
  /* <Mapa
showUserLocation={true}
locations={[
  {
    lat: -34.9197759,
    lng: -57.9155082,
  },
  {
    lat: -34.8889696,
    lng: -57.9567196,
  },
  {
    lat: -34.9230944,
    lng: -57.993551,
  },
  {
    lat: -34.9536113,
    lng: -57.952585,
  },
]}
height={1300}
width={1200}
/>
}
/> */
}

function Mapa({ showUserLocation = true, locations, height, width }) {
  const constant = (0.5 * 9) / 600;
  const [userLocation, setUserLocation] = useState({
    lat: 0,
    lng: 0,
  });
  const [locationsToShow, setLocationsToShow] = useState([]);
  const [zoom, setZoom] = useState(10);
  const [center, setCenter] = useState({
    lat: -34.9191692,
    lng: -57.9651613,
  });
  const [mapHeight, setMapHeight] = useState(height ?? 350);
  const [mapWidth, setMapWidth] = useState(width ?? 1000);
  const [maxDistanceBetweenPoints, setMaxDistanceBetweenPoints] = useState(0);
  // Get user location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      });
    }
  }, []);

  // Get locations to show, baser on locations variable. locations can be either an array of locations or a single location object
  useEffect(() => {
    if (locations) {
      if (Array.isArray(locations)) {
        setLocationsToShow(locations);
      } else {
        setLocationsToShow([locations]);
      }
    }
  }, []);

  // Calculate center of the map based on user location and locations to show
  useEffect(() => {
    // Check if user location is available
    if (userLocation.lat !== 0 && userLocation.lng !== 0) {
      // Check if locations to show is available
      if (locationsToShow.length > 0) {
        // Calculate center of the map based on user location and all items in locationsToShow
        const centerLat =
          (userLocation.lat +
            locationsToShow.reduce((acc, curr) => acc + curr.lat, 0)) /
          (locationsToShow.length + 1);
        const centerLng =
          (userLocation.lng +
            locationsToShow.reduce((acc, curr) => acc + curr.lng, 0)) /
          (locationsToShow.length + 1);
        setCenter({
          lat: centerLat,
          lng: centerLng,
        });
      } else {
        // If locations to show is not available, set center to user location
        setCenter(userLocation);
      }
    }
  }, [userLocation, locationsToShow]);

  // Calculate the maximun distance between all points
  useEffect(() => {
    if (locationsToShow.length > 0) {
      const allLocationsPoints = locationsToShow.concat(userLocation);
      // Calculate the distance between all points
      const distances = allLocationsPoints.map((point, index) => {
        if (index === 0) {
          return 0;
        }
        const distance = Math.sqrt(
          Math.pow(allLocationsPoints[index - 1].lat - point.lat, 2) +
            Math.pow(allLocationsPoints[index - 1].lng - point.lng, 2)
        );
        return distance;
      });
      // Get the maximun distance between all points
      const maxDistance = Math.max(...distances);
      setMaxDistanceBetweenPoints(maxDistance);
    }
  }, [locationsToShow, userLocation]);

  // Calculate zoom to fit all points in the map, using the maximun distance between all points and the map width and height
  useEffect(() => {
    if (maxDistanceBetweenPoints !== 0) {
      const zoom =
        -0.8 *
        Math.round(
          Math.log2(maxDistanceBetweenPoints / Math.min(mapWidth, mapHeight))
        );
      setZoom(zoom);
    }
  }, [maxDistanceBetweenPoints, mapWidth, mapHeight]);

  // Console zoom
  useEffect(() => {
    console.log(`Zoom: ${zoom}`);
  }, [zoom]);

  const userColor = "#0acf83";
  const locationsColor = "#eb8d70";

  return (
    <Map
      height={mapHeight}
      width={mapWidth}
      defaultCenter={[center.lat, center.lng]}
      // Configure map zoom
      zoom={zoom}
    >
      {/* Show user location */}
      {showUserLocation && (
        <Marker
          anchor={[userLocation.lat, userLocation.lng]}
          payload={1}
          color={userColor}
          onClick={() => {
            console.log("Clicked on user location");
          }}
        />
      )}
      {/* Show locations */}
      {locationsToShow.map((location, index) => (
        <Marker
          anchor={[location.lat, location.lng]}
          payload={index + 2}
          color={locationsColor}
          onClick={() => {
            console.log("Clicked on location");
          }}
        />
      ))}
    </Map>
  );
}

export default Mapa;
