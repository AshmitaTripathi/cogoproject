import FilterForm from "./FilterForm";
import {Button, Accordion} from '@cogoport/components';

 const FilterAccordion = ({ control , onSubmit , watch , isLoading, setIsLoading,
    fetchOriginLocations, fetchDestinationLocations
  }) => {
    // const handleApplyFilter = (data) => {
    //   // Add your filter logic here
    //   console.log("Filter applied with:", data);
    // };
  
    // const handleClickForm = (data) => {
    //   console.log("Filter By button clicked",data);
    // };
    // const handleClickForm = () => {

    // };
  
    console.log({watch})
    return (
      <Accordion
        title="Filter By"
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
        {/* <Button
          style={{
            width: 'fit-content',
            boxSizing: 'border-box',
            fontFamily: 'Roboto',
            fontSize: '15px',
            fontStyle: 'normal',
            backgroundColor: 'grey',
            color: 'black',
          }}
          onClick={handleClickForm}
        >
          Filter By
        </Button> */}
        <FilterForm 
            // control={control}
            // handleSubmit={handleSubmit}
            // watch={watch}
            // isLoading={isLoading}
            // setIsLoading={setIsLoading}
            // fetchOriginLocations={fetchOriginLocations}
            // fetchDestinationLocations={fetchDestinationLocations}
            onSubmit={onSubmit}
        
        />
 </Accordion>
    );
  };
  export default FilterAccordion;