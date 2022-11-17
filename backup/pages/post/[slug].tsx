//  @ts-nocheck


import React from 'react'
import { getPostDetails, getPosts } from '../../services'
import { PostDetail, Categories, PostWidget, Author, Comments, CommentsForm} 
        from '../../components'


const PostDetails = ({ post} : {post : any}) => {

  return (
    <div className=' mx-auto px-1 bg-white w-screen h-screen overflow-scroll overflow-x-hidden lg:sticky text-gray-400'>
        <div className='grid grid-cols-1 lg:grid-cols-12 gap-3'>
          <div className='col-span-1 lg:col-span-8'>
            <PostDetail post={post}/>
            <Author author={post.author}/>
            <CommentsForm slug={post.slug}/>
            <Comments slug={post.slug}/>
          </div>
          <div className='col-span-1 lg:col-span-4'>
            <div className="relative lg:sticky top-8">
              <PostWidget slug={post.slug} categories={post.categories} />
              <Categories />
            </div>
          </div>
        </div>
    </div>
  )
}

export default PostDetails

export async function getStaticProps({params}){
  const data = (await getPostDetails(params.slug)) || "";
  console.log(data)

  return {
    props : { post : data }
  }
}

export async function getStaticPaths(){
  const posts = await getPosts() || [];

  return {
    paths : posts.map(({node : { slug }}) =>  ({params : { slug }})),
    fallback : false,
  }
}