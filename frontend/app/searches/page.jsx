'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table} from '@cogoport/components';

const columns = [
  { Header: 'ID', accessor: 'id' },
  { Header: 'Origin', accessor: 'origin' },
  { Header: 'Destination', accessor: 'destination' },
  { Header: 'Size', accessor: 'size' },
  { Header: 'Type', accessor: 'type' },
  { Header: 'Commodity', accessor: 'commodity' },
  { Header: 'Count', accessor: 'count' },
  { Header: 'Created At', accessor: 'created_at' },
  { Header: 'Updated At', accessor: 'updated_at' },
];

const Searches = () => {
  const [searches, setSearches] = useState([]);

  const handleEdit = (id) => {
    // Implement edit functionality
    console.log(`Edit search with ID ${id}`);
  };

  const handleDelete = (id) => {
    // Implement delete functionality
    console.log(`Delete search with ID ${id}`);
  };

  const fetchData = async () => {
    try {
      const response = await getSearches();
      setSearches(response.data);
    } catch (error) {
      console.error('Error fetching searches:', error);
    }
  };

  return (
    <div className='bg-white text-black'>
      <h1>Searches</h1>
      <Table columns={columns} data={searches} className="min-w-full bg-white border-collapse border-gray-200 text-black" />
    </div>
  );
};

export default Searches;
