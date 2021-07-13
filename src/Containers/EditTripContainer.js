import React, { Component } from "react";
import MapComponent from "../Components/MapComponent";
import MarkerCardComponent from "../Components/MarkerCardComponent";
import TripInfoFormComponent from "../Components/TripInfoFormComponent";
import { Link } from "react-router-dom";


export default class EditTripsContainer extends Component {

    constructor() {
        super()
        this.state = {
            markers: [],
            name: "",
            description: "",
            id: null,
            completed: false,
            userId: null,
            destinations: []
        }  
        }


        handleMarkerSelect = (clickedMarker) => {

            if(this.state.markers.some(stateMarker => stateMarker.id === clickedMarker.id)) {
                let updatedMarkers = this.state.markers.filter(marker => marker.id != clickedMarker.id)
                let updatedDestinations = this.state.destinations.filter(destination => destination.marker_id != clickedMarker.id)
                this.setState({
                    markers: updatedMarkers,
                    destinations: updatedDestinations
                })
            } else {
                let newDestination = {
                    marker_id: clickedMarker.id,
                    trip_id: this.state.id
                }

                this.setState({
                    markers: [...this.state.markers, clickedMarker],
                    destinations: [...this.state.destinations, newDestination]
                })
            }
        }


        removeFromTrip = (input) => {
            let updatedMarkers = this.state.markers.filter(marker => marker.id != input.id)
            this.setState({
                markers: updatedMarkers
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
            let destinationsToDelete = trip.destinations.filter(propDestination => 
                !this.state.destinations.some(stateDestination => stateDestination.id === propDestination.id))
            console.log("destinationsToDelete: ",destinationsToDelete)
            let destinationsToCreate = this.state.destinations.filter(stateDestination => 
                !trip.destinations.some(propDestination => stateDestination.id === propDestination.id))
            console.log("destinationsToCreate: ",destinationsToCreate)

            destinationsToDelete.map(destination => this.deleteDestination(destination))
                
            destinationsToCreate.map(destination => this.createDestination(destination))
                
        }

        deleteDestination = (destination) => {
            fetch(`http://localhost:3000/destinations/${destination.id}`, {
                    method: "DELETE",
                    headers: {
                        "Authorization":`Bearer ${localStorage.token}`
                    }
                })
                .then((r) => r.json())
                .then(() => console.log("Deleted"))
        }

        createDestination = (destination) => {
            fetch("http://localhost:3000/destinations", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization":`Bearer ${localStorage.token}`
                    },
                body: JSON.stringify(destination),
            })
            .then((r) => r.json())
            .then((destinationObj) => console.log(destinationObj));
        }


        saveTrip = () => {
            console.log(this.state)
            let updatedTrip = {
                name: this.state.name,
                description: this.state.description,
                completed: this.state.completed,
                id: this.state.id,
                user_id: this.state.userId,
                markers: this.state.markers,
                destinations: this.state.destinations,
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
                destinations: trip.destinations,
                markers: trip.markers,
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
                        <div className = "button-container">
                            <button className = "navigational" onClick = {this.saveTrip}>Save Trip</button><br/>
                            <button className = "navigational"onClick={() => this.props.history.goBack()}>Cancel</button><br/>
                            <Link to="/mytrips">
                                <button className = "navigational" onClick={() => this.props.deleteTrip(this.state.id)}>Delete Trip</button>
                            </Link>
                        </div>
                    </div>

                
                    <div className = {"fourty-column-map"}>
                        <MapComponent
                        selectedDestinations = {this.state.markers}
                        addToTrip = {this.handleMarkerSelect} 
                        allowAddToTrip = {true}
                        handleClick = {this.doNothing}  
                        filteredMarkers = {this.props.markers}/>
                    </div>

                    
                    <div className = {"fourty-column"}>
                        {this.state.markers.map(marker => <MarkerCardComponent 
                        marker = {marker}
                        handleDelete = {this.removeFromTrip}
                        parent = {"EditTripContainer"}/>)}
                    </div>
                </div>



            </div>
        )
    }
}