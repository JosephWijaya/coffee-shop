import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import localforage from "localforage";
import authReducer from "./authReducer";
import itemReducer from "./itemReducer";
import reportReducer from "./reportReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  item: itemReducer,
  report: reportReducer,
});

const persistConfig = {
  key: "root",
  storage: localforage,
  whitelist: ["auth", "item"],
  blacklist: ["report"],
};

const persistReducers = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistReducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
