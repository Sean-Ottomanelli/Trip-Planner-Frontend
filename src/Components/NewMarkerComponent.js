import React, { Component } from "react";

export default class NewMarkerComponent extends Component {

    constructor() {
        super()
        this.state = {
            name:"",
            category:"",
            visited: false,
            urgency: 5,
            user_rating: 5,
        }  
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

    handleSubmit = (e) => {
        e.preventDefault()

        let newVisitedMarker = {
            name: this.state.name,
            category: this.state.category,
            visited: this.state.visited,
            user_rating: this.state.user_rating,
            latitude: this.props.newLat,
            longitude: this.props.newLng,
            user_id: this.props.userId
        }

        let newUnvisitedMarker = {
            name: this.state.name,
            category: this.state.category,
            visited: this.state.visited,
            urgency: this.state.urgency,
            latitude: this.props.newLat,
            longitude: this.props.newLng,
            user_id: this.props.userId
        }

        let newMarker = this.state.visited ? newVisitedMarker : newUnvisitedMarker

        console.log(newMarker)
        
        fetch("http://localhost:3000/markers", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization":`Bearer ${localStorage.token}`
            },
            body: JSON.stringify(newMarker),
            })
        .then((r) => r.json())
        .then((newMarker) => this.props.addNewMarker(newMarker));
    }
        
    render() {
        return (
            <div>
                <form onSubmit = {(e) => this.handleSubmit(e)}>
                    <div>
                        <label>
                            Marker Name:<input onChange={(e) => this.handleInputChange(e)} name = "name"/>
                        </label>
                    </div>
                    <div>
                        <label>
                            Restaurant<input onChange={(e) => this.handleInputChange(e)} type = "radio" name = "category" value = "Restuarant"/>
                        </label>
                        <label>
                            Attraction<input onChange={(e) => this.handleInputChange(e)} type = "radio" name = "category" value = "Attraction"/>
                        </label>
                        <label>
                            Hike<input onChange={(e) => this.handleInputChange(e)} type = "radio" name = "category" value = "Hike"/>
                        </label>
                        <label>
                            Vista<input onChange={(e) => this.handleInputChange(e)} type = "radio" name = "category" value = "Vista"/>
                        </label>
                        <label>
                            Lodging<input onChange={(e) => this.handleInputChange(e)} type = "radio" name = "category" value = "Lodging"/>
                        </label>
                    </div>
                    <div>
                        <label>
                            Visited <input onChange={(e) => this.handleVisited(e)} name="visited" type="checkbox" defaultChecked={this.state.visited}/>
                        </label>
                    </div>
                    <div>
                        {this.state.visited 
                        ? <label>
                            Rating <input onChange={(e) => this.handleInputChange(e)} name = "user_rating" type="range" min = {1} max={5}/>
                        </label> 
                        : <label>
                            Urgency <input onChange={(e) => this.handleInputChange(e)} name = "urgency" type="range" min = {1} max={5}/>
                        </label>}
                    </div>
                    <div>
                        <label>
                            Latitude:<input value={this.props.newLat} onChange={(e) => this.handleInputChange(e)} name = "latitude"/>
                        </label>
                        <label>
                            Longitude:<input value={this.props.newLng} onChange={(e) => this.handleInputChange(e)} name = "longitude"/>
                        </label>
                    </div>
                    <button type="submit">save to map</button>
                </form>
            </div>
        )
    }
}