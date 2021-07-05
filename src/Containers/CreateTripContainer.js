import React, { Component } from "react";
import NewTripComponent from "../Components/NewTripComponent";
import FilterComponent from "../Components/FilterComponent";
import NewTripMapComponent from "../Components/NewTripMapComponent";
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

    doesThisWork = () => {
        console.log('yes this works')
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
            .then((createdTrip) => this.setState({newTripId: createdTrip.id}))
            .then(() => {

                newTrip.markers = this.state.destinations
                this.props.addTripToUser(newTrip)
                console.log(newTrip)
                this.createDestinations()
                
            })

    }

    render() {
        return (
            <div>


                <NewTripComponent
                handleInputChange = {this.handleInputChange}
                newTripName = {this.state.newTripName}
                newTripDescription = {this.newTripDescription}/>


                {this.state.destinations.map(destination => <MarkerCardComponent destination = {destination}/>)}

                
                <button onClick = {this.createTrip}>Create Trip</button>


                <Link to="/">
                    <button>Back to my map</button>
                </Link>
            
                
                <MapComponent
                selectedDestinations = {this.state.destinations}
                addToTrip = {this.handleMarkerSelect} 
                allowAddToTrip = {true}
                handleClick = {this.doNothing}  
                filteredMarkers = {this.props.markers}/>


            

            </div>

        )
    }
}