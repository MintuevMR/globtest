import { configureStore } from "@reduxjs/toolkit";
import users from "./slice";

export const store = configureStore({
  reducer: {
    users
  },
});
