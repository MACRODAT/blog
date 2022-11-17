//  @ts-nocheck


import { faCalendar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import moment from 'moment'
import React from 'react'
import { RichText } from '@graphcms/rich-text-react-renderer'

const PostDetail = ({post}) => {

  const getContentFragment = (index : any, text : any, obj : any, type : any) => {
    let modifiedText = text;

    if (obj) {
      if (obj.bold) {
        modifiedText = (<b key={index}>{text}</b>);
      }

      if (obj.italic) {
        modifiedText = (<em key={index}>{text}</em>);
      }

      if (obj.underline) {
        modifiedText = (<u key={index}>{text}</u>);
      }
    }

    switch (type) {
      case 'heading-three':
        return <h3 key={index} className="text-xl font-semibold mb-4">{modifiedText.map((item, i) => <React.Fragment key={i}>{item}</React.Fragment>)}</h3>;
      case 'paragraph':
        return <p key={index} className="mb-8">{modifiedText.map((item, i) => <React.Fragment key={i}>{item}</React.Fragment>)}</p>;
      case 'heading-four':
        return <h4 key={index} className="text-md font-semibold mb-4">{modifiedText.map((item, i) => <React.Fragment key={i}>{item}</React.Fragment>)}</h4>;
      case 'image':
        return (
          <img
            key={index}
            alt={obj.title}
            height={obj.height}
            width={obj.width}
            src={obj.src}
          />
        );
      default:
        return modifiedText;
    }
  };



  return (
    <div className="container bg-white text-black shadow-lg rounded-lg lg:p-8 lg:pb-12 mx-1 my-2 p-1 bg-fixed  " style={{backgroundImage: 'url(./bg.jpg)'}}>
      <div className='relative overflow-hidden shadow-md mb-6'>
        <img 
          src={post.featureImage.url}
          alt={post.title}
          className="object-top h-full w-full rounded-t-lg"
        />
      </div>
      <div className="px-4 lg:px-0">
        <div className="flex items-center mb-8 w-full">
          <div className="flex items-center mb-4 lg:mb-0 w-full lg:w-full mr-8">
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
          <div className='font-medium text-gray-500 '>
            <FontAwesomeIcon className='mx-2' icon={faCalendar} />
            <span>
              {moment(post.createdAt).format('MMM DD, YYYY')}  
            </span>          
          </div>
        </div>
      </div>
      <h1 className='mb-8 text-3xl font-semibold'>{post.title}</h1>
        {/* {
          post.content.raw.children.map(
              (typeobj : any, index : any) => {
                const children = typeobj.children.map((item : any, itemIndex : any) => getContentFragment(itemIndex, item.text, item))

                return getContentFragment(index, children, typeobj, typeobj.type)
              }
          )
        } */}
        <RichText content={post.content.raw}></RichText>
        {/* <div dangerouslySetInnerHTML={{__html: post.content.html}} /> */}
        {}
    </div>
  )
}

export default PostDetail