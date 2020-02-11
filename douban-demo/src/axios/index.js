import Axios from 'axios'

export default Axios.create({
    baseURL: 'http://localhost:5000/user',   
    // baseURL: '../user',    //路径
    method: 'GET'
})