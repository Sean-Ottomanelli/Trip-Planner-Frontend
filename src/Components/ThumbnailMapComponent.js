import React, {useState, useEffect} from "react";
import ReactMapGl, {Marker, Popup, LinearInterpolator} from "react-map-gl"
import { WebMercatorViewport } from "viewport-mercator-project";

const ThumbnailMapComponent = (props) => {

    let averageLat = (props.filteredMarkers.map(marker => {return(marker.latitude)})).reduce((a, b) => a + b, 0)/props.filteredMarkers.length
    let averageLng = (props.filteredMarkers.map(marker => {return(marker.longitude)})).reduce((a, b) => a + b, 0)/props.filteredMarkers.length
    let allLats = props.filteredMarkers.map(marker => marker.latitude)
    let allLngs = props.filteredMarkers.map(marker => marker.longitude)
    let maxLat = Math.max(...allLats)
    let minLat = Math.min(...allLats)
    let maxLng = Math.max(...allLngs)
    let minLng = Math.min(...allLngs)
    let firstCoord = [minLng, minLat]
    let secondCoord = [maxLng, maxLat]

    const [viewport, setViewport] = useState({
        latitude: averageLat,
        longitude: averageLng,
        width: 600,
        height: 400,
        zoom: 8,
    });
    
    let updateZoom = () => {
        if(props.filteredMarkers.length > 0) {
            const vp = new WebMercatorViewport({
                width: 600,
                height: 400,
                longitude: averageLng,
                latitude: averageLat,
            });

            let {zoom} = vp.fitBounds(
            [
                [minLng, minLat],
                [maxLng, maxLat]
            ],
            {
                padding: 40
            }
            );

            if(props.filteredMarkers.length === 1) {
                setViewport({
                    ...viewport,
                    zoom: 15,
                });
            } else if(zoom <= 1) {
                setViewport({
                    ...viewport,
                    zoom: zoom,
                });
            } else {
                setViewport({
                    ...viewport,
                    zoom: zoom-1,
                });
            }
        }
    }

    const [selectedMarker, setSelectedMarker] = useState(null);

    return(
        <div>
            <ReactMapGl 
            // {...viewport}
            latitude = {props.filteredMarkers.length > 0 ? viewport.latitude : 41}
            longitude = {props.filteredMarkers.length > 0 ? viewport.longitude : -75}
            width = {viewport.width}
            height = {viewport.height}
            zoom = {props.filteredMarkers.length > 0 ? viewport.zoom : 1}
            onLoad = {() => updateZoom()}
                mapboxApiAccessToken = {process.env.REACT_APP_MAPBOX_TOKEN}>
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