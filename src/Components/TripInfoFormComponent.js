import React, { Component } from "react";

export default class TripInfoFormComponent extends Component {

    constructor() {
        super()
        
        }
        
    render() {
        return (
            <div>
            <form onChange = {(e) => this.props.handleInputChange(e)}>
                <div className = "editTripInputDiv">
                    <label>
                        Trip Name: <br/><input 
                        name = "name" 
                        value = {this.props.name}
                        className = "one-line-text-box"></input>
                    </label>
                </div>
                <div className = "editTripInputDiv">
                    <label>
                        Trip Description:<br/><textarea 
                        name = "description" 
                        value = {this.props.description}
                        className = "large-text-box"
                        rows="5"></textarea>
                    </label>
                </div>
                <div className = "editTripInputDiv">
                    <label>
                        Completed <input onChange={(e) => this.props.handleCompleted(e)} name="visited" type="checkbox" checked={this.props.completed}/>
                    </label>
                </div>
            </form>
            </div>
        )
    }
}