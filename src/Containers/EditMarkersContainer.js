import React, { Component } from "react";
import NewMarkerComponent from "../Components/NewMarkerComponent";
import MapComponent from "../Components/MapComponent";
import { Link } from "react-router-dom";
import MarkerCardComponent from "../Components/MarkerCardComponent";

export default class EditMarkersContainer extends Component {

    constructor() {
        super()
        this.state = {
            name:"",
            category:"",
            visited: false,
            urgency: 5,
            user_rating: 5,
            newLat: 40,
            newLng: 40,
        }    
    }

    handleInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleVisited = () => {
        this.setState({
            visited: !this.state.visited
        })
    }
        
    makeNewMarker = (input) => {
        console.log(input)
    }

    handleDelete = (marker) => {
        fetch(`http://localhost:3000/markers/${marker.id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization":`Bearer ${localStorage.token}`
            }})
            .then(() => {
                console.log(marker)
                this.props.deleteMarker(marker)
                this.props.deleteAssociatedDestinations(marker)
            })
    }

    handleSubmit = (coords) => {

        let newVisitedMarker = {
            name: this.state.name,
            category: this.state.category,
            visited: this.state.visited,
            user_rating: this.state.user_rating,
            latitude: coords[1],
            longitude: coords[0],
            user_id: this.props.userId
        }

        let newUnvisitedMarker = {
            name: this.state.name,
            category: this.state.category,
            visited: this.state.visited,
            urgency: this.state.urgency,
            latitude: coords[1],
            longitude: coords[0],
            user_id: this.props.userId
        }

        let newMarker = this.state.visited ? newVisitedMarker : newUnvisitedMarker

        console.log(newMarker)
        
        fetch("http://localhost:3000/markers", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization":`Bearer ${localStorage.token}`
            },
            body: JSON.stringify(newMarker),
            })
        .then((r) => r.json())
        .then((newMarker) => this.props.addNewMarker(newMarker));
    }

    render() {
        return (
            <div>
                

                <div className = {"column-container"}>
                    <div className = {"twenty-column"}>
                        <h2>EDIT MARKERS</h2>
                        <p>Fill in all of the fields below and click a location on the map to place a marker.</p>
                        <NewMarkerComponent
                        userId = {this.props.userId}
                        handleInputChange = {this.handleInputChange}
                        handleVisited = {this.handleVisited}
                        handleSubmit = {this.handleSubmit}
                        visited = {this.state.visited}
                        name = {this.state.name}
                        urgency = {this.state.urgency}
                        user_rating = {this.state.user_rating}/>
                        <div className = "button-container">
                            <Link to = "/">
                                <button className = "navigational">FINISH</button>
                            </Link>
                        </div>
                    </div>

                    <div className = {"fourty-column-map"}>
                        <MapComponent 
                        handleClick = {this.handleSubmit}
                        filteredMarkers = {this.props.filteredMarkers}/>
                    </div>


                    <div className = {"fourty-column"}>
                        <h2>MY MARKERS</h2>
                        <div className = {"scroll"}>
                            {this.props.filteredMarkers.map(marker => <MarkerCardComponent
                            marker = {marker}
                            handleDelete = {this.handleDelete}
                            parent = {"createMarkerContainer"}/>)}
                        </div>
                    </div>
                </div>


            </div>
        )
    }
}