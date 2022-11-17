import { configureStore, ThunkAction, Action, getDefaultMiddleware } from "@reduxjs/toolkit";

import { authSlice } from "./sessionSlice";
import { themingSlice } from "./themeSlice";
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import { combineReducers } from 'redux';
import { userSlice } from "./userSlice";

const persistConfig = {
  key : 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, combineReducers({
  theming : themingSlice.reducer,
  auth : authSlice.reducer,
  user : userSlice.reducer,
}))

const makeStore = () =>
  configureStore({
    reducer: persistedReducer,
    devTools: true,
    middleware: getDefaultMiddleware({
      serializableCheck: false,
    }),  });

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore["getState"]>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action
>;

export { makeStore }

// export const wrapper = createWrapper<AppStore>(makeStore);