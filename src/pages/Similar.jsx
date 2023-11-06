import axios from 'axios'
import React, { useEffect, useState } from 'react'


const Similar = () => {



    const key = import.meta.env.VITE_APP_MY_KEY
    const myId = JSON.parse(localStorage.getItem('myId'))
    let url2 = `https://api.themoviedb.org/3/movie/${myId}/similar?language=en-US&page=1&api_key=${key}`
    let url6 = `https://api.themoviedb.org/3/tv/${myId.e}/similar?language=en-US&page=1&api_key=${key}`

    const [similar, setsimilar] = useState([])
    const [currentPage, setcurrentPage] = useState(2)
    const [postPerPage, setpostPerPage] = useState(20)
    useEffect(() => {
        const fetchData2 = async () => {
            try {
              const response = await axios.get(myId.mediaType? (url6) : `${url2}`); 
            //   setsimilar(response.data.similar); 
              setsimilar(response.data.results);
              // console.log(casts);
              // setLoading(false);
            } catch (error) {
              console.error('Error fetching data:', error);
              // setLoading(false);
            }
          }
          fetchData2()
    }, [])
    const imgBaseUrl = "https://image.tmdb.org/t/p";
    const lastPostIndex = currentPage * postPerPage
    const firstPostIndex = currentPage - postPerPage
    const currentPost = similar.slice(firstPostIndex, lastPostIndex)
    // console.log(currentPost);
  return (
    <>
        <div className='grid lg:grid-cols-5 grid-cols-3 gap-16 mx-5'>
        {
              similar.map((item,i)=>(
                <div onClick={()=>detailsPage(item.id, item.media_type)} key={i} className=''>
                    <img src={`${imgBaseUrl}/original/${item.poster_path}`} className='w-full h-[70px] hover:scale-110 rounded' alt="" />
                    <div className='text-center'>{!myId.mediaType? `${item.title}`: `${item.name}`}</div>
                </div>
              )) 
        }
        </div>
         <button className='mx-auto bg-red-500 flex gap-2 p-2 my-10 rounded'>
              <span>previous</span>
              <span>1</span>
              <span>Next</span> 
        </button>
    </>
  )
}

export default Similar