import React, { useState } from "react";
import { Accordion, Input, RadioGroup, Select } from "@cogoport/components";
import RadioGroupController from "./RadioGroupController";
import InputController from "./InputController";
import SelectController from "./SearchController";
import { useFieldArray } from "react-hook-form";
import { ContainerCollapseCard } from "./ContainerCollapseCard";

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

const ContainerDetailsAccordionFCL = ({ control }) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "container_details",
  });
  const [expandedContainer, setExpandedContainer] = useState(null);
  const [collapsedContainers, setCollapsedContainers] = useState([]);

  const handleAddContainer = () => {
    const currentValues = { size: "20ft", type: "standard", commodity: "general", count: 18 };
    append(currentValues);
    setExpandedContainer(fields.length);
  };

  const handleCollapseContainer = (index) => {
    setCollapsedContainers((prev) => [...prev, index]);
    setExpandedContainer(null);
  };

  return (
    <div className="relative" style={{ padding: "16px", width: "fit-content", color: "black" }}>
      <Accordion
        title="FCL Container Details"
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
        {fields.map((field, index) => (
          <div key={field.id}>
            <div
              className="text-lg font-medium"
              onClick={() => setExpandedContainer(index)}
              style={{ cursor: "pointer" }}
            >
              Container {index + 1}
            </div>
            {expandedContainer === index ? (
              <>
                <RadioGroupController
                  name={`container_details[${index}].size`}
                  control={control}
                  rules={{ required: "Size is required" }}
                  options={sizeOptions}
                />
                <RadioGroupController
                  name={`container_details[${index}].type`}
                  control={control}
                  rules={{ required: "Type is required" }}
                  options={typeOptions}
                />
                <SelectController
                  name={`container_details[${index}].commodity`}
                  control={control}
                  rules={{ required: "Commodity is required" }}
                  options={commodityOptions}
                />
                <InputController
                  name={`container_details[${index}].count`}
                  type="number"
                  control={control}
                  rules={{ required: "Count is required", min: 0 }}
                />
                <button type="button" onClick={() => remove(index)}>
                  Remove Container
                </button>
                <button type="button" onClick={() => handleCollapseContainer(index)}>
                  Collapse Container
                </button>
              </>
            ) : (
              collapsedContainers.includes(index) && (
                <ContainerCollapseCard
                  index={index + 1}
                  data={field}
                  onDelete={() => remove(index)}
                />
              )
            )}
          </div>
        ))}
        <button type="button" onClick={handleAddContainer}>
          Add Container
        </button>
      </Accordion>
    </div>
  );
};

export default ContainerDetailsAccordionFCL;
