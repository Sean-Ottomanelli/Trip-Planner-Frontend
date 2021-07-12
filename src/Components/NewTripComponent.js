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
                        Trip Name: <br/>
                        <input className = "one-line-text-box" 
                        name = "newTripName" 
                        value = {this.props.newTripName}></input>
                    </label>
                </div>
                <div className = "tripFormInputDiv">
                    <label>
                        Trip Description: <br/>
                        <textarea className = "large-text-box" 
                        rows="10" 
                        name = "newTripDescription" 
                        value = {this.props.newTripDescription}></textarea>
                    </label >
                </div>
                <div className = "tripFormInputDiv">
                    <label>RADIUS OF INFLUENCE (MILES):
                        <input
                        className = {"radius-input"}
                        value = {this.props.radiusOfInfluence}
                        name = "radiusOfInfluence"
                        // onChange = {(e) => this.props.handleInputChange(e)}
                        />
                    </label>
                </div>
            </form>
            </div>
        )
    }
}