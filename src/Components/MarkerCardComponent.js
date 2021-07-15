import React, { Component } from "react";

export default class MarkerCardComponent extends Component {

    constructor() {
        super()
        this.state = {
            showUpdateForm: false,
            name:"",
            image:"",
            category:"",
            visited: false,
            urgency: 5,
            user_rating: 5,
            markerId: null,
        }
        }

        componentDidMount() {
            this.populateInformation()
        }

        populateInformation = () => {
            this.setState({
                name:this.props.marker.name,
                image:this.props.marker.image,
                category:this.props.marker.category,
                visited:this.props.marker.visited,
                urgency:this.props.marker.urgency,
                user_rating:this.props.marker.user_rating,
                markerId:this.props.marker.id,
            })
        }

        updateMarker = () => {

            let newVisitedMarker = {
                name: this.state.name,
                category: this.state.category,
                visited: this.state.visited,
                user_rating: this.state.user_rating,
                image: this.state.image
            }
    
            let newUnvisitedMarker = {
                name: this.state.name,
                category: this.state.category,
                visited: this.state.visited,
                urgency: this.state.urgency,
                image: this.state.image
            }
    
            let newMarker = this.state.visited ? newVisitedMarker : newUnvisitedMarker  

            fetch(`http://localhost:3000/markers/${this.state.markerId}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization":`Bearer ${localStorage.token}`
                },
                body: JSON.stringify(newMarker),
            })
            .then((r) => r.json())
            .then((markerObj) => this.props.updateMarkerInState(markerObj));

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


    render() {
        return (
            <div> {this.state.showUpdateForm
                
                

                ?<div>
                <form onSubmit = {(e) => e.preventDefault()}>
                    <div className = "marker-card">
                        <div className = "editMarkerInputs">
                            <div className = "editMarkerParamsDiv">
                                <label>
                                    MARKER NAME:<br/><input onChange={(e) => this.handleInputChange(e)} name = "name" value = {this.state.name}/>
                                </label>
                            </div>
                            <div className = "editMarkerParamsDiv">
                                <label>
                                    MARKER IMAGE:<br/><input onChange={(e) => this.handleInputChange(e)} name = "image" value = {this.state.image}/>
                                </label>
                            </div>
                            <div className = "centerButton">
                                <div className = "editMarkerParamsDiv">
                                    <button className = "navigational"
                                    onClick = {() => {
                                        this.updateMarker()
                                        this.setState({showUpdateForm:false})
                                        }}>
                                        SAVE MARKER EDITS
                                    </button>
                                </div>
                                <div className = "editMarkerParamsDiv">
                                    <button className = "navigational"
                                    onClick = {() => this.setState({showUpdateForm:false})}>
                                        CANCEL
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className = "editMarkerCategory/Urgency/Rating">
                            <div className = "editMarkerParamsDiv">
                                <label>
                                    <input onChange={(e) => this.handleInputChange(e)} type = "radio" checked = {this.state.category === "Restaurant"} name = "category" value = "Restaurant"/>RESTAURANT
                                </label><br/>
                                <label>
                                    <input onChange={(e) => this.handleInputChange(e)} type = "radio" checked = {this.state.category === "Attraction"} name = "category" value = "Attraction"/>ATTRACTION
                                </label><br/>
                                <label>
                                    <input onChange={(e) => this.handleInputChange(e)} type = "radio" checked = {this.state.category === "Hike"} name = "category" value = "Hike"/>HIKE
                                </label><br/>
                                <label>
                                    <input onChange={(e) => this.handleInputChange(e)} type = "radio" checked = {this.state.category === "Vista"} name = "category" value = "Vista"/>VISTA
                                </label><br/>
                                <label>
                                    <input onChange={(e) => this.handleInputChange(e)} type = "radio" checked = {this.state.category === "Lodging"} name = "category" value = "Lodging"/>LODGING
                                </label>
                            </div>
                            <div className = "editMarkerParamsDiv">
                                <label>
                                    <input onChange={(e) => this.handleVisited(e)} name="visited" type="checkbox" defaultChecked={this.state.visited}/>VISITED
                                </label>
                            </div>
                            <div className = "editMarkerParamsDiv">
                                {this.state.visited 
                                ? <label>
                                    RATING: {this.state.user_rating}<br/><input onChange={(e) => this.handleInputChange(e)} name = "user_rating" type="range" min = {1} max={5} value = {this.state.user_rating}/>
                                </label> 
                                : <label>
                                    URGENCY: {this.state.urgency}<br/><input onChange={(e) => this.handleInputChange(e)} name = "urgency" type="range" min = {1} max={5} value = {this.state.urgency}/>
                                </label>}
                            </div>
                        </div>
                    </div>
                </form>
                </div>



                : <div className = "marker-card">
                    <div className = "thumbnailImage">
                        <img className = "thumbnailImage" src={this.props.marker.image ? this.props.marker.image : "http://cdn.cnn.com/cnnnext/dam/assets/181010131059-australia-best-beaches-cossies-beach-cocos3.jpg"}></img>
                    </div>
                    <div className = "markerCardDetails">

                        <div className = "markerCardName">
                            <h3 className = "noMargin">{this.props.marker.name}</h3>
                        </div>

                        <div className = "markerCardCategory">
                            <p className = "noMargin">{this.props.marker.category}</p>
                        </div>

                        <div className = "markerCardVisited">
                            <p className = "noMargin">Visited: {this.props.marker.visited ? "Yes" : "No"}</p>
                        </div>

                        <div className = "markerCardRatingUrgency">
                        {this.props.marker.visited
                        ? <p className = "noMargin">Rating: {this.props.marker.user_rating}</p>
                        : <p className = "noMargin">Urgency to visit: {this.props.marker.urgency}</p>}
                        </div>

                        {this.props.parent === "createMarkerContainer"
                        ? <div className = "markerCardButton">
                            <button 
                            onClick = {() => this.props.handleDelete(this.props.marker)}
                            className = "navigational">
                                DELETE MARKER
                            </button><br/>
                            <button 
                            onClick = {() => this.setState({showUpdateForm:true})}
                            className = "navigational">
                                EDIT MARKER
                            </button>

                        </div>
                        : null}

                        {this.props.parent === "createTripContainer"
                        ? <div className = "markerCardButton">
                            <button
                            onClick = {() => this.props.handleDelete(this.props.marker)}
                            className = "navigational">REMOVE FROM TRIP</button>
                        </div>
                        : null}
                        
                    </div>
                </div>}



            </div>
        )
    }
}