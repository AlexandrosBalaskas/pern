import { createSelector } from "@reduxjs/toolkit";

export const selectFormDirty = (state: any) => state.Validations.dirty;
export const selectFormDirtyId = (state: any) => state.Validations.formId;

export const selectFormErrors = (state: any) => state.Validations.errors;

export const selectFieldErrors = (field: string) =>
  createSelector(selectFormErrors, (errors) => errors[field] || []);

export const selectFieldValid = (field: string) =>
  createSelector(selectFieldErrors(field), (errors) => errors.length === 0);

export const selectIsFormValid = (parentField: string) =>
  createSelector(selectFormErrors, (errors) => {
    return (
      Object.keys(errors)
        .filter((key) => key.startsWith(parentField))
        .map((field) => errors[field].length > 0)
        .filter((hasErrors) => hasErrors === true).length === 0
    );
  });
