import React, { Component } from "react";
import DayPlannerCard from "./DayPlannerCard";
import DayCardComponent from "./DayCardComponent";

export default class DayPlanner extends Component {

    constructor() {
        super()
        this.state = {
            k: null,
            plannedDays: {}
        }
        }
        
    handleInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
        this.createEmptyClusterArray(e.target.value)
    }

    createEmptyClusterArray = (k) => {

        let arrayOfClusterData = []

        for( let i = 0; i < parseInt(k); i++){
            arrayOfClusterData[i] ={
                dayName: `Day ${i + 1}`,
                clusterArray:this.props.trip.markers,
                // latitude: null,
                // longitude: null
            }
        }
    }

    getRandom = (min,max) => {
        let randomNumber = min + (max - min)*Math.random()
        return(randomNumber)
    }

    findCentroid = (array) => {
        let averageLat = array.reduce((total, next) => total + next.latitude, 0)/array.length
        let averageLon = array.reduce((total, next) => total + next.longitude, 0)/array.length
        let centroid = [averageLat, averageLon]
        return(centroid)
    }    

    haversine = (radians) => {
        let result = (1-Math.cos(radians))/2
        return(result)
    }

    distanceBetweenPoints = (lat1d,lon1d,lat2d,lon2d, index) => {
        
        // let lat1d = coord1[1]
        // let lon1d = coord1[0]
        // let lat2d = coord2[1]
        // let lon2d = coord2[0]
        let lat1 = lat1d * Math.PI/180
        let lat2 = lat2d * Math.PI/180
        let lon1 = lon1d * Math.PI/180
        let lon2 = lon2d * Math.PI/180
        let radius = 3958.8
        let insideSquareRoot = this.haversine(lat2-lat1)+Math.cos(lat1)*Math.cos(lat2)*this.haversine(lon2-lon1)
        let distance = 2*radius*Math.asin(Math.sqrt(insideSquareRoot))
        return ({
            distance: distance, 
            centroidIndex: index
        })
    }

    haversineDistance = (lat1d,lon1d,lat2d,lon2d) => {
    
        let lat1 = lat1d * Math.PI/180
        let lat2 = lat2d * Math.PI/180
        let lon1 = lon1d * Math.PI/180
        let lon2 = lon2d * Math.PI/180
        let radius = 3958.8
        let insideSquareRoot = this.haversine(lat2-lat1)+Math.cos(lat1)*Math.cos(lat2)*this.haversine(lon2-lon1)
        let distance = 2*radius*Math.asin(Math.sqrt(insideSquareRoot))
        return distance
    } 
    
    calcMaxLat = (array) => {return(Math.max(...array.map(coordinate => coordinate.latitude)))}
    calcMinLat = (array) => {return(Math.min(...array.map(coordinate => coordinate.latitude)))}
    calcMaxLon = (array) => {return(Math.max(...array.map(coordinate => coordinate.longitude)))}
    calcMinLon = (array) => {return(Math.min(...array.map(coordinate => coordinate.longitude)))}

    getRandomSeedCoordinates = (array) => {
        let maxLat = this.calcMaxLat(array)
        let minLat = this.calcMinLat(array)
        let maxLng = this.calcMaxLon(array)
        let minLng = this.calcMinLon(array)

        let latCoord = this.getRandom(minLat,maxLat)
        let lngCoord = this.getRandom(minLng,maxLng)

        return ([latCoord,lngCoord])
    }

    getMinimumDistance = (array) => {
        // return array.reduce((min, dataPoint) => dataPoint.distance <=min ? dataPoint.distance : min)
        let sortedValues = array.sort((a,b) => a.distance - b.distance)
        return sortedValues[0]
    }

    compareArrays = (unflattenedArray1, unflattenedArray2) => {
        let array1 = unflattenedArray1.flat()
        let array2 = unflattenedArray2.flat()
        let arrayOfBooleans = array1.map(element1 => 
            array2.some(element2 => element2 === element1))
        
            if (arrayOfBooleans.some(bool => bool === false)){
                return false
            } else {
                return true
            }
    }

    sampleVariance = (clusterData) => {
        let sampleVariance
        if (clusterData.clusterArray.length > 1) {
            sampleVariance = clusterData.clusterArray.map(dataPoint => (
                Math.pow(this.haversineDistance(dataPoint.latitude, dataPoint.longitude, clusterData.latitude, clusterData.longitude),2)
            )).reduce((total,next) => total + next, 0)/(clusterData.clusterArray.length - 1)
        } else {
            sampleVariance = 0
        }

        return sampleVariance
    }


    getArrays = () => {

        let iterations = []

        for( let i = 0; i < 10; i++){
            iterations[i] ={
                i
            }
        }
        
        let arrays = iterations.map( i => this.calculateDays())

        let sortedArrays = arrays.sort((a,b) => a.variance - b.variance)

        let bestDayTripArray = sortedArrays[0]

        let optimalDayTrip = bestDayTripArray.daytrips

        this.setState({plannedDays:optimalDayTrip})

        console.log(bestDayTripArray.daytrips)
    }


    calculateDays = () => {

        let allMarkers = this.props.trip.markers
        let initialDaysArray = []
        
        for( let i = 0; i < parseInt(this.state.k); i++){
            initialDaysArray[i] ={
                dayName: `Day ${i + 1}`,
                clusterArray:[],
                latitude: this.getRandomSeedCoordinates(allMarkers)[0],
                longitude: this.getRandomSeedCoordinates(allMarkers)[1]}
            }

        initialDaysArray[0].clusterArray = allMarkers

        let newDaysArray = this.formClusters(initialDaysArray)

        return newDaysArray


    }
    
    
    formClusters = (startingArray) => {

        let startingCentroids = startingArray.map(day => [day.latitude, day.longitude])

        let allMarkers = startingArray.map(day => day.clusterArray).flat()
        
        let nearestCentroidPointDistanceArray = allMarkers.map(marker => (
            ({...marker, 
                ...startingCentroids.map(centroid => (
                    this.distanceBetweenPoints(centroid[0], centroid[1], marker.latitude, marker.longitude, startingCentroids.indexOf(centroid))
            )).sort((a,b) => a.distance - b.distance)[0]
                })
        ))

        // let newArray = nearestCentroidPointDistanceArray.map(pointDistance => ({...pointDistance[0],...pointDistance[1]}))

        let arrayAirGap1 = startingArray.map(day => ({...day}))
        
        let newArrayWithUpdatedMarkers = arrayAirGap1.map(day => {
            day.dayName = day.dayName
            day.latitude = day.latitude
            day.longitude = day.longitude
            day.clusterArray = nearestCentroidPointDistanceArray.filter(point => arrayAirGap1.indexOf(day) === point.centroidIndex)
            return(day)
        })

        let arrayAirGap2 = newArrayWithUpdatedMarkers.map(day => ({...day}))

        let endingArray = arrayAirGap2.map(day => {
            day.dayName = day.dayName
            day.clusterArray = day.clusterArray
            day.latitude = day.clusterArray.length > 0 ? this.findCentroid(day.clusterArray)[0] : day.latitude
            day.longitude = day.clusterArray.length > 0 ? this.findCentroid(day.clusterArray)[1] : day.longitude
            return(day)
        })

        let endingCentroids = endingArray.map(day => [day.latitude, day.longitude])


        

        if (this.compareArrays(endingCentroids, startingCentroids)) {
            let output = {}
            output.daytrips = endingArray
            let varianceArray = endingArray.map(day => this.sampleVariance(day))
            let variance = varianceArray.reduce((total,next) => total + next, 0)
            output.variance = variance
            return (output)
        } else {
            return this.formClusters(endingArray)
        }

    }

    

    

    render() {
        return (
            <div>
                <h2>DAY PLANNER</h2>
                    <form>
                        <label>
                            trip days: <input onChange = {(e) => this.handleInputChange(e)} name = "k" value = {this.state.k}></input>
                        </label>
                    </form>
                <button className = "navigational" onClick = {() => this.getArrays()}>PLAN DAYS</button>
                {this.state.plannedDays.length > 0 
                ? this.state.plannedDays.map(day => <DayCardComponent day = {day}/>)
            : null}
            </div>
            
        )
    }
}