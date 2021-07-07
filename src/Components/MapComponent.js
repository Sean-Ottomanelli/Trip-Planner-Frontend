import React, {useState, useEffect} from "react";
import ReactMapGl, {Marker, Popup} from "react-map-gl"

const MapComponent = (props) => {

    const [viewport, setViewport] = useState({
        latitude: 45.4211,
        longitude: -75.6903,
        width: "100%",
        height: "90vh",
        zoom: 1
    });
    const [selectedMarker, setSelectedMarker] = useState(null);

    useEffect(() => {
        const listener = e => {
            if (e.key === "Escape") {
                setSelectedMarker(null)
            }
        };
        window.addEventListener("keydown", listener);

        return () => {
            window.removeEventListener("keydown", listener);
        }
    }, []);

    return(
        <div>
            <ReactMapGl {...viewport} 
                mapboxApiAccessToken = {process.env.REACT_APP_MAPBOX_TOKEN}
                // mapStyle = "mapbox://styles/sean-ottomanelli/ckqjw73i70wgc17qsreljy7t8"
                onClick = {(map) => {
                    props.handleClick(map.lngLat)
                }}
                onViewportChange = {(viewport) => {
                    setViewport(viewport);
                }}>
                {props.filteredMarkers.map((location) => (
                    <Marker key = {location.id} latitude = {location.latitude} longitude = {location.longitude}>
                        <button 
                        style = {{"background":"none", "border":"none", "padding":"0px"}}
                        onMouseOver = {e => {
                            e.preventDefault()
                            setSelectedMarker(location)
                        }}
                        onClick = {props.allowAddToTrip 
                        ? () => props.addToTrip(location)
                        : null}>
        
                            {!props.selectedDestinations 
                            ? <img src="/MapIcons/mapbox-marker-icon-blue.svg" />
                            : props.selectedDestinations.some(destination => destination.id === location.id) 
                            ? <img src="/MapIcons/mapbox-marker-icon-green.svg" /> 
                            : <img src="/MapIcons/mapbox-marker-icon-blue.svg" />}

                        </button>
                    </Marker>
                ))}

                {selectedMarker 
                ? (<Popup 
                latitude = {selectedMarker.latitude} 
                longitude = {selectedMarker.longitude}
                onClose = {() => {
                    setSelectedMarker(null)
                }}>
                    <div>
                        <p>{selectedMarker.name}</p>
                    </div>
                </Popup>) : null }
            </ReactMapGl>
        </div>
    )
}

export default MapComponent