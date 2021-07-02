import React, { Component } from "react";

export default class NewTripComponent extends Component {

    constructor() {
        super()
        
        }
        
    render() {
        return (
            <div>
                <h2>NewTripComponent</h2>
                <p onClick = {this.props.toggleNewTrip}>Cancel</p>
            </div>
        )
    }
}