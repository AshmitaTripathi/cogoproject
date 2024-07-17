import React from "react";
import { Select } from "@cogoport/components";
import SelectController from "./SearchController";


const OriginSelect = ({
  // value,
  options,
  onChange,
  onSearch,
  rules,
  control,
  renderLabel,
}) => {
  const customOptionRenderer = (props) => {
    return (
      <components.Option {...props}>
        <LocationOptionCard data={props.data} />
      </components.Option>
    );
  };
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
        // value={value}
        control={control}
        rules={rules}
        options={options}
        onSearch={onSearch}
        renderLabel={renderLabel}
      />
    </div>
  );
};

export default OriginSelect;
