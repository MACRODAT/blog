//  @ts-nocheck
import { createSlice } from "@reduxjs/toolkit";
import { compileNavigationAlgo } from "../services";

export interface UserState {
    category : String;
    firstValue : boolean;
    navigation : Array<String>;
}

const initialState : UserState = {
    category : '',
    firstValue : true,
    navigation : [],
}

// export const fetchNavIfNoNav = () => async (dispatch, getState) => {
//     setTimeout(async () => {
//         let nav_ = getState().navigation;
//         if (nav_ == undefined || nav_ == null || nav_ == []){
//             const data = await compileNavigationAlgo();
//             dispatch(setNavigation(data))
//         }
//     }, 500);
// }

export function fetchNavIfNoNav() {
    // fetchTodoByIdThunk is the "thunk function"
    return async function fetchNavIfNoNavThunk(dispatch, getState) {
        setTimeout(async () => {
            let nav_ = getState().navigation;
            if (nav_ == undefined || nav_ == null || nav_ == []){
                const data = await compileNavigationAlgo();
                // const data = []
                // console.log(data)
                dispatch(setNavigation(data))
            }
        }, 300);
    }
}

export const userSlice = createSlice({
  name : "user",
  initialState,
  reducers: {
    setCategory(state, payload){
        state.category = payload.payload;
    },
    setNavigation(state, payload){
        state.navigation = payload.payload;
        // console.log(state.navigation)
    }
  },
  
});

export const { setCategory, setNavigation } = userSlice.actions;

export default userSlice.reducer;