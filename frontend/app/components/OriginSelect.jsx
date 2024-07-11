import React from 'react';
import { Select } from '@cogoport/components'; 

const OriginSelect = ({ value, onChange, options, isLoading, onSearch }) => (
  <div style={{ padding: 16, width: 'fit-content', color: 'black' }}>
    <label htmlFor="origin">Origin:</label>
    <Select
      id="origin"
      value={value}
      onChange={onChange}
      onSearch={onSearch}
      placeholder="Select Origin"
      options={options}
      size="md"
      style={{ width: '250px' }}
      isLoading={isLoading}
    />
  </div>
);

export default OriginSelect;
