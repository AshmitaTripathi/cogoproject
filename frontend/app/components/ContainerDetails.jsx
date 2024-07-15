import React from "react";
import { Accordion, Input, RadioGroup, Select } from "@cogoport/components";
import RadioGroupController from "./RadioGroupController";
import InputController from "./InputController";
import SelectController from "./SearchController";

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
  label: key,
}));

const ContainerDetailsAccordion = ({
  FormData,
  control,
  setError,
}) => {
  // const handleSizeChange = (event) => {
  //   console.log({ event });
  //   setFormData({ ...formData, size: event });
  // };

  // const handleTypeChange = (event) => {
  //   setFormData({ ...formData, type: event });
  // };

  // const handleCommodityChange = (event) => {
  //   setFormData({ ...formData, commodity: event });
  // };

  // const handleCountChange = (event) => {
  //   const value = event.target.value;
  //   // Ensure count is not negative and is not empty
  //   if (parseInt(value) < 0) {
  //     // Handle error condition
  //     alert("Count must be a non-negative number.");
  //     setError("Count must be a non-negative number.");
  //   } else {
  //     // Clear error if valid
  //     setError("");
  //     setFormData({ ...formData, count: value });
  //   }
  // };
  console.log(FormData)
  return (
    <div
      className="relative"
      style={{ padding: "16", width: "fir-content", color: "black" }}
    >
      <Accordion
        title="Container Details"
        className="accordion-content"
        style={{
          fontSize: "16px",
          width: "100%",
          height: "auto",
          color: "black",
          border: "1px solid #ccc",
          borderRadius: "8px",
          padding: "5px",
          marginTop: "30px",
        }}
      >
        {/* Size Section */}
        <div>
          <div className="text-lg font-medium">Size:</div>
          <div className="flex space-x-4">
            {/* {sizeOptions.map((option) => (
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
                                  ))} */}
            <RadioGroupController
              name="size"
              value={FormData?.size}
              control={control}
              rules={{
                required: "size is required",
              }}
              options={sizeOptions}
            />
          </div>
        </div>

        {/* Type Section */}
        <div>
          <div className="text-lg font-medium">Type:</div>
          <div className="grid grid-cols-2 gap-4">
            {/* {typeOptions.map((option) => (
                                <label key={option.value} className="flex items-center space-x-2">
                                    <input type="radio"
                                        name="type"
                                        value={option.value}
                                        checked={formData.type === option.value}
                                        onChange={handleTypeChange} />
                                    <span>{option.label}</span>
                                </label>
                            ))} */}
            <RadioGroupController
              name="type"
              value={FormData?.type}
              control={control}
              rules={{
                required: "type is required",
              }}
              options={typeOptions}
            />
          </div>
        </div>

        {/* Commodity Section */}
        <div>
          <div className="text-lg font-medium">Commodity:</div>
          {/* <select className="p-2 text-black text-lg border-2 border-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 hover:border-gray-500 w-full"
                            value={formData.commodity}
                            onChange={handleCommodityChange}
                        >
                            {commodityOptions.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select> */}
          <SelectController
            name="commodity"
            value={FormData?.commodity}
            control={control}
            rules={{
              required: "Commodity is required",
            }}
            options={commodityOptions}
          />
        </div>  
        <div>
          <div className="text-lg font-medium">Count:</div>
            <InputController
                name="count"
                type="number"
                value={FormData?.count}
                control={control}
                rules={{
                    required: "Count is required",
                    min: 0,
                }}
            />
        </div>
      </Accordion>
    </div>
  );
};

export default ContainerDetailsAccordion;
