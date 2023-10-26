import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'


const Details = () => {
  const key = '82b6a6612f5c7ebddd0064847db7ed24'
  const myId = JSON.parse(localStorage.getItem('myId'))
  // console.log(myId);
  let url = `https://api.themoviedb.org/3/movie/${myId}?language=en-US',&api_key=${key}`

  const [movieDetails, setmovieDetails] = useState('')

  useEffect(() => {
    axios.get(url)
    .then((response)=>{
      setmovieDetails(response.data);
    })
    .catch((error)=>{
      console.log(error);
    })
  }, [])
  
  
  return (
    <>
      <div className='text-white'>
        Details
      </div>
    </>
  )
}

export default Details