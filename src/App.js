import React, {Component} from 'react'
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link, withRouter } from "react-router-dom";
import EditMarkersContainer from './Containers/EditMarkersContainer';
import CreateTripContainer from './Containers/CreateTripContainer';
import LoginContainer from './Containers/LoginContainer';
import MainMapContainer from './Containers/MainMapContainer';
import MyTripsContainer from './Containers/MyTripsContainer';
import SuggestedTripsContainer from './Containers/SuggestedTripsContainer';
import EditTripContainer from './Containers/EditTripContainer';
import ViewTripContainer from './Containers/ViewTripContainer';

class App extends Component{

  constructor() {
    super()
    this.state = {
      userId:"",
      trips:[],
      markers: [],
      showCategory: ["Restaurant", "Attraction", "Hike", "Vista", "Lodging"],
      showVisited: true,
      showUnvisited: true,
      showRating: 1,
      showUrgency: 1,
    }
  }

  getUserData = () => {
    fetch("http://localhost:3000/getuser",
    {headers:{
      "Authorization":`Bearer ${localStorage.token}`
    }})
    .then((r) => r.json())
    .then((user) => {
      this.setState({
        userId: user.id,
        trips: user.trips,
        markers: user.markers
      })
    })
  }
  
  logoutHandler = () => {
    localStorage.clear()
    window.location.reload()
  }

  addNewMarker = (markerObj) => {
    this.setState({
      markers: [...this.state.markers, markerObj]
    })
  }

  addTripToUser = (tripObj) => {
    this.setState({
      trips: [...this.state.trips, tripObj]
    })
  }

  addMarkerToUser = (MarkerObj) => {
    this.setState({
      trips: ({...this.state.trips,markers: [...this.state.trips.markers, MarkerObj]})
    })
  }

  deleteMarker = (input) => {
    let updatedMarkers = this.state.markers.filter(marker => marker.id != input.id)
    this.setState({
      markers: updatedMarkers
    })
  }

  deleteAssociatedDestinations = (input) => {

    let updatedTrips = this.state.trips.map(trip => {

      let markers = trip.markers.filter(marker => marker.id != input.id)

      trip.markers = markers

      return(trip)
    })

    this.setState({
      trips: updatedTrips
    })

  }

  categorySelect = (e) => {
    if(!this.state.showCategory.find(category => e.target.value === category)) {
        this.setState({
            showCategory: [...this.state.showCategory,e.target.value]
        })
    }
    else {
        let newCategoryState = this.state.showCategory.filter(category => category != e.target.value)
        this.setState({
            showCategory: newCategoryState
        })
    }
  }

  visitedSelect = () => {
      this.setState({
          showVisited: !this.state.showVisited
      })
  }

  unvisitedSelect = () => {
      this.setState({
          showUnvisited: !this.state.showUnvisited
      })
  }

  ratingSelect = (e) => {
      this.setState({
          showRating: e.target.value
      })
  }

  urgencySelect = (e) => {
      this.setState({
          showUrgency: e.target.value
      })
  }

  removeTripFromState = (tripId) => {
    let updatedTrips = this.state.trips.filter(trip => trip.id != tripId)
    this.setState({
      trips: updatedTrips
    })
  }

