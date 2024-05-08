import { createSlice } from "@reduxjs/toolkit";

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
      console.log(action.payload, "action");
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
