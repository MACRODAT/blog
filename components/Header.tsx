//  @ts-nocheck

import React, { useEffect, useState } from 'react'
import { useThemeContext } from '../store/themeProvider'
import { useSelector, useDispatch, connect } from 'react-redux'
import { selectCurrentThemeState, setThemeState } from '../store/themeSlice'

import { auth } from '../mock/firebase';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { async } from '@firebase/util';
import { useAuthState } from 'react-firebase-hooks/auth';
import { setLogin, setUserFromGoogleAuth } from '../store/sessionSlice';
import { makePublicRouterInstance, Router, useRouter } from 'next/router';


const Header = ({scrolled} : 
					{scrolled : boolean, switchTheme : any,currentTheme : any}) => {

	let loggedIn_ = useSelector(state => state.auth.loggedIn);
	let [loggedInState, setLoggedInState] = useState(loggedIn_);
	const [user, setUser ] = useAuthState(auth);

	let dispatch = useDispatch();

	// THEMING
	let theme = useSelector(state => state.theming.current);

	const switchTheme = () => {
		if (theme == 'light'){
			dispatch(setThemeState('dark'))
		}else{
			dispatch(setThemeState('light'))
		}
	}

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

	// AUTH
	const googleAuth = new GoogleAuthProvider();
	const loginFunction = async() => {
		const result = await signInWithPopup(auth, googleAuth);
	};

	useEffect(( ) => {
		console.log(user);
		if (user){
			setLoggedInState(true);
			dispatch(setLogin(true));
			dispatch(setUserFromGoogleAuth(user));
		}
	}, [user]);

	useEffect(() => {
		setLoggedInState(loggedIn_)
	}, [loggedIn_]);

	let router = useRouter();


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
							hover:ease-out hover:bg-indigo-900/50 hover:border-dashed hover:border-orange-900 hover:text-slate-50 \
							' 
							:  
							('flex-initial text-end cursor-pointer font-thin p-2 \
							border-indigo-500  border-b \
							rounded-l-full \
							transition ease-out duration-100 \
							hover:ease-in  hover:border-indigo-500 \
							'
							.concat(loggedInState ? 'bg-sky-800' : '')
							.concat(theme == 'light' ? 'hover:text-slate-900 hover:bg-indigo-200 bg-indigo-50' : 'hover-text-slate-50 bg-indigo-700 hover:bg-indigo-900')
							)}>
						{
							loggedInState ? 
							(
								<div onClick={() => {router.push('/account')}}>
									<i className='fa fa-md fa-person-shelter mr-2' />
									ACCOUNT
								</div>
							):
							(
								<div onClick={loginFunction}><i className='fa fa-sm fa-user' /> LOGIN</div>
							)
						}
				</h3>
        </div>
    )
}

export default (Header);