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
                <div className = "myTripsContainerHeading">
                    <h2>MY TRIPS</h2>
                    <Link to="/">
                        <button className = {"navigational"}>BACK TO MY MAP</button>
                    </Link>
                </div>
                <div className = "tripCardContainer">
                    {reversedTrips.map(trip => <TripCardComponent
                    deleteTrip = {this.props.deleteTrip}
                    handleClick = {this.handleClick}
                    trip = {trip}/>
                    )}
                </div>
            </div>
        )
    }
}