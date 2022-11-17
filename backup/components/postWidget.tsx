import React, { useEffect, useState } from 'react'
import moment from 'moment';
import Link from 'next/link';

import { getRecentPosts, getSimilarPosts } from '../services';

const postWidget = ({ categories, slug } : {categories : any, slug : any}) => {
  const [related, setRelatedPosts] = useState([]);
  useEffect(() => {
    if (slug){
      getSimilarPosts(categories, slug).then((res) => setRelatedPosts(res), (_err) => {
        console.log(_err)
      })
    } else {
      getRecentPosts().then((res) => setRelatedPosts(res), (_err) => {
        console.log(_err)
      })
    }
  }, [])

  return (
    <div className='bg-white shadow-lg text-black rounded-lg p-8 mb-8'>
      
      <h3 className='text-xl mb-8  font-semibold border-b pb-3'>
        {slug ? 'Related Posts :' : 'Recent Posts'}
        
      </h3>

      {
          related?.posts?.map((post) => (
            <div key={post.title} className='flex items-center w-full mb-4'>
              <div className='w-16 flex-none'>
                <img 
                  alt={post.title}
                  height="60px"
                  width="60px"
                  className='align-middle rounded-full'
                  src={post.featureImage.url} />
              </div>
              <div className='flex-grow ml-4'>
                <p className='text-gray-500 font-xs'>
                  {moment(post.createdAt).format('MMM DD, YYYY')}
                </p>
                <Link key={post.title} href={`/post/${post.slug}`} className='text-md'>
                  {post.title}
                </Link>

              </div>
            </div>
          ))
      }

    </div>
  )
}

export default postWidget