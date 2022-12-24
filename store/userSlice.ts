//  @ts-nocheck
import { createSlice } from "@reduxjs/toolkit";
import { compileNavigationAlgo } from "../services";

import path from 'path';
import {readFile} from 'fs';

import res from '../public/Search/data.json';
import listPosts from '../public/Search/listPosts.json';
import { nextElementSibling } from "domutils";

import bsearch from "binary-search-bounds";

class searchEngine
{
    data : Object;
    files : Array<string>;
    loaded : boolean;

    load(){
        //Find the absolute path of the json directory
        const jsonDirectory = path.join(process.cwd(), 'public', 'Search');
        //Read the json data file data.json
        let data_ = res;
        // data_ = await readFile(jsonDirectory + '/data.search', 'utf32');
        this.data = res;
        this.files = String(listPosts).split(',');
        // // get files
        // files = await readFile(jsonDirectory + '/listPosts.search', 'utf8');

        // console.log(this.data)
    }

    constructor(){
        this.loaded = false;
    }

    
    binarySearch_lower(nums: object[], target: string): number {
        let left: number = 0;
        let right: number = nums?.length - 1;
    
        while (left <= right) {
            const mid: number = Math.floor((left + right) / 2);
        
            if (nums[mid][0] > target) return mid;
            if (target < nums[mid][0]) right = mid - 1;
            else left = mid + 1;
        }
    
        return -1;
    }

    getSearchData(txt : string){
        if (!this.loaded){
            this.load();
            this.loaded = true;
        }
        

        let sr = txt.toUpperCase().split(' ');
        let rs = Array(100).fill(0);
        sr.forEach(s => {
            if (s.trim()?.length > 2){
                let gb = 0;

                gb = bsearch.le(this.data, s, (a,b) => {
                    return a > b;
                });
                let i = gb + 1;
                while (i < this.data?.length){
                    if (this.data[i] == undefined || !String(this.data[i][0]).startsWith(s)){
                        break;
                    }
                    i++;
                }
                // console.log(i - gb);
                if (i - gb < 20){
                    let i = gb + 1;
                    while (i < this.data?.length){
                        if (this.data[i] == undefined || !String(this.data[i][0]).startsWith(s)){
                            break;
                        }
                        
                        let entries = Object.entries(this.data[i][1]);
                    
                        entries.forEach((key,val) => {
                            // console.
                            try{

                                rs[parseInt(key[0])] += key[1]; 
                            }catch{}
                        });

                        i++;
                    }
                    
                }
               
            }
        });
        let t = [];
        let i = 0;
        for (i = 0; i <= 100; ++i){
            if (rs[i] > 0){
                t.push([rs[i], this.files[i]])
            }
        }
        t = t.sort((e,f) => f[0] - e[0]);
        try{
            t = t.map(e => { try { return e[1].split('.')[0]} catch { return ''} }  ).slice(0, 5);
        }catch{
            t = []
        }
        return t;
    }
}

let searchEng : searchEngine = new searchEngine();

export interface UserState {
    category : String;
    firstValue : boolean;
    navigation : Array<String>;
    searchFocus : boolean;
    searchText : String;
    searchResults : Array<String>;
    // searchEng : searchEngine;
}

const initialState : UserState = {
    category : '',
    firstValue : true,
    navigation : [],
    searchFocus : false,
    searchText : "",
    searchResults : [],
    // searchEng : new searchEngine(),
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
    },
    setSearchFocus(state, payload){
        state.searchFocus = payload.payload;
    },
    setSearchText(state, payload){
        state.searchText = payload.payload;
        state.searchResults = searchEng.getSearchData(payload.payload)
    }
  },
  
});

export const { setCategory, setNavigation, setSearchFocus, setSearchText } = userSlice.actions;

export default userSlice.reducer;