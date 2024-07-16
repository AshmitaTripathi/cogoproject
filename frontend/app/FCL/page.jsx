import React from "react";

const FCL = ({ originValue, destinationValue}) => {
  return (
    <div className="space-y-4">
      <OriginSelect
        control={control}
        value={formData.origin}
        // onChange={handleOriginChange}
        // onSearch={handleOriginSearch}
        options={[originValue]}
        rules={{ required: "Origin is required" }}
        // isLoading={isLoading}
      />
      <DestinationSelect
        control={control}
        value={destinationValue}
        onSearch={handleDestinationSearch}
        // options={[destinationValue]}
        rules={{ required: "Destination is required" }}
        // isLoading={isLoading}
      />

      <ContainerDetailsAccordionFCL control={control} formData={{}} />
    </div>
  );
};

export default FCL;
