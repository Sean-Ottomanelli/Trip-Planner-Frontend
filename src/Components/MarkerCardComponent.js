import React, { Component } from "react";

export default class MarkerCardComponent extends Component {

    constructor() {
        super()
        
        }

    render() {
        return (
            <div className = "marker-card">
                <div className = "thumbnailImage">
                    <img className = "thumbnailImage" src="http://cdn.cnn.com/cnnnext/dam/assets/181010131059-australia-best-beaches-cossies-beach-cocos3.jpg"></img>
                </div>
                <div className = "markerCardDetails">

                    <div className = "markerCardName">
                        <h3 className = "noMargin">{this.props.marker.name}</h3>
                    </div>

                    <div className = "markerCardCategory">
                        <p className = "noMargin">{this.props.marker.category}</p>
                    </div>

                    <div className = "markerCardVisited">
                        <p className = "noMargin">Visited: {this.props.marker.visited ? "Yes" : "No"}</p>
                    </div>

                    <div className = "markerCardRatingUrgency">
                    {this.props.marker.visited
                    ? <p className = "noMargin">Rating: {this.props.marker.user_rating}</p>
                    : <p className = "noMargin">Urgency to visit: {this.props.marker.urgency}</p>}
                    </div>

                    {this.props.parent === "createMarkerContainer"
                    ? <div className = "markerCardButton">
                        <button 
                        onClick = {() => this.props.handleDelete(this.props.marker)}
                        className = "navigational">Delete marker</button>
                    </div>
                    : null}

                    {this.props.parent === "createTripContainer"
                    ? <div className = "markerCardButton">
                        <button
                        onClick = {() => this.props.handleDelete(this.props.marker)}
                        className = "navigational">Remove from trip</button>
                    </div>
                    : null}
                    
                </div>
            </div>
        )
    }
}