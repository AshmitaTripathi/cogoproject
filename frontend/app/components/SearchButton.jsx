import React from 'react';
import { createSearch } from '../apicalls/api';

const SearchButton = ({ formData }) => {
    const handleSearch = async () => {
        console.log(formData)

        if (
          !formData.origin ||
          !formData.destination ||
          !formData.size ||
          !formData.type ||
          !formData.commodity ||
          !formData.count
        ) {
          alert('All fields are required.');
          console.error('Error: All fields are required.');
          return;
        }
        const payload = {
          origin: formData.origin,
          destination: formData.destination,
          size: formData.size,
          type: formData.type,
          commodity: formData.commodity,
          count: formData.count,
    
        };
    
        try {
          const result = await createSearch(payload);
          console.log('Search created successfully:', result);
    
        } catch (error) {
          console.error('Error creating search:', error);
    
        }
      };
  return (
    <div style={{ padding: 16, width: 'fit-content', color: 'black' }}>
      <button
        className="p-2 text-lg border-2 border-black rounded-md bg-red-500 text-white transition duration-300 hover:border-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
        onClick={handleSearch}
      >
        Search
      </button>
    </div>
  );
};

export default SearchButton;