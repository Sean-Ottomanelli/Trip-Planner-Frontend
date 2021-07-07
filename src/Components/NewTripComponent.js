import React, { Component } from "react";

export default class NewTripComponent extends Component {

    constructor() {
        super()
        
        }
        
    render() {
        return (
            <div>
            <form onChange = {(e) => this.props.handleInputChange(e)}>
                <div className = "tripFormInputDiv">
                    <label>
                        Trip Name: <br/><input className = "one-line-text-box" name = "newTripName" value = {this.props.newTripName}></input>
                    </label>
                </div>
                <div className = "tripFormInputDiv">
                    <label>
                        Trip Description: <br/><textarea className = "large-text-box" rows="20" name = "newTripDescription" value = {this.props.newTripDescription}></textarea>
                    </label >
                </div>
            </form>
            </div>
        )
    }
}