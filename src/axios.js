import axios from 'axios'

const baseURL = 'https://api.themoviedb.org/3'

const instance = axios.create({
    baseURL: baseURL
})

export default instance;