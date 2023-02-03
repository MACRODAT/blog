//  @ts-nocheck
import React from 'react'
import { useSelector } from 'react-redux';
import { getIndexPostAlgo, getIndexProjects } from '../services';

export default function IndexProjects({post}){

  let theme = useSelector(state => state.theming.current);
  let showImage = true;
  if (post.featureImage == undefined || post.featureImage.url == undefined){
    showImage = false;
  }

  return (
    <>
        
        <div className={theme == 'light' ? 
                  'bg-slate-100 my-20 pb-40 px-4 py-4'
                  :
                  'bg-zinc-900/30 my-20 pb-40 px-4 py-4'
                }
                  >
          {
            showImage ?
            <img className='w-[20%] md:w-[50%] float-left mx-4' src={post.featureImage.url} alt='' />
            :
            ''
          }
          <h1 className='text-2xl md:text-4xl text-center'>{post.name}</h1>  
          <h2 className='text-xl md:text-2xl italic text-center'>{post.excerpt}</h2>  

          <p className='my-4 md:text-lg'>
            {post.content}
          </p>
        </div>
    </>
  )
}


export async function getStaticProps(){
  let post : any = (await getIndexProjects() as any) || "";
  return {
    props : { post : post}
  };
}
