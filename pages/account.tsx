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
      
        <div className='flex flex-wrap'>
          
            <div className="grow w-4/12
                        m-5 p-6 rounded-md
                        bg-gradient-to-b from-slate-900 to-slate-800 
                        text-slate-50 
                        border border-slate-300 
                        drop-shadow-lg 
                        overflow-hidden
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
                              hover:bg-red-800
                              float-right
                              '
                              onClick={() => logout()}
                              >Signout
                </button>
            </div>
            <div id="coffeebg" className="flex-auto min-w-1/2 w-1/2
                            bg-gradient-to-r bg-stone-800 from-red-200 to-red-900 bg-no-repeat bg-contain
                            text-stone-50 
                            border border-stone-300 
                            drop-shadow-lg 
                            m-5 p-6 rounded-md overflow-hidden">
                <h2 className='text-xl font-bold'>Contributions</h2>
                
                <div>
                  <h5 className='text-md font-bold'>Total number of written articles : 3 </h5>
                  <h6 className='text-md font-medium tracking-wide'>
                    - Implementing DFS <br />
                    - Start of graph <br />
                    - hackerrank 1 <br />
                  </h6>
                </div>
            </div>
            <div className="flex-auto w-11/12 bg-teal-900 text-teal-50 border border-teal-300 
                            m-5 p-6 rounded-md overflow-hidden">
                <h2 className='text-xl font-bold'>PROGRESS</h2>
                <div>
                    <div className='float-left mr-3 mt-2 mb-2 p-6 
                                    rounded-md border border-slate-50 
                                    w-16 text-4xl font-bold bg-gray-800/90'>
                      1
                    </div>
                </div>
                <div>
                  <h5 className='text-md font-bold'>Course name : algorithm Design</h5>
                  <h6 className='text-md font-medium tracking-wide'>
                      Progress level 1 : Easy to solve, easy to implement algorithms
                      <br />
                      Next Progress : More sophisticated algorithms, nonetheless their implementation is easy.  
                  </h6>
                </div>
            </div>
        </div>
      }
    </div>
  )
}

export default Account