  deleteTrip = (tripId) => {
    fetch(`http://localhost:3000/trips/${tripId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "Authorization":`Bearer ${localStorage.token}`
    }})
    .then(() => {
      console.log("Deleted")
      this.removeTripFromState(tripId)
    });
  }

  updateTripInState = (updatedTrip) => {
    let updatedTrips = this.state.trips.map(trip => trip.id === updatedTrip.id ? updatedTrip : trip )
    this.setState({
      trips: updatedTrips
    })
  }

  componentDidMount(){
    if (localStorage.token) {
      this.getUserData()
    }
  }
  
  render() {

    let filteredMarkers = this.state.markers.filter(marker => {
    let categorySatisfied = false
    if (this.state.showCategory.length !== 0) {
      categorySatisfied = this.state.showCategory.some(category => category === marker.category)
    } else {
      categorySatisfied = true
    }
    
    let visitedSatisfied = true
    if (marker.visited === true) {
      visitedSatisfied = !!this.state.showVisited ? true : false
    } else {
      visitedSatisfied = true
    }
    
    let unvisitedSatisfied = true
    if (marker.visited === false) {
      unvisitedSatisfied = this.state.showUnvisited ? true : false
    } else {
      unvisitedSatisfied = true
    }
    
    let ratingSatisfied = false
    if (marker.user_rating) {
      ratingSatisfied = marker.user_rating >= this.state.showRating ? true : false
    } else {
      ratingSatisfied = true
    }
    
    let urgencySatisfied = true
    if (marker.urgency) {
      urgencySatisfied = marker.urgency >= this.state.showUrgency ? true : false
    } else {
      urgencySatisfied = true
    }
    
    if (categorySatisfied && visitedSatisfied && unvisitedSatisfied && ratingSatisfied && urgencySatisfied) {
      return marker
    }
  })

    return(
      <div>
        {localStorage.token 
        ? <div className = {"topNavBar"}>
          <button className = {"authButton left-space"} onClick = {this.logoutHandler}><h2>LOGOUT</h2></button>
        </div>
        : null}
        <Router>

          {/* <ul>
            <li>
              <Link to="/">main map</Link>
            </li>
            <li>
              <Link to="/editmarkers">edit markers</Link>
            </li>
            <li>
              <Link to="/createtrip">create trip</Link>
            </li>
            <li>
              <Link to="/mytrips">my trips</Link>
            </li>
            <li>
              <Link to="/suggestedtrips">suggested trips</Link>
            </li>
            <li>
              <Link to="/viewtripdetails">view trip details</Link>
            </li>
            <li>
              <Link to="/edittripdetails">edit trip details</Link>
            </li>
          </ul> */}


          <Switch>
            <Route path="/editmarkers"
              render={(routerProps) => localStorage.token 
              ? <EditMarkersContainer
              {...routerProps}
              deleteAssociatedDestinations = {this.deleteAssociatedDestinations} 
              filteredMarkers = {filteredMarkers}
              userId = {this.state.userId}
              addNewMarker = {this.addNewMarker}
              deleteMarker = {this.deleteMarker}/> 
              : <LoginContainer/>}/>

            <Route path="/createtrip"
              render={(routerProps) => localStorage.token 
              ? <CreateTripContainer
              {...routerProps}
              addTripToUser = {this.addTripToUser}
              // addMarkerToUser = {this.addMarkerToUser}
              userId = {this.state.userId}
              markers = {this.state.markers}/> 
              : <LoginContainer/>}/>

            <Route exact path="/"
              render={(routerProps) => localStorage.token 
              ? <MainMapContainer
              {...routerProps} 
              categorySelect = {this.categorySelect} 
              showCategory = {this.state.showCategory}
              visitedSelect = {this.visitedSelect} 
              showVisited = {this.state.showVisited}
              unvisitedSelect = {this.unvisitedSelect} 
              showUnvisited = {this.state.showUnvisited}
              ratingSelect = {this.ratingSelect}
              showRating = {this.state.showRating}
              urgencySelect = {this.urgencySelect}
              showUrgency = {this.state.showUrgency} 
              markers = {this.state.markers}
              filteredMarkers = {filteredMarkers}/> 
              : <LoginContainer/>}/>

            <Route path="/mytrips"
              render={(routerProps) => localStorage.token 
              ? <MyTripsContainer
              {...routerProps}
              deleteTrip = {this.deleteTrip}
              filteredMarkers = {filteredMarkers}
              trips = {this.state.trips}/> 
              : <LoginContainer/>}/>

            <Route path="/suggestedtrips"
              render={(routerProps) => localStorage.token 
              ? <SuggestedTripsContainer
              {...routerProps}/> 
              : <LoginContainer/>}/>

            <Route path="/edittripdetails/:tripId"
              render={(routerProps) => localStorage.token 
              ? <EditTripContainer
              {...routerProps}
              deleteTrip = {this.deleteTrip}
              updateTripInState = {this.updateTripInState}
              trips = {this.state.trips}
              markers = {this.state.markers}/> 
              : <LoginContainer/>}/>

            <Route path="/viewtripdetails/:tripId"
              render={(routerProps) => localStorage.token 
              ? <ViewTripContainer
              {...routerProps}
              trips = {this.state.trips}
              markers = {this.state.markers}/> 
              : <LoginContainer/>}/>
          </Switch>
        </Router>
      </div>
    )
  }
}

export default App;
