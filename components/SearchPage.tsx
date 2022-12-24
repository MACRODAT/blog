import PostCard from '../components/Postcard';
import {useEffect, useState} from 'react';
import { compileNavigationAlgo, getCategories } from '../services';

//  @ts-nocheck
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';
import SearchCard from './SearchCard';
import { setSearchFocus } from '../store/userSlice';

export default function SearchPage(){

    let [searchText, setSearchText] = useState("");
    let _searchtxt = useSelector((state : any)=> state.user.searchText);
    let [dots, setDots] = useState('');

    useEffect( () => {
        setSearchText(String(_searchtxt).trim())
        
    }, [_searchtxt]);

    let [rs, setRes] = useState(Array<String>(0));
    let _res = useSelector((state : any)=> state.user.searchResults);
    useEffect( () => {
        setRes(_res as Array<String>)
        // console.log(_res)
    }, [_res]);
    
    let dispatch = useDispatch();

    return (
    
        <div className="flex-1 h-full justify-center items-center 
                        grid overflow-x-hidden min-h-fit md:ml-10 drop-shadow-[0_35px_35px_rgba(26,220,89,0.1)]">
    
            <div className='self-center p-4 my-10
                            border border-violet-500/20 border-dashed rounded-3xl 
                            drop-shadow-3xl bg-s'
                onClick={(e) => e.stopPropagation()}
                            >

                <i className='fa-solid fa-close cursor-pointer' onClick={() => dispatch(setSearchFocus(false))} />
                <h2 className='my-auto text-xl text-center font-regular font2 font-bold text-[#120024]'>
                    <i className='fa-solid fa-search mr-3' />
                    {
                        searchText?.length > 0 
                        ?
                        <p>Search results for <em>{searchText}</em></p>
                        :
                        (
                        <>
                            <p>Waiting for you to type </p>
                            <i className='fa-solid fa-spinner animate-spin m-3' />
                        </>
                        )
                    }
                    
                    <br />
                    {
                        rs?.length > 0 ? 
                        <i className="my-2 fa-solid fa-arrow-down-long text-xl text-[#120024] motion-safe:animate-bounce"></i>
                        :
                        (
                            searchText?.length > 0 ? 
                        
                            <i className="my-2 fa-solid fa-ban text-xl text-[#120024] motion-safe:animate-bounce"></i>
                            :
                            ''
                        )
                        
                    }
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-2 my-auto mb-2">
                {
                    rs?.map(
                    (post : any) => 
                        <SearchCard 
                            name={post} 
                            key={post}
                            description={post} 
                            featureImage={post} 
                            link={post}
                            
                            />)
                }
                </div>
            </div>
        </div>
  )
}