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

    doNothing = () => {}


    render() {

        return (
            <div>


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

                
                <Link to="/createmarker">
                    <button>Add New Marker</button>
                </Link>
                <Link to="/createtrip">
                    <button>Create New Trip</button>
                </Link>
                <Link to="/mytrips">
                    <button>See your trips</button>
                </Link>
                <Link to="/createtrip">
                    <button>See Suggested Trips</button>
                </Link>

                
                <MapComponent 
                handleClick = {this.doNothing}  
                filteredMarkers = {this.props.filteredMarkers}/>


            </div>
        )
    }
}
