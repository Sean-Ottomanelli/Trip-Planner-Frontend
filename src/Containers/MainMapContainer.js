import React, { Component } from "react";
import MapComponent from "../Components/MapComponent";
import FilterComponent from "../Components/FilterComponent";
import NewMarkerComponent from "../Components/NewMarkerComponent";

export default class MainMapContainer extends Component {

    constructor() {
        super()
        this.state= {
            showCategory: [],
            showVisited: true,
            showUnvisited: true,
            showRating: 1,
            showUrgency: 1,
            showFilter: true,
            newLng: null,
            newLat: null
        }
    }

    categorySelect = (e) => {
        if(!this.state.showCategory.find(category => e.target.value === category)) {
            this.setState({
                showCategory: [...this.state.showCategory,e.target.value]
            })
        }
        else {
            let newCategoryState = this.state.showCategory.filter(category => category != e.target.value)
            this.setState({
                showCategory: newCategoryState
            })
        }
    }

    visitedSelect = () => {
        this.setState({
            showVisited: !this.state.showVisited
        })
    }

    unvisitedSelect = () => {
        this.setState({
            showUnvisited: !this.state.showUnvisited
        })
    }

    ratingSelect = (e) => {
        this.setState({
            showRating: e.target.value
        })
    }

    urgencySelect = (e) => {
        this.setState({
            showUrgency: e.target.value
        })
    }

    toggleFilterNewMarker = () => {
        this.setState({
            showFilter:!this.state.showFilter,
            showCategory: [],
            showVisited: true,
            showUnvisited: true,
            showRating: 1,
            showUrgency: 1
        })
    }

    setNewLng = (lng) => {
        this.setState({
            newLng: lng
        })
    }

    setNewLat = (lat) => {
        this.setState({
            newLat: lat
        })
    }

    render() {

        let filteredMarkers = this.props.markers.filter(marker => {
            let categorySatisfied = false
            if (this.state.showCategory.length !== 0) {
                categorySatisfied = this.state.showCategory.some(category => category === marker.category)
            } else {
                categorySatisfied = true
            }

            let visitedSatisfied = true
            if (marker.visited === true) {
                visitedSatisfied = !!this.state.showVisited ? true : false
            } else {
                visitedSatisfied = true
            }

            let unvisitedSatisfied = true
            if (marker.visited === false) {
                unvisitedSatisfied = this.state.showUnvisited ? true : false
            } else {
                unvisitedSatisfied = true
            }

            let ratingSatisfied = false
            if (marker.user_rating) {
                ratingSatisfied = marker.user_rating >= this.state.showRating ? true : false
            } else {
                ratingSatisfied = true
            }

            let urgencySatisfied = true
            if (marker.urgency) {
                urgencySatisfied = marker.urgency >= this.state.showUrgency ? true : false
            } else {
                urgencySatisfied = true
            }
            
            if (categorySatisfied && visitedSatisfied && unvisitedSatisfied && ratingSatisfied && urgencySatisfied) {
                return marker
            }
        })

        return (
            <div>
                <h2>MainMapContainer</h2>
                {this.state.showFilter 
                ? <div>
                    <FilterComponent 
                    categorySelect = {this.categorySelect} 
                    showCategory = {this.state.showCategory}
                    visitedSelect = {this.visitedSelect} 
                    showVisited = {this.state.showVisited}
                    unvisitedSelect = {this.unvisitedSelect} 
                    showUnvisited = {this.state.showUnvisited}
                    ratingSelect = {this.ratingSelect}
                    showRating = {this.state.showRating}
                    urgencySelect = {this.urgencySelect}
                    showUrgency = {this.state.showUrgency}/>
                    <p onClick = {() => this.toggleFilterNewMarker()}>Create New Marker</p>
                </div>
                : <div>
                    <NewMarkerComponent
                    setNewLng = {this.setNewLng}
                    setNewLat = {this.setNewLat}
                    newLng = {this.state.newLng}
                    newLat = {this.state.newLat}  
                    userId = {this.props.userId}
                    addNewMarker = {this.props.addNewMarker}/>
                    <p>Save</p>
                    <p onClick = {() => this.toggleFilterNewMarker()}>Cancel</p>
                </div>}
                <MapComponent 
                setNewLng = {this.setNewLng}
                setNewLat = {this.setNewLat} 
                filteredMarkers = {filteredMarkers}/>
            </div>
        )
    }
}
