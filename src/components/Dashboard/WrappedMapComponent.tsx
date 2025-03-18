// components/GoogleMap.tsx
"use client";
import React, { useEffect, useState } from "react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";

export type IContainerData = {
  id: number;
  image: string;
  title: string;
  number: string;
  latitude: string;
  longitude: string;
  createdAt: string;
  updatedAt: string;
};

const mapContainerStyle = {
  height: "40vh",
  width: "100%",
};

const WrappedMapComponent = ({ containerData }: { containerData: IContainerData[] }) => {
  const [selectedLocation, setSelectedLocation] = useState<{
    latitude: string;
    longitude: string;
    title: string;
  } | null>(null);

  const [currentLocation, setCurrentLocation] = useState({
    lat: 29.747010680964586,
    lng: -95.36335317937738,
  });

  const [locationError, setLocationError] = useState<string | null>(null);

  // useEffect(() => {
  //   fetchCurrentLocation();
  // }, []);

  const fetchCurrentLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          setLocationError(null); // Clear any previous error
        },
        (error: any) => {
          switch (error.code) {
            case error.PERMISSION_DENIED:
              setLocationError("User denied the request for Geolocation.");
              break;
            case error.POSITION_UNAVAILABLE:
              setLocationError("Location information is unavailable.");
              break;
            case error.TIMEOUT:
              setLocationError("The request to get user location timed out.");
              break;
            case error.UNKNOWN_ERROR:
              setLocationError("An unknown error occurred.");
              break;
          }
          console.error(`ERROR(${error.code}): ${error.message}`);
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0,
        }
      );
    } else {
      setLocationError("Geolocation is not supported by this browser.");
    }
  };

  return (
    <LoadScript googleMapsApiKey="AIzaSyAhlyzLDrKYMriRJ-AZ7Unq-Zj8jGQGghc">
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={10}
        center={currentLocation}
      >
        {/* Display markers from containerData */}
        {containerData.map((location, index) => (
          <Marker
            key={index}
            position={{
              lat: Number(location.latitude),
              lng: Number(location.longitude),
            }}
            onClick={() => {
              setSelectedLocation(location);
            }}
          />
        ))}

        {/* Display the selected location info window */}
        {selectedLocation && (
          <InfoWindow
            position={{
              lat: Number(selectedLocation.latitude),
              lng: Number(selectedLocation.longitude),
            }}
            onCloseClick={() => {
              setSelectedLocation(null);
            }}
          >
            <div>
              <h2>{selectedLocation.title}</h2>
            </div>
          </InfoWindow>
        )}

        {/* Handle location errors */}
        {locationError && (
          <div className="absolute top-0 left-0 w-full bg-red-500 text-white p-2 text-center">
            <p>{locationError}</p>
          </div>
        )}
      </GoogleMap>
    </LoadScript>
  );
};

export default WrappedMapComponent;
