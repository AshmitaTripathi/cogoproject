import React from 'react';
import RadioGroupController from './RadioGroupController';

const stOptions = [
  { label: "FCL", value: "FCL" },
  { label: "AIR", value: "AIR" },
  { label: "FHL", value: "FHL" },
];
const OptionSelector = ({ selectedOption, onOptionChange, control }) => {
  return (
    <div className="flex space-x-4 mb-4">
   <RadioGroupController
              name="service_type"
              // value={FormData?.size}
              control={control}
              rules={{
                required: "service type is required",
              }}
              options={stOptions}
    />
    </div>
  );
};

export default OptionSelector;
