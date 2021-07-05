import React, { Component } from "react";
import ThumbnailMapComponent from "../Components/ThumbnailMapComponent";
import { Link } from "react-router-dom";
import TripCardComponent from "../Components/TripCardComponent";

export default class MyTripsContainer extends Component {

    constructor() {
        super()
        
    }

    render() {
        return (
            <div>
                <h2>MyTripsContainer</h2>
                <Link to="/">
                    <button>Back to my map</button>
                </Link>
                {this.props.trips.map(trip => <TripCardComponent
                handleClick = {this.handleClick}
                trip = {trip}/>)}
            </div>
        )
    }
}

{/* <ThumbnailMapComponent
                handleClick = {this.props.handleClick}
                filteredMarkers = {trip.markers}/> */}