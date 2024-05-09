import React, { useCallback, useState } from "react";
import { FiltersProps } from "./Filters.d";
// import { DynamicForm } from "../DynamicForm";

const Filters = ({
  id,
  jsonSchema,
  uiSchema,
  parentId,
  onClose,
  closeOnClear = true,
}: FiltersProps) => {
  const [formData, setFormData] = useState({});

  return (
    <></>
    // <DynamicForm
    //   id={`${id}-filters`}
    //   data={formData}
    //   schema={jsonSchema}
    //   uiSchema={uiSchema}
    //   onClear={clearFilters}
    //   onSubmit={applyFilters}
    //   onChange={(data: any) => {
    //     setFormData(data);
    //     setFilterData(data);
    //   }}
    // />
  );
};

export default Filters;
