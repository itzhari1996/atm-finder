import React from 'react'
import Autocomplete from 'react-google-autocomplete';
import '../App.css'

class SearchLocation extends React.Component{

    onPlaceSelected = (place) =>{
        const latValue = place.geometry.location.lat();
        const lngValue = place.geometry.location.lng();
        this.props.setLocation(latValue,lngValue)
    }

    render(){
        return(
            <Autocomplete
                style={{
                    width:'50%',
                    padding:'10px',
                    margin:'30px',
                    borderRadius:'10px'
                }}
                onPlaceSelected={ this.onPlaceSelected }
                types={['(regions)']}
            />
        )
    }
}

export default SearchLocation