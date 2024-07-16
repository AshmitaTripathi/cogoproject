"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Button, Accordion, Select, Modal } from "@cogoport/components";
import { createSearch } from "./apicalls/api";
import { fetchLocations } from "./apicalls/api";
import axios from "axios";
import SeeSearchesButton from "./components/Searches";
// import SelectOriginDestination from './components/SelectionDestination';
import SearchButton from "./components/SearchButton";
import OriginSelect from "./components/OriginSelect";
import DestinationSelect from "./components/DestinationSelect";
import { useForm } from "react-hook-form";
import SelectController from "./components/SearchController";
import OptionSelector from "./components/OptionSelector";
import ContainerDetailsAccordionFCL from "./components/ContainerDetailsAccordionFCL";
import ContainerDetailsAccordionAIR from "./components/ContainerDetailsAccordionAIR";
import ContainerDetailsAccordionFTL from "./components/ContainerDetailsAccordionFTL";
import FindRates from "./components/FindRates";
// import { DevTool } from '@hookform/devtools';

export default function Home() {
  // Assuming origin and destination are state variables or props
  const [formData, setFormData] = useState({
    origin: "",
    destination: "",
    size: "",
    type: "",
    commodity: "",
    count: 0,
  });
  const form = useForm({
    // defaultValues: {
    //   origin: '',
    //   destination: '',
    //   size: '',
    //   type: '',
    //   commodity: '',
    //   count: 0,
    // },
  });

  const {
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = form;

  const [error, setError] = useState("");
  const [Origoptions, setOrigOptions] = useState([]);
  const [Destoptions, setDestOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedOption, setSelectedOption] = useState("FCL");
  const [show, setShow] = useState(false);

  const handleOriginChange = (selectedOption) => {
    const newOrigin = selectedOption ? selectedOption : "";
    if (newOrigin === formData.destination) {
      alert("Origin and destination cannot be the same.");
      setError("Origin and destination cannot be the same.");
    } else {
      setError("");
      setFormData((prevFormData) => ({
        ...prevFormData,
        origin: newOrigin,
      }));
      console.log({
        origin: newOrigin,
      });
    }
  };

  const handleDestinationChange = (selectedOption) => {
    const newDestination = selectedOption ? selectedOption : "";
    if (newDestination === formData.origin) {
      alert("Origin and destination cannot be the same.");
      setError("Origin and destination cannot be the same.");
    } else {
      setError("");
      setFormData((prevFormData) => ({
        ...prevFormData,
        destination: newDestination,
      }));
    }
  };

  const fetchOriginLocations = async (query) => {
    try {
      console.log("Fetching locations for query:", query);
      setIsLoading(true);
      const data = await fetchLocations(query);
      if ("list" in data) {
        console.log(data);
        setOrigOptions(
          data?.list?.map((location) => ({
            label: location?.name,
            value: location?.name,
          }))
        );
      }
    } catch (error) {
      console.error("Error fetching locations:", error);
    } finally {
      console.log("Finished fetching locations.");
      setIsLoading(false);
    }
  };

  const fetchDestinationLocations = async (query) => {
    try {
      console.log("Fetching locations for query:", query);
      setIsLoading(true);
      const data = await fetchLocations(query);
      if ("list" in data) {
        console.log(data);
        setDestOptions(
          data?.list?.map((location) => ({
            label: location?.name,
            value: location?.name,
          }))
        );
      }
    } catch (error) {
      console.error("Error fetching locations:", error);
    } finally {
      console.log("Finished fetching locations.");
      setIsLoading(false);
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
  const handleSearch = async (data, event) => {
    // console.log(formData)

    // if (
    //   !formData.origin ||
    //   !formData.destination ||
    //   !formData.size ||
    //   !formData.type ||
    //   !formData.commodity ||
    //   !formData.count
    // ) {
    //   alert('All fields are required.');
    //   console.error('Error: All fields are required.');
    //   return;
    // }
    // const payload = {
    //   origin: formData.origin,
    //   destination: formData.destination,
    //   size: formData.size,
    //   type: formData.type,
    //   commodity: formData.commodity,
    //   count: formData.count,

    // };

    const payload = {
      origin: data.origin,
      destination: data.destination,
      size: data.size,
      type: data.type,
      commodity: data.commodity,
      count: data.count,
    };

    try {
      const result = await createSearch(payload);
      console.log("Search created successfully:", result);
    } catch (error) {
      console.error("Error creating search:", error);
    } finally {
      setShow(true);
    }
  };

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  const handle

  const onSubmit = async (val) => {
    console.log("Form Values are : ", { val });
    const payload = {
      origin: val.origin,
      destination: val.destination,
      size: val.size,
      type: val.type,
      commodity: val.commodity,
      count: val.count,
    };

    try {
      const result = await createSearch(payload);
      console.log("Search created successfully:", result);
    } catch (error) {
      console.error("Error creating search:", error);
    } finally {
      setShow(true);
    }
  };
  console.log({ errors });

  console.log("This is getting displayed by watch:", watch());
  return (
    <div className="flex flex-wrap items-start mt-5 space-x-4">
      <OptionSelector
        selectedOption={selectedOption}
        onOptionChange={handleOptionChange}
      />
      <div className="space-y-4">
        <OriginSelect
          control={control}
          // value={formData.origin}
          // onChange={handleOriginChange}
          onSearch={handleOriginSearch}
          options={Origoptions}
          rules={{ required: "Origin is required" }}
          isLoading={isLoading}
        />
        <DestinationSelect
          control={control}
          value={formData.destination}
          onSearch={handleDestinationSearch}
          options={Destoptions}
          rules={{ required: "Destination is required" }}
          isLoading={isLoading}
        />

        <FindRates optionSelected={selectedOption} />
        {/* <ContainerDetailsAccordion
          control={control}
          form={form}
          formData={formData}
          setFormData={setFormData}
          error={error}
          setError={setError}
        /> */}
        <div style={{ padding: 16, width: "fit-content", color: "black" }}>
          <Button
            onClick={handleSubmit(onSubmit)}
            style={{ marginTop: "18px" }}
            className="p-2 text-lg border-2 border-black rounded-md bg-red-500 text-white transition duration-300 hover:border-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            size="lg"
          >
            Search
          </Button>
        </div>
      </div>
      {/* <DevTool  control={control} /> */}
      {/* <Modal
        size="md"
        show={show}
        onClose={() => setShow(false)}
        placement="top"
      >
        <Modal.Header title="" />
        <Modal.Body>
          Your Search is getting processed for Origin {formData.origin} to
          Destination {formData.destination}. Please wait for the results.
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setShow(false)}>OK</Button>
        </Modal.Footer>
      </Modal> */}
      <SeeSearchesButton />
    </div>
  );
}
