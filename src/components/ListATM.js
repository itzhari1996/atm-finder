import React from 'react'
import Axios from 'axios'
import Map from './Map'
import '../App.css'

class ListATM extends React.Component{

    constructor(props){
        super()
        this.state={
            atmList:[],
            currentPage:1,
            atmMarker:undefined,
            isNextAvailable:false
        }
        if(props.location.state){
            this.currentLocation = {lat:props.location.state.lat,lng:props.location.state.lng}
        }
    }

    componentDidMount(){
        if(this.currentLocation){
            const googleMapUrl = `${process.env.REACT_APP_PROXY_URL}https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${this.currentLocation.lat},${this.currentLocation.lng}&type=atm&rankby=distance&key=${process.env.REACT_APP_API_KEY}`
            Axios.get(googleMapUrl)
            .then(response=>{
                this.setState({atmList:response.data.results,atmMarker:response.data.results[0]})
            })
            .catch(err=>{
                window.alert(err)
            })
        }
    }

    distance = (lat1, lon1, lat2, lon2)=>{
        var radlat1 = Math.PI * lat1/180;
        var radlat2 = Math.PI * lat2/180;
        var theta = lon1-lon2;
        var radtheta = Math.PI * theta/180;
        var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
        if (dist > 1) {
            dist = 1;
        }
        dist = Math.acos(dist);
        dist = dist * 180/Math.PI;
        dist = dist * 60 * 1.1515 *1.609344
        return <p>Distance: {dist.toFixed(2)} KM</p>
    }

    navigate=(atm)=>{
        this.setState({atmMarker:atm})
    }

    render(){
        return(
            <React.Fragment>
            {this.state.atmList.length>0 && 
            <div className='Main'>
                <div id='atmList'>
                    <h2 className='header'>Listing Nearby ATM</h2>
                    {this.state.atmList.map(atm=>{
                        return(
                            <div key={atm.id} className='atmItem' onClick = {(e)=>{this.navigate(atm)}}>
                                <p>Name: {atm.name}</p>
                                <p>Address: {atm.vicinity}</p>
                                {this.distance(this.currentLocation.lat,this.currentLocation.lng,atm.geometry.location.lat,atm.geometry.location.lng)}
                            </div>)
                    })}
                </div>
                <div id='map'>
                    <Map key = {this.state.atmMarker.id}
                        currentPosition={this.currentLocation}
                        atm={this.state.atmMarker}
                        atmList = {this.state.atmList}
                        height='100vh'
                        zoom={16}
                    />
                </div>
            </div>}
            </React.Fragment>
        )
    }

}

export default ListATM