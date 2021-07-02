import React, { Component } from "react";
import MapComponent from "../Components/MapComponent";
import FilterComponent from "../Components/FilterComponent";
import NewMarkerComponent from "../Components/NewMarkerComponent";
import NewTripComponent from "../Components/NewTripComponent";
import { Link } from "react-router-dom"

export default class MainMapContainer extends Component {

    constructor() {
        super()
        this.state= {

        }
    }

    render() {

        return (
            <div>
                <Link to="/createmarker">
                    <p>Add New Marker</p>
                </Link>
                <Link to="/createtrip">
                    <p>Create New Trip</p>
                </Link>
                <Link to="/createtrip">
                    <p>See Suggested Trips</p>
                </Link>

                <FilterComponent 
                categorySelect = {this.props.categorySelect} 
                showCategory = {this.props.showCategory}
                visitedSelect = {this.props.visitedSelect} 
                showVisited = {this.props.showVisited}
                unvisitedSelect = {this.props.unvisitedSelect} 
                showUnvisited = {this.props.showUnvisited}
                ratingSelect = {this.props.ratingSelect}
                showRating = {this.props.showRating}
                urgencySelect = {this.props.urgencySelect}
                showUrgency = {this.props.showUrgency}/>
                
                <MapComponent 
                makeNewMarker = {this.props.makeNewMarker}  
                filteredMarkers = {this.props.filteredMarkers}/>
            </div>
        )
    }
}
