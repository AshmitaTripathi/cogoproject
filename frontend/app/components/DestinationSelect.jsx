import React from 'react';
import {Select} from '@cogoport/components'; // Adjust import path as per your structure

const DestinationSelect = ({ value, setFormData, onChange, options, isLoading, onSearch }) => (
  <div style={{ padding: 16, width: 'fit-content', color: 'black' }}>
    <label htmlFor="destination">Destination:</label>
    <Select
      id="destination"
      value={value}
      onChange={onChange}
      onSearch={onSearch}
      placeholder="Select Destination"
      options={options}
      size="md"
      style={{ width: '250px' }}
      isLoading={isLoading}
    />
  </div>
);

export default DestinationSelect;
