import axios from "axios";

const $http = axios.create();

$http.interceptors.request.use(config=> {
    return config
})

$http.interceptors.response.use(res=> {
    return res.data
})

export default $http