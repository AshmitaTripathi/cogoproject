import React from 'react';

const OptionSelector = ({ selectedOption, onOptionChange }) => {
  return (
    <div className="flex space-x-4 mb-4">
      {['FCL', 'AIR', 'FTL'].map(option => (
        <button
          key={option}
          onClick={() => onOptionChange(option)}
          className={`p-2 rounded ${selectedOption === option ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          {option}
        </button>
      ))}
    </div>
  );
};

export default OptionSelector;
