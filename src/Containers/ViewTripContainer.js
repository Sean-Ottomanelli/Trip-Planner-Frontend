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



                

                {this.state.trip.markers
                ? <div className = "column-container">
                    <div className = {"twenty-column"}>
                        <div className = "tripDetailsDiv">
                            <h2>TRIP DETAILS</h2>
                        </div>
                        <div className = "tripDetailsDiv">
                            <h3>{this.state.trip.name}</h3>
                        </div>
                        <div className = "tripDetailsDiv">
                        <p>{this.state.trip.description}</p>
                        </div>
                        <div className = "tripDetailsDiv">
                        <Link to="/mytrips">
                            <button className = "navigational">Return to My Trips</button>
                        </Link><br/>
                        <Link to={`/edittripdetails/${this.props.match.params.tripId}`}>
                            <button className = "navigational">Edit Trip</button>
                        </Link>
                        </div>
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