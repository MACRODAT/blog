//  @ts-nocheck

import { useRouter } from 'next/router'
import React from 'react'

const About = () => {
  let rt = useRouter()

  let envTest = process.env.NEXT_PUBLIC_ENV_TEST;  

  return (
    <div className='
        
        self-center
        min-h-[300px]
        m-10 mt-5 p-2 mb-[100px] pb-10

        drop-shadow-xl bg-ss
        border rounded-lg border-indigo-800/50  
        '>
        <button onClick={() => rt.push('/')} className='text-xl font2 rounded-md p-3'>
            <i className='fa-solid fa-arrow-left mx-1'></i> Back home
        </button>

        <h2 className='text-center italic text-2xl text-[#F2F0F4] font2 font-bold uppercase border-b border-[#120024] border-dashed w-1/2 mx-auto'>
            About <em>me</em>
        </h2>
        <img src={'about.png'} className='float-left maskWhite m-1 mx-5 w-[100px] md:w-[400px]' alt='' />
        <p className='text-left mt-10 text-xl font2 
                      text-sm md:text-lg
                      font-semibold fg-p decoration-gray-400 
                      border-l border-[#120024] pl-3'>
            <i className='fa-regular fa-user mx-1'> </i>
            i have been a coding enthousiast since childhood. Developing programs has always been a fun
            experience, as far as i am concerned. Algorithms are not exactly the product of IT, having been
            a tool around for centuries. But the introduction of semiconductors brought <em> -and still does- </em> 
            our understanding to new levels.
            <br />
            <br />
            <i className='fa-solid fa-hammer mx-1'> </i>
            I do NOT currently have a career in coding, where i work as engineer. Point being, one of my
            favourite occupations is to fiddle around a coding challenge and figure out logical ways to
            implement solutions (and to do implement in some sort of a programming language).
            <br />
            <br />
            <i className="fa-solid fa-computer mx-1"></i>
            This being said, that's no excuse not to aspire to solid knowledge in computer science, 
            different programming languages <em> (remember VB <i className="fa-solid fa-face-laugh-squint"></i> ?)</em>.
            I do, as everybody else, have favourites : i like the trouble-free Python <i className="fa-brands fa-python"></i>  
            . It's litteraly speaking english :-)
            Javascript <i className="fa-brands fa-js-square"></i> (and the stricter TS) is also a tool for better years to come.
            <br />
            <br />
            Though i started <em>Pretty young, 10-if i remember-</em> as pretty much a learn-by-doing person, it was only a matter of time before i dove into books that deal with a great variety of subjects (computer hardware, electronics, algorithms, web / desktop development, etc.).
            The learning process is still ongoing and i enjoy working with new technologies (watch for AI !).
            I also enjoyed Skienna's excellent book on algorithms <em>(no sponsor here)</em> and you may find several references to his formidable chapters on the matter.
            <br />
            <br />
            Want to discuss an idea, collaborate on a project, or just plain talk ? Contact me and I will be only delighted to get in contact !
            <br />
            <br />
        </p>
        <p className='text-xs text-right'>API: {envTest}</p>
    </div>
  )
}

export default About