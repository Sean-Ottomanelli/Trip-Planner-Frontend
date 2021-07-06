import React, { Component } from "react";
import MapComponent from "../Components/MapComponent";
import FilterComponent from "../Components/FilterComponent";
import NewMarkerComponent from "../Components/NewMarkerComponent";
import NewTripComponent from "../Components/NewTripComponent";
import { Link } from "react-router-dom"
import MarkerCardComponent from "../Components/MarkerCardComponent";

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


                

                <div className = "column-container">
                    <div className = {"twenty-column"}>
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
                        <Link to="/editmarkers">
                            <button>Edit Map Markers</button>
                        </Link><br/>
                        <Link to="/createtrip">
                            <button>Create New Trip</button>
                        </Link><br/>
                        <Link to="/mytrips">
                            <button>See your trips</button>
                        </Link><br/>
                        <Link to="/createtrip">
                            <button>See Suggested Trips</button>
                        </Link>
                            </div>

                    
                    <div className = {"fourty-column"}>
                        <MapComponent 
                        handleClick = {this.doNothing}  
                        filteredMarkers = {this.props.filteredMarkers}/>
                    </div>


                    <div className = {"fourty-column scroll"}>
                        {this.props.filteredMarkers.map(marker => <MarkerCardComponent 
                        marker = {marker}
                        handleDelete = {this.doNothing}
                        parent = {"mainMapContainer"}/>)}
                    </div>
                </div>


            </div>
        )
    }
}
