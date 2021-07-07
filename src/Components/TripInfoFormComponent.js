import React, { Component } from "react";

export default class TripInfoFormComponent extends Component {

    constructor() {
        super()
        
        }
        
    render() {
        return (
            <div>
            <form onChange = {(e) => this.props.handleInputChange(e)}>
                <label>
                    Trip Name<input name = "name" value = {this.props.name}></input>
                </label><br/>
                <label>
                    Trip Description<input name = "description" value = {this.props.description}></input>
                </label><br/>
                <label>
                    Completed <input onChange={(e) => this.props.handleCompleted(e)} name="visited" type="checkbox" defaultChecked={this.props.completed}/>
                </label>
            </form>
            </div>
        )
    }
}