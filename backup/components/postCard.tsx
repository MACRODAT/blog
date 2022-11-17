import React from 'react'
import moment from 'moment'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { faCalendar } from '@fortawesome/free-solid-svg-icons'

const postCard = ({ post } : {post : any}) => {

  return (
    <div className='bg-white shadow-lg rounded-lg p-0 lg:p-8 pb-12 mb-8'>
      <div className='relative overflow-hidden shadow-md pb-80 mb-6'>
        <img src={post.featureImage.url} alt={post.title}
            className='object-top absolute h-80 w-full object-cover shadow-lg rounded-t-lg lg:rounded-lg'
            />
      </div>
      <h1 className='text-slate-400 transition duration-200 text-center mb-8 cursor-pointer
        hover:text-slate-800 text-3xl font-semibold

      '>
        <Link href={`/post/${post.slug}`}>
          {post.title}
        </Link>

      </h1>
      <div className='bloc lg:flex text-center items-center justify-center mb-8 w-full '>
        <div className="flex items-center justify-center mb-4 lg:mb-0 w-full lg:w-full mr-8">
          <img 
            alt={post.authors.name}
            height="30px"
            width="30px"
            className='align-middle rounded-full'
            src={post.authors[0].photo?.url} />
          <p className='inline align-middle text-gray-700 ml-2 text-lg'>
            {post.authors[0].name}
          </p>
        </div>
        <div className='font-medium text-gray-500 items-center w-full'>
          <FontAwesomeIcon className='mx-2' icon={faCalendar} />
          <span>
            {moment(post.createdAt).format('MMM DD, YYYY')}  
          </span>          
        </div>
        
      </div>

      <p className='text-gray-900 text-center text-lg font-normal px-4 lg:px-20 mb-8'>{post.excerpt}</p>
      <div className='text-center'>
          <Link href={`/post/${post.slug}`}>
            <span className='transition duration-500 rounded-full transform hover:-translate-y-1 inline-block bg-blue-600 text-lg font-medium ronded-full text-white px-8 py-3 cursor-pointer'>
              Continue reading
            </span>
          </Link>
        </div>
    </div>
  )
}

export default postCard