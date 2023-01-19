//  @ts-nocheck

import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { compileNavigationAlgo, getCategories, getPostDetails } from '../../services';

import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm';

import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter'
// import {dark} from 'react-syntax-highlighter/dist/esm/styles/prism'
import rehypeRaw from 'rehype-raw';
import atomOneLight from 'react-syntax-highlighter/dist/cjs/styles/prism/coldark-cold';
import twilight from 'react-syntax-highlighter/dist/cjs/styles/prism/twilight';
import remarkToc from 'remark-toc';
import remarkHint from 'remark-hint';
import Collapsible from 'react-collapsible';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import Link from 'next/link';
import { isDocumentLiked, likeDocument } from '../../mock/firebase';
import { Disclosure } from '@headlessui/react';
import { useRouter } from 'next/router';
// import { getPostDetails, getPosts } from '../../services'

import Carousel from 'react-gallery-carousel';
import 'react-gallery-carousel/dist/index.css';

import { writeFile, writeFileSync } from 'fs';

const customStylingCode : React.CSSProperties = {
  overflow: 'hidden !important'
}

const highlightLine = (lineNumber: number, markLines: number[], color: string = "#FFDB81"):
    React.HTMLProps<HTMLElement> => {

    // only works when showLineNumbers and wrapLines are both enabled
    const style: React.CSSProperties = { display: "block", width: "fit-content" };
    if (markLines.includes(lineNumber)) {
        style.backgroundColor = color;
    }
    return { style };
}



