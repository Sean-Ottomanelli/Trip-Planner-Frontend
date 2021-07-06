import React, { Component } from "react";
import MapComponent from "../Components/MapComponent";
import { Link } from "react-router-dom";
import MarkerCardComponent from "../Components/MarkerCardComponent";


export default class ViewTripContainer extends Component {

    constructor() {
        super()
        this.state = {
            trip: {}
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

        componentDidMount(){
            let trip = this.props.trips.find(trip => trip.id == this.props.match.params.tripId)
            this.setState({
                trip: trip
            })
        }

        
            doNothing = () => {}

    render() {

        return (
            <div>


                <h2>{this.state.trip.name}</h2>

                <Link to="/">
                    <button>My map</button>
                </Link>
                <Link to={`/edittripdetails/${this.props.match.params.tripId}`}>
                    <button>Edit Trip</button>
                </Link>

                {this.state.trip.markers
                ? <div className = "column-container">
                    <div className = {"twenty-column"}>
                        
                    </div>

                    
                    <div className = {"fourty-column"}>
                        <MapComponent 
                        handleClick = {this.doNothing}  
                        filteredMarkers = {this.state.trip.markers}/>
                    </div>


                    <div className = {"fourty-column scroll"}>
                        {this.state.trip.markers.map(marker => <MarkerCardComponent 
                        marker = {marker}
                        handleDelete = {this.doNothing}
                        parent = {"ViewTripContainer"}/>)}
                    </div>
                </div> 
                : null}
                


            </div>
        )
    }
}