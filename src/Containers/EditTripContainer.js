import React, { Component } from "react";
import MapComponent from "../Components/MapComponent";
import MarkerCardComponent from "../Components/MarkerCardComponent";
import TripInfoFormComponent from "../Components/TripInfoFormComponent";
import { Link } from "react-router-dom";


export default class EditTripsContainer extends Component {

    constructor() {
        super()
        this.state = {
            destinations: [],
            name: "",
            description: "",
            id: null,
            completed: false,
            userId: null
        }  
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


        handleInputChange = (e) => {
            this.setState({
                [e.target.name]: e.target.value
            })
        }


        handleCompleted = () => {
            this.setState({
                completed: !this.state.completed
            })
        }


        updateDestinations = () => {
            let trip = this.props.trips.find(trip => trip.id == this.props.match.params.tripId)
            let markersToDelete = trip.markers.filter(propMarker => 
                !this.state.destinations.some(stateDestination => stateDestination.id === propMarker.id))
            console.log("markersToDelete: ",markersToDelete)
            let markersToCreate = this.state.destinations.filter(stateDestination => 
                !trip.markers.some(propMarker => stateDestination.id === propMarker.id))
            console.log("markersToCreate: ",markersToCreate)

            markersToDelete.map(marker => 
                fetch(`http://localhost:3000/destinations/${marker}`, {
                    method: "DELETE",
                    headers: {
                        "Authorization":`Bearer ${localStorage.token}`
                    }
                })
                .then((r) => r.json())
                .then(() => console.log("Deleted"))
                )
        }


        saveTrip = () => {
            let updatedTrip = {
                name: this.state.name,
                description: this.state.description,
                completed: this.state.completed,
                id: this.state.id,
                user_id: this.state.userId,
                markers: this.state.destinations
            }
            fetch(`http://localhost:3000/trips/${this.state.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization":`Bearer ${localStorage.token}`
                },
                body: JSON.stringify(updatedTrip),
            })
            .then((r) => r.json(r))
            .then(() => {
                this.updateDestinations(this.state.destinations)
            })
            .then(() => {
                this.props.updateTripInState(updatedTrip)
                this.props.history.push('/mytrips')
            });
        }


        doNothing = () => {}

        componentDidMount(){
            let trip = this.props.trips.find(trip => trip.id == this.props.match.params.tripId)
            this.setState({
                destinations: trip.markers,
                name: trip.name,
                description: trip.description,
                id: trip.id,
                completed: trip.completed,
                user_id:trip.user_id
            })
        }

    render() {


        return (
            <div>


                <div className = "column-container">
                    <div className = {"twenty-column"}>
                        <h2>Edit Trip</h2>
                    <TripInfoFormComponent
                        handleInputChange = {this.handleInputChange}
                        name = {this.state.name}
                        completed = {this.state.completed}
                        description = {this.state.description}
                        handleCompleted = {this.handleCompleted}/>
                    <button onClick = {this.saveTrip}>Save Trip</button><br/>
                    <button onClick={() => this.props.history.goBack()}>Cancel</button><br/>
                    <Link to="/mytrips">
                        <button onClick={() => this.props.deleteTrip(this.state.id)}>Delete Trip</button>
                    </Link>
                    </div>

                
                    <div className = {"fourty-column-map"}>
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
                        parent = {"EditTripContainer"}/>)}
                    </div>
                </div>



            </div>
        )
    }
}