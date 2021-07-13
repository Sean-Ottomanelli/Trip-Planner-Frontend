import React, { Component } from "react";
import ThumbnailMapComponent from "./ThumbnailMapComponent";
import { Link } from "react-router-dom";


export default class TripCardComponent extends Component {

    constructor() {
        super()
        
        }

    render() {
        return (
            <div className = "tripCard">
                <div className = "tripCardTitle">
                    <h3 className = "noMargin">{this.props.trip.name}</h3>
                </div>
                <div className = "tripCardDescription">
                    <p className = "noMargin">{this.props.trip.description}</p>
                </div>
                <div className = "tripCardMap">
                    <ThumbnailMapComponent
                    handleClick = {this.props.handleClick}
                    filteredMarkers = {this.props.trip.markers}/>
                </div>
                <div className = "tripCardCompleted">
                    TRIP TRAVELLED: {this.props.trip.completed ? "YES" : "NO"}
                </div>
                <div className = "tripCardButtons">
                    <Link to={`/viewtripdetails/${this.props.trip.id}`}>
                        <button className = "navigational">VIEW TRIP</button>
                    </Link>
                    <Link to={`/edittripdetails/${this.props.trip.id}`}>
                        <button className = "navigational">EDIT TRIP</button>
                    </Link>
                    <button className = "navigational" onClick={() => this.props.deleteTrip(this.props.trip.id)}>DELETE TRIP</button>
                </div>
            </div>
        )
    }
}