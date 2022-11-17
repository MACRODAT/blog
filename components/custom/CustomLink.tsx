import Link from 'next/link'

export default function CustomLink({ as, href, ...otherProps }) {
  return (
      <Link as={as} href={href} target={'_blank'} className='mx-2 text-slate-500 hover:text-cyan-500'>
            <a {...otherProps} />
      </Link>
  )
}