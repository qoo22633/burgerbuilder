import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-my-burger-3e1fd.firebaseio.com/'
})

export default instance;