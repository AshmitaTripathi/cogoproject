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
    console.log(' inside axios api call getSearches api')
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

export const updateSearch = async (id, updatedSearch) => {
  try {
    const response = await axios.put(`http://localhost:8000/update_search/${id}`, updatedSearch);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteSearch = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/delete_search/${id}`);
    return response.data; // Assuming your API returns data on successful deletion
  } catch (error) {
    throw error;
  }
};
