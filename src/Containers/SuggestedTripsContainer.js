import React, { Component } from "react";
import ClusterDataComponent from "../Components/ClusterDataComponent";

export default class SuggestedTripsContainer extends Component {

    constructor() {
        super()
        this.state = {
            arrayOfClusterData: [],
            k: 0,
            testData: [],
        }
        }


    componentDidMount(){
        this.setState({
            testData:[{
                latitude:10,
                longitude:10
            },{
                latitude:20,
                longitude:30
            },{
                latitude:30,
                longitude:30
            },{
                latitude:40,
                longitude:20
            },{
                latitude:50,
                longitude:40
            },{
                latitude:10,
                longitude:30
            },{
                latitude:20,
                longitude:10
            },{
                latitude:30,
                longitude:50
            },{
                latitude:40,
                longitude:40
            },{
                latitude:50,
                longitude:40
            },{
                latitude:10,
                longitude:50
            },{
                latitude:20,
                longitude:20
            }]
        })
    }
    

    handleInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
        this.seedClusterData(e.target.value)
    }


    seedClusterData = (k) => {
        let allLats = this.state.testData.map(coordinate => coordinate.latitude)
        let allLngs = this.state.testData.map(coordinate => coordinate.longitude)
        let maxLat = Math.max(...allLats)
        let minLat = Math.min(...allLats)
        let maxLng = Math.max(...allLngs)
        let minLng = Math.min(...allLngs)
        let arrayOfClusterData = []
        for( let i = 0; i < parseInt(k); i++){
            arrayOfClusterData[i] =
                {clusterArray:[],
                latitude: this.getRandom(minLat,maxLat),
                longitude: this.getRandom(minLng,maxLng)}
            }
        this.setState({
            arrayOfClusterData:arrayOfClusterData
        })
    }


    findCentroid = (array) => {
        let averageLat = array.reduce((total, next) => total + next.latitude, 0)/array.length
        let averageLon = array.reduce((total, next) => total + next.longitude, 0)/array.length
        let centroid = [averageLat, averageLon]
        return(centroid)
    }


    getRandom = (min,max) => {
        let randomNumber = min + (max - min)*Math.random()
        return(randomNumber)
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
            latitude: lat2d,
            longitude: lon2d,
            index: index
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


    getMinimumDistance = (array) => {
        // return array.reduce((min, dataPoint) => dataPoint.distance <=min ? dataPoint.distance : min)
        let sortedValues = array.sort((a,b) => a.distance - b.distance)
        return sortedValues[0]
    }


    upDateCentroid = (array) => {
        let averageLat = array.reduce((total, next) => total + next.latitude, 0)/array.length
        let averageLon = array.reduce((total, next) => total + next.longitude, 0)/array.length
        return({
            latitude:averageLat,
            longitude:averageLon,
        })
    }
    

    updateClusterData = (minDistanceArray) => {
        console.log("updateClusterData", minDistanceArray)
        let newArrayOfClusterData = this.state.arrayOfClusterData.map(cluster => {
        let pointsToAdd = minDistanceArray.filter(point => point.index === this.state.arrayOfClusterData.indexOf(cluster))
            return ({
                clusterArray: pointsToAdd,
                latitude: pointsToAdd.length > 0 ? this.upDateCentroid(pointsToAdd).latitude : cluster.latitude,
                longitude: pointsToAdd.length > 0 ? this.upDateCentroid(pointsToAdd).longitude : cluster.longitude
            })
        })
        console.log(newArrayOfClusterData)
        this.setState({
            arrayOfClusterData:newArrayOfClusterData
        })
    }

    varianceNumerator = (lat1d,lon1d,lat2d,lon2d) => {
        Math.pow(this.haversineDistance(lat1d,lon1d,lat2d,lon2d),2)
    }


    iterate = () => {
        //1) looks at each datapoint one at a time and records the distance between that point and all centroids. distances are stored
        //alongside data point coordinates and index of cerntroid in an array with length equal to number of data points.

        let pointDistancesArray = this.state.testData.map(dataPoint => (
            this.state.arrayOfClusterData.map(clusterCentroid => (
                this.distanceBetweenPoints(clusterCentroid.latitude, clusterCentroid.longitude, dataPoint.latitude, dataPoint.longitude, this.state.arrayOfClusterData.indexOf(clusterCentroid))
            ))
        ))

        //2) looks through each array of distances and picks the shortest one for each datapoint.
        
        let minDistanceArray = pointDistancesArray.map(pointDistances => (
            this.getMinimumDistance(pointDistances)
        ))

        //3) Give each centroid the datpoints that are nearest to it and recalculate the centroid in a new cluster data array
        let stopIteration = []

        let newArrayOfClusterData = this.state.arrayOfClusterData.map(cluster => {
            let pointsToAdd = minDistanceArray.filter(point => point.index === this.state.arrayOfClusterData.indexOf(cluster))
            let updatedCentroidLatitude = pointsToAdd.length > 0 ? this.upDateCentroid(pointsToAdd).latitude : cluster.latitude
            let updatedCentroidLongitude = pointsToAdd.length > 0 ? this.upDateCentroid(pointsToAdd).longitude : cluster.longitude

            if(updatedCentroidLatitude == cluster.latitude && updatedCentroidLongitude == cluster.longitude){
                stopIteration = [...stopIteration, true]
            } else {
                stopIteration = [...stopIteration, false]
            }

            return ({
                    clusterArray: pointsToAdd,
                    latitude: updatedCentroidLatitude,
                    longitude: updatedCentroidLongitude,
                })
        })

        

        let variance = newArrayOfClusterData.map(clusterData => (
            clusterData.clusterArray.map(dataPoint => (
                Math.pow(this.haversineDistance(dataPoint.latitude, dataPoint.longitude, clusterData.latitude, clusterData.longitude),2)
            )).reduce((total,next) => total + next, 0)/(clusterData.clusterArray.length - 1)
        ))

        if(stopIteration.some(bool => bool == false)) {
        // if(JSON.stringify(this.state.arrayOfClusterData) != JSON.stringify(newArrayOfClusterData)) {
            this.setState({
                arrayOfClusterData: newArrayOfClusterData
            })
            console.log("iterating")
            setTimeout(() => this.iterate(), 10)
        } else {
            console.log("done")
            console.log(newArrayOfClusterData)
            console.log(variance)
        }
        
    }


    
    
    render() {


        // let k = 5

        // let i = 1 

        // for(i = 1; i < k; i++) {
        //     eval('let ' + 'array' + i + ' = ' + '[]' + ';')
        //     console.log[eval('let ' + 'array' + i)]
        // }

        // let arrayOfClusterData = [] ; 
        
        // let allLats = testData.map(coordinate => coordinate.latitude)
        // let allLngs = testData.map(coordinate => coordinate.longitude)
        // let maxLat = Math.max(...allLats)
        // let minLat = Math.min(...allLats)
        // let maxLng = Math.max(...allLngs)
        // let minLng = Math.min(...allLngs)

        // for( let i = 0; i < k; i++){
        // arrayOfClusterData[i] =
        //     {clusterArray:[],
        //     latitude: this.getRandom(minLat,maxLat),
        //     longitude: this.getRandom(minLng,maxLng)}
        // }


        
        // console.log( arrayOfClusterData );

        

        // console.log(maxLat, minLat, maxLng, minLng)

        return (
            <div>
            <h2>Suggested Trips</h2>
            {this.state.arrayOfClusterData.map(clusterData => <ClusterDataComponent clusterData = {clusterData}/>)}
            <form>
                <label>
                    trip days: <input onChange = {(e) => this.handleInputChange(e)} name = "k" value = {this.state.k}></input>
                </label>
            </form>
            <button onClick = {() => this.iterate(0)}>crunch numbers</button>
            </div>
        )
    }
}