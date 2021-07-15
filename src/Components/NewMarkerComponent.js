import React, { Component } from "react";

export default class NewMarkerComponent extends Component {

    constructor() {
        super()
        this.state = {

        }  
    }
        
    render() {
        return (
            <div>
                <form>
                    <div className = "newMarkerParamsDiv">
                        <label>
                            MARKER NAME:<br/><input onChange={(e) => this.props.handleInputChange(e)} name = "name" value = {this.props.name}/>
                        </label>
                    </div>
                    <div className = "newMarkerParamsDiv">
                        <label>
                            MARKER IMAGE:<br/><input onChange={(e) => this.props.handleInputChange(e)} name = "image" value = {this.props.image}/>
                        </label>
                    </div>
                    <div className = "newMarkerParamsDiv">
                        <label>
                            <input onChange={(e) => this.props.handleInputChange(e)} type = "radio" name = "category" value = "Restaurant"/>RESTAURANT
                        </label><br/>
                        <label>
                            <input onChange={(e) => this.props.handleInputChange(e)} type = "radio" name = "category" value = "Attraction"/>ATTRACTION
                        </label><br/>
                        <label>
                            <input onChange={(e) => this.props.handleInputChange(e)} type = "radio" name = "category" value = "Hike"/>HIKE
                        </label><br/>
                        <label>
                            <input onChange={(e) => this.props.handleInputChange(e)} type = "radio" name = "category" value = "Vista"/>VISTA
                        </label><br/>
                        <label>
                            <input onChange={(e) => this.props.handleInputChange(e)} type = "radio" name = "category" value = "Lodging"/>LODGING
                        </label>
                    </div>
                    <div className = "newMarkerParamsDiv">
                        <label>
                            <input onChange={(e) => this.props.handleVisited(e)} name="visited" type="checkbox" defaultChecked={this.state.visited}/>VISITED
                        </label>
                    </div>
                    <div className = "newMarkerParamsDiv">
                        {this.props.visited 
                        ? <label>
                            RATING: {this.props.user_rating}<br/><input onChange={(e) => this.props.handleInputChange(e)} name = "user_rating" type="range" min = {1} max={5} value = {this.props.user_rating}/>
                        </label> 
                        : <label>
                            URGENCY: {this.props.urgency}<br/><input onChange={(e) => this.props.handleInputChange(e)} name = "urgency" type="range" min = {1} max={5} value = {this.props.urgency}/>
                        </label>}
                    </div>
                </form>
            </div>
        )
    }
}