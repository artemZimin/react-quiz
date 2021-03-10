import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://vast-wildwood-72848.herokuapp.com/api',
    headers: {
        'Content-Type': 'application/json'
    }
})

export default instance
