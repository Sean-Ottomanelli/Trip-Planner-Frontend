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
                        <h2>FILTER MARKERS</h2>
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
                        <div className = "button-container">
                            <Link to="/editmarkers">
                                <button className = "navigational">EDIT MARKERS</button>
                            </Link><br/>
                            <Link to="/createtrip">
                                <button className = "navigational">CREATE TRIP</button>
                            </Link><br/>
                            <Link to="/mytrips">
                                <button className = "navigational">VIEW TRIPS</button>
                            </Link><br/>
                            <Link to="/createtrip">
                                <button className = "navigational">SUGGESTED TRIPS</button>
                            </Link>
                        </div>
                    </div>

                    
                    <div className = {"fourty-column-map"}>
                        <MapComponent 
                        handleClick = {this.doNothing}  
                        filteredMarkers = {this.props.filteredMarkers}/>
                    </div>


                    <div className = {"fourty-column"}>
                        <h2>MY MARKERS</h2>
                        <div className = {"scroll"}>
                            {this.props.filteredMarkers.map(marker => <MarkerCardComponent 
                            marker = {marker}
                            handleDelete = {this.doNothing}
                            parent = {"mainMapContainer"}/>)}
                        </div>
                    </div>
                </div>


            </div>
        )
    }
}
