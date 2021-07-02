import React, { Component } from "react";
import ThumbnailMapComponent from "../Components/ThumbnailMapComponent";

export default class MyTripsContainer extends Component {

    constructor() {
        super()
        
    }

    render() {
        return (
            <div>
                <h2>MyTripsContainer</h2>
                {this.props.trips.map(trip => <ThumbnailMapComponent
                handleClick = {this.handleClick}
                filteredMarkers = {trip.markers}/>)}
            </div>
        )
    }
}