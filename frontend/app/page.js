'use client'
import React, { useEffect, useState } from 'react';
import Image from "next/image";
import { Button, Accordion } from '@cogoport/components';
import { createSearch } from './apicalls/api';
import { fetchLocations } from './apicalls/api';


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

  const [locations, setLocations] = useState([]);
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [error, setError] = useState('');

  const handleOriginChange = (event) => {
    const newOrigin = event.target.value;
    if (newOrigin === formData.destination) {
      setError('Origin and destination cannot be the same.');
    } else {
      setError('');
      setFormData((prevFormData) => ({
        ...prevFormData,
        origin: newOrigin,
      }));
    }
  };

  const handleDestinationChange = (event) => {
    const newDestination = event.target.value;
    if (newDestination === formData.origin) {
      setError('Origin and destination cannot be the same.');
    } else {
      setError('');
      setFormData((prevFormData) => ({
        ...prevFormData,
        destination: newDestination,
      }));
    }
  };

  useEffect(() => {
    const getLocations = async () => {
      try {
        const data = await fetchLocations();
        setLocations(data);
      } catch (error) {
        console.error('Error fetching locations:', error);
      }
    };

    getLocations();
  }, []);

  const handleSizeChange = (event) => {
    setFormData({ ...formData, size: event.target.value });
  };

  const handleTypeChange = (event) => {
    setFormData({ ...formData, type: event.target.value });
  };

  const handleCommodityChange = (event) => {
    setFormData({ ...formData, commodity: event.target.value });
  };

  const handleCountChange = (event) => {
    const value = event.target.value;
    // Ensure count is not negative and is not empty
    if (parseInt(value) < 0) {
      // Handle error condition
      setError("Count must be a non-negative number.");
    } else {
      // Clear error if valid
      setError("");
      setFormData({ ...formData, count: value });
    }
  };

  const handleSearch = async () => {
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
    <div className="flex items-center mt-5 space-x-4">
      <div style={{ padding: 16, width: 'fit-content', color: 'black' }}>
        <label htmlFor="origin">Origin:</label>
        <select
          id="origin"
          value={formData.origin}
          onChange={handleOriginChange}
        >
          <option value="">Select Origin</option>
          {locations.map((location) => (
            <option key={location.id} value={location.name}>
              {location.name}
            </option>
          ))}
        </select>
      </div>
      <div style={{ padding: 16, width: 'fit-content', color: 'black' }}>
        <label htmlFor="destination">Destination:</label>
        <select
          id="destination"
          value={formData.destination}
          onChange={handleDestinationChange}
        >
          <option value="">Select Destination</option>
          {locations.map((location) => (
            <option key={location.id} value={location.name}>
              {location.name}
            </option>
          ))}
        </select>
      </div>
      <div className="relative">
        <Accordion
          title="Text Accordion"
          style={{
            width: '250px',
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
                      checked={formData.size === option.value}
                      onChange={handleSizeChange}
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
                      checked={formData.type === option.value}
                      onChange={handleTypeChange} />
                    <span>{option.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Commodity Section */}
            <div>
              <div className="text-lg font-medium">Commodity:</div>
              <select className="p-2 text-black text-lg border-2 border-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 hover:border-gray-500 w-full"
                    value={formData.commodity}
                    onChange={handleCommodityChange}
              >
                {commodityOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <div className="text-lg font-medium">Count:</div>
              <input
                type="number"
                defaultValue={0}
                className="p-2 text-black text-lg border-2 border-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 hover:border-gray-500 w-20"
                placeholder="Enter count"
                value={formData.count}
                onChange={handleCountChange}
                min="0"
                required
              />
            </div>
          </form>
        </Accordion>
      </div>
      <div>
        <button
          className="p-2 text-lg border-2 border-black rounded-md bg-red-500 text-white transition duration-300 hover:border-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>
    </div>
  );

}
