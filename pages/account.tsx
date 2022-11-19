//  @ts-nocheck

import { useRouter } from 'next/router'
import React from 'react'
import { useSelector } from 'react-redux';
import { logout } from '../mock/firebase';

const Account = () => {
  let rt = useRouter()

  let loggedIn_ = useSelector(state => state.auth.loggedIn);
  let acc = useSelector(state => state.auth.logData);

  console.log(acc);
  return (
    <div className='
        
        self-center
        min-h-[300px]
        m-10 mt-5 p-2 mb-[100px] pb-10
        w-full 

        drop-shadow-xl bg-ss
        border rounded-lg border-indigo-800/50  
        '>
        <button onClick={() => rt.push('/')} className='text-xl font2 rounded-md p-3'>
            <i className='fa-solid fa-arrow-left mx-1'></i> Back home
        </button>
      {
        !loggedIn_ ? 
        (<>
            <h1 className='text-center font-bold text-3xl'>NOT LOGGED IN !</h1>
            <h3 className='text-center font-medium text-xl'>Login by clicking button on upper-right corner.</h3>
          </>
        ) 
        : 
      
        <div className='flex'>
          
            <div className="grow 
                        m-5 p-6 rounded-md
                        bg-gradient-to-b from-slate-900 to-slate-800 
                        text-slate-50 
                        border border-slate-300 
                        drop-shadow-lg 
                        
                        ">
                <h2 className='text-xl font-bold'>BASICS</h2>
                <div>
                    <img className='float-left mr-3 mt-2 mb-2 rounded-full' src={acc.photoURL} alt="" />
                </div>
                <div>
                  <h5 className='text-md font-bold'>User Name </h5>
                  <h6 className='text-md font-medium tracking-wide'>{acc.displayName}</h6>
                </div>
                <div>
                  <h5 className='text-md font-bold'>Email </h5>
                  <h6 className='text-md font-medium tracking-wide'>
                      {acc.email} {acc.emailVerified ? '' : '(Unverified)'}</h6>
                </div>
                <button 
                  className='rounded rounded-full bg-red-900 
                              p-2 m-2 ml-0 text-lg font-bold 
                              hover:bg-red-800'
                              onClick={() => logout()}
                              >Signout
                </button>
            </div>
            <div className="flex-1 
                            bg-gradient-to-b from-stone-900 to-stone-800 
                            text-stone-50 
                            border border-stone-300 
                            drop-shadow-lg 
                            m-5 p-6 rounded-md">
                GROUP 2
            </div>
            <div className="flex-1 bg-teal-900 text-teal-50 border border-teal-300 m-5 p-6 rounded-md">
                GROUP 3
            </div>
        </div>
      }
    </div>
  )
}

export default Account