import { configureStore } from "@reduxjs/toolkit";
import employeesReducer from "./slices/employeeSlice";
import {createWrapper, HYDRATE} from 'next-redux-wrapper';

// export default configureStore({
//   reducer: {
//     employees: employeesReducer,
//   },
// });

const makeStore = () =>
  configureStore({
    reducer: {
        employees: employeesReducer,
    },
    devTools: true,
  });

  export const wrapper = createWrapper(makeStore);
