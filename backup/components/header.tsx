import React from 'react'
import Link from 'next/link';

import { useEffect, useState } from 'react'
import { getCategories } from '../services';
import Router, { useRouter } from 'next/router';



const Header = () => {
    const router = useRouter();

    console.log(router.pathname)
    if (router.pathname.startsWith('/post/')){
        return (
            <></>
        )
    }

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        getCategories().then((newCategories : any) => setCategories(newCategories))
    }, [])
    return (
        <div className='container mx-auto px-10 mb-8'>
            <div className='border-b w-full inline-block border-gray-400 py-8'>
                <div className='md:float-left block'>
                    <Link href="/">
                        <span className='cursor-pointer font-bold text-4xl text-white'>
                            GraphsCMS
                        </span>
                    </Link>
                </div>
                <div className='hidden md:float-left md:contents'>
                    {
                        categories?.categories?.map((category) => (
                            <Link key={category.url} href={`/category/${category.url}`}>
                                <span className='md:float-right mt-2 align-middle text-white ml-4 font-semibold cursor-pointer'>
                                    {category.name}
                                </span>
                            </Link>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default Header