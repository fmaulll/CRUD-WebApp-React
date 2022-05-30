import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    showNewForm: true,
    showUpdateForm: false,
  },
  reducers: {
    openNewForm(state) {
      state.showNewForm = !state.showNewForm;
    },
    openUpdateForm(state) {
      state.showUpdateForm = !state.showUpdateForm;
    },
  },
});

export const uiActions = uiSlice.actions

export default uiSlice