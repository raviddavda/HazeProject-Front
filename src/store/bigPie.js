import { configureStore } from "@reduxjs/toolkit";

import counterSlice from "./counterSlice";
import authSlice from "./auth";
import themeSlice from "./theme";

const store = configureStore({
  reducer: {
    counterSlice,
    authSlice,
    themeSlice,
  },
});

export default store;
