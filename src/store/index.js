import { configureStore } from "@reduxjs/toolkit";
import mahasiswaSlice from "./mahasiswa-slice";
import uiSlice from "./ui-slice";


const store = configureStore({
    reducer: {mahasiswa: mahasiswaSlice.reducer, ui: uiSlice.reducer}
})

export default store;