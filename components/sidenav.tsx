//  @ts-nocheck

import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';


let selectedNav_ = "";

export default function SideNav(){
  // let [user, _] = useUserContext();
  let [menus, setMenus] = useState(new Map<String, boolean>());
  let [flag, setFLag] = useState(false);
  let nav_ = useSelector(state => state.user.navigation);

  // if (nav_ == undefined || nav_ == null || nav_ == []){
  //   let data = await compileNavigationAlgo();
  // }
  let [nav, setNav] = useState(nav_);

  useEffect(() => {
    setNav(nav_)
  }, [nav_])

  let category = useSelector(state => state.user.category);
  // let navigation = useSelector(state => state.user.navigation);
  let router = useRouter();
  
  let compiler = () => {
    // navigation = useSelector(state => state.user.navigation);
    category = useSelector(state => state.user.category);
    
    if (category == ''){
      return ''
    }
    if (nav === null || nav === undefined || nav == [] || nav == {}){
      return ''
    }else{
      try {
        let navs = Array.from(nav_.get(category));
        navs.reverse();

        let findAllNodes = (whichPost) => {
          let allposts = [];

          let pusher = (_post, posts2, allposts) => {
            if (posts2.get(_post) != undefined && posts2.get(_post) != ''){
              Array.from(posts2.get(_post)).forEach(post => {
                allposts.push(post);
                // pusher(post, posts2, allposts);
              })
            }
          } 

          pusher(whichPost, nav_, allposts);

          return allposts;
        }

        
        
        let builder = (el) =>
            { 
                  if (menus.get(el) == undefined){
                    menus.set(el , false); 
                  }
                  let children = findAllNodes(el);
                  // console.log(children)
                  return <li key={el} className={
                                    el == selectedNav_ ?  
                                    'w-full rounded-md ml-2 grid grid-cols-5 bg-slate-600/40'
                                    :
                                    'w-full rounded-md ml-2 grid grid-cols-5'
                                  }
                            onClick={(e) => {
                              menus = menus.set(el, !menus.get(el));
                              // menus.set(el, !menus.get(el));
                              // console.log(el)
                              setMenus(new Map(menus));
                              e.stopPropagation();
                            }}
                        >
                          <p 
                            className='col-span-4 cursor-pointer hover:bg-slate-400 rounded-md p-1 text-left mx-1'
                            onClick={(e) => {
                              // navigate to this link
                              router.push('/post/' + el)
                              selectedNav_ = el;
                              e.stopPropagation()
                            }}>
                            {el}
                          </p>

                          {
                          children?.length > 0 ?
                            !menus.get(el) ?
                            <i className='col-span-1 p-0 m-0 text-base cursor-pointer fa-solid fa-angle-down mx-2 
                                          iconaligncenter'
                            ></i>
                            :
                            <i className='col-span-1 p-0 m-0 text-base cursor-pointer fa-solid fa-angle-up mx-2 
                                          iconaligncenter'
                            ></i> : ''
                          }

                          {
                            menus.get(el) ?
                              <ul className='col-span-5 new-box'>
                              {
                                children.map((el2) => {
                                  return builder(el2)
                                })
                              }
                              </ul> 
                              :
                              ''
                          }
                    </li>
            }
        return navs.map((el) => builder(el))
      } catch (error) {
        // console.log(error)
        return ''
      }
    }
  }
 
  return (
    <div id="sidenav"
        className='bg-p border border-slate-200/30 fg-p text-sm md:text-lg
                p-1 m-1 rounded-l-md text-center
                right-0 mr-0
                w-full'
        >
            {
              (nav === null || nav === undefined) ? '...' : (
                <ul className='marker:text-sky-400 transition-all ease-in duration-150'>
                    <li key={'1'} id='focused' className='hover:bg-slate-400 bg-slate-200'>{category}</li>
                    {
                      compiler()
                    }
                </ul>
              )
            } 


            
    </div>
  )
}


// export async function getServerSideProps(context){
//   let data : any = (await compileNavigationAlgo() as any) || "";
//   console.log(data)
//   return {
//     props : { 
//       nav : data
//     }
//   };
// }





