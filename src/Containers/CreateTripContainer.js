import React, { Component } from "react";
import NewTripComponent from "../Components/NewTripComponent";
import MapComponent from "../Components/MapComponent";
import { Link } from "react-router-dom";
import MarkerCardComponent from "../Components/MarkerCardComponent";

export default class CreateTripContainer extends Component {

    constructor() {
        super()
        this.state = {
            destinations: [],
            newTripName: "",
            newTripDescription: "",
            newTripId: null,
            completed: false,
        }
    }

    doNothing = () => {}

    handleInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleMarkerSelect = (clickedDestination) => {

        if(this.state.destinations.some(stateDestination => stateDestination.id === clickedDestination.id)) {
            let updatedStateDestinationsArray = this.state.destinations.filter(destination => destination.id != clickedDestination.id)
            this.setState({
                destinations: updatedStateDestinationsArray
            })
        } else {
            this.setState({
                destinations: [...this.state.destinations, clickedDestination]
            })
        }
    }

    removeFromTrip = (input) => {
        let updatedDestinations = this.state.destinations.filter(destination => destination.id != input.id)
        this.setState({
            destinations: updatedDestinations
        })
    }

    createDestinations = () => {

        this.state.destinations.map(destination => {

            let newDestination = {
                marker_id: destination.id,
                trip_id: this.state.newTripId,
            }

            fetch("http://localhost:3000/destinations", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization":`Bearer ${localStorage.token}`
                },
                body: JSON.stringify(newDestination),
            })
            .then((r) => r.json())
            .then((createdDestination) => console.log(createdDestination));
        })

    }

    createTrip = () => {

        let newTrip = {
            user_id: this.props.userId,
            name: this.state.newTripName,
            completed: this.state.completed,
            description: this.state.newTripDescription
        }

        fetch("http://localhost:3000/trips", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization":`Bearer ${localStorage.token}`
                },
                body: JSON.stringify(newTrip),
            })
            .then((r) => r.json())
            .then((createdTrip) => {
                this.setState({newTripId: createdTrip.id})
                newTrip.markers = this.state.destinations
                newTrip.id = createdTrip.id

            })
            .then(() => {
                this.props.addTripToUser(newTrip)
                this.createDestinations()
            })

    }

    render() {
        return (
            <div>


                


                <div className = "column-container">
                    <div className = {"twenty-column"}>
                        <NewTripComponent
                        handleInputChange = {this.handleInputChange}
                        newTripName = {this.state.newTripName}
                        newTripDescription = {this.newTripDescription}/>
                        <Link to="/">
                        <button onClick = {this.createTrip}>Create Trip</button>
                        </Link>
                        <Link to="/">
                        <button>Cancel</button>
                        </Link>
                    </div>


                
                    <div className = {"fourty-column"}>
                        <MapComponent
                        selectedDestinations = {this.state.destinations}
                        addToTrip = {this.handleMarkerSelect} 
                        allowAddToTrip = {true}
                        handleClick = {this.doNothing}  
                        filteredMarkers = {this.props.markers}/>
                    </div>

                    
                    <div className = {"fourty-column"}>
                        {this.state.destinations.map(marker => <MarkerCardComponent 
                        marker = {marker}
                        handleDelete = {this.removeFromTrip}
                        parent = {"createTripContainer"}/>)}
                    </div>
                </div>

            
            </div>

        )
    }
}