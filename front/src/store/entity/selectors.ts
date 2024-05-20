export const selectSlice =
  (id: string) =>
  (state: any): any =>
    state.Entities[id] || {};

export const selectLoading = (id: string) => (state: any) =>
  selectSlice(id)(state).loading;
export const selectFormData = (id: string) => (state: any) =>
  selectSlice(id)(state).formData || {};
export const selectIsNew = (id: string) => (state: any) =>
  selectSlice(id)(state).isNew;
export const selectSnackBarOpen = (id: string) => (state: any) =>
  selectSlice(id)(state).snackBarOpen;
export const selectSnackBarMessage = (id: string) => (state: any) =>
  selectSlice(id)(state).snackBarMessage;
export const selectFieldValue = (id: string, fieldId: string) => (state: any) =>
  selectSlice(id)(state).formData && selectSlice(id)(state).formData[fieldId];
export const selectId = (id: string) => (state: any) =>
  selectSlice(id)(state).formData && selectSlice(id)(state).formData.id;
