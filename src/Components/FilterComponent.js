import React, { Component } from "react";

export default class FilterComponent extends Component {

    constructor() {
        super()
        
        }
        
    render() {
        return (
            <div>
                <div className = "filterParamsDiv">
                    <label>
                        <input 
                        type="checkbox" 
                        value="Restaurant" 
                        checked={this.props.showCategory.some(value => value === "Restaurant")} 
                        onChange={(e) => this.props.categorySelect(e)} /> 
                        RESTAURANT
                    </label><br/>
                    <label>
                        <input 
                        type="checkbox" 
                        value="Attraction" 
                        checked={this.props.showCategory.some(value => value === "Attraction")} 
                        onChange={(e) => this.props.categorySelect(e)} /> 
                        ATTRACTION
                    </label><br/>
                    <label>
                        <input 
                        type="checkbox" 
                        value="Hike" 
                        checked={this.props.showCategory.some(value => value === "Hike")} 
                        onChange={(e) => this.props.categorySelect(e)} /> 
                        HIKE
                    </label><br/>
                    <label>
                        <input 
                        type="checkbox" 
                        value="Vista" 
                        checked={this.props.showCategory.some(value => value === "Vista")} 
                        onChange={(e) => this.props.categorySelect(e)} /> 
                        VISTA
                    </label><br/>
                    <label>
                        <input 
                        type="checkbox" 
                        value="Lodging" 
                        checked={this.props.showCategory.some(value => value === "Lodging")} 
                        onChange={(e) => this.props.categorySelect(e)} /> 
                        LODGING
                    </label>
                </div>
                <div className = "filterParamsDiv">
                    <label>
                        <input 
                        type="checkbox" 
                        value="Visited" 
                        checked={this.props.showVisited} 
                        onChange={(e) => this.props.visitedSelect(e)} /> 
                        VISITED
                    </label>
                </div>
                <div className = "filterParamsDiv">
                    <label>
                        <input 
                        type="checkbox" 
                        value="Unvisited" 
                        checked={this.props.showUnvisited} 
                        onChange={(e) => this.props.unvisitedSelect(e)} /> 
                        UNVISITED
                    </label>
                </div>
                <div className = "filterParamsDiv">
                    <label>MINIMUM RATING: {this.props.showRating}<br/>
                        <input
                        type="range"
                        max = {5}
                        min = {1}
                        value = {this.props.showRating}
                        onChange = {(e) => this.props.ratingSelect(e)}/>
                    </label>
                </div>
                <div className = "filterParamsDiv">
                    <label>MINIMUM URGENCY: {this.props.showUrgency}<br/>
                        <input
                        type="range"
                        max = {5}
                        min = {1}
                        value = {this.props.showUrgency}
                        onChange = {(e) => this.props.urgencySelect(e)}/>
                    </label>
                </div>
            </div>
        )
    }
}