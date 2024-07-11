'use client'
import React, { useEffect, useState } from 'react';
import { Table } from '@cogoport/components';
import { getSearches, updateSearch, deleteSearch , fetchLocations } from '../apicalls/api';
import Modal from 'react-modal';
import { Accordion, Select } from '@cogoport/components';
// Demo styles, see 'Styles' section below for some notes on use.
import 'react-accessible-accordion/dist/fancy-example.css';



const sizeOptions = [
  { label: "20ft", value: "20" },
  { label: "40ft", value: "40" },
  { label: "40ft HC", value: "40HC" },
  { label: "45ft HC", value: "45HC" },
];

const typeOptions = [
  { value: "standard", label: "Standard (Dry)" },
  { value: "refer", label: "Refrigerated (Reefer)" },
  { value: "open_top", label: "Open Top" },
  { value: "flat_rack", label: "Flat Rack" },
  { value: "iso_tank", label: "ISO Tank" },
  { value: "open_side", label: "Open Side (One Door Open)" },
];

const COMMODITY_NAME_MAPPING = {
  general: { name: 'General', description: '', is_reefer: false, is_haz: false },
  hazardous: { name: 'Hazardous', description: '', is_reefer: false, is_haz: true },
  white_goods: { name: 'White Goods', description: '', is_reefer: false, is_haz: false },
  pta: { name: 'PTA', description: '', is_reefer: false, is_haz: false },
  cotton_and_yarn: { name: 'Cotton and yarn', description: '', is_reefer: false, is_haz: false },
  fabric_and_textiles: { name: 'Fabric and textiles', description: '', is_reefer: false, is_haz: false },
  sugar_rice: { name: 'Sugar Rice', description: '', is_reefer: false, is_haz: false },
  chilled: { name: 'Chilled', description: '', is_reefer: true, is_haz: false },
  frozen: { name: 'Frozen', description: '', is_reefer: true, is_haz: false },
  pharma: { name: 'Pharma', description: '', is_reefer: true, is_haz: false },
  in_gauge_cargo: { name: 'In Gauge Cargo', description: '', is_reefer: false, is_haz: false },
  non_haz_solids: { name: 'Non Hazardous Solids', description: '', is_reefer: false, is_haz: false },
  non_haz_liquids: { name: 'Non Hazardous Liquids', description: '', is_reefer: false, is_haz: false },
  non_haz_gases: { name: 'Non Hazardous Gases', description: '', is_reefer: false, is_haz: false },
  'gases-2.1': { name: 'Gases 2.1', description: '', is_reefer: false, is_haz: true },
  'gases-2.2': { name: 'Gases 2.2', description: '', is_reefer: false, is_haz: true },
  'gases-2.3': { name: 'Gases 2.3', description: '', is_reefer: false, is_haz: true },
  'flammable_liquids-3': { name: 'Flammable Liquids 3', description: '', is_reefer: false, is_haz: true },
  'flammable_solids-4.1': { name: 'Flammable Solids 4.1', description: '', is_reefer: false, is_haz: true },
  'flammable_solids_self_heat-4.2': { name: 'Flammable Solids 4.2', description: '', is_reefer: false, is_haz: true },
  'emit_flammable_gases_with_water-4.3': { name: 'Emit Flammable Gases with Water 4.3', description: '', is_reefer: false, is_haz: true },
  'imo_classes-5.1': { name: 'IMO Classes 5.1', description: '', is_reefer: false, is_haz: true },
  'toxic_substances-6.1': { name: 'Toxic Substances 6.1', description: '', is_reefer: false, is_haz: true },
  'infectious_substances-6.2': { name: 'Infectious Substances 6.2', description: '', is_reefer: false, is_haz: true },
  'radioactive_material-7': { name: 'Radioactive material 7', description: '', is_reefer: false, is_haz: true },
  'corrosives-8': { name: 'Corrosives 8', description: '', is_reefer: false, is_haz: true },
  'miscellaneous_dangerous_goods-9': { name: 'Miscellaneous dangerous goods 9', description: '', is_reefer: false, is_haz: true },
  express: { name: 'Express', description: '', is_reefer: false, is_haz: false },
  perishable: { name: 'Perishable', description: '', is_reefer: false, is_haz: false },
  live_animals: { name: 'Live animals', description: '', is_reefer: false, is_haz: false },
  fmcg: { name: 'FCMG', description: '', is_reefer: false, is_haz: false },
  fmcg_consumer_durables: { name: 'FMCG Consumer Durables', description: '', is_reefer: false, is_haz: false },
  consumer_durables_equipments: { name: 'Consumer Durables Equipments', description: '', is_reefer: false, is_haz: false },
  consumer_durables_equipments_machinery: { name: 'Consumer Durables Equipments Machinery', description: '', is_reefer: false, is_haz: false },
  equipments_plant_machinery: { name: 'Equipments Plant Machinery', description: '', is_reefer: false, is_haz: false },
  consumer_durables: { name: 'Consumer Durables', description: '', is_reefer: false, is_haz: false },
  special_consideration: { name: 'Special Consideration', description: '', is_reefer: false, is_haz: false },
  temp_controlled: { name: 'Temp. Controlled', description: '', is_reefer: false, is_haz: false },
  valuables: { name: 'Valuables', description: '', is_reefer: false, is_haz: false },
  dangerous: { name: 'Dangerous', description: '', is_reefer: false, is_haz: false },
  others: { name: 'Others', description: '', is_reefer: false, is_haz: false },
};

