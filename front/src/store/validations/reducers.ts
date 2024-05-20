import { createSlice } from "@reduxjs/toolkit";

export interface ValidationsState {
  errors: any;
  dirty: boolean;
  formId: string;
}

const initialState: ValidationsState = { errors: {}, dirty: false, formId: "" };

export const entitySlice = createSlice({
  name: "Validations",
  initialState,
  reducers: {
    SetFieldFormError: (state, action) => {
      state.errors = {
        ...state.errors,
        [action.payload.field]: action.payload.errors,
      };
    },
    SetFormDirty: (state, action) => {
      state.dirty = action.payload.dirty;
      state.formId = action.payload.formId;
    },
  },
});

export const { SetFieldFormError, SetFormDirty } = entitySlice.actions;

export default entitySlice.reducer;
