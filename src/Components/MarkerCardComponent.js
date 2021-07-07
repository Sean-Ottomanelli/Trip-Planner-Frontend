import React, { Component } from "react";

export default class MarkerCardComponent extends Component {

    constructor() {
        super()
        
        }

    render() {
        return (
            <div className = "marker-card">
                <h3>{this.props.marker.name}</h3>
                <p>{this.props.marker.category}</p>
                <p>Visited: {this.props.marker.visited ? "Yes" : "No"}</p>
                {this.props.marker.visited
                ? <p>Rating: {this.props.marker.user_rating}</p>
                : <p>Urgency to visit: {this.props.marker.urgency}</p>}
                {this.props.parent === "createMarkerContainer"
                ? <button 
                onClick = {() => this.props.handleDelete(this.props.marker)}>Delete marker</button>
                : null}
                {this.props.parent === "createTripContainer"
                ? <button
                onClick = {() => this.props.handleDelete(this.props.marker)}>Remove from trip</button>
                : null}
            </div>
        )
    }
}