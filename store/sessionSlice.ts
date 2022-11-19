//  @ts-nocheck
import { createSlice } from "@reduxjs/toolkit";
import { AppState } from "./store";
import { HYDRATE } from "next-redux-wrapper";

// Type for our state
export interface AuthState {
  authState: boolean;
  loggedIn : boolean;
  logData : {};
}

// Initial state
const initialState: AuthState = {
  authState: false,
  loggedIn : false,
  logData : {},
};

// Actual Slice
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {

    // Action to set the authentication status
    setAuthState(state, action) {
      state.authState = action.payload;
    },
    setLogin(state, payload){
        state.loggedIn = payload.payload;
    },
    setUserFromGoogleAuth(state, payload){
        state.logData = payload.payload;
    },

    // Special reducer for hydrating the state. Special case for next-redux-wrapper
    extraReducers: {
      [HYDRATE]: (state, action) => {
        return {
          ...state,
          ...action.payload.auth,
        };
      },
    },

  },
});

export const { setAuthState, setLogin, setUserFromGoogleAuth } = authSlice.actions;

export const selectAuthState = (state: AppState) => state.auth.authState;

export default authSlice.reducer;