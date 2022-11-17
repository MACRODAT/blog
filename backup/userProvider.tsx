import {
    createContext, useContext, useEffect, useState
} from 'react';
import { compileNavigationAlgo } from '../services';

import { user, useStickyState } from './states';

export const Context = createContext();


export function UserProvider({children}){
    const [user_, setUser] = useStickyState(user, 'user');

    // useEffect(() => {
    //   return () => {
    //     document.documentElement.style.setProperty('--color-bg-p', '#000');
    //   }
    // }, [theme])

    console.log(user_)
    useEffect(() => {
        if (user_.navigation == [] || user_.navigation == undefined)
        {
            let data = ( compileNavigationAlgo() as any)
            data.then((dict) => {
                if (dict){
                    let lst = []
                    lst = dict.get(user.category) 
                    setUser({...user_, navigation : lst})
                }
            })
        }
    }, [user_])
   
    
    return (
        <Context.Provider value={[user_, setUser]}>{children}</Context.Provider>
    )
}

export function useUserContext(){
    return useContext(Context);
}