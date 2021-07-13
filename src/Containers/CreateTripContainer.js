import React, { Component } from "react";
import NewTripComponent from "../Components/NewTripComponent";
import MapComponent from "../Components/MapComponent";
import { Link } from "react-router-dom";
import MarkerCardComponent from "../Components/MarkerCardComponent";
import NewTripRadiusComponent from "../Components/NewTripRadiusComponent";

export default class CreateTripContainer extends Component {

    constructor() {
        super()
        this.state = {
            destinations: [],
            radiusDestinations: [],
            newTripName: "",
            newTripDescription: "",
            newTripId: null,
            completed: false,
            seedMarkers: [],
            radiusOfInfluence: null
        }
    }

    doNothing = () => {}

    haversine = (radians) => {
        let result = (1-Math.cos(radians))/2
        return(result)
    }

    distanceBewtweenPoints = (coord1,lat2d,lon2d) => {
        
        let lat1d = coord1[1]
        let lon1d = coord1[0]
        // let lat2d = coord2[1]
        // let lon2d = coord2[0]
        let lat1 = lat1d * Math.PI/180
        let lat2 = lat2d * Math.PI/180
        let lon1 = lon1d * Math.PI/180
        let lon2 = lon2d * Math.PI/180
        let radius = 3958.8
        let insideSquareRoot = this.haversine(lat2-lat1)+Math.cos(lat1)*Math.cos(lat2)*this.haversine(lon2-lon1)
        let distance = 2*radius*Math.asin(Math.sqrt(insideSquareRoot))
        return distance
    }

    placeSeed = (lnglat) => {
            this.setState({
                seedMarkers: [...this.state.seedMarkers, lnglat]
            })
    }

    clearSeeds = () => {
        this.setState({
            seedMarkers: [],
            radiusDestinations: [],
            radiusOfInfluence: null
        })
    }

    radiusOfInfluenceSelect = (e) => {
        this.setState({
            radiusOfInfluence: e.target.value
        })
    }

    handleInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    findRadiusMarkers = () => {
        let radiusMarkers = this.props.markers.filter(marker =>
            this.state.seedMarkers.some(seedMarker => this.distanceBewtweenPoints(seedMarker,marker.latitude,marker.longitude) < this.state.radiusOfInfluence))
            console.log(radiusMarkers)

            this.setState({
                radiusDestinations: radiusMarkers
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

    onlyUnique = (value, index, self) => {
        return self.indexOf(value) === index;
    }

    allSelectedDestinations = () => {
    return(this.state.radiusDestinations.concat(this.state.destinations).filter(this.onlyUnique))
    }

    createDestinations = () => {
        this.allSelectedDestinations().map(destination => {

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
            .then((createdDestination) => {this.setState({
                destinations: createdDestination
            })});
        })

    }


    createTrip = () => {

        let newTrip = {
            user_id: this.props.userId,
            name: this.state.newTripName,
            completed: this.state.completed,
            description: this.state.newTripDescription,
            destinations: this.state.destinations
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
                console.log("trip without markers", newTrip)
                newTrip.markers = this.allSelectedDestinations()
                console.log("trip with markers", newTrip)
                newTrip.id = createdTrip.id
                this.createDestinations()
            })
            .then(() => {
                this.props.addTripToUser(newTrip)
                this.props.history.push('/mytrips')
            })

    }

    render() {

        return (
            <div>
                <div className = "column-container">
                    <div className = {"twenty-column"}>
                        <h2>CREATE TRIP</h2>
                        <p>Fill in the following fields and add destinations by clicking on map markers.</p> 
                        <p>To select all markers within a specified radius of a location select a point or multiple points on the map, specify a radius, and click the NEARBY MARKERS button.</p>
                        <p>Click CREATE TRIP to save your trip.</p>
                        <NewTripComponent
                        handleInputChange = {this.handleInputChange}
                        newTripName = {this.state.newTripName}
                        newTripDescription = {this.newTripDescription}
                        radiusOfInfluenceSelect = {this.radiusOfInfluenceSelect}
                        radiusOfInfluence = {this.state.radiusOfInfluence}/>
                        {/* <NewTripRadiusComponent */}
                        
                        
                        <div  className = "button-container">
                            <button className = "navigational" onClick = {() => this.findRadiusMarkers()}>NEARBY MARKERS</button><br/>
                            <button className = "navigational" onClick = {this.createTrip}>CREATE TRIP</button><br/>
                            <Link to="/">
                            <button className = "navigational">CANCEL</button>
                            </Link>
                        </div>
                    </div>
                
                    <div className = {"fourty-column"}>
                        <MapComponent
                        seedMarkers = {this.state.seedMarkers}
                        selectedDestinations = {this.allSelectedDestinations()}
                        addToTrip = {this.handleMarkerSelect} 
                        allowAddToTrip = {true}
                        handleClick = {this.placeSeed}  
                        filteredMarkers = {this.props.markers}/>
                    </div>

                    
                    <div className = {"fourty-column"}>
                        <h2>TRIP MARKERS</h2>
                        <div className = {"scroll"}>
                            {this.allSelectedDestinations().map(marker => <MarkerCardComponent 
                            marker = {marker}
                            handleDelete = {this.removeFromTrip}
                            parent = {"createTripContainer"}/>)}
                        </div>
                    </div>
                </div>

            
            </div>

        )
    }
}