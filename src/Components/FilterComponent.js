import React, { Component } from "react";

export default class FilterComponent extends Component {

    constructor() {
        super()
        
        }
        
    render() {
        return (
            <div>
                <div>
                    <label>
                        <input 
                        type="checkbox" 
                        value="Restaurant" 
                        checked={this.props.showCategory.some(value => value === "Restaurant")} 
                        onChange={(e) => this.props.categorySelect(e)} /> 
                        Restaurant
                    </label>
                    <label>
                        <input 
                        type="checkbox" 
                        value="Attraction" 
                        checked={this.props.showCategory.some(value => value === "Attraction")} 
                        onChange={(e) => this.props.categorySelect(e)} /> 
                        Attraction
                    </label>
                    <label>
                        <input 
                        type="checkbox" 
                        value="Hike" 
                        checked={this.props.showCategory.some(value => value === "Hike")} 
                        onChange={(e) => this.props.categorySelect(e)} /> 
                        Hike
                    </label>
                    <label>
                        <input 
                        type="checkbox" 
                        value="Vista" 
                        checked={this.props.showCategory.some(value => value === "Vista")} 
                        onChange={(e) => this.props.categorySelect(e)} /> 
                        Vista
                    </label>
                    <label>
                        <input 
                        type="checkbox" 
                        value="Lodging" 
                        checked={this.props.showCategory.some(value => value === "Lodging")} 
                        onChange={(e) => this.props.categorySelect(e)} /> 
                        Lodging
                    </label>
                </div>
                <div>
                    <label>
                        <input 
                        type="checkbox" 
                        value="Visited" 
                        checked={this.props.showVisited} 
                        onChange={(e) => this.props.visitedSelect(e)} /> 
                        Visited
                    </label>
                    <label>
                        <input 
                        type="checkbox" 
                        value="Unvisited" 
                        checked={this.props.showUnvisited} 
                        onChange={(e) => this.props.unvisitedSelect(e)} /> 
                        Unvisited
                    </label>
                </div>
                <div>
                    <label>
                        <input
                        type="range"
                        max = {5}
                        min = {1}
                        value = {this.props.showRating}
                        onChange = {(e) => this.props.ratingSelect(e)}/>
                        Minimum Rating
                    </label>
                </div>
                <div>
                    <label>
                        <input
                        type="range"
                        max = {5}
                        min = {1}
                        value = {this.props.showUrgency}
                        onChange = {(e) => this.props.urgencySelect(e)}/>
                        Minimum Urgency
                    </label>
                </div>
            </div>
        )
    }
}