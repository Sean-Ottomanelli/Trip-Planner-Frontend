import React, { Component } from "react";

export default class NewTripRadiusComponent extends Component {

    constructor() {
        super()
        
        }

    

    render() {
        return (
            <div className = "RadiusParamsDiv">
                    <label>RADIUS OF INFLUENCE (MILES):
                        <input
                        className = {"radius-input"}
                        value = {this.props.radiusOfInfluence}
                        onChange = {(e) => this.props.radiusOfInfluenceSelect(e)}/>
                    </label>
            </div>
            
        )
    }
}