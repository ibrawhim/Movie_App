import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {GrFormSearch} from 'react-icons/gr'



const Home = () => {
    const [searchMovie, setsearchMovie] = useState('')
    const [movies, setmovies] = useState([])
    const [select, setselect] = useState('day')
    // console.log(select);
    const key = '82b6a6612f5c7ebddd0064847db7ed24'
    let endpoint = `https://api.themoviedb.org/3/trending/movie/day?language=en-US&api_key=${key}`
    let endpoint2 =  `https://api.themoviedb.org/3/trending/movie/week?language=en-US&api_key=${key}`
    const imgBaseUrl = "https://image.tmdb.org/t/p";

    if(select !== 'day'){
        axios.get(endpoint2)
        .then((response)=>{
            setmovies(response.data.results);
            
        })
        .catch((error)=>{
            console.log(error);
        })
    }else{
        axios.get(endpoint)
            .then((response)=>{
                setmovies(response.data.results);
            })
            .catch((error)=>{
                console.log(error);
            })
    }




    // const Search = () => {
    //     axios.get(endpoint)
    //     .then((result)=>{
    //         console.log(result);
    //     })
    //     .catch((error)=>{
    //         console.log(error);
    //     })
    // }
  return (
    <>
        <div className='mt-5 mx-3 lg:mx-5'>
            <div className='lg:w-1/3 md:w-1/2 w-full flex justify-between'>
                <div className='flex border border-2 rounded border-black w-3/4'>
                <span className='mt-2'><GrFormSearch/></span>
                <input type="text" onChange={(e) => setsearchMovie(e.target.value)} placeholder='Search Movies or TV Series'  className='w-full border border-white py-1'/>
                </div>
                <button  className='bg-black text-white px-3 rounded'>Search</button>
            </div>

            <section className='my-10'>
                <div className='flex'>
                    <h1 className='me-4'>Trending</h1>
                    <select className='border border-black' name="" id="" onChange={(e)=>setselect(e.target.value)} value={select.day}>
                        <option value="day">day</option>
                        <option value="week">week</option>
                    </select>
                </div>
            </section>
            <section>
                <div className='grid lg:grid-cols-7 grid-cols-3 gap-2'>
                    {
                        movies.map((item,i)=>(
                            <div key={i} className='border border-2'>
                                <img src={`${imgBaseUrl}/original/${item.poster_path}`} className='w-full h-[90px]' alt="" />
                                <div>{item.title}</div>
                            </div>
                        ))
                    }
                </div>
            </section>
        </div>
    </>
  )
}

export default Home