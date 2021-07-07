import React, { Component } from "react";
import ThumbnailMapComponent from "../Components/ThumbnailMapComponent";
import { Link } from "react-router-dom";
import TripCardComponent from "../Components/TripCardComponent";

export default class MyTripsContainer extends Component {

    constructor() {
        super()
        
    }

    render() {

        let reversedTrips = this.props.trips.reverse()

        return (
            <div>
                <h2>My Trips</h2>
                <Link to="/">
                    <button>Return to My Map</button>
                </Link>
                {reversedTrips.map(trip => <TripCardComponent
                deleteTrip = {this.props.deleteTrip}
                handleClick = {this.handleClick}
                trip = {trip}/>
                )}
            </div>
        )
    }
}