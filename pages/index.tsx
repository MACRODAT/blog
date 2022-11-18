import PostCard from '../components/Postcard';
import Header from '../components/Header';
import { compileNavigationAlgo, getCategories } from '../services';

import {
    faCloudArrowDown
} from '@fortawesome/free-solid-svg-icons'
//  @ts-nocheck
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Home({ posts } : {posts : any}){

  

  return (
    
    <main className="flex-1 h-full justify-center items-center 
                      grid overflow-x-hidden min-h-fit md:ml-10">
   
      <div className='self-center p-2 my-10
                      border border-violet-500/20 border-dashed rounded-3xl 
                      drop-shadow-xl bg-s'>
        <h2 className='my-auto text-xl text-center font-regular font2 font-bold text-[#120024]'>
            Select a topic below to start !
            <br />
            <i className="my-2 fa-solid fa-arrow-down-long text-xl text-[#120024] motion-safe:animate-bounce"></i>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-2 my-auto mb-2">
          {
            posts.map(
              (post : any) => 
                <PostCard 
                    name={post.name} 
                    key={post.name}
                    description={post.description} 
                    featureImage={post.featureImage} 
                    link={post.link}
                    
                    />)
          }
        </div>
      </div>
    </main>
  )
}

export async function getStaticProps(){
  let posts : any = (await getCategories().then(c => c).catch(e => console.log(e))).categories || [];
  // let posts = []


  return {
    // props : { posts : posts }
    props : { posts : posts}
  };
}
