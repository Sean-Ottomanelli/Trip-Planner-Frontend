import React, {useState} from "react";
import ReactMapGl from "react-map-gl"

const MapComponent = () => {

    const [viewport, setViewport] = useState({
        latitude: 45.4211,
        longitude: -75.6903,
        width: "100vw",
        height: "100vh",
        zoom: 1
    })

    return(
        <div>
            <ReactMapGl {...viewport} 
                mapboxApiAccessToken = {process.env.REACT_APP_MAPBOX_TOKEN}
                mapStyle = "mapbox://styles/sean-ottomanelli/ckqjw73i70wgc17qsreljy7t8"
                onViewportChange = {(viewport) => {
                    setViewport(viewport);
                }}>
                markers here
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