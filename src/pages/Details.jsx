import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import {AiOutlineStar} from 'react-icons/ai'


const Details = () => {
  const key = '82b6a6612f5c7ebddd0064847db7ed24'
  const myId = JSON.parse(localStorage.getItem('myId'))
  // console.log(myId);
  let url = `https://api.themoviedb.org/3/movie/${myId}?language=en-US',&api_key=${key}`
  let url2 = `https://api.themoviedb.org/3/movie/${myId}/similar?language=en-US&page=1&api_key=${key}`
  let url3 = `https://api.themoviedb.org/3/movie/${myId}/credits?language=en-US&api_key=${key}`
  let url4 = `https://api.themoviedb.org/3/tv/${myId.e}/credits?language=en-US&api_key=${key}`
  let tvUrl = `https://api.themoviedb.org/3/tv/${myId.e}?language=en-US&api_key=${key}`
  let url6 = `https://api.themoviedb.org/3/tv/${myId.e}/similar?language=en-US&page=1&api_key=${key}`

  const [detail, setdetail] = useState([])
  const [mygenres, setmygenres] = useState([])
  const [similar, setsimilar] = useState([])
  const [language, setlanguage] = useState([])
  const [casts, setcasts] = useState('')
  const imgBaseUrl = "https://image.tmdb.org/t/p";

  
    

    useEffect(() => {
      axios.get(myId.mediaType? (tvUrl) : `${url}`)
    .then((response)=>{
        setdetail(response.data)
        setlanguage(detail.spoken_languages)
        setmygenres(detail.genres)
      // console.log(detail.genres)
      // console.log(language);
    })
    .catch((error)=>{
      console.log(error);
    })
      const fetchData = async () => {
        try {
          const response = await axios.get(myId.mediaType? (url6) : `${url2}`); 
          // console.log(response.data);
          setsimilar(response.data.results); 
          // console.log(similar);
          // setLoading(false);
        } catch (error) {
          console.error('Error fetching data:', error);
          // setLoading(false);
        }
      }
      const fetchData2 = async () => {
        try {
          const response = await axios.get(myId.mediaType? (url4) : `${url3}`); 
          setcasts(response.data.cast); 
          // console.log(casts);
          // setLoading(false);
        } catch (error) {
          console.error('Error fetching data:', error);
          // setLoading(false);
        }
      }
       
        fetchData()
        fetchData2()
    }, [mygenres, language])
    
  
  
  return (
    <>
      <div>
        <section className='my-10'>
          <div className='lg:flex gap-5'>
            <div className=' lg:w-[55%]'>
            <img src={`${imgBaseUrl}/original/${detail.poster_path}`} className='lg:h-full img-fluid' alt="" />
            </div>
            <div className='lg:pr-20 w-full'>
              <div>
                <div>
                  <p>{myId.mediaType? `${detail.name}` : `${detail.original_title}`}</p>
                  <p className='text-gray-500'>{detail.tagline}</p>
                </div>
                <p className='my-1'>Description</p>
                <p className='text-gray-500'>{detail.overview}</p>
                <p className='my-1'>{myId.mediaType? `First-Aired:` : `Release Date:`} <span className='text-gray-500'>{myId.mediaType? `${detail.first_air_date}`: `${detail.release_date}`}</span></p>
                <p className='my-1'>Status: <span className='text-gray-500'>{detail.status}</span></p>
                <p className='my-1'>{!myId.mediaType?  `Duration:` : `Number of Episodes:` } <span className='text-gray-500'>{!myId.mediaType? `${detail.runtime}minutes`: `${detail.number_of_episodes}` }</span></p>
                <p className='my-1'>{!myId.mediaType? `Budget:` : `Number of Seasons:`} <span className='text-gray-500'>{!myId.mediaType? `$${detail.budget}`: `${detail.number_of_seasons}`}</span></p>
                <div>
                  <p className='my-2 border-b-4 border-red-700 w-[40px]'>Genre</p>
                  <div className='flex gap-2'>
                    {
                      mygenres &&
                      mygenres.map((item,i)=>(
                        <span className='bg-red-700 flex px-2 rounded' key={i}>{item.name}</span>
                      ))
                     }
                  </div>
                  <div>
                    <p className='my-2 border-b-4 border-red-700 w-[60px]'>Language</p>
                    <div className='flex gap-2'>
                    {
                      language &&
                      language.map((item,i)=>(
                        <span className='bg-red-700 flex px-2 rounded' key={i}>{item.name}</span>
                      ))
                    }
                    </div>
                  </div>
                </div>
                <div className='my-2'>
                  <p className='my-2 border-b-4 border-red-700 w-[35px]'>Casts</p>
                  <div className='grid lg:grid-cols-4 grid-cols-3 gap-2'>

                    {
                      casts && 
                      
                    casts.map((items,i)=>(
                      <p key={i} className='flex font-semibold'><span className='mt-1 text-red-700'><AiOutlineStar/></span>{items.name}</p>
                    ))
                    }
                  </div>
                </div>
              </div>
            </div>
          </div> 
        </section>
        <section>
          <h1 className='font-bold my-2 mx-5'>Similar Movies</h1>
          <div className='grid lg:grid-cols-7 grid-cols-3 gap-10 mx-5'>
             {
              similar.map((item,i)=>(
                <Link to="/details" key={i} className=''>
                    <img src={`${imgBaseUrl}/original/${item.poster_path}`} className='w-full h-[70px] hover:scale-110 rounded' alt="" />
                    <div className='text-center'>{!myId.mediaType? `${item.title}`: `${item.name}`}</div>
                </Link>
              ))
             }
          </div>
        </section>
      </div>
    </>
  )
}

export default Details