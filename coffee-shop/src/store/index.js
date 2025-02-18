import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import authReducer from "./authReducer";
import localforage from "localforage";
import itemReducer from "./itemReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  item: itemReducer,
});

const persistConfig = {
  key: "root",
  storage: localforage,
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
