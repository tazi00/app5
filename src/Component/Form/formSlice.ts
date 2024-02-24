import { createSlice } from "@reduxjs/toolkit";
// import type { PayloadAction } from "@reduxjs/toolkit";

interface FormValue {
  name: string;
  type?: string;
}

export interface FormType {
  formvalues: FormValue;
}

const initialState: FormType = {
  formvalues: {
    name: "",
    type: "",
  },
};

export const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {},
});

// Action creators are generated for each case reducer function
// export const {} = formSlice.actions;

export default formSlice.reducer;
