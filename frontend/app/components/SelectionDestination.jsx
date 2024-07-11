import React from 'react';
import { Select } from '@cogoport/components';

const SelectOriginDestination = ({ id, value, setFormData, onChange, onSearch, placeholder, options, isLoading }) => {
  return (
    <div style={{ padding: 16, width: 'fit-content', color: 'black' }}>
      <label htmlFor={id}>{id === 'origin' ? 'Origin:' : 'Destination:'}</label>
      <Select
        id={id}
        value={value}
        onChange={onChange}
        onSearch={onSearch}
        placeholder={placeholder}
        options={options}
        size="md"
        style={{ width: '250px' }}
        isLoading={isLoading}
      />
    </div>
  );
};
export default SelectOriginDestination;
