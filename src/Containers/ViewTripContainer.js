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



                <Link to="/mytrips">
                    <button>Return to My Trips</button>
                </Link>
                <Link to={`/edittripdetails/${this.props.match.params.tripId}`}>
                    <button>Edit Trip</button>
                </Link>

                {this.state.trip.markers
                ? <div className = "column-container">
                    <div className = {"twenty-column"}>
                        <h2>Trip Details</h2>
                        <h3>{this.state.trip.name}</h3>
                        <p>{this.state.trip.description}</p>
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