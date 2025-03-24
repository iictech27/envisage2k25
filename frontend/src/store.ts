import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import userReducer from "./features/userSlice";
import adminReducer from "./features/adminSlice";

// TypeScript: Define the RootState and AppDispatch types
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

// Persist Configuration
const persistConfig = {
  key: "root",
  storage,
};

// Root Reducer
const rootReducer = combineReducers({
  user: userReducer,
  admin: adminReducer,
});

// Persisted Reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Store Configuration
export const store = configureStore({
  reducer: persistedReducer,
});

// Persistor Configuration
export const persistor = persistStore(store);
