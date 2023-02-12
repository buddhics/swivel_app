import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import axios from "axios";

const initialState = {
  value: {
    data: [],
    error: [],
  },
};

//Action
export const fetchEmployees = createAsyncThunk("fetchEmployees", async () => {
  const res = await axios({
    method: "get",
    url: "http://localhost:3001/employee",
    responseType: "json",
  });
  return res.data;
});

export const addEmployees = createAsyncThunk("addEmployees", async (data) => {
  console.log(data);
  const res = await axios({
    method: "post",
    url: "http://localhost:3001/employee",
    data: data,
  });
  console.log(res);
  return res.data;
});

export const employeeSlice = createSlice({
  name: "employees",
  initialState: initialState,
  reducers: {
    add: (state, action) => {
      state.value.push(action.payload);
    },
    edit: (state, action) => {
      state.value.filter((item) => item.id === action.payload.id);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchEmployees.fulfilled, (state, action) => {
      state.value.data = action.payload;
    });

    builder.addCase(addEmployees.fulfilled, (state, action) => {
      state.value.data.push(action.payload);
    });

    builder.addCase(HYDRATE, (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    });
  },
});

// Action creators are generated for each case reducer function
export const { add, edit } = employeeSlice.actions;

export const getEmployees = (state) => state.value;

export default employeeSlice.reducer;
