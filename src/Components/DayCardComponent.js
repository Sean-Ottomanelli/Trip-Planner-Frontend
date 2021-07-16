import React, { Component } from "react";
import ThumbnailMapComponent from "./ThumbnailMapComponent";
import { Link } from "react-router-dom";


export default class DayCardComponent extends Component {

    constructor() {
        super()
        
        }

        doNothing = () => {}

    render() {
        return (
            <div className = "tripCard">
                <div className = "tripCardTitle">
                    <h3 className = "noMargin">{this.props.day.dayName}</h3>
                </div>
                <div className = "tripCardMap">
                    <ThumbnailMapComponent
                    handleClick = {this.doNothing}
                    filteredMarkers = {this.props.day.clusterArray}/>
                </div>
            </div>
        )
    }
}