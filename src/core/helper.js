const apiUrl = 'http://localhost:8089/api/users';
const axios = require('axios');

export default {
    
    getOrCreate() {
        return axios.get(apiUrl)
    },
}