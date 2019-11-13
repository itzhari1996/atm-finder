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
        if(place.geometry){
            const latValue = place.geometry.location.lat();
            const lngValue = place.geometry.location.lng();
            if(latValue){this.props.setLocation(latValue,lngValue)}
        }else{alert('Please select a valid location')}   
    }

    handleScriptLoad = ()=>{
        this.setState({isModuleLoaded:true})
    }
    
    onKeyDown = (key)=>{
        if(key.keyCode === 13){
            key.preventDefault()
            console.log('enter key')
        }
    }

    render(){
        return(
            <div data-testid = 'autocomplete'>
            <Script url={`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_API_KEY}&libraries=places`} onLoad={this.handleScriptLoad}/>
            {this.state.isModuleLoaded && <Autocomplete
                style={{
                    width:'50%',
                    padding:'10px',
                    margin:'30px',
                    borderRadius:'10px'
                }}
                types={['(regions)']}
                componentRestrictions={{country: "in"}}
                onPlaceSelected={ this.onPlaceSelected }
            />}
            </div>
        )
    }
}

export default SearchLocation