const PostDetails = ({ post} : {post : any}) => {
  // console.log(post)
  const [documentLiked, setDocumentLiked] = useState(false);

  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  let theme = useSelector(state => state.theming.current);
  let loggedIn = useSelector(state => state.auth.loggedIn);

  let rt = useRouter();
  let showImage = true;
  if (post.featureImage == undefined || post.featureImage.url == undefined){
    showImage = false;
  }

  let isDocumentLiked_ = false;

  let likeDocumentAndUpdateForm = () => {
    likeDocument(post.name, documentLiked).then((res, rej) => {
      UpdateForm();
    })
  }

  let UpdateForm = () => isDocumentLiked().then((res,rej) => {
    if (res.exists){
      let likedDocs = res.data().documentNames;
      if (likedDocs !== undefined ){
        setDocumentLiked(likedDocs.includes(post.name));
      }
    }
    else{
      if (documentLiked){
        setDocumentLiked(false);
      }
    }
  }).catch((e) => console.log(e));

  setTimeout(() => {
    UpdateForm();
  }, 100);


  let findIcon = (difficulty : String) => {
    let className_ = (theme == 'light');
    if (difficulty == undefined){
      return <i className="fa-solid fa-face-smirking"></i>
    }

    difficulty.trim();
    switch (difficulty.toUpperCase()){
      case 'EASY':
        return <i className={className_ ? "fa-solid fa-face-smile text-lime-700" : 
                                          "fa-solid fa-face-smile text-lime-400"}
                ></i>
      case 'MEDIUM':
        return <i className={className_ ? "fa-solid fa-face-surprise text-orange-500" : 
                                          "fa-solid fa-face-surprise text-orange-400/90"}
                ></i>
      case 'HARD':
        return <i className={className_ ? "fa-solid fa-face-meh text-red-700/80" : 
                                          "fa-solid fa-face-meh text-red-400/70"}
                ></i>
      case 'EXPERT':
        return <i className={className_ ? "fa-solid fa-skull text-rose-900" : 
                                          "fa-solid fa-skull text-rose-400"}
                ></i>
    }
    return <i className="fa-solid fa-face-smirking"></i>
  } 


  const CodeBlock = {
    
    code({ node, inline, className, children, ...props }) {
      // carousel ?
      let carousel = children[0].startsWith("carousel");
      if (carousel){
        let images : Array<Object>= [];
        let split_ = children[0].split('\n');
        let len_ = (split_.length);
        let i = 0;
        for (i = 0; i < len_; i++){
          const element = split_[i];
          const attbr = undefined;
          if (element){
            attbr = element.split('|');
          }
          console.log(attbr)
          if (attbr && attbr.length > 1){
            images.push({
              src : attbr[0].split("=")[1],
              alt : attbr[1].split("=")[1],
              // caption : attbr[1].split("=")[1],
              size: '120'
            })
          }
        }
        let makeTheme = () => {
          if (theme == 'light'){
            return {
                backgroundColor: 'rgba(120,120,120,0.1)',
                maxHeight: '700px',
                maxWidth: '100%',
                margin: 'auto'
              }
          }
          return {
            backgroundColor: 'transparent',
            maxHeight: '700px',
            maxWidth: '100%',
            margin: 'auto',
            filter: 'invert(1)'
          }
        }
        return(
          
          
          <Carousel images={images} 
                    isLoop={false} 
                    swipeThreshold={0.1}
                    hasMediaButton={false}
                    hasSizeButton={false}
                    hasDotButtons={true}
                    hasCaptions='bottom'
                    hasThumbnails={false}
                    objectFit={'contain'}
                    className='Carousel_'
                    rightIcon={
                      (theme == 'light') ?
                      <i className='fa-regular fa-circle-right' />
                      :
                      <i className='fa-regular fa-circle-right text-red-800' />
                    }
                    leftIcon={
                      (theme == 'light') ?
                      <i className='fa-regular fa-circle-left' />
                      :
                      <i className='fa-regular fa-circle-left text-red-800' />
                    }
                    style={makeTheme()}
                    
                    ></Carousel>
        )
      }

      const match = /language-(\w+)/.exec(className || '');
      const numLines = children[0].split('\n').length
      const [showCode, setShowCode] = useState(numLines < 10);
      // console.log(numLines)
      return !inline && match ? (
        <>
          {
            (numLines > 9) ?
            <div 
              className={
                theme == 'light' ?
                ( showCode ?
                  "border-r-2 border-l-2 border-pink-500 bg-pink-500/10 p-2 rounded-t-lg cursor-pointer transition duration-150 mb-0 md:ml-5"
                  :
                  "border-r-2 border-l-2 border-sky-500 p-2 rounded-lg cursor-pointer transition duration-150 w-64"
                )
                :
                ( showCode ?
                  "border-r-2 border-l-2 border-pink-500 bg-pink-500/10 p-2 rounded-t-lg cursor-pointer transition duration-150 mb-0"
                  :
                  "border-r-2 border-l-2 border-sky-500 p-2 rounded-lg cursor-pointer transition duration-150"
                )
              }
              style={{overflow: 'auto', overflowY: 'hidden', width: '95%', maxWidth: '100%', margin: '3px', 
                      marginTop: '3px', marginBottom: theme == 'light' ? '0' : '4px', display: 'block', 
                      fontSize: Math.min(22, Math.floor(12 + (12 * screenWidth / 1200)))}}
              onClick={() => setShowCode(!showCode)}
            >
              <i className="fa-solid fa-code mx-3"></i> 
              {
                showCode ?
                  "Hide code"
                  :
                  "Show code"
              }
            </div>
            :
            ''
          }
          {
            showCode ?
              <SyntaxHighlighter
                style={theme == 'dark' ? twilight : atomOneLight}
                language={match[1]}
                wrapLines={true} wrapLongLines={false}
                PreTag="div" 
                
                // lineProps={(line: number) => highlightLine(line, [1,2,3], props.highlightColor)}
                showLineNumbers={numLines > 3 && screenWidth > 700}
                customStyle={{overflow: 'auto', overflowY: 'hidden', width: '95%', maxWidth: '100%', 
                              margin: '3px', marginTop: '0', marginBottom: '15px', display: 'block', 
                              fontSize: Math.max(13,Math.min(19, Math.floor(19 * screenWidth / 1200)))}}
                className='new-box'
                {...props}
                
              >
                {String(children).replace(/\n$/, '')}
              </SyntaxHighlighter>
              :
              <></>
          }
        </>
      ) : (
        <code className={className} {...props}>
          {children}
        </code>
      );
    },
    a({as, href, ...otherprops}){
      return (
        <Link as={as} href={href}>
          <a className={theme == 'light' ? 
                  'text-neutral-900 font-bold hover:underline decoration-dotted'
                  :
                  'text-amber-400 font-bold hover:underline decoration-dotted'
                }
          
                {...otherprops} />
        </Link>
      )
    },
    img({src, alt, ...otherprops}){
      let s : String = alt;
      let transparentImage = (s.endsWith("png") && s.startsWith("s"));
      if (transparentImage){
        // render a carousel
        const images = [9, 8, 7, 6, 5].map((number) => ({
          src: `https://placedog.net/${number}00/${number}00?id=${number}`
        }));
      }
      return <img src={src} alt={alt} 

                    className={
                      theme == 'light' ?
                      "rounded-lg drop-shadow-lg \
                                float-right my-4 ml-1 mr-3 hover:drop-shadow-2xl \
                                max-w-[50%]" 
                      :
                      (transparentImage ?
                      "invert float-right my-4 ml-5 mr-1 hover:drop-shadow-3xl-h\
                                max-w-[60%]" 
                      :
                      "rounded-lg drop-shadow-3xl \
                                float-right my-4 ml-5 mr-1 hover:drop-shadow-3xl-h transition duration-150 ease-in \
                                max-w-[50%]" 
                      )
                    }
                    {...otherprops} />
    },
    h3({children, ...otherprops}){
      return <>
                <hr className='w-full opacity-0' />
                <h3 {...otherprops}>{children}</h3>
              </>
    },
    h1({children, ...otherprops}){
      return <>
                <hr className='w-full opacity-0' />
                <h1 {...otherprops}>{children}</h1>
              </>
    },
    h2({children, ...otherprops}){
      return <>
                <hr className='w-full opacity-0' />
                <h2 {...otherprops}>{children}</h2>
              </>
    },
    h4({children, ...otherprops}){
      return <>
                <hr className='w-full opacity-0' />
                <h4 {...otherprops}>{children}</h4>
              </>
    },
    h5({children, ...otherprops}){
      return <>
                <hr className='w-full opacity-0' />
                <h5 {...otherprops}>{children}</h5>
              </>
    },
    h6({children, ...otherprops}){
      return <>
                <hr className='w-full opacity-0' />
                <h6 {...otherprops}>{children}</h6>
              </>
    }
  };

  const renderers = {
    h1: Collapsible
  };

  addEventListener("resize", (event) => {
    setScreenWidth(window.innerWidth)
  });


  return (
    <div className={theme == 'light' ? 
                  'bg-slate-100 my-20 pb-40 px-4 py-4 ml-2 w-full'
                  :
                  'bg-zinc-900/30 my-20 pb-40 px-4 py-4 ml-2 min-width-[80%] w-full'
                }
                  >

          <h1 className='text-2xl md:text-4xl text-center'>{post.name}</h1>  
          <h2 className='text-xl md:text-2xl italic text-center'> {post.excerpt}</h2>  
          {
              post.postdifficulty != 'NONE' ?
              <button 
                    className={theme == 'light' ? 
                    'rounded-lg bg-slate-200/60 border border-slate-300 p-2 float-right h-20'
                    :
                    'rounded-lg bg-slate-700/60 border border-slate-500 p-2 float-right text-slate-100 h-20'
                    }>
                {findIcon(post.postdifficulty)}
                <h2 className='text-md md:text-xl '>
                  {post.postdifficulty}
                </h2>
            </button>
            :
            ''
          }
          {
              loggedIn && post.postdifficulty != 'NONE' ?
              <button 
                    onClick={() => likeDocumentAndUpdateForm(post.link)}
                    className={
                      documentLiked ? 
                      (
                          theme == 'light' ? 
                          'rounded-lg bg-lime-800/70 border border-lime-300 p-2 float-right \
                          mr-2 h-20 hover:bg-lime-800/100 text-lime-100  transition duration-500 ease-in'
                          :
                          'rounded-lg bg-lime-700/60 border border-lime-500 p-2 float-right \
                          text-lime-100 mr-2 h-20 hover:bg-lime-600/50 transition duration-500 ease-in '
                      )
                      :
                      (
                        theme == 'light' ? 
                        'rounded-lg bg-slate-200/60 border border-slate-300 p-2 float-right \
                        mr-2 h-20 hover:bg-slate-300/50 transition duration-500 ease-in'
                        :
                        'rounded-lg bg-slate-700/60 border border-slate-500 p-2 float-right \
                        text-slate-100 mr-2 h-20 hover:bg-slate-600/50 transition duration-500 ease-in'
                      )
                    }>
                      {
                        !documentLiked ?
                        (
                          theme == 'light' ?
                            <i className='fa-regular fa-thumbs-up'></i>
                            :
                            <i className="fa-solid fa-thumbs-up fadeOut"></i>
                        )
                        :
                        (
                          theme == 'light' ?
                            <i className='fa-regular fa-heart'></i>
                            :
                            <i className="fa-solid fa-heart fadeOut"></i>
                        )
                      }
                <h2 className='text-md md:text-xl '>
                  {
                    documentLiked ? "Happy!" : "Like Post"
                  }
                </h2>
              </button>
            :
            ''
          }
          

          <hr className='my-4' />
          {
            showImage ?
            <img className='colorize w-[20%] md:w-[30%] float-left mr-10 mb-5' src={post.featureImage.url} alt='' />
            :
            ''
          }
          <div id="contentpost" className='my-4
                          '>
            <ReactMarkdown children={post.content} 
                remarkPlugins={[[remarkToc, {ordered: true}], remarkGfm, remarkHint, remarkMath ]} 
                rehypePlugins={[rehypeRaw, [rehypeKatex, {strict : false}]]}
                components={
                  CodeBlock
                } />
            <h1 className='my-4'>{post.children.length > 0 ? "Read Also" : ""} </h1>
                  {
                    post.children.map(c => (
                          <Disclosure>
                            {({ open }) => (
                              <div className="border border-sky-200/10 rounded-md my-2">
                                <Disclosure.Button className="flex w-full justify-between rounded-lg bgA
                                                              px-4 py-2 text-left text-lg font-medium 
                                                              hover:text-sky-500/90 focus:outline-none focus-visible:ring 
                                                              focus-visible:ring-sky-500 focus-visible:ring-opacity-75
                                                              
                                                              ">

                                  <span>{c.name}</span>
                                  <i
                                    className={`${
                                      open ? 'fa-solid fa-arrow-down rotate-180 transform' : 'fa-solid fa-arrow-down '
                                    } h-5 w-5 text-sky-500`}
                                  />
                                </Disclosure.Button>
                                <Disclosure.Panel className="px-4 pt-4 pb-2 text-md text-gray-500 
                                                            flex flex-row w-full
                                                            place-content-between
                                                            ">
                                  <p className=''>
                                    {c.excerpt}
                                  </p>
                                  <button 
                                      className='p-2 m-1 text-center bg-sky-300/30 
                                                  rounded-full block min-w-[20%]
                                                  '
                                      onClick={() => rt.push('/post/' + c.name)}
                                      >
                                    Visit
                                  </button>
                                </Disclosure.Panel>
                              </div>
                            )}
                          </Disclosure>
                    ))
                  }
                  
                   
          </div>
          
    </div>
  )
}

