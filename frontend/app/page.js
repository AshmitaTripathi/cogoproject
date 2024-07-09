'use client'
import { useState } from "react"; 
import Image from "next/image";
import { Button , Accordion } from '@cogoport/components';

export default function Home() {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');

  const handleOriginChange = (e) => setOrigin(e.target.value);
  const handleDestinationChange = (e) => setDestination(e.target.value);

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

  return (
    <div className="flex items-center mt-5 space-x-4">
      <div>
        <input
          type="text"
          placeholder="Origin"
          value={origin}
          onChange={handleOriginChange}
          className="p-2 text-black text-lg border-2 border-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 hover:border-gray-500"
        />
      </div>
      <div>
        <input
          type="text"
          placeholder="Destination"
          value={destination}
          onChange={handleDestinationChange}
          className="p-2 text-black text-lg border-2 border-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 hover:border-gray-500"
        />
      </div>
      <div className="relative">
        <Accordion title="Text Accordion" style={{ width: '250px', height: 'auto', color: 'black' }}>
          <form className="space-y-4">
            {/* Size Section */}
            <div>
              <div className="text-lg font-medium">Size:</div>
              <div className="flex space-x-4">
                {sizeOptions.map((option) => (
                  <label key={option.value} className="flex items-center space-x-2">
                    <input type="radio" name="size" value={option.value} />
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
                    <input type="radio" name="type" value={option.value} />
                    <span>{option.label}</span>
                  </label>
                ))}
              </div>
            </div>
  
            {/* Commodity Section */}
            <div>
              <div className="text-lg font-medium">Commodity:</div>
              <select className="p-2 text-black text-lg border-2 border-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 hover:border-gray-500 w-full">
                {commodityOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </form>
        </Accordion>
      </div>
      <div>
        <button
          className="p-2 text-lg border-2 border-black rounded-md bg-red-500 text-white transition duration-300 hover:border-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Search
        </button>
      </div>
    </div>
  );
}
