//  @ts-nocheck
import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { themes } from "./states";

// Type for our state
export interface ThemingState {
  theme: {};
  current : String;
  fontSize : number;
}

// Initial state
const initialState: ThemingState = {
  theme: themes.light,
  current : 'light',
  fontSize : 1,
};

// Actual Slice
export const themingSlice = createSlice({
  name: "theming",
  initialState,
  reducers: {

    // Action to set the authentication status
    setThemeState(state, action){
      try{
        if (action.payload != state.current){
          state.current = action.payload;
          if (action.payload == 'dark'){
              state.theme = themes.dark
          }else{
              state.theme = themes.light
          }
        }
      }catch(ex){console.log(ex)}
    },

    setFontSize(state, action){
      console.log(action.payload)
      if (action.payload > 0){
        state.fontSize = action.payload;
      }
    },

    // Special reducer for hydrating the state. Special case for next-redux-wrapper
    extraReducers: {
      [HYDRATE]: (state, action) => {
        return {
          ...state,
          ...action.payload,
        };
      },
    },

  },
});

export const { setThemeState, setFontSize } = themingSlice.actions;

export const selectCurrentThemeState = (state: ThemingState) => state.current;
export const selectThemeState = (state: ThemingState) => state.theme;
export const selectFontSize = (state: ThemingState) => state.fontSize;

export default themingSlice.reducer;