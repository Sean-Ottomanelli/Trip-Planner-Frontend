import React, { Component } from "react";


export default class ClusterDataComponent extends Component {

    constructor() {
        super()
        
        }

    render() {
        return (
            <div>
                <h2>ClusterDataComponent</h2>
                {this.props.clusterData.clusterArray.map(dataPoint => <p>data point latitude: {dataPoint.latitude}, data point longitude: {dataPoint.longitude}</p>)}
                <p>latitude: {this.props.clusterData.latitude}</p>
                <p>longitude: {this.props.clusterData.longitude}</p>
            </div>
        )
    }
}