// services/api.js

import axios from 'axios';

const API_URL = 'http://localhost:8000'; // Replace with your FastAPI backend URL

export const fetchLocations = async (query) => {
    const response = (await axios.get('https://api.stage.cogoport.io/list_locations',{
        params:{
            filters:{
                q:query
            }
        }
    }));
    console.log(response.data)
    return response.data;
  };

  export const getSearches = async () => {
    console.log('getSearches api')
    const response = await axios.get(`${API_URL}/get_searches`);
    return response.data;
  };

export const createSearch = async (data) => {
  const response = await axios.post(`${API_URL}/create_search`, data);
  return response.data;
};

export const getSearch = async (id) => {
  const response = await axios.get(`${API_URL}/get_search/${id}`);
  return response.data;
};

export const updateSearch = async (data) => {
  const response = await axios.post(`${API_URL}/update_search`, data);
  return response.data;
};
