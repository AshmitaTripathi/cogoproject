'use client'
import React, { useEffect, useState } from 'react';
import Image from "next/image";
import { Button, Accordion , Select } from '@cogoport/components';
import { createSearch } from './apicalls/api';
import { fetchLocations } from './apicalls/api';
import axios from 'axios';
import SeeSearchesButton from './components/Searches';
// import SelectOriginDestination from './components/SelectionDestination';
import ContainerDetailsAccordion from './components/ContainerDetails';
import SearchButton from './components/SearchButton';
import OriginSelect from './components/OriginSelect';
import DestinationSelect from './components/DestinationSelect';

export default function Home() {
  // Assuming origin and destination are state variables or props
  const [formData, setFormData] = useState({
    origin: '',
    destination: '',
    size: '',
    type: '',
    commodity: '',
    count: 0,
  });

  const [error, setError] = useState('');
  const [Origoptions, setOrigOptions] = useState([]);
  const [Destoptions, setDestOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleOriginChange = (selectedOption) => {
    const newOrigin = selectedOption ? selectedOption : '';
    if (newOrigin === formData.destination) {
      alert('Origin and destination cannot be the same.');
      setError('Origin and destination cannot be the same.');
    } else {
      setError('');
      setFormData((prevFormData) => ({
        ...prevFormData,
        origin: newOrigin,
      }));
      console.log({

      

        origin: newOrigin,

      })
    }
  };

  const handleDestinationChange = (selectedOption) => {
    const newDestination = selectedOption ? selectedOption : '';
    if (newDestination === formData.origin) {
      alert('Origin and destination cannot be the same.');
      setError('Origin and destination cannot be the same.');
    } else {
      setError('');
      setFormData((prevFormData) => ({
        ...prevFormData,
        destination: newDestination,
      }));  
    }
  };

  const fetchOriginLocations = async (query) => {
    try {
      console.log('Fetching locations for query:', query);
      setIsLoading(true);
      const data = await fetchLocations(query);
      if('list'in data){
      console.log(data)
      setOrigOptions(data?.list?.map(location => ({ label: location?.name, value: location?.name })));
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
      if('list'in data){
      console.log(data)
      setDestOptions(data?.list?.map(location => ({ label: location?.name, value: location?.name })));
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
    }else{
      console.log('No search query provided.')
    }
  };
  const handleDestinationSearch = (inputValue) => {
    if (inputValue) {
      console.log('Searching for Destination:', inputValue);
      fetchDestinationLocations(inputValue);
    }else{
      console.log('No search query provided.')
    }
  };
  return (
    <div className="flex flex-wrap items-start mt-5 space-x-4">
      <OriginSelect
        value={formData.origin}
        onChange={handleOriginChange}
        onSearch={handleOriginSearch}
        options={Origoptions}
        isLoading={isLoading}
      />
      <DestinationSelect
        value={formData.destination}
        onChange={handleDestinationChange}
        onSearch={handleDestinationSearch}
        options={Destoptions}
        isLoading={isLoading}
      />
      <ContainerDetailsAccordion
        formData={formData}
        setFormData={setFormData}
        error={error}
        setError={setError}
      />
      <SearchButton
        formData={formData}
        setFormData={setFormData}
      />
      <SeeSearchesButton />
    </div>
  )};
