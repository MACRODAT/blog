//  @ts-nocheck

import { Router, useRouter } from 'next/router'
import React from 'react'

const LinkCard = () => {
    const router_ = useRouter();
    let router = (path : string) => router_.push(path); 

    let buttoner = (title : string, link : string) =>  {
        let pth = (router_.pathname == link) ? ' outline outline-offset-2 outline-slate-500 ' : '';
        return (
            <button 
                    onClick={() => router(link)}
                    className={"\
                            min-w-fit w-40   \
                            m-2  \
                            p-2  \
                            relative border-box block pr-0 \
                            mr-0 ml-auto pl-auto \
                            right-0 \
                            transition-all \
                            hover:ease-out hover:duration-100 \
                            hover:bg-zinc-500 \
                            hover:outline hover:outline-2 hover:outline-offset-2 hover:outline-zinc-500 \
                            bg-s \
                            rounded-l-full" + pth
                            }
                            >
                {title}
            </button>
            )
        }
    let showAllSideNav = () => {
        // console.log(router.route)
        // console.log( ['/','/about','/login'].includes(router_.route))
        return ['/','/about','/login'].includes(router_.route)
    }
    // let showAllVar = showAll();

    return (
        <div className='relative w-full m-1 p-0 mr-0 rounded-md pr-0 mr-0
                
                bg-transparent-100
                backdrop-blur-lg drop-shadow-md'>
            {buttoner('Home', '/')}
            {
                showAllSideNav()
                ? 
                (
                    buttoner('Login in', '/login')
                ) 
                : 
                ''
            }
            {
                showAllSideNav() 
                ? 
                (
                    buttoner('About', '/about')
                ) 
                : 
                ''
            }
        </div>
    )
}

export default LinkCard 