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
                <Link to={`/viewtripdetails/${this.props.trip.id}`}>
                    <h2>{this.props.trip.name}</h2>
                    <ThumbnailMapComponent
                        handleClick = {this.props.handleClick}
                        filteredMarkers = {this.props.trip.markers}/>
                </Link>
            </div>
        )
    }
}