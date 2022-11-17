import React from 'react'
import ReactMarkdown from 'react-markdown';
import { useSelector } from 'react-redux';
import remarkGfm from 'remark-gfm';
import { getIndexKickstart, getIndexPostAlgo } from '../services';

export default function IndexGoogleKickstart({post}){

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
            <h1 className='text-2xl md:text-4xl text-center'>{post.name}</h1>  
          <h2 className='text-xl md:text-2xl italic text-center'>{post.excerpt}</h2>  
          <hr className='my-4' />
          {
            showImage ?
            <img className='colorize w-[20%] md:w-[50%] float-left mr-10 mb-5' src={post.featureImage.url} alt='' />
            :
            ''
          }
          

          <p id="contentpost" className='my-4 md:text-lg
                          '>
            <ReactMarkdown children={post.content} remarkPlugins={[remarkGfm]} />
            {/* {post.content} */}
          </p>
        </div>
    </>
  )
}


export async function getStaticProps(){
  let post : any = (await getIndexKickstart() as any) || "";
  // console.log(post)
  return {
    props : { post : post}
  };
}
