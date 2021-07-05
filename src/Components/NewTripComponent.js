import React, { Component } from "react";

export default class NewTripComponent extends Component {

    constructor() {
        super()
        
        }
        
    render() {
        return (
            <div>
            <h2>NewTripComponent</h2>
            <form onChange = {(e) => this.props.handleInputChange(e)}>
                <label>
                    Trip Name<input name = "newTripName" value = {this.props.newTripName}></input>
                </label>
                <label>
                    Trip Description<input name = "newTripDescription" value = {this.props.newTripDescription}></input>
                </label>
            </form>
            </div>
        )
    }
}