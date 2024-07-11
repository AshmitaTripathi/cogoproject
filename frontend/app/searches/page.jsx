'use client'
import React, { useEffect, useState } from 'react';
import { Table } from '@cogoport/components';
import { getSearches, updateSearch, deleteSearch , fetchLocations } from '../apicalls/api';
import Modal from 'react-modal';
import { Accordion, Select } from '@cogoport/components';
// Demo styles, see 'Styles' section below for some notes on use.
import 'react-accessible-accordion/dist/fancy-example.css';
import OriginSelect from '../components/OriginSelect';
import DestinationSelect from '../components/DestinationSelect';
import ContainerDetailsAccordion from '../components/ContainerDetails';
import  GoBackButton  from '../components/GoBackButton';
import Pagination from '../components/Pagination';
import PaginationComponent from '../components/Pagination';

export default function Searches() {
  const [searches, setSearches] = useState([]);
  const [error, setError] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedSearch, setSelectedSearch] = useState(null);
  const [Origoptions, setOrigOptions] = useState([]);
  const [Destoptions, setDestOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 3;

  const fetchData = async () => {
    try {
      const response = await getSearches();
      setSearches(response);
    } catch (error) {
      console.error("Error fetching searches:", error);
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleEdit = (search) => {
    setSelectedSearch(search);
    setModalIsOpen(true); 
    console.log(selectedSearch)
  };

  const handleDelete = async (id) => {
    try {
      await deleteSearch(id);
      setSearches(searches.filter(search => search.id !== id));
      console.log(`Deleted search with ID ${id}`);
    } catch (error) {
      console.error(`Error deleting search with ID ${id}:`, error);
    } finally {
      fetchData();
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const updatedData = await updateSearch(selectedSearch.id, selectedSearch);
      console.log('Updated search:', updatedData);
      setSelectedSearch(updatedData);         
      setModalIsOpen(false);
      fetchData();
    } catch (error) {
      console.error("Error updating search:", error);
    }
  };

  const handleOriginChange = (selectedOption) => {
    const newOrigin = selectedOption ? selectedOption : '';
    if (newOrigin === selectedSearch.destination) {
      alert('Origin and destination cannot be the same.');
    } else {
      setOrigin(newOrigin);
      setSelectedSearch((prevSearch) => ({
        ...prevSearch,
        origin: newOrigin,
      }));
    }
  };

  const handleDestinationChange = (selectedOption) => {
    const newDestination = selectedOption ? selectedOption: '';
    if (newDestination === selectedSearch.origin) {
      alert('Origin and destination cannot be the same.');
    } else {
      setDestination(newDestination);
      setSelectedSearch((prevSearch) => ({
        ...prevSearch,
        destination: newDestination,
      }));
    }
  };

  const fetchOriginLocations = async (query) => {
    try {
      console.log('Fetching locations for query:', query);
      setIsLoading(true);
      const data = await fetchLocations(query);
      if ('list' in data) {
        console.log(data);
        setOrigOptions(data.list.map(location => ({ label: location.name, value: location.name })));
      }
    } catch (error) {
      console.error('Error fetching locations:', error);
    } finally {
      console.log('Finished fetching locations.');
      setIsLoading(false);
    }
  };

  const fetchDestinationLocations = async (query) => {
    try {
      console.log('Fetching locations for query:', query);
      setIsLoading(true);
      const data = await fetchLocations(query);
      if ('list' in data) {
        console.log(data);
        setDestOptions(data.list.map(location => ({ label: location.name, value: location.name })));
      }
    } catch (error) {
      console.error('Error fetching locations:', error);
    } finally {
      console.log('Finished fetching locations.');
      setIsLoading(false);
    }
  };

  const handleOriginSearch = (inputValue) => {
    if (inputValue) {
      console.log('Searching for locations:', inputValue);
      fetchOriginLocations(inputValue);
    } else {
      console.log('No search query provided.');
    }
  };

  const handleDestinationSearch = (inputValue) => {
    if (inputValue) {
      console.log('Searching for Destination:', inputValue);
      fetchDestinationLocations(inputValue);
    } else {
      console.log('No search query provided.');
    }
  };

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
    {
      Header: 'Actions',
      accessor: 'actions',
      Cell: ({ row }) => (
        <div className='flex justify-center space-x-2'>
          <button
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
            onClick={() => handleEdit(row.original)}
          >
            Edit
          </button>
          <button
            className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'
            onClick={() => handleDelete(row.original.id)}
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const currentData = searches.slice((currentPage - 1) * pageSize, currentPage * pageSize);


  return (
    <div className="w-full min-h-screen bg-gray-100 flex flex-col items-center py-10" style={{width: '100%'}}>
      <div className=" bg-white shadow-md rounded-lg p-6" style={{width: '100%'}}>
        <div className="mb-4">
          <GoBackButton />
        </div>
        <h1 className="text-3xl font-bold text-center mb-6">Searches</h1>
        <div className="overflow-x-auto">
        <Table columns={columns} data={currentData} className="min-w-full bg-white border-collapse border-gray-200 text-black" />
        </div>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={() => setModalIsOpen(false)}
          className="flex justify-center items-center"
          overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
        >
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl shadow-md">
            <h2 className="text-2xl font-bold mb-4">Edit Search</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <OriginSelect
                id="origin"
                value={selectedSearch?.origin}
                onChange={handleOriginChange}
                onSearch={handleOriginSearch}
                options={Origoptions}
                isLoading={isLoading}
              />
              <DestinationSelect
                id="destination"
                value={selectedSearch?.destination}
                onChange={handleDestinationChange}
                onSearch={handleDestinationSearch}
                options={Destoptions}
                isLoading={isLoading}
              />
              <ContainerDetailsAccordion
                formData={selectedSearch}
                setFormData={setSelectedSearch}
                error={error}
                setError={setError}
              />
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setModalIsOpen(false)}
                  className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                >
                  Close
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </Modal>
        {error && <p className="text-red-500 mt-4">Error: {error}</p>}
        <PaginationComponent
        currentPage={currentPage}
        totalItems={searches.length}
        pageSize={pageSize}
        onPageChange={handlePageChange}
      />
      </div>

    </div>
  );
}