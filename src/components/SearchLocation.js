import React from 'react'
import Autocomplete from 'react-google-autocomplete';
import Script from 'react-load-script';
import '../App.css'

class SearchLocation extends React.Component{

    constructor(){
        super()
        this.state={
            isModuleLoaded:false
        }
    }

    onPlaceSelected = (place) =>{
        const latValue = place.geometry.location.lat();
        const lngValue = place.geometry.location.lng();
        this.props.setLocation(latValue,lngValue)
    }

    handleScriptLoad = ()=>{
        this.setState({isModuleLoaded:true})
    }

    render(){
        return(
            <div>
            <Script url="https://maps.googleapis.com/maps/api/js?key=AIzaSyDRjIZbJwQdGrWTqfYMgh4uojkwzF4_Wrc&libraries=places" onLoad={this.handleScriptLoad}/>
            {this.state.isModuleLoaded && <Autocomplete
                style={{
                    width:'50%',
                    padding:'10px',
                    margin:'30px',
                    borderRadius:'10px'
                }}
                onPlaceSelected={ this.onPlaceSelected }
                types={['(regions)']}
            />}
            </div>
        )
    }
}

export default SearchLocation