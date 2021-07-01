import React, {useState, useEffect} from "react";
import ReactMapGl, {Marker, Popup} from "react-map-gl"

const MapComponent = (props) => {

    const [viewport, setViewport] = useState({
        latitude: 45.4211,
        longitude: -75.6903,
        width: "100vw",
        height: "100vh",
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
                onViewportChange = {(viewport) => {
                    setViewport(viewport);
                }}>
                {props.markers.map((location) => (
                    <Marker key = {location.id} latitude = {location.attraction_latitude} longitude = {location.attraction_longitude}>
                        <button 
                        style = {{"background":"none", "border":"none"}}
                        onClick = {e => {
                            e.preventDefault()
                            setSelectedMarker(location)
                        }}>
                            <img src="/MapIcons/mapbox-marker-icon-20px-blue.png"/>
                        </button>
                    </Marker>
                ))}

                {selectedMarker 
                ? (<Popup 
                latitude = {selectedMarker.attraction_latitude} 
                longitude = {selectedMarker.attraction_longitude}
                onClose = {() => {
                    setSelectedMarker(null)
                }}>
                    <div>
                        <p>{selectedMarker.attraction_name}</p>
                    </div>
                </Popup>) : null }
            </ReactMapGl>
        </div>
    )
}

export default MapComponent





// import React, { Component } from "react";
// import ReactMapGl from "react-map-gl"



// export default class MapComponent extends Component {

//     constructor() {
//         super()

//         this.state = {
//             latitude: 45.4211,
//             longitude: -75.6903,
//             width: "100vw",
//             height: "100vh",
//             zoom: 10
//         }
//       }

// test = () => {
//     console.log("token:",process.env.REACT_APP_MAPBOX_TOKEN)
// }



//     render() {

//         return (
//             <div>
//                 {this.test()}
//             <ReactMapGl {...this.state} 
//             mapboxApiAccessToken = {process.env.REACT_APP_MAPBOX_TOKEN}>
//                 markers here
//             </ReactMapGl>
//             </div>
//         )
//     }
// }