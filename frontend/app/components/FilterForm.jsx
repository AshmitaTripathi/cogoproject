import { useForm } from "react-hook-form";
import RadioGroupController from "./RadioGroupController";
import { Button } from "@cogoport/components";
import OriginSelect from "./OriginSelect";
import DestinationSelect from "./DestinationSelect";
import SelectController from "./SearchController";
import { fetchLocations } from "../apicalls/api";
import { useState } from "react";

const sizeOptions = [
  { label: "20ft", value: "20" },
  { label: "40ft", value: "40" },
  { label: "40ft HC", value: "40HC" },
  { label: "45ft HC", value: "45HC" },
];

const typeOptions = [
  { value: "standard", label: "Standard (Dry)" },
  { value: "refer", label: "Refrigerated (Reefer)" },
  { value: "open_top", label: "Open Top" },
  { value: "flat_rack", label: "Flat Rack" },
  { value: "iso_tank", label: "ISO Tank" },
  { value: "open_side", label: "Open Side (One Door Open)" },
];
const commodityOptions = [
  "general",
  "hazardous",
  "white_goods",
  "pta",
  "cotton_and_yarn",
  "fabric_and_textiles",
  "sugar_rice",
  "chilled",
  "frozen",
  "pharma",
  "in_gauge_cargo",
  "non_haz_solids",
  "non_haz_liquids",
  "non_haz_gases",
  "gases-2.1",
  "gases-2.2",
  "gases-2.3",
  "flammable_liquids-3",
  "flammable_solids-4.1",
  "flammable_solids_self_heat-4.2",
  "emit_flammable_gases_with_water-4.3",
  "imo_classes-5.1",
  "toxic_substances-6.1",
  "infectious_substances-6.2",
  "radioactive_material-7",
  "corrosives-8",
  "miscellaneous_dangerous_goods-9",
  "express",
  "perishable",
  "live_animals",
  "fmcg",
  "fmcg_consumer_durables",
  "consumer_durables",
  "consumer_durables_equipments",
  "consumer_durables_equipments_machinery",
  "equipments_plant_machinery",
  "special_consideration",
  "temp_controlled",
  "valuables",
  "dangerous",
  "others",
].map((key) => ({
  value: key,
  label: key,
}));

const FilterForm = ({
//   control,
//   handleSubmit,
// //     handleOriginSearch,
// //     handleDestinationSearch,
// //   fetchDestinationLocations,
// //   fetchOriginLocations,
//   watch,
  isLoading,
  setIsLoading,
    onSubmit,
}) => {

const { handleSubmit, control, reset, watch, setValue } = useForm();
  const [Origoptions, setOrigOptions] = useState([]);
  const [Destoptions, setDestOptions] = useState([]);
    console.log('This is filterform watch:', watch())
  //   console.log('Filter form watching:-',watch());

  const fetchOriginLocations = async (query) => {
    try {
      console.log("Fetching locations for query:", query);
      //   setIsLoading(true);
      const data = await fetchLocations(query);
      if ("list" in data) {
        console.log(data);
        setOrigOptions(
          data.list.map((location) => ({
            label: location.name,
            value: location.name,
          }))
        );
      }
    } catch (error) {
      console.error("Error fetching locations:", error);
    } finally {
      console.log("Finished fetching locations.");
      //   setIsLoading(false);
    }
  };

  const fetchDestinationLocations = async (query) => {
    try {
      console.log("Fetching locations for query:", query);
      //   setIsLoading(true);
      const data = await fetchLocations(query);
      if ("list" in data) {
        console.log(data);
        setDestOptions(
          data.list.map((location) => ({
            label: location.name,
            value: location.name,
          }))
        );
      }
    } catch (error) {
      console.error("Error fetching locations:", error);
    } finally {
      console.log("Finished fetching locations.");
      //   setIsLoading(false);
    }
  };

  const handleOriginSearch = (inputValue) => {
    if (inputValue) {
      console.log("Searching for locations:", inputValue);
      fetchOriginLocations(inputValue);
    } else {
      console.log("No search query provided.");
    }
  };

  const handleDestinationSearch = (inputValue) => {
    if (inputValue) {
      console.log("Searching for Destination:", inputValue);
      fetchDestinationLocations(inputValue);
    } else {
      console.log("No search query provided.");
    }
  };

  return (
    <form
      onSubmit={
        () => 
        handleSubmit(onSubmit)
      }
      style={{ padding: "10px" }}
    >
      <OriginSelect
        id="origin"
        control={control}
        // value={selectedSearch?.origin}
        // onChange={handleOriginChange}
        onSearch={handleOriginSearch}
        options={Origoptions}
        // isLoading={isLoading}
      />
      <DestinationSelect
        id="destination"
        control={control}
        // value={selectedSearch?.destination}
        // onChange={handleDestinationChange}
        onSearch={handleDestinationSearch}
        options={Destoptions}
        // isLoading={isLoading}
      />
      <div>
        <div className="text-lg font-medium">Size:</div>
        <div className="flex space-x-4">
          <RadioGroupController
            name="size"
            // value={FormData?.size}
            control={control}
            // rules={{
            //   required: "size is required",
            // }}
            options={sizeOptions}
          />
        </div>
      </div>

      {/* Type Section */}
      <div>
        <div className="text-lg font-medium">Type:</div>
        <div className="grid grid-cols-2 gap-4">
          <RadioGroupController
            name="type"
            // value={FormData?.type}
            control={control}
            // rules={{
            //   required: "type is required",
            // }}
            options={typeOptions}
          />
        </div>
      </div>

      {/* Commodity Section */}
      <div>
        <div className="text-lg font-medium">Commodity:</div>
        <SelectController
          name="commodity"
          //   value={FormData?.commodity}
          control={control}
          //   rules={{
          //     required: "Commodity is required",
          //   }}
          options={commodityOptions}
        />
      </div>
      <Button type="submit">Apply Filter</Button>
    </form>
  );
};
export default FilterForm;
