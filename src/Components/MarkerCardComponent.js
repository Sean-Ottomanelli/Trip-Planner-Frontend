import React, { Component } from "react";

export default class MarkerCardComponent extends Component {

    constructor() {
        super()
        
        }

    render() {
        return (
            <div>
                <h2>Name: {this.props.destination.name}</h2>
                <p>Category: {this.props.destination.category}</p>
                <p>Visited: {this.props.destination.visited ? "yes" : "no"}</p>
                {this.props.destination.visited
                ? <p>Your rating: {this.props.destination.user_rating}</p>
                : <p>Urgency to visit: {this.props.destination.urgency}</p>}
            </div>
        )
    }
}