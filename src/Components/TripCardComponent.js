import React, { Component } from "react";
import ThumbnailMapComponent from "./ThumbnailMapComponent";

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
            </div>
        )
    }
}