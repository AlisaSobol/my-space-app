import React from "react";
import GoogleMap from 'google-map-react';
import satelliteImg from './satellite.png';
import './index.scss';

const SpaceStation = () => {
    return <img className='satellite-img' src={satelliteImg} alt="satellite" />
};

const Error = () => {
    return (
        <>
            <h3 className="satellite-icon-title">
                <SpaceStation />
                Space Station is lost :(
            </h3>
            <h3>Try to refresh the page</h3>
        </>
    )
};

const Loading = () => {
    return (
        <h3 className="satellite-icon-title">
            ... connecting to <SpaceStation />
        </h3>
    )
};

const SpaceStationOnMap = ({ coordinates, error, loading }) => {
    const defaultCoordinates = {
        lat: -47.36999493,
        lng: 151.738540034
    };

    const currentCoordinates = {
        lat: Number(coordinates.latitude),
        lng: Number(coordinates.longitude)
    };

    return (
        <div>
            <h2>Where the Space Station is right now?</h2>
            { error ? (
                <Error />
            ) : loading ? (
                <Loading />
            ) : (
                <div className="satellite-map">
                    <GoogleMap bootstrapURLKeys={{ key: "" }}
                               defaultCenter={defaultCoordinates}
                               center={currentCoordinates}
                               zoom={1}
                    >
                        <SpaceStation lat={currentCoordinates.lat}
                                      lng={currentCoordinates.lng}
                        />
                    </GoogleMap>
                </div>
            )}
        </div>
    );
}

export default SpaceStationOnMap;
