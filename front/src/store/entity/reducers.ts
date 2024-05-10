import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../axiosConfig";

export interface EntitiesState {
  [_: string]: EntityState;
}

export interface EntityState {
  formData: any;
  loading: boolean;
  isNew: boolean;
}

const initialState: EntitiesState = {};

const initialEntityState: EntityState = {
  formData: {},
  loading: false,
  isNew: true,
};
console.log(initialEntityState, "initailEntityStare");

export const SaveEntity = createAsyncThunk(
  "Entities/SaveEntity",
  (entityId: string, { getState }) => {
    const state: any = getState();
    const entitySlice = state?.Entities[entityId];
    const { formData, isNew } = entitySlice;
    console.log(state, "STATEEEE", formData, "formData", isNew, "isNew");
    return api({
      method: isNew ? "post" : "put",
      url: `${entityId}`,
      data: formData,
    }).then((response) => {
      return { data: response.data };
    });
  }
);

export const entitySlice = createSlice({
  name: "Entities",
  initialState,
  reducers: {
    InitEntity: (state, action) => {
      return {
        ...state,
        [action.payload]: initialEntityState,
      };
    },
    SetEntity: (state, action) => {
      return {
        ...state,
        [action.payload?.entityId]: {
          ...state[action.payload.entityId],
          formData: {
            ...state[action.payload.entityId].formData,
            ...action.payload?.response,
          },
          isNew: false,
        },
      };
    },
    UpdateFormValue: (state, action) => {
      return {
        ...state,
        [action.payload.entityId]: {
          ...state[action.payload.entityId],
          formData: {
            ...state[action.payload.entityId].formData,
            [action.payload.fieldId]: action.payload.value,
          },
        },
      };
    },
  },
});

export const { InitEntity, UpdateFormValue, SetEntity } = entitySlice.actions;

export default entitySlice.reducer;
