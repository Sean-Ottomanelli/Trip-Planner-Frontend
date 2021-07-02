import React, {useState, useEffect} from "react";
import ReactMapGl, {Marker, Popup} from "react-map-gl"

const ThumbnailMapComponent = (props) => {

    let averageLat = (props.filteredMarkers.map(marker => {return(marker.latitude)})).reduce((a, b) => a + b, 0)/props.filteredMarkers.length
    let averageLng = (props.filteredMarkers.map(marker => {return(marker.longitude)})).reduce((a, b) => a + b, 0)/props.filteredMarkers.length

    const [viewport, setViewport] = useState({
        latitude: averageLat,
        longitude: averageLng,
        width: "25vw",
        height: "25vw",
        zoom: 8
    });
    const [selectedMarker, setSelectedMarker] = useState(null);

    return(
        <div>
            <ReactMapGl {...viewport} 
                mapboxApiAccessToken = {process.env.REACT_APP_MAPBOX_TOKEN}
                // mapStyle = "mapbox://styles/sean-ottomanelli/ckqjw73i70wgc17qsreljy7t8"
                onViewportChange = {(viewport) => {
                    setViewport(viewport);
                }}>
                {props.filteredMarkers.map((location) => (
                    <Marker key = {location.id} latitude = {location.latitude} longitude = {location.longitude}>
                        <button style = {{"background":"none", "border":"none"}}>
                            <img src="/MapIcons/mapbox-marker-icon-20px-blue.png"/>
                        </button>
                    </Marker>
                ))}
            </ReactMapGl>
        </div>
    )
}

export default ThumbnailMapComponent