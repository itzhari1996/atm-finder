import React from 'react'
import Axios from 'axios';

class ListATM extends React.Component{

    constructor(props){
        super()
        this.state={
            nextPageToken:props.atm.next_page_token,
            atmList:props.atm.results,
            currentPage:1,
            isNextAvailable:false
        }
        console.log(props.atm.next_page_token)
    }

    distance = (lat1, lon1, lat2, lon2)=>{
        if ((lat1 === lat2) && (lon1 === lon2)) {
            return 0;
        }
        else {
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
    }

    navigateNext=()=>{
        if(this.state.nextPageToken){
            const googleMapUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?pagetoken=${this.state.nextPageToken}&key=AIzaSyDRjIZbJwQdGrWTqfYMgh4uojkwzF4_Wrc`
            Axios.get(googleMapUrl)
            .then(response=>{
                if(response.data.status === 'OK'){
                    this.setState(prevState=>{
                        const pageToken = response.data.next_page_token
                        const isNextAvailable = pageToken ? false : true
                        prevState.atmList.push(...response.data.results)
                        return {atmList:prevState.atmList,currentPage:prevState.currentPage+1,nextPageToken:pageToken,isNextAvailable}
                    })
                }else{
                    window.alert(response.data.status)
                }
            })
            .catch(err=>{
                window.alert(err)
            })
        }else{
            this.setState({currentPage:this.state.currentPage+1})
        }
    }

    navigatePrevious=()=>{
        this.setState(prevState => {
            return {currentPage:prevState.currentPage-1}
        })
    }

    render(){
        return(
            <div>
                <h2>Listing Nearby ATM {(this.state.currentPage-1)*20 +1} - {this.state.currentPage*20} of {this.state.atmList.length}</h2>
                <ul>
                    {this.state.atmList.slice((this.state.currentPage-1)*20,(this.state.currentPage-1)*20+20).map(atm=>{
                        return(
                        <li key={atm.id}>
                            <p>Name: {atm.name}</p>
                            <p>Address: {atm.vicinity}</p>
                            {this.distance(this.props.location.lat,this.props.location.lon,atm.geometry.location.lat,atm.geometry.location.lng)}
                        </li>)
                    })}
                </ul>
                <button onClick ={this.navigatePrevious} disabled={this.state.currentPage <= 1}>Previous</button>&nbsp;
                <span>{this.state.currentPage}/{Math.ceil(this.state.atmList.length/20)}</span>&nbsp;
                <button onClick ={this.navigateNext} disabled={this.state.currentPage*20>=this.state.atmList.length}>Next</button><br/>
                <button onClick={this.navigateNext} disabled={this.state.isNextAvailable}>Get More Results</button>
            </div>
        )
    }

}

export default ListATM