export default PostDetails

export async function getStaticProps({params}){
  // console.log(params)
  const data = (await getPostDetails(params.slug)) || "";

  return {
    props : { post : data }
  }
}

export async function getStaticPaths(){

  const posts2 = await compileNavigationAlgo();
  let categories;
  categories = (await (getCategories())).categories.map(c => c.name) || [];
  // console.log(posts2)

  let allposts = []
  let sitemap = "<urlset xmlns='http://www.sitemaps.org/schemas/sitemap/0.9'>"
  let date = (new Date).toISOString()
  let pusher = (_post) => {
    if (posts2.get(_post) != undefined && posts2.get(_post) != ''){
      Array.from(posts2.get(_post)).forEach(post => {
        let urler = "https://algoblog.vercel.app/post/" + encodeURIComponent(post)
        sitemap += "\n\t<url>\n\t\t<loc>\n\t\t\t" 
                    + urler + "\n\t\t</loc>\n\t\t<lastmod>\n\t\t\t" 
                    + date + "\n\t\t</lastmod>\n\t</url>\n" 
        allposts.push(post);
        pusher(post);
      })
    }
  } 
  Array.from(categories).forEach(cat => {
    pusher(cat);
  });
  
  sitemap += "</urlset>"
  writeFileSync("public/sitemap.xml", sitemap, {
    encoding: 'utf-8',
    flag: 'w'
  });
  

  return {
    paths : allposts.map((post : any) =>  ({params : { slug : post }})),
    fallback : false,
  }
  
}