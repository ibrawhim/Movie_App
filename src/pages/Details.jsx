import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import {AiOutlineStar} from 'react-icons/ai'


const Details = () => {
  const key = '82b6a6612f5c7ebddd0064847db7ed24'
  const myId = JSON.parse(localStorage.getItem('myId'))
  // console.log(myId);
  let url = `https://api.themoviedb.org/3/movie/${myId}?language=en-US',&api_key=${key}`
  let url2 = `https://api.themoviedb.org/3/movie/${myId}/similar?language=en-US&page=1',&api_key=${key}`
  let url3 = `https://api.themoviedb.org/3/movie/${myId}/credits?language=en-US&api_key=${key}`

  const [detail, setdetail] = useState([])
  const [mygenres, setmygenres] = useState([])
  const [similar, setsimilar] = useState([])
  const [language, setlanguage] = useState([])
  const [casts, setcasts] = useState('')
  const imgBaseUrl = "https://image.tmdb.org/t/p";


    axios.get(url)
    .then((response)=>{
      setdetail(response.data)
      setlanguage(detail.spoken_languages)
      setmygenres(detail.genres)
      // console.log(detail.genres)
    })
    .catch((error)=>{
      console.log(error);
    })

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get(url2); 
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
          const response = await axios.get(url3); 
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
    }, [])
    
  
  
  return (
    <>
      <div>
        <section className='my-10'>
          <div className='lg:flex gap-5 border border-red-500'>
            <div className='border lg:w-[55%]'>
            <img src={`${imgBaseUrl}/original/${detail.poster_path}`} className='lg:h-full img-fluid' alt="" />
            </div>
            <div className='border lg:pr-20 w-full'>
              <div>
                <div>
                  <p>{detail.original_title}</p>
                  <p>{detail.tagline}</p>
                </div>
                <p>Description</p>
                <p>{detail.overview}</p>
                <p>Release Date: {detail.release_date}</p>
                <p>Status: {detail.status}</p>
                <p>Duration: {detail.runtime}minutes</p>
                <p>Budget: ${detail.budget}</p>
                <div>
                  <p>Genre</p>
                  <div className='flex'>
                    {
                      mygenres &&
                      mygenres.map((item,i)=>(
                        <span className='bg-red-700 flex px-2 rounded' key={i}>{item.name}</span>
                      ))
                     }
                  </div>
                  <div>
                    <p>Language</p>
                    <div className='flex'>
                    {
                      language &&
                      language.map((item,i)=>(
                        <span className='bg-red-700 flex px-2 rounded' key={i}>{item.name}</span>
                      ))
                    }
                    </div>
                  </div>
                </div>
                <div>
                  <p>Casts</p>
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
          <h1>Similar Movies</h1>
          <div className='grid lg:grid-cols-7 grid-cols-3 gap-10'>
             {
              similar.map((item,i)=>(
                <Link to="/details" key={i} className=''>
                    <img src={`${imgBaseUrl}/original/${item.poster_path}`} className='w-full h-[70px] hover:scale-110 rounded' alt="" />
                    <div className='text-center'>{item.title}</div>
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