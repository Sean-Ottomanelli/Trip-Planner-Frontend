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
                <form onSubmit = {(e) => this.props.handleSubmit(e)}>
                    <div>
                        <label>
                            Marker Name:<input onChange={(e) => this.props.handleInputChange(e)} name = "name"/>
                        </label>
                    </div>
                    <div>
                        <label>
                            Restaurant<input onChange={(e) => this.props.handleInputChange(e)} type = "radio" name = "category" value = "Restuarant"/>
                        </label>
                        <label>
                            Attraction<input onChange={(e) => this.props.handleInputChange(e)} type = "radio" name = "category" value = "Attraction"/>
                        </label>
                        <label>
                            Hike<input onChange={(e) => this.props.handleInputChange(e)} type = "radio" name = "category" value = "Hike"/>
                        </label>
                        <label>
                            Vista<input onChange={(e) => this.props.handleInputChange(e)} type = "radio" name = "category" value = "Vista"/>
                        </label>
                        <label>
                            Lodging<input onChange={(e) => this.props.handleInputChange(e)} type = "radio" name = "category" value = "Lodging"/>
                        </label>
                    </div>
                    <div>
                        <label>
                            Visited <input onChange={(e) => this.props.handleVisited(e)} name="visited" type="checkbox" defaultChecked={this.state.visited}/>
                        </label>
                    </div>
                    <div>
                        {this.state.visited 
                        ? <label>
                            Rating <input onChange={(e) => this.props.handleInputChange(e)} name = "user_rating" type="range" min = {1} max={5}/>
                        </label> 
                        : <label>
                            Urgency <input onChange={(e) => this.props.handleInputChange(e)} name = "urgency" type="range" min = {1} max={5}/>
                        </label>}
                    </div>
                    {/* <div>
                        <label>
                            Latitude:<input value={this.props.newLat} onChange={(e) => this.handleInputChange(e)} name = "latitude"/>
                        </label>
                        <label>
                            Longitude:<input value={this.props.newLng} onChange={(e) => this.handleInputChange(e)} name = "longitude"/>
                        </label>
                    </div> */}
                    {/* <button type="submit">save to map</button> */}
                </form>
            </div>
        )
    }
}