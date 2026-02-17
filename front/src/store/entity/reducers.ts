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

const settingEntities = (
  state: any,
  action: any,
  tableReducer: (state: any, action: any) => {},
) => {
  const { payload, meta } = action;
  const entityId = payload?.entityId || meta?.arg?.entityId;
  if (!entityId) {
    return state;
  }
  return {
    ...state,
    [entityId]: {
      ...(state[entityId] || { id: entityId }),
      ...tableReducer(state[entityId], action),
    },
  };
};

export const SaveEntity = createAsyncThunk(
  "Entities/SaveEntity",
  ({ entityId }: any, { getState }) => {
    const state: any = getState();
    const entitySlice = state?.Entities[entityId];
    const { formData, isNew } = entitySlice;
    return api({
      method: isNew ? "post" : "put",
      url: isNew ? `${entityId}` : `${entityId}?id=${formData.id}`,
      data: formData,
    }).then((response) => {
      return { data: response.data, isNew };
    });
  },
);

export const LoadEntity = createAsyncThunk(
  "Entities/LoadEntity",
  ({ entityId, idKey }: any) => {
    return api({
      method: "get",
      url: `/${entityId}?id=${idKey}`,
    }).then((response) => {
      return { data: response.data };
    });
  },
);

export const entitySlice = createSlice({
  name: "Entities",
  initialState,
  reducers: {
    ClearEntities: (state, action) => {
      return {};
    },
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
    CloseSnackBar: (state, action) => {
      return {
        ...state,
        [action.payload.entityId]: {
          ...state[action.payload.entityId],
          snackBarOpen: false,
          snackBarMessage: "",
        },
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(LoadEntity.pending, (state, action) => {
      return settingEntities(state, action, (state, action) => ({
        ...state,
        loading: true,
      }));
    });
    builder.addCase(LoadEntity.fulfilled, (state, action) => {
      return settingEntities(state, action, (state, action) => ({
        ...state,
        loading: false,
        isNew: false,
        formData: { ...action.payload.data },
      }));
    });
    builder.addCase(LoadEntity.rejected, (state, action) => {
      return settingEntities(state, action, (state, action) => ({
        ...state,
        loading: false,
        error: action.error.message,
      }));
    });
    builder.addCase(SaveEntity.pending, (state, action) => {
      return settingEntities(state, action, (state, action) => ({
        ...state,
        loading: true,
      }));
    });
    builder.addCase(SaveEntity.fulfilled, (state, action) => {
      return settingEntities(state, action, (state, action) => ({
        ...state,
        loading: false,
        isNew: false,
        formData: { ...action.payload.data },
        snackBarOpen: true,
        snackBarMessage: action.payload.isNew ? "create" : "update",
      }));
    });
    builder.addCase(SaveEntity.rejected, (state, action) => {
      return settingEntities(state, action, (state, action) => ({
        ...state,
        loading: false,
        error: action.error.message,
      }));
    });
  },
});

export const {
  InitEntity,
  UpdateFormValue,
  SetEntity,
  CloseSnackBar,
  ClearEntities,
} = entitySlice.actions;

export default entitySlice.reducer;
