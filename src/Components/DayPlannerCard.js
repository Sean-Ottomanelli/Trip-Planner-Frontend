import React, { Component } from "react";


export default class DayPlannerCard extends Component {

    constructor() {
        super()
        
        }

    render() {
        return (
            <div>
                <h2>{this.props.day.dayName}</h2>
                {this.props.day.clusterArray.map(marker => <p>{marker.name}</p>)}
            </div>
        )
    }
}