import React from 'react'
import axios from '../config/axios'
import ListATM from './ListATM'

class GetLocation extends React.Component{
    constructor(){
        super()
        this.state={
            latitude:undefined,
            longitude:undefined,
            atmNearby:undefined
        }
    }

    getLocation = ()=>{
        navigator.geolocation.getCurrentPosition((location)=>{
            this.setState({latitude:location.coords.latitude, longitude:location.coords.longitude})
        },
        (error)=>{
             if (error.code === error.PERMISSION_DENIED){
                window.alert('Access to current location blocked ..')
             }
        },
        {timeout:40000, enableHighAccuracy:true})
    }

    getAtmList=()=>{
        const googleMapUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${this.state.latitude},${this.state.longitude}&type=atm&rankby=distance&key=AIzaSyDRjIZbJwQdGrWTqfYMgh4uojkwzF4_Wrc`
        // console.log(googleMapUrl)
        axios.get(googleMapUrl)
        .then(response=>{
            this.setState({atmNearby:response.data})
        })
        .catch(err=>{
            window.alert(err)
        })
    }

    render(){
        return(
            <div>
                <p>Current Latitude: {this.state.latitude}</p>
                <p>Current Longitude: {this.state.longitude}</p>
                <input type='text'/>
                <button onClick={this.getLocation}>Get My Location</button><br/>
                <button onClick = {this.getAtmList} disabled={!this.state.latitude}>Get Nearby ATM</button>
                {this.state.atmNearby && <ListATM atm={this.state.atmNearby} location={{lat:this.state.latitude,lon:this.state.longitude}}/>}
            </div>
        )
    }
}

export default GetLocation