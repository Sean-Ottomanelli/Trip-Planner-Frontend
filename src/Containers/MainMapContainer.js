import React, { Component } from "react";
import MapComponent from "../Components/MapComponent";

export default class MainMapContainer extends Component {

    constructor() {
        super()
        
        }

    render() {
        return (
            <div>
                <h2>MainMapContainer</h2>
                <MapComponent markers = {this.props.markers}/>
            </div>
        )
    }
}