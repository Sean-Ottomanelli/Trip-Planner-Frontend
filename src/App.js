import React, {Component} from 'react'
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link, withRouter } from "react-router-dom";
import CreateMarkerContainer from './Containers/CreateMarkerContainer';
import CreateTripContainer from './Containers/CreateTripContainer';
import LoginContainer from './Containers/LoginContainer';
import MainMapContainer from './Containers/MainMapContainer';
import MyTripsContainer from './Containers/MyTripsContainer';
import SuggestedTripsContainer from './Containers/SuggestedTripsContainer';
import TripContainer from './Containers/TripContainer';

class App extends Component{

  constructor() {
    super()
    this.state = {
      userId:"",
      trips:[],
      markers: [],
      showCategory: [],
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

  doesNothing = (coords) => {
    console.log("I do nothing unless I'm rendered in create new marker")
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
        <button onClick = {this.logoutHandler}>logout</button>
        <Router>

          <ul>
            <li>
              <Link to="/">main map</Link>
            </li>
            <li>
              <Link to="createmarker">create marker</Link>
            </li>
            <li>
              <Link to="createtrip">create trip</Link>
            </li>
            <li>
              <Link to="mytrips">my trips</Link>
            </li>
            <li>
              <Link to="suggestedtrips">suggested trips</Link>
            </li>
            <li>
              <Link to="tripdetails">trip details</Link>
            </li>
          </ul>


          <Switch>
            <Route path="/createmarker"
              render={(routerProps) => localStorage.token 
              ? <CreateMarkerContainer 
              filteredMarkers = {filteredMarkers}
              userId = {this.state.userId}
              addNewMarker = {this.addNewMarker}/> 
              : null}/>

            <Route path="/createtrip"
              render={(routerProps) => localStorage.token 
              ? <CreateTripContainer/> 
              : null}/>

            <Route exact path="/"
              render={(routerProps) => localStorage.token 
              ? <MainMapContainer 
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
              filteredMarkers = {filteredMarkers}
              makeNewMarker = {this.doesNothing}/> 
              : <LoginContainer/>}/>
            <Route path="/mytrips"
              render={(routerProps) => localStorage.token 
              ? <MyTripsContainer/> 
              : null}/>

            <Route path="/suggestedtrips"
              render={(routerProps) => localStorage.token 
              ? <SuggestedTripsContainer/> 
              : null}/>

            <Route path="/tripdetails"
              render={(routerProps) => localStorage.token 
              ? <TripContainer/> 
              : null}/>
          </Switch>
        </Router>
      </div>
    )
  }
}

export default App;
