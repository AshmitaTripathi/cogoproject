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

// export default function Searches() {
//   const [searches, setSearches] = useState([]);
//   const [error, setError] = useState(null);
//   const [modalIsOpen, setModalIsOpen] = useState(false);
//   const [selectedSearch, setSelectedSearch] = useState(null);
//   const [Origoptions, setOrigOptions] = useState([]);
//   const [Destoptions, setDestOptions] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [origin, setOrigin] = useState('');
//   const [destination, setDestination] = useState('');

//   const fetchData = async () => {
//     try {
//       const response = await getSearches();
//       setSearches(response);
//     } catch (error) {
//       console.error("Error fetching searches:", error);
//       setError(error.message);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const handleEdit = (search) => {
//     setSelectedSearch(search);
//     setModalIsOpen(true); 
//     console.log(selectedSearch)
//   };

//   const handleDelete = async (id) => {
//     try {
//       await deleteSearch(id);
//       setSearches(searches.filter(search => search.id !== id));
//       console.log(`Deleted search with ID ${id}`);
//     } catch (error) {
//       console.error(`Error deleting search with ID ${id}:`, error);
//     }finally{
//       fetchData();
//     }
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     try {
//       await updateSearch(selectedSearch.id, selectedSearch);
//       setModalIsOpen(false);
//       setSearches(searches.map(search =>
//         search.id === selectedSearch.id ? selectedSearch : search
//       ));
//     } catch (error) {
//       console.error("Error updating search:", error);
//     }
//   };

//   const handleChange = (e) => {
//     setSelectedSearch({
//       ...selectedSearch,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleOriginChange = (selectedOption) => {
//     const newOrigin = selectedOption ? selectedOption : '';
//     if (newOrigin === selectedSearch.destination) {
//       alert('Origin and destination cannot be the same.');
//     } else {
//       setOrigin(newOrigin);
//       setSelectedSearch((prevSearch) => ({
//         ...prevSearch,
//         origin: newOrigin,
//       }));
//     }
//   };

//   const handleDestinationChange = (selectedOption) => {
//     const newDestination = selectedOption ? selectedOption: '';
//     if (newDestination === selectedSearch.origin) {
//       alert('Origin and destination cannot be the same.');
//     } else {
//       setDestination(newDestination);
//       setSelectedSearch((prevSearch) => ({
//         ...prevSearch,
//         destination: newDestination,
//       }));
//     }
//   };

//   const handleCountChange = (e) => {
//     const count = parseInt(e.target.value);
//     if (!isNaN(count) && count >= 0) {
//       setSelectedSearch({
//         ...selectedSearch,
//         count: count,
//       });
//     }
//   };

//   const fetchOriginLocations = async (query) => {
//     try {
//       console.log('Fetching locations for query:', query);
//       setIsLoading(true);
//       const data = await fetchLocations(query);
//       if ('list' in data) {
//         console.log(data);
//         setOrigOptions(data.list.map(location => ({ label: location.name, value: location.name })));
//       }
//     } catch (error) {
//       console.error('Error fetching locations:', error);
//     } finally {
//       console.log('Finished fetching locations.');
//       setIsLoading(false);
//     }
//   };

//   const fetchDestinationLocations = async (query) => {
//     try {
//       console.log('Fetching locations for query:', query);
//       setIsLoading(true);
//       const data = await fetchLocations(query);
//       if ('list' in data) {
//         console.log(data);
//         setDestOptions(data.list.map(location => ({ label: location.name, value: location.name })));
//       }
//     } catch (error) {
//       console.error('Error fetching locations:', error);
//     } finally {
//       console.log('Finished fetching locations.');
//       setIsLoading(false);
//     }
//   };

//   const handleOriginSearch = (inputValue) => {
//     if (inputValue) {
//       console.log('Searching for locations:', inputValue);
//       fetchOriginLocations(inputValue);
//     } else {
//       console.log('No search query provided.');
//     }
//   };

//   const handleDestinationSearch = (inputValue) => {
//     if (inputValue) {
//       console.log('Searching for Destination:', inputValue);
//       fetchDestinationLocations(inputValue);
//     } else {
//       console.log('No search query provided.');
//     }
//   };

//   const columns = [
//     { Header: 'ID', accessor: 'id' },
//     { Header: 'Origin', accessor: 'origin' },
//     { Header: 'Destination', accessor: 'destination' },
//     { Header: 'Size', accessor: 'size' },
//     { Header: 'Type', accessor: 'type' },
//     { Header: 'Commodity', accessor: 'commodity' },
//     { Header: 'Count', accessor: 'count' },
//     { Header: 'Created At', accessor: 'created_at' },
//     { Header: 'Updated At', accessor: 'updated_at' },
//     {
//       Header: 'Actions',
//       accessor: 'actions',
//       Cell: ({ row }) => (
//         <div className='flex justify-center space-x-2'>
//           <button
//             className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
//             onClick={() => handleEdit(row.original)}
//           >
//             Edit
//           </button>
//           <button
//             className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'
//             onClick={() => handleDelete(row.original.id)}
//           >
//             Delete
//           </button>
//         </div>
//       ),
//     },
//   ];

//   return (
//     <div className='bg-white text-black'>
//       <h1>Searches</h1>
//       <Table columns={columns} data={searches} className="min-w-full bg-white border-collapse border-gray-200 text-black" />
//       <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}>
//         <h2 className='font-bold'>Edit Search</h2>
//         <form onSubmit={handleSubmit}>
//         <div style={{ padding: 16, width: 'fit-content', color: 'black' }}>
//         <label htmlFor="origin">Origin:</label>
//         <Select
//           id="origin"
//           value={selectedSearch?.origin}
//           onChange={handleOriginChange}
//           onSearch={handleOriginSearch}
//           placeholder="Select Origin"
//           options={Origoptions}
//           size="md"
//           style={{ width: '250px' }}
//           isLoading={isLoading}
//         />
//       </div>
//       <div style={{ padding: 16, width: 'fit-content', color: 'black' }}>
//         <label htmlFor="destination">Destination:</label>
//         <Select
//           id="destination"
//           value={selectedSearch?.destination}
//           onChange={handleDestinationChange}
//           onSearch={handleDestinationSearch}
//           placeholder="Select Destination"
//           options={Destoptions}
//           size="md"
//           style={{ width: '250px' }}
//           isLoading={isLoading}
//         />
//       </div>
//           <div className="relative" style={{ padding: '16px', width: 'fit-content', color: 'black' }}>
//             <Accordion
//               title="Container Details"
//               className="accordion-content"
//               style={{
//                 width: '100%',
//                 height: 'auto',
//                 color: 'black',
//                 border: '1px solid #ccc',
//                 borderRadius: '8px',
//                 padding: '10px',
//               }}
//             >
//               <form className="space-y-4">
//                 {/* Size Section */}
//                 <div>
//                   <div className="text-lg font-medium">Size:</div>
//                   <div className="flex space-x-4">
//                     {sizeOptions.map((option) => (
//                       <label key={option.value} className="flex items-center space-x-2">
//                         <input
//                           type="radio"
//                           name="size"
//                           value={option.value}
//                           checked={selectedSearch?.size === option.value}
//                           onChange={handleChange}
//                         />
//                         <span>{option.label}</span>
//                       </label>
//                     ))}
//                   </div>
//                 </div>

//                 {/* Type Section */}
//                 <div>
//                   <div className="text-lg font-medium">Type:</div>
//                   <div className="grid grid-cols-2 gap-4">
//                     {typeOptions.map((option) => (
//                       <label key={option.value} className="flex items-center space-x-2">
//                         <input type="radio"
//                           name="type"
//                           value={option.value}
//                           checked={selectedSearch?.type === option.value}
//                           onChange={handleChange} />
//                         <span>{option.label}</span>
//                       </label>
//                     ))}
//                   </div>
//                 </div>

//                 {/* Commodity Section */}
//                 <div>
//                   <div className="text-lg font-medium">Commodity:</div>
//                   <select className="p-2 text-black text-lg border-2 border-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 hover:border-gray-500 w-full"
//                     value={selectedSearch?.commodity}
//                     onChange={handleChange}
//                     name="commodity">
//                     <option value="" className="text-gray-500">
//                       Select an option
//                     </option>
//                     {commodityOptions.map((option) => (
//                       <option key={option.value} value={option.value}>
//                         {option.label}
//                       </option>
//                     ))}
//                   </select>
//                 </div>

//                 {/* Count Section */}
//                 <div>
//                   <div className="text-lg font-medium">Count:</div>
//                   <div className="flex space-x-2 items-center">
//                     <input type="number"
//                       value={selectedSearch?.count}
//                       onChange={handleCountChange}
//                       min="0"
//                       className="p-2 text-lg border-2 border-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 hover:border-gray-500 w-full" />
//                   </div>
//                 </div>
//               </form>
//             </Accordion>
//           </div>
//           <button type="submit">Save</button>
//         </form>
//         <button onClick={() => setModalIsOpen(false)}>Close</button>
//       </Modal>
//       {error && <p>Error: {error}</p>}
//     </div>
//   );
// }

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

  return (
    <div className="w-full min-h-screen bg-gray-100 flex flex-col items-center py-10" style={{width: '100%'}}>
      <div className=" bg-white shadow-md rounded-lg p-6" style={{width: '100%'}}>
        <div className="mb-4">
          <GoBackButton />
        </div>
        <h1 className="text-3xl font-bold text-center mb-6">Searches</h1>
        <div className="overflow-x-auto">
        <Table columns={columns} data={searches} className="min-w-full bg-white border-collapse border-gray-200 text-black" />
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
      </div>
    </div>
  );
}