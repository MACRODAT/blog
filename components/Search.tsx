//  @ts-nocheck

import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setSearchFocus, setSearchText } from '../store/userSlice';


let selectedNav_ = "";

export default function SearchNav(){
  let [menus, setMenus] = useState(new Map<String, boolean>());
  let [flag, setFLag] = useState(false);
  let nav_ = useSelector(state => state.user.navigation);

  let [nav, setNav] = useState(nav_);

  useEffect(() => {
    setNav(nav_)
  }, [nav_])

  let category = useSelector(state => state.user.category);
  let router = useRouter();

  let dispatch = useDispatch();
 
  return (
    <div id="searchnav"
        className='bg-p mb-2 fg-p text-sm md:text-lg
                p-1 m-1  text-center
                right-0 mr-0
                w-full'
        >

            <input name="search" 
                    type="text"
                    placeholder='search for...'

                    onFocus={() => dispatch(setSearchFocus(true))}
                    // onBlur={() => dispatch(setSearchFocus(false))}

                    onChange={(e) => dispatch(setSearchText(e.target.value))}


                    className="w-full m-0 p-1 border-0 focus:outline-0 rounded-l-md
                            ring ring-cyan-100/10 ring-offset-4 ring-offset-cyan-50/10
                            focus:ring-cyan-600 focus:ring-offset-cyan-400/40
                            transition duration-200 text-lg focus:font-bold fg-p bg-p
                            " />
            
    </div>
  )
}