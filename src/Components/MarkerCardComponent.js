import React, { Component } from "react";

export default class MarkerCardComponent extends Component {

    constructor() {
        super()
        
        }

    render() {
        return (
            <div>
                <h2>Name: {this.props.marker.name}</h2>
                <p>Category: {this.props.marker.category}</p>
                <p>Visited: {this.props.marker.visited ? "yes" : "no"}</p>
                {this.props.marker.visited
                ? <p>Your rating: {this.props.marker.user_rating}</p>
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