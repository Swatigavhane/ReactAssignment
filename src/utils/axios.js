import axios from "axios";
axios.interceptors.request.use(
    config => {
        config.headers['Content-Type'] = 'application/json';
        return config;
    },
    error => {
        Promise.reject(error)
    });

//Add a response interceptor

axios.interceptors.response.use((response) => {
    // console.log('*** error.response', response.data)
    return response
},
    error => {
        // console.log('error.response', error.response)
        return Promise.reject(error)
    }
)

export default axios
