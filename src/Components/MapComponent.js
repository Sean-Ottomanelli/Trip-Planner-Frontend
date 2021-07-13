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
                    <Marker key = {location.id} 
                    latitude = {location.latitude} 
                    longitude = {location.longitude}
                    offsetTop={-25}
                    offsetLeft={-10}>
                        <button 
                        style = {{"background":"none", "border":"none", "padding":"0px"}}
                        onMouseOver = {e => {
                            e.preventDefault()
                            setSelectedMarker(location)
                        }}
                        onClick = {props.allowAddToTrip 
                        ? () => props.addToTrip(location)
                        : props.parent === "EditMarkersContainer" ? () => {
                            props.handleDelete(location)
                            setSelectedMarker(null)
                            } : null}>
        
                            {!props.selectedDestinations
                            ? <img src="/MapIcons/mapbox-marker-icon-blue.svg" />
                            : props.selectedDestinations.some(destination => destination.id === location.id) 
                            ? <img src="/MapIcons/mapbox-marker-icon-green.svg" /> 
                            : <img src="/MapIcons/mapbox-marker-icon-blue.svg" />}

                        </button>
                    </Marker>
                ))}
                {props.seedMarkers
                ? props.seedMarkers.map(seed => <Marker 
                latitude = {seed[1]} 
                longitude = {seed[0]}
                offsetTop={-25}
                offsetLeft={-10}>
                    <button 
                    style = {{"background":"none", "border":"none", "padding":"0px"}}>
                        <img src="/MapIcons/mapbox-marker-icon-red.svg" />
                    </button>
                </Marker> )
                : null}

                {selectedMarker 
                ? (<Popup 
                latitude = {selectedMarker.latitude} 
                longitude = {selectedMarker.longitude}
                offsetTop = {-25}
                onClose = {() => {
                    setSelectedMarker(null)
                }}>
                    <div>
                        <div className = "popUpDiv">
                            <p className = "popUpText">{selectedMarker.name}</p>
                        </div>
                    </div>
                </Popup>) : null }
            </ReactMapGl>
        </div>
    )
}

export default MapComponent




