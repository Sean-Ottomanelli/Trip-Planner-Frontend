import React, { Component } from "react";
import ThumbnailMapComponent from "./ThumbnailMapComponent";
import { Link } from "react-router-dom";


export default class TripCardComponent extends Component {

    constructor() {
        super()
        
        }

    render() {
        return (
            <div>
                <h2>{this.props.trip.name}</h2>
                <ThumbnailMapComponent
                    handleClick = {this.props.handleClick}
                    filteredMarkers = {this.props.trip.markers}/>
                <Link to={`/viewtripdetails/${this.props.trip.id}`}>
                    <button>View Trip</button>
                </Link>
                <Link to={`/edittripdetails/${this.props.trip.id}`}>
                    <button>Edit Trip</button>
                </Link>
                    <button onClick={() => this.props.deleteTrip(this.props.trip.id)}>Delete Trip</button>
            </div>
        )
    }
}