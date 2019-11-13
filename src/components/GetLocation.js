import React from 'react'
import {Link} from 'react-router-dom'
import SearchLocation from './SearchLocation'
import '../App.css'

class GetLocation extends React.Component{
    constructor(){
        super()
        this.state={
            latitude:undefined,
            longitude:undefined
        }
    }

    setLocation = (lat,lng) =>{
        this.setState({latitude:lat,longitude:lng})
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

    render(){
        return(
            <div className='locationForm' data-testid='getlocation'>
                <SearchLocation setLocation={this.setLocation}/>
                <button type='button' className='searchButton' data-testid='getlocationButton' onClick={this.getLocation}>Get My Location</button>
                <div className='textDiv' data-testid='textdiv'>
                    <p className='textContent'><b>Current Latitude: </b>{this.state.latitude}</p>
                    <p className='textContent'><b>Current Longitude: </b>{this.state.longitude}</p>
                </div>
                {this.state.latitude && <Link className="link" to={{pathname:'/list', state:{lat:this.state.latitude,lng:this.state.longitude}}}>Search ATM</Link>}
            </div>
        )
    }
}

export default GetLocation