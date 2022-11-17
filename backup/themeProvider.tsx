import {
    createContext, useContext, useState
} from 'react';

import { theming, useStickyState } from './states';

export const Context = createContext();


export function ThemeProvider({children}){
    const [theme, setTheme] = useStickyState(theming, 'theming');

    // useEffect(() => {
    //   return () => {
    //     document.documentElement.style.setProperty('--color-bg-p', '#000');
    //   }
    // }, [theme])
    
    return (
        <Context.Provider value={[theme, setTheme]}>{children}</Context.Provider>
    )
}

export function useThemeContext(){
    return useContext(Context);
}