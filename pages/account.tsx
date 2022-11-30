//  @ts-nocheck

import { useRouter } from 'next/router'
import React, {useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { isDocumentLiked, likeDocument, logout } from '../mock/firebase';
import { setFontSize as _setFS } from '../store/themeSlice';

const Account = () => {
  let [likedDocs, setLikedDocs] = useState([]);
  let rt = useRouter()

  let loggedIn_ = useSelector(state => state.auth.loggedIn);
  let acc = useSelector(state => state.auth.logData);

  let dispatch = useDispatch();
  let setFontSize = (sz : int) => dispatch( _setFS(sz));

  let UpdateForm = () => isDocumentLiked().then((res,rej) => {
    if (res.exists){
      let likedDocs = res.data().documentNames;
      if (likedDocs !== undefined ){
        setLikedDocs(likedDocs);
      }
    }
    else{
      setDocumentLiked([]);
    }
  }).catch((e) => console.log(e));

  setTimeout(() => {
    UpdateForm();
  }, 100);

  // console.log(acc);
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










                <div>
                  <h5 className='text-md font-bold'>Articles font size </h5>
                  <select  className='bg-slate-800' 
                            onChange={(e) => {
                              
                              setFontSize(e.target.value)
                            }}
                            style={{width: "100%"}}>
                    <option className='text-sm' value={0.85}>Small</option>
                    <option className='text-md' value={1}>Normal</option>
                    <option className='text-lg' value={1.15}>Large</option>
                  </select>
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
            <div className="flex-auto w-11/12 bg-rose-900 text-rose-50 border border-rose-300 
                            m-5 p-6 rounded-md overflow-hidden">
                <h2 className='text-xl font-bold'>Liked Articles</h2>
                <div>
                    <div className='float-left mr-3 mt-2 mb-2 p-6 
                                    rounded-md border border-slate-50 
                                    w-16 text-4xl font-bold bg-rose-800/90'>
                      {
                        likedDocs.length
                      }
                    </div>
                </div>
                <div className='ml-4'>
                  <ol className='list-disc list-inside'>
                    {
                      likedDocs.map(doc_ => (
                        <li className='text-md font-medium tracking-wide cursor-pointer hover:underline'
                            onClick={() => rt.push('/post/' + doc_)}
                          >
                           {doc_}
                        </li>
                      ))
                    }
                  </ol>
                
                </div>
                {/* <button 
                        onClick={() => likeDocument('hello')}
                        className='rounded-full w-64 bg-rose-700 hover:bg-rose-500 border border-sky-200 p-1'>
                          <h2 className='text-lg'>Like</h2>
                </button> */}
            </div>
        </div>
      }
    </div>
  )
}

export default Account