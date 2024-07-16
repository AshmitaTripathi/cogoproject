import React from "react";
import { Select } from "@cogoport/components"; // Adjust import path as per your structure
import SelectController from "./SearchController"; // Adjust import path as per your structure

const DestinationSelect = ({ control, value, options, isLoading, onSearch , rules }) => {
  return (
    <div style={{ padding: 16, width: "fit-content", color: "black" }}>
      <label htmlFor="destination">Destination:</label>
      {/* <Select
      {...register('destination', { required: true }) }
      id="destination"
      // value={value}
      // onChange={onChange}
      onSearch={onSearch}
      placeholder="Select Destination"
      options={options}
      size="md"
      style={{ width: '250px' }}
      isLoading={isLoading}
      {...register('destination', { required: true })}
    /> */}
      <SelectController
        name="destination"
        value={value}
        control={control}
        rules={rules}
        options={options}
        onSearch={onSearch}
      />
    </div>
  );
};

export default DestinationSelect;
