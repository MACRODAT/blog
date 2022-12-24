//  @ts-nocheck

import { useRouter } from 'next/router'
import React from 'react'
import { useDispatch } from 'react-redux';
import { setCategory, setSearchFocus } from '../store/userSlice';

const SearchCard = ({name, description, featureImage, link}) => {

  const router = useRouter();
  const dispatch = useDispatch();
  
  // let [user, setUser] = useUserContext();

  return (
    <div className='m-1 p-3 mb-6 relative
                    rounded-xl
                    w-full
                    min-h-[100px]
                    hover:border-solids
                    bg-s
                    bg-middle
                    cursor-pointer
                    shadow-sm
                    shadow-slate-200
                    transition duration-300 ease-in
                    hover:shadow-slate-900/40 hover:ease-out
                    '
          key = {name}
          onClick={(e) => {  
            // user = Object.assign({}, user, {category : name})
            // dispatch(setCategory(name));
            let nn = encodeURI(link)
            // console.log('/post/' + nn)
            router.push('/post/' + nn);
            dispatch(setSearchFocus(false))
            e.stopPropagation();
          }}
            style={{
                backgroundImage: 'linear-gradient(140deg, var(--color-bg-p) 35% , rgba(18,0,36,0))'}}
                    >
        <h3 className='text-2xl text-center font-semibold'>
            {name}
        </h3>
        <p className='text-center font-thin italic md:m-10'>
            {description}
        </p>
    </div>
  )
}

export default SearchCard