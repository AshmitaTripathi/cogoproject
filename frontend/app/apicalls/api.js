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

  export const getSearches = async (filters) => {
    console.log(' inside axios api call getSearches api')
    console.log('Recieved Filters in api.js are:',filters)
    // const page =pageR.page;
    // Define dummy filter data
  //   const filters = {
  //     // category: 'electronics',
  //     // priceRange: '100-500',
  //     "page": page,
  // };

  console.log('Calling backend for Filters:',filters) 

  const response = await axios.get(`${API_URL}/get_searches`, 
    {
      params: {
        filters: JSON.stringify(filters)
      }
    }
  );
  console.log('Recieved data from backend:',response.data)
  return response.data;
  };

export const createSearch = async (data) => {
  const response = await axios.post(`${API_URL}/create_search`, data);
  console.log(response.data)
  return response.data;
};

export const getSearch = async (id) => {
  const response = await axios.get(`${API_URL}/get_search/${id}`);
  return response.data;
};

export const updateSearch = async (id, updatedSearch) => {
  try {
      await axios.put(`${API_URL}/update_search/${id}`, updatedSearch);
      const updatedData = await getSearch(id);
      return updatedData;
  } 
  catch (error) {
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
