import React from 'react'

import Header from './header';

const Layout = ({ children } : {children : any}) => {
  return (
    <>
        <Header />
        {children}
    </>
  )
}

export default Layout