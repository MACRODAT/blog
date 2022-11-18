//  @ts-nocheck

import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { compileNavigationAlgo, getCategories, getPostDetails } from '../../services';

import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm';
import CustomLink from '../../components/custom/CustomLink';

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
// import { getPostDetails, getPosts } from '../../services'

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

  let theme = useSelector(state => state.theming.current);
  let showImage = true;
  if (post.featureImage == undefined || post.featureImage.url == undefined){
    showImage = false;
  }

  // useEffect(() => {
  //   let links = document.getElementById("contentpost")?.getElementsByTagName("a");
  //   links.
  // })



  const CodeBlock = {
    
    code({ node, inline, className, children, ...props }) {
      const match = /language-(\w+)/.exec(className || '');
      const numLines = children[0].split('\n').length
      // console.log(numLines)
      return !inline && match ? (
        <SyntaxHighlighter
          style={theme == 'dark' ? twilight : atomOneLight}
          language={match[1]}
          wrapLines={true}
          PreTag="div" 
          // lineProps={(line: number) => highlightLine(line, [1,2,3], props.highlightColor)}
          showLineNumbers={numLines > 3}
          customStyle={{overflow: 'hidden', width: '100%', margin: '3px', display: 'block', float: 'left'}}
          {...props}
          
        >
          {String(children).replace(/\n$/, '')}
        </SyntaxHighlighter>
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
  };

  const renderers = {
    h1: Collapsible
  };

  return (
    <div className={theme == 'light' ? 
                  'bg-slate-100 my-20 pb-40 px-4 py-4 ml-2 w-full'
                  :
                  'bg-zinc-900/30 my-20 pb-40 px-4 py-4 ml-2 min-width-[80%] w-full'
                }
                  >

          <h1 className='text-2xl md:text-4xl text-center'>{post.name}</h1>  
          <h2 className='text-xl md:text-2xl italic text-center'>{post.excerpt}</h2>  
          <hr className='my-4' />
          {
            showImage ?
            <img className='colorize w-[20%] md:w-[30%] float-left mr-10 mb-5' src={post.featureImage.url} alt='' />
            :
            ''
          }
          <div id="contentpost" className='my-4 md:text-lg
                          '>
            <ReactMarkdown children={post.content} 
                remarkPlugins={[[remarkToc, {ordered: true}], remarkGfm, remarkHint, remarkMath ]} 
                rehypePlugins={[rehypeRaw, [rehypeKatex, {strict : false}]]}
                components={
                  CodeBlock
                } />
          </div>
    </div>
  )
}

export default PostDetails

export async function getStaticProps({params}){
  // console.log(params)
  const data = (await getPostDetails(params.slug)) || "";
  // console.log(data)

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
  let pusher = (_post) => {
    if (posts2.get(_post) != undefined && posts2.get(_post) != ''){
      Array.from(posts2.get(_post)).forEach(post => {
        allposts.push(post);
        pusher(post);
      })
    }
  } 
  Array.from(categories).forEach(cat => {
    pusher(cat);
  });
  // return {
  //   paths : [],
  //   fallback: false,
  // }

  return {
    paths : allposts.map((post : any) =>  ({params : { slug : post }})),
    fallback : false,
  }
  
}