const commodityOptions = [
  "general",
  "hazardous",
  "white_goods",
  "pta",
  "cotton_and_yarn",
  "fabric_and_textiles",
  "sugar_rice",
  "chilled",
  "frozen",
  "pharma",
  "in_gauge_cargo",
  "non_haz_solids",
  "non_haz_liquids",
  "non_haz_gases",
  "gases-2.1",
  "gases-2.2",
  "gases-2.3",
  "flammable_liquids-3",
  "flammable_solids-4.1",
  "flammable_solids_self_heat-4.2",
  "emit_flammable_gases_with_water-4.3",
  "imo_classes-5.1",
  "toxic_substances-6.1",
  "infectious_substances-6.2",
  "radioactive_material-7",
  "corrosives-8",
  "miscellaneous_dangerous_goods-9",
  "express",
  "perishable",
  "live_animals",
  "fmcg",
  "fmcg_consumer_durables",
  "consumer_durables",
  "consumer_durables_equipments",
  "consumer_durables_equipments_machinery",
  "equipments_plant_machinery",
  "special_consideration",
  "temp_controlled",
  "valuables",
  "dangerous",
  "others",
].map((key) => ({
  value: key,
  label: COMMODITY_NAME_MAPPING[key]?.name || key,
}));

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getSearches();
        setSearches(response);
      } catch (error) {
        console.error("Error fetching searches:", error);
        setError(error.message);
      }
    };
    fetchData();
  }, []);

  const handleEdit = (search) => {
    setSelectedSearch(search);
    setModalIsOpen(true); 
  };

  const handleDelete = async (id) => {
    try {
      await deleteSearch(id);
      setSearches(searches.filter(search => search.id !== id));
      console.log(`Deleted search with ID ${id}`);
    } catch (error) {
      console.error(`Error deleting search with ID ${id}:`, error);
    }finally{
      fetchData();
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await updateSearch(selectedSearch.id, selectedSearch);
      setModalIsOpen(false);
      setSearches(searches.map(search =>
        search.id === selectedSearch.id ? selectedSearch : search
      ));
    } catch (error) {
      console.error("Error updating search:", error);
    }
  };

  const handleChange = (e) => {
    setSelectedSearch({
      ...selectedSearch,
      [e.target.name]: e.target.value,
    });
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

  const handleCountChange = (e) => {
    const count = parseInt(e.target.value);
    if (!isNaN(count) && count >= 0) {
      setSelectedSearch({
        ...selectedSearch,
        count: count,
      });
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
    <div className='bg-white text-black'>
      <h1>Searches</h1>
      <Table columns={columns} data={searches} className="min-w-full bg-white border-collapse border-gray-200 text-black" />
      <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}>
        <h2 className='font-bold'>Edit Search</h2>
        <form onSubmit={handleSubmit}>
        <div style={{ padding: 16, width: 'fit-content', color: 'black' }}>
        <label htmlFor="origin">Origin:</label>
        <Select
          id="origin"
          value={origin}
          onChange={handleOriginChange}
          onSearch={handleOriginSearch}
          placeholder="Select Origin"
          options={Origoptions}
          size="md"
          style={{ width: '250px' }}
          isLoading={isLoading}
        />
      </div>
      <div style={{ padding: 16, width: 'fit-content', color: 'black' }}>
        <label htmlFor="destination">Destination:</label>
        <Select
          id="destination"
          value={destination}
          onChange={handleDestinationChange}
          onSearch={handleDestinationSearch}
          placeholder="Select Destination"
          options={Destoptions}
          size="md"
          style={{ width: '250px' }}
          isLoading={isLoading}
        />
      </div>
          <div className="relative" style={{ padding: '16px', width: 'fit-content', color: 'black' }}>
            <Accordion
              title="Container Details"
              className="accordion-content"
              style={{
                width: '100%',
                height: 'auto',
                color: 'black',
                border: '1px solid #ccc',
                borderRadius: '8px',
                padding: '10px',
              }}
            >
              <form className="space-y-4">
                {/* Size Section */}
                <div>
                  <div className="text-lg font-medium">Size:</div>
                  <div className="flex space-x-4">
                    {sizeOptions.map((option) => (
                      <label key={option.value} className="flex items-center space-x-2">
                        <input
                          type="radio"
                          name="size"
                          value={option.value}
                          checked={selectedSearch?.size === option.value}
                          onChange={handleChange}
                        />
                        <span>{option.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Type Section */}
                <div>
                  <div className="text-lg font-medium">Type:</div>
                  <div className="grid grid-cols-2 gap-4">
                    {typeOptions.map((option) => (
                      <label key={option.value} className="flex items-center space-x-2">
                        <input type="radio"
                          name="type"
                          value={option.value}
                          checked={selectedSearch?.type === option.value}
                          onChange={handleChange} />
                        <span>{option.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Commodity Section */}
                <div>
                  <div className="text-lg font-medium">Commodity:</div>
                  <select className="p-2 text-black text-lg border-2 border-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 hover:border-gray-500 w-full"
                    value={selectedSearch?.commodity}
                    onChange={handleChange}
                    name="commodity">
                    <option value="" className="text-gray-500">
                      Select an option
                    </option>
                    {commodityOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Count Section */}
                <div>
                  <div className="text-lg font-medium">Count:</div>
                  <div className="flex space-x-2 items-center">
                    <input type="number"
                      value={selectedSearch?.count}
                      onChange={handleCountChange}
                      min="0"
                      className="p-2 text-lg border-2 border-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 hover:border-gray-500 w-full" />
                  </div>
                </div>
              </form>
            </Accordion>
          </div>
          <button type="submit">Save</button>
        </form>
        <button onClick={() => setModalIsOpen(false)}>Close</button>
      </Modal>
      {error && <p>Error: {error}</p>}
    </div>
  );
}