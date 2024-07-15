import React from "react";
import { Select } from "@cogoport/components";
import SelectController from './SearchController';

const OriginSelect = ({ control, value, options, isLoading, onSearch }) => {
  return (
    <div style={{ padding: 16, width: "fit-content", color: "black" }}>
      <label htmlFor="origin">Origin:</label>
      {/* <Select
    {...rest}
      id="origin"
      name='origin'
      value={watch('origin')}
      onChange={onChange}
      onSearch={onSearch}
      placeholder="Select Origin"
      options={options}
      size="md"
      style={{ width: '250px' }}
      // isLoading={isLoading}
      // {...props}
    /> */}
      <SelectController
        name="origin"
        value={value}
        control={control}
        rules={{
          required: "Origin is required",
        }}
        options={options}
        onSearch={onSearch}
      />
    </div>
  );
};

export default OriginSelect;
