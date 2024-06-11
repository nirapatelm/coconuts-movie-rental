import axios from 'axios';

// Create an Axios instance with a base URL
const httpClient = axios.create({
  baseURL: 'http://classwork.engr.oregonstate.edu:5273/api/', // Replace with your API base URL
});


export default httpClient;
