"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import OriginSelect from "../components/OriginSelect";
import DestinationSelect from "../components/DestinationSelect";
import ContainerDetailsAccordionFCL from "../components/ContainerDetailsAccordionFCL";
import ContainerDetailsAccordionAIR from "../components/ContainerDetailsAccordionAIR";
import ContainerDetailsAccordionFTL from "../components/ContainerDetailsAccordionFTL";
import { getSearch } from "../apicalls/api";
import { useForm, useFieldArray } from "react-hook-form";

const Price = ({ searchParams }) => {
  const { id } = searchParams;
  const { control, handleSubmit, setValue, watch } = useForm({
    defaultValues: {
      origin: "",
      destination: "",
      service_type: "",
      container_details: [],
    },
  });

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        try {
          const response = await getSearch(id);
          setValue("origin", response.origin);
          setValue("destination", response.destination);
          setValue("service_type", response.service_type);
          setValue("container_details", response.container_details || []);
          setIsLoading(false);
        } catch (error) {
          console.error("Error fetching data:", error);
          setIsLoading(false);
        }
      }
    };
    fetchData();
  }, [id]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const formData = watch();

  return (
    <div className="space-y-4">
      <OriginSelect
        value={formData.origin}
        control={control}
        options={[{ label: formData.origin, value: formData.origin }]}
      />
      <DestinationSelect
        value={formData.destination}
        control={control}
        options={[{ label: formData.destination, value: formData.destination }]}
      />
      {formData.service_type === "FCL" && (
        <ContainerDetailsAccordionFCL control={control} />
      )}
      {formData.service_type === "AIR" && (
        <ContainerDetailsAccordionAIR control={control} />
      )}
      {formData.service_type === "FTL" && (
        <ContainerDetailsAccordionFTL control={control} />
      )}
    </div>
  );
};

export default Price;
