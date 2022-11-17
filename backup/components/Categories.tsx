import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { getCategories } from '../services';

const Categories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories().then((newCategories : any) => setCategories(newCategories)).catch(err => console.log(err))
  }, [])

  return (
    <div className="bg-white shadow-lg rounded-lg p-8 mb-8 pb-12 text-black">
      
      <h3 className='text-xl mb-8 font-semibold border-b pb-4'>
        Categories
      </h3>
      {
        categories?.categories?.map((category : any) => (
          <Link key={category.url} href={`/category/${category.url}`}>
            <span className='cursor-pointer block pb-3 mb-3'>
              {category.name}
            </span>
          </Link>
        ))
      }
    </div>
  )
}

export default Categories