//  @ts-nocheck

import React, { useEffect, useState } from 'react'
import { useThemeContext } from '../store/themeProvider'
import { useSelector, useDispatch, connect } from 'react-redux'
import { selectCurrentThemeState, setThemeState } from '../store/themeSlice'


const Header = ({scrolled} : 
					{scrolled : boolean, switchTheme : any,currentTheme : any}) => {

	let ele = () => {
		
		if (scrolled) 
		{ 
			return " mr-7 mt-2 md:mt-1 md:mb-1 animateHeader \
				\
				\
				\
				\
				\
			" 
		}
		else{
			return " mr-7 mt-2 md:mt-1 md:mb-1 \
				uppercase text-xl md:text-3xl font-thin \
				transition ease-out duration-100 \
				hover:ease-in hover:scale-105 \
				motion-safe  \
				basis-7/12 \
				text-center \
				flex-grow \
			" 
		}
	}

	// const theme = useThemeContext();
	// console.log(theme)

	const dispatch = useDispatch()

	let theme = useSelector(state => state.theming.current);

	const switchTheme = () => {
		if (theme == 'light'){
			dispatch(setThemeState('dark'))
		}else{
			dispatch(setThemeState('light'))
		}
		// console.log(theme)
		// setTheme(theme)
	}


    return (
        <div id='header'
			className={"mr-0 pr-0 flex justify-center items-center " + 
            	(scrolled ? 'backdrop-blur-sm drop-shadow-md brightness-50' : 'bg-transparent')}
          > 
				{
					theme == 'dark' ? 
					<i 	
							className='hidden md:block fa-solid fa-sun mx-1 my-0 cursor-pointer hover:animate-pulse'
							onClick={switchTheme}> 
					</i>
					:
					<i className='hidden md:block fa-solid fa-moon mx-1 my-0 text-md cursor-pointer hover:animate-pulse' onClick={switchTheme}> </i>

				}
				<h1 className={ele()}>
					NESD ALGORITHMS 
				</h1>
				
				<h3 className={ 
						scrolled ? 
							'flex-initial text-end  font-thin p-2 \
							\
							cursor-pointer \
							transition ease-out duration-100 \
							hover:ease-in hover:bg-slate-900/20 hover:border-dashed hover:border-indigo-500  \
							' 
							:  
							'flex-initial text-end  font-thin p-2 \
							border-indigo-500  border-b \
							rounded-l-full \
							transition ease-out duration-100 \
							hover:ease-in hover:bg-indigo-900 hover:border-indigo-500  \
							'}>
					My cursus
				</h3>
        </div>
    )
}

export default (Header);