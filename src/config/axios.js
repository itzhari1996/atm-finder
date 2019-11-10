import Axios from 'axios'

const axios = Axios.create({
    baseURL: 'https://maps.googleapis.com/maps/api/place/nearbysearch'
})


export default axios