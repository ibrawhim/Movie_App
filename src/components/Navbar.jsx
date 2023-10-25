import React from 'react'
import { Link } from 'react-router-dom'
import {AiOutlineHome} from 'react-icons/ai'
import {MdOutlinePersonalVideo} from 'react-icons/md'
import {TfiVideoClapper}  from 'react-icons/tfi'
import guy from '../assets/Images/guy.jpg'


const Navbar = () => {
  return (
    <>
    <div className='sticky w-full top-0 '>
        <nav className='border border-red-500 flex justify-around py-1'>
        <Link className='mt-2' to="/">Home</Link>
        <div className='flex gap-10 mt-3'>
        <Link to="/"><AiOutlineHome/></Link>
        <Link to="/"><TfiVideoClapper/></Link>
        <Link to="/"><MdOutlinePersonalVideo/></Link>
        </div>
        <img src={guy} className='rounded-[100%] h-[45px] border border-red-500'  width={47} alt="" />
        {/* <div className=''>Image</div> */}
        </nav>
    </div>
    </>
  )
}

export default Navbar