import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'

import { PostCard, Categories, PostWidget } from '../components';
import { getPosts } from '../services';

export default function Home({ posts } : {posts : any}){

  return (
    <div className="container  mx-auto px-10 mb-8">
      <Head>
        <title>NESD ALGORITHMS</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>     
      <div className='grid grid-cols-1 lg:grid-cols-12 gap-12'>
        <div className='lg:col-span-8 col-span-1'>
          
          {
            posts ?
            posts.map((post : any) => (
              <PostCard post={post.node} key={post.node.title}/> 
            )) :
            <h3>Loading data...</h3>
          }
        </div>
        <div className='lg:col-span-4 col-span-1'>
          <div className='lg:sticky relative top-8'>
            {/* <PostWidget categories={[]} slug={""} /> */}
            <PostWidget />
            <Categories />
          </div>
        </div>
      </div>

    </div>
  )
}

export async function getStaticProps(){
  // let posts : any = (await getPosts() as any) || mockPosts;
  const posts : any = (await getPosts() )  as any || [];

  return {
    props : { posts : posts }
  };
}
