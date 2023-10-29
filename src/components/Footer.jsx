import React from 'react'
import tmdb from '../assets/Images/TMDB.png'

const Footer = () => {
  return (
    <>
    <div className='mt-10 bg-red-700'>
        <footer className='flex flex-col justify-center items-center'>
            <p>Powered by</p>
            <img src={tmdb} width={30} alt="" />
            <p>Developed by Ibrahim</p>
        </footer>
    </div>
    </>
  )
}

export default Footer