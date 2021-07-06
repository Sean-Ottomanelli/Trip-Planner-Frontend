import React, { Component } from "react";
import MapComponent from "../Components/MapComponent";


export default class EditTripsContainer extends Component {

    constructor() {
        super()
        this.state = {
            destinations: [],
            newTripName: "",
            newTripDescription: "",
            TripId: null,
            completed: false,
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

            doNothing = () => {}

    render() {

        let trip = this.props.match.param ? this.props.trips.find(trip => trip.id == this.props.match.params.tripId) : "No trip selected"

        return (
            <div>


                <h2>{trip.name}</h2>


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