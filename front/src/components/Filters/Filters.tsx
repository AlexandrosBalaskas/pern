import React, { useCallback, useState } from "react";
import { FiltersProps } from "./Filters.d";
import useTable from "../../store/table/useTable";
import useDrawer from "../../store/drawer/useDrawer";
import { DynamicForm } from "../DynamicForm";

const Filters = ({
  id,
  jsonSchema,
  uiSchema,
  parentId,
  onClose,
  closeOnClear = true,
}: FiltersProps) => {
  const { clearCriteria, applyCriteria, setFilterData, triggerRefresh } =
    useTable(id);
  const { closeDrawer } = useDrawer(`${parentId}_${id}_filters-panel`);
  const [formData, setFormData] = useState({});

  const applyFilters = useCallback(() => {
    if (Object.keys(formData).length === 0) {
      triggerRefresh();
    } else {
      applyCriteria(formData);
    }
    onClose && onClose();
    closeDrawer();
  }, [formData, closeDrawer]);

  const clearFilters = useCallback(() => {
    setFormData({});
    clearCriteria();
    closeOnClear && onClose && onClose();
    closeOnClear && closeDrawer();
  }, [closeDrawer]);

  return (
    <DynamicForm
      id={`${id}_filters`}
      data={formData}
      formContext={{ canChange: true }}
      schema={jsonSchema}
      uiSchema={uiSchema}
      onClear={clearFilters}
      onSubmit={applyFilters}
      onChange={(data: any) => {
        setFormData(data);
        setFilterData(data);
      }}
    />
  );
};

export default Filters;
