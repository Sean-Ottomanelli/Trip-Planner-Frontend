import React, { Component } from "react";
import NewTripComponent from "../Components/NewTripComponent";
import FilterComponent from "../Components/FilterComponent";
import MapComponent from "../Components/MapComponent";
import { Link } from "react-router-dom";
import MarkerCardComponent from "../Components/MarkerCardComponent";

export default class CreateTripContainer extends Component {

    constructor() {
        super()
        this.state = {
            destinations: [1]
        }
        }

        doNothing = () => {}

    render() {
        return (
            <div>


                <NewTripComponent/>


                {this.state.destinations.map(destination => <MarkerCardComponent/>)}

                
                <Link to="/">
                    <button>Back to my map</button>
                </Link>
            
                
                <MapComponent 
                handleClick = {this.doNothing}  
                filteredMarkers = {this.props.filteredMarkers}/>
            

            </div>

        )
    }
}