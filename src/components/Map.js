import React from 'react';
import { withGoogleMap, GoogleMap, withScriptjs, InfoWindow, Marker } from "react-google-maps";

class Map extends React.Component{

    constructor( props ){
        super( props );
        this.state = {
            currentPosition:props.currentPosition,
            lat:props.atm.geometry.location.lat,
            lng:props.atm.geometry.location.lng,
            name:props.atm.name,
            atmList:props.atmList,
            address:props.atm.vicinity
        }
    }

    render(){
        let atmImg = 'https://cdn.mapmarker.io/api/v1/pin?size=30&background=%23D33115&text=ATM&color=%23FFFFFF&voffset=0&hoffset=0&'
        let currentLocationImg = 'https://cdn.mapmarker.io/api/v1/pin?size=50&background=%230062B1&icon=fa-circle&color=%23FFFFFF&voffset=0&hoffset=0&'
        const AsyncMap = withScriptjs(
            withGoogleMap(
                props => (
                    <GoogleMap defaultZoom={ this.props.zoom } defaultCenter={{ lat: this.state.lat, lng: this.state.lng }} options={{ scrollwheel:false }}>
                       
                       <InfoWindow position={{ lat: ( this.state.lat + 0.0010 ), lng: this.state.lng }}>
                            <div>
                                <span style={{ padding: 0, margin: 0 }}>{ this.state.name }</span><br/>
                                <span style={{ padding: 0, margin: 0 }}>{this.state.address}</span>
                            </div>
                        </InfoWindow>}
                        
                        <Marker google={this.props.google}
                                name={'Current Atm'}
                                draggable={false}
                                onClick={()=>{this.setState({viewInfo:true})}}
                                position={{ lat: this.state.lat, lng: this.state.lng }}>
                        </Marker>

                        <Marker google={this.props.google}
                                name={'Current Location'}
                                draggable={false}
                                icon={currentLocationImg}
                                position={{ lat: this.state.currentPosition.lat, lng: this.state.currentPosition.lng }}>
                        </Marker>

                        {this.state.atmList.filter(item => item.id !==this.props.atm.id).map(otherAtm=>{
                            return(
                                <Marker key={otherAtm.id} google={this.props.google}
                                name={'Other Atm'}
                                draggable={false}
                                icon={atmImg}
                                position={{ lat: otherAtm.geometry.location.lat, lng: otherAtm.geometry.location.lng }}>

                                </Marker>
                            )
                        })}
                        
                    </GoogleMap>
                )
            )
        );
        let map;
        if( this.state.lat !== undefined ) {
            map = <div>
                <AsyncMap
                    googleMapURL={`${process.env.REACT_APP_PROXY_URL}https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_API_KEY}&libraries=places`}
                    loadingElement={
                        <div style={{ height: `100%` }} />
                    }
                    containerElement={
                        <div style={{ height: this.props.height }} />
                    }
                    mapElement={
                        <div style={{ height: `100%` }} />
                    }
                />
            </div>
        } else {
            map = <div style={{height: this.props.height}} />
        }
        return( map )
    }
}
export default Map
