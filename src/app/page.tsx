import Image from 'next/image'
import UserFlow from './signup/page'

export default function Home() {
  return (
   <div className='h-screen flex justify-center items-center'>
    <UserFlow/>
   </div>
  )
}
