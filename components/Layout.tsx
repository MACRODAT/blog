//  @ts-nocheck


import Head from 'next/head'
import React, { useEffect, useState } from 'react'
import LinkCard from './Card'
import Header from './Header'
import SideNav from './sidenav'
import { useSelector, useDispatch } from 'react-redux'
import { fetchNavIfNoNav } from '../store/userSlice'
import { useRouter } from 'next/router'

const Layout = ({ children } : {children : any}) => {

  let [scrolled, setScrolled] = useState(false)
  
  const router_ = useRouter();

  let dispatch = useDispatch();
  dispatch(fetchNavIfNoNav());

  let styles = {
    backgroundColor : 'var(--color-bg-p)',
    color: 'var(--color-fg-p)'
  }

  let t = useSelector(state => state.theming.theme);
  // let theme = useSelector(state => state.theming.current);
  useEffect(() => {
    Object.entries(t).forEach((ind) => {
      document.documentElement.style.setProperty(ind[0], ind[1])
    });
   

  }, [t])

  let showNav = () => {
    // console.log(router.route)
    // console.log( ['/','/about','/login'].includes(router_.route))
    return ! ['/','/about','/login'].includes(router_.route)
  }

  return (
    <div className="w-full h-full m-0 p-0 overflow-hidden" style={styles}>
      <Head>
        <title>NESD ALGORITHMS</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css" />
      </Head>     
      <div id='content' 
            onScroll={
              (e) => {
                  var scrollpos = (document.getElementById('content')?.scrollTop) || 0
                  if (scrollpos > 10 && !scrolled){
                      setScrolled(true)
                  }else if (scrollpos < 90 && scrolled){
                      setScrolled(false)
                  }
              }
            }
            className="flex flex-col space-y-0.5 h-screen overflow-y-scroll pr-0 mr-0">
            <div className="sticky top-0 mr-0 pr-0 z-50 w-full h-10">
                <Header scrolled={scrolled}  />
            </div>
            <div className="flex md:flex-row flex-col space-x-1 space-y-0.5 h-min min-h-max">
              
              <div className="flex grow order-last md:order-first 
                              md:min-width-[70%] md:w-9/12 w-full 
                              h-full mb-auto">
                  {
                    children
                  }
              </div>
              <div id='aside' className="
                            md:sticky order-first md:order-last 
                            md:w-80 xs:w-full sm:w-full md:block 
                            top-10 ml-2 mb-10 relative 
                            md:h-screen h-min">
                  <div className="w-full md:h-screen max-h-screen md:w-80 overflow-hidden p-2 pr-0">
                    <LinkCard  />
                    { 
                      showNav() ? 
                        <SideNav /> : ""
                    }
                  </div>
              </div>

            </div>
        </div>
      </div>
  )
}

export default Layout