import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import {AiOutlineStar} from 'react-icons/ai'
import Similar from './Similar'



const Details = () => {
  const navigate = useNavigate()
  const key = import.meta.env.VITE_APP_MY_KEY
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
  const [firstsimilar, setFirstsimilar] = useState([])
  const [secondsimilar, setSecondSimilar] = useState([])
  const [language, setlanguage] = useState([])
  const [casts, setcasts] = useState('')
  const [mydata, setMyData] = useState([])

  
  // mySimilar = JSON.parse(localStorage.getItem('similar'))
  // console.log(mySimilar);

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
      fetchData2()
      
    }, [mygenres, language,  casts])
    
    const fetchData = async () => {
      try {
        const res = await axios.get(myId.mediaType? (url6) : `${url2}`); 
        setMyData(res.data.results)
        if (mydata.length>0){
          const halfLength = Math.ceil(mydata.length / 2);
          const firstHalfData = mydata.slice(0, halfLength);
          setFirstsimilar(firstHalfData);

        }
        // console.log(response.data);
        // setsimilar(response.data.results); 
        // console.log(similar);
        // setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        // setLoading(false);
      }
    }
    fetchData()
    
    
    const detailsPage = (e,mediaType) => {
      if (mediaType=='tv') {
          localStorage.setItem('myId',JSON.stringify({e,mediaType}))
          navigate('/details')
      }else {
          localStorage.setItem('myId',JSON.stringify(e))
          navigate('/details')
          // console.log(e)
      }

  }
  const imgBaseUrl = "https://image.tmdb.org/t/p";

  const next = () => {
      // setFirstsimilar('')
      const halfLength = Math.ceil(mydata.length / 2);
      const secondHalfData = mydata.slice(halfLength);
      setFirstsimilar(secondHalfData)
      localStorage.setItem('similar', JSON.stringify(secondHalfData))
      // console.log(secondHalfData);
  }
  return (
    <>
      <div className='w-full'>
        <section className='my-10'>
          <div className='lg:flex gap-5'>
            <div className=' lg:w-[55%]'>
            <img src={`${imgBaseUrl}/original/${detail.poster_path}`} className='lg:h-full img-fluid' alt=""/>
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
        {/* <section>
          <h1 className='font-bold my-2 mx-5'>Similar Movies</h1>
          <div className='grid lg:grid-cols-5 grid-cols-3 gap-16 mx-5'>
             {
              firstsimilar.map((item,i)=>(
                <div onClick={()=>detailsPage(item.id, item.media_type)} key={i} className=''>
                    <img src={`${imgBaseUrl}/original/${item.poster_path}`} className='w-full h-[70px] hover:scale-110 rounded' alt="" />
                    <div className='text-center'>{!myId.mediaType? `${item.title}`: `${item.name}`}</div>
                </div>
              )) 
              //   firstsimilar.map((item,i)=>(
              //   <div onClick={()=>detailsPage(item.id, item.media_type)} key={i} className=''>
              //       <img src={`${imgBaseUrl}/original/${item.poster_path}`} className='w-full h-[70px] hover:scale-110 rounded' alt="" />
              //       <div className='text-center'>{!myId.mediaType? `${item.title}`: `${item.name}`}</div>
              //   </div>
              // ))
             }
          </div>
        </section> */}
            

      </div>
      <Similar/>
    </>
  )
}

export default Details