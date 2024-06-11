import axios from 'axios';

// Citation for the following function:
// Date: June 2024
// Original code utilizing axios from 
// Axios (June 2024) Axios (v^1.7.2) [Library]. Retrieved from https://axios-http.com/.

// Create an Axios instance with a base URL
const httpClient = axios.create({
  baseURL: 'http://classwork.engr.oregonstate.edu:5273/api/', // Replace with your API base URL
});


export default httpClient;
