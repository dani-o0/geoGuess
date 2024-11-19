import React from 'react';
import MapView, { Marker, Polyline } from 'react-native-maps';

const GeoGuessrMap = ({ onLocationSelect, correctCoords, showCorrectCoords, selectedCoords, interactive = true, satellite = true }) => {
    return (
        <MapView
            mapType={satellite ? 'satellite' : ''}
            style={{ flex: 1 }}
            onPress={interactive ? (e) => onLocationSelect(e.nativeEvent.coordinate) : null}
        >
            {selectedCoords && (
                <Marker
                    coordinate={{
                        latitude: selectedCoords.latitude,
                        longitude: selectedCoords.longitude
                    }}
                    pinColor="red" // Color del marcador del jugador
                />
            )}
            {showCorrectCoords && correctCoords && (
                <Marker
                    coordinate={{
                        latitude: correctCoords.latitude,
                        longitude: correctCoords.longitude
                    }}
                    pinColor="green" // Color del marcador de la respuesta correcta
                />
            )}
            {showCorrectCoords && correctCoords && selectedCoords && (
                <Polyline
                    coordinates={[
                        { latitude: selectedCoords.latitude, longitude: selectedCoords.longitude },
                        { latitude: correctCoords.latitude, longitude: correctCoords.longitude }
                    ]}
                    strokeColor="#000000" // Color de la línea
                    strokeWidth={2} // Ancho de la línea
                />
            )}
        </MapView>
    );
};

export default GeoGuessrMap;
