import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {GrFormSearch} from 'react-icons/gr'
import { Link, useNavigate } from 'react-router-dom'



const Home = () => {
    const [searchMovie, setsearchMovie] = useState('')
    const [movies, setmovies] = useState([])
    const [tv, settv] = useState([])
    const [discover, setdiscover] = useState([])
    const [select, setselect] = useState('day')
    const [search, setsearch] = useState([])
    const [result, setresult] = useState('')
    const [empty, setempty] = useState('')
    // console.log(select);
    const key = '82b6a6612f5c7ebddd0064847db7ed24'
    let endpoint = `https://api.themoviedb.org/3/trending/movie/day?language=en-US&api_key=${key}`
    let endpoint2 =  `https://api.themoviedb.org/3/trending/movie/week?language=en-US&api_key=${key}`
    let endpoint3 = `https://api.themoviedb.org/3/trending/tv/day?language=en-US&api_key=${key}`
    let endpoint4 = `https://api.themoviedb.org/3/trending/tv/week?language=en-US&api_key=${key}`
    let endpoint5 = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&api_key=${key}`
    let endpoint6 = `https://api.themoviedb.org/3/search/multi?query=${searchMovie}&include_adult=false&language=en-US&page=1&api_key=${key}`

    const imgBaseUrl = "https://image.tmdb.org/t/p";
    let navigate = useNavigate()

    if(select !== 'day'){
        axios.get(endpoint2)
        .then((response)=>{
            setmovies(response.data.results);
            
        })
        .catch((error)=>{
            console.log(error);
        })
        axios.get(endpoint4)
        .then((response)=>{
            settv(response.data.results);
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
        axios.get(endpoint3)
        .then((response)=>{
            settv(response.data.results);
            // console.log(response.data.results);
            })
            .catch((error)=>{
                console.log(error);
            })
    }
    axios.get(endpoint5)
    .then((response)=>{
        setdiscover(response.data.results)
    })
    .catch((error)=>{
        console.log(error);
    })




    const Search = () => { 
        if (searchMovie == ""){
            setempty('Field is Empty!!!')
        }else {
        axios.get(endpoint6)
        .then((result)=>{
            if(result.data.results.length < 1){
                setempty('Not found')
            }
            else {
                setresult('Results')
                setsearch(result.data.results)
                setempty('')
                // console.log(result.data.results);
            }
            
        })
        .catch((error)=>{
            console.log(error);
        })
        }
    }
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
  return (
    <>
        <div className='mt-5 mx-3 lg:mx-5'>
            <div className='lg:w-1/3 md:w-1/2 w-full flex justify-between'>
                <div className='flex border border-2 rounded border-black bg-white w-3/4'>
                <span className='mt-2 mx-2'><GrFormSearch/></span>
                <input type="text" onChange={(e) => setsearchMovie(e.target.value)} placeholder='Search Movies or TV Series'  className='text-black w-full focus:outline-none py-1'/>
                </div>
                <button onClick={Search} className='bg-red-700  font-bold text-white px-5 rounded'>Search</button>
            </div>
                <small className='text-red-700'>{empty}</small>

            <section className='my-10'>
                <div className='flex'>
                    <h1 className='me-4'>Trending</h1>
                    <select className='text-black' name="" id="" onChange={(e)=>setselect(e.target.value)} value={select.day}>
                        <option value="day">day</option>
                        <option value="week">week</option>
                    </select>
                </div>
            </section>
            <section>
                <h1>
                    {result}
                </h1>
                <div className='grid lg:grid-cols-7 grid-cols-3 gap-10'>
                    {
                        search.map((item,i)=>(
                            <div onClick={()=>detailsPage(item.id, item.media_type)} key={i} className=''>
                                <img src={`${imgBaseUrl}/original/${item.poster_path}`} className='w-full h-[70px] hover:scale-110 rounded' alt="Image not found" />
                                <div className='text-center'>{item.title ? item.title : item.name}</div>
                            </div>
                        ))
                    }
                </div>
                <h1>Movies</h1>
                <div className='grid lg:grid-cols-7 grid-cols-3 gap-10'>
                    {
                        movies.map((item,i)=>(
                            <div onClick={()=>detailsPage(item.id)} key={i} className=''>
                                <img src={`${imgBaseUrl}/original/${item.poster_path}`} className='w-full h-[70px] hover:scale-110 rounded' alt="" />
                                <div className='text-center'>{item.title}</div>
                                {/* <div>{item.id}</div> */}
                            </div>
                        ))
                    }
                </div>
                <h1 className='my-10'>TV Series</h1>
                <div className='grid lg:grid-cols-7 grid-cols-3 gap-10'>
                    {
                        tv.map((items,i)=>(
                            <div onClick={()=>detailsPage(items.id, items.media_type)}  key={i} className=''>
                                <img src={`${imgBaseUrl}/original/${items.poster_path}`} className='hover:scale-110 rounded w-full h-[70px]' alt="" />
                                <div className='text-center'>{items.name}</div>
                            </div>
                        ))
                    }
                </div>
                <h1 className='my-10 mx-5'>Discover</h1>
                <div className='grid lg:grid-cols-7 grid-cols-3 gap-10 mx-5'>
                    {
                        discover.map((items,i)=>(
                            <div onClick={()=>detailsPage(items.id)}  key={i} className=''>
                                <img src={`${imgBaseUrl}/original/${items.poster_path}`} className='hover:scale-110 rounded w-full h-[70px]' alt="" />
                                <div className='text-center'>{items.original_title}</div>
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