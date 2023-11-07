import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {GrFormSearch} from 'react-icons/gr'
import { Link, useNavigate } from 'react-router-dom'
import loaderImg from '../assets/loaderImg.jpg'
import myLoad from '../assets/loaderImg.jpg'


const Home = () => {
    const [searchMovie, setsearchMovie] = useState('')
    const [movies, setmovies] = useState([])
    const [topRated, settopRated] = useState([])
    const [discover, setdiscover] = useState([])
    const [select, setselect] = useState('day')
    const [search, setsearch] = useState([])
    const [result, setresult] = useState('')
    const [empty, setempty] = useState('')
    const [loader, setloader] = useState(false)
    const [myloader, setMyLoader] = useState(true)
    const [people, setpeople] = useState([])
    // console.log(select);
    const key = import.meta.env.VITE_APP_MY_KEY
    let endpoint = `https://api.themoviedb.org/3/trending/movie/day?language=en-US&api_key=${key}`
    let endpoint2 =  `https://api.themoviedb.org/3/trending/movie/week?language=en-US&api_key=${key}`
    let endpoint3 = `https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1&api_key=${key}`
    // let endpoint4 = `https://api.themoviedb.org/3/trending/tv/week?language=en-US&api_key=${key}`
    let endpoint5 = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&api_key=${key}`
    let endpoint6 = `https://api.themoviedb.org/3/search/multi?query=${searchMovie}&include_adult=false&language=en-US&page=1&api_key=${key}`

    let endpoint7 = `https://api.themoviedb.org/3/trending/person/week?language=en-US&api_key=${key}`
    let endpoint8 = `https://api.themoviedb.org/3/trending/person/day?language=en-US&api_key=${key}`

    

    const imgBaseUrl = "https://image.tmdb.org/t/p";
    let navigate = useNavigate()    


    useEffect(() => {
    if(select !== 'day'){
        axios.get(endpoint2)
        .then((response)=>{
            setmovies(response.data.results);
            setMyLoader(false)
            // console.log(movies);
        })
        .catch((error)=>{
            console.log(error);
        })
        axios.get(endpoint3)
        .then((response)=>{
            settopRated(response.data.results);
            setMyLoader(false)
        })
        .catch((error)=>{
            console.log(error);
        })
        axios.get(endpoint8)
        .then((response)=>{
            setpeople(response.data.results);
            setMyLoader(false)
        })
        .catch((error)=>{
            console.log(error);
        })
    }else{
        axios.get(endpoint7)
        .then((response)=>{
            setpeople(response.data.results);
            setMyLoader(false)
        })
        .catch((error)=>{
            console.log(error);
        })
        axios.get(endpoint)
        .then((response)=>{
            setmovies(response.data.results);
            setMyLoader(false)
        })
        .catch((error)=>{
            console.log(error);
        })
        axios.get(endpoint3)
        .then((response)=>{
            settopRated(response.data.results);
            setMyLoader(false)
            // console.log(response.data.results);
            })
            .catch((error)=>{
                console.log(error);
            })
    }
    axios.get(endpoint5)
    .then((response)=>{
        setdiscover(response.data.results)
        setMyLoader(false)
    })
    .catch((error)=>{
        console.log(error);
    })

}, [movies, topRated, key, discover])


    const Search = () => {
        setloader(true) 
        if (searchMovie == ""){
            setloader(false)
            setempty('Field is Empty!!!')
        }else {
        axios.get(endpoint6)
        .then((result)=>{
            if(result.data.results.length < 1){
                setempty('Movie or Series not found.')
                setloader(false)
            }
            else {
                setresult('Results')
                setsearch(result.data.results)
                setempty('')
                setloader(false)
                // console.log(result.data.results);
            }
            
        })
        .catch((error)=>{
            console.log(error);
        })
        }
    }
    const detailsPage = (e,mediaType,index) => {
        if (mediaType=='tv') {
            localStorage.setItem('myId',JSON.stringify({e,mediaType}))
            navigate('/details')
        }else if (mediaType=='person') {
            localStorage.setItem('myId',JSON.stringify({e,mediaType}))
            localStorage.setItem('actors',JSON.stringify({people}))
            console.log(index);
        }
        else {
            localStorage.setItem('myId',JSON.stringify(e))
            navigate('/details')
            // console.log(e)
        }

    }
  return (
    <>
        <div className='mt-5 mx-5 lg:mx-10'>
            <div className='lg:w-1/3 md:w-1/2 w-full flex justify-between'>
                <div className='flex border border-2 rounded border-black bg-white w-3/4'>
                <span className='mt-2 mx-2'><GrFormSearch/></span>
                <input type="text" onChange={(e) => setsearchMovie(e.target.value)} placeholder='Search Movies or TV Series'  className='text-black w-full focus:outline-none py-1'/>
                </div>
                <button onClick={Search} className='bg-red-700  font-bold text-white lg:px-5 px-8  rounded'>{loader?<img  src={loaderImg} width={20} alt="" />: 'Search'}</button>
            </div>
                <small className='text-red-700 font-bold'>{empty}</small>

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
                <div className='grid lg:grid-cols-7 grid-cols-3 gap-10 mx-5'>
                    {
                        
                        search.map((item,i)=>(
                            <div onClick={()=>detailsPage(item.id, item.media_type)} key={i} className=''>
                                <img src={`${imgBaseUrl}/original/${item.poster_path}`} className='w-full h-[70px] hover:scale-110 rounded' alt="Image not found" />
                                <div className='text-center'>{item.title ? item.title : item.name}</div>
                            </div>
                        ))
                    }
                </div>
                <h1 className='my-5  text-xl font-bold'>Movies</h1>
                <div className={myloader? '' :'grid lg:grid-cols-7 grid-cols-3 gap-10 w-full' }>
                    {
                        myloader ? <div className=' flex justify-center'><img  src={myLoad} width={30} alt="" /></div> :
                        movies.map((item,i)=>(
                            <div onClick={()=>detailsPage(item.id)} key={i} className=''>
                                <img src={`${imgBaseUrl}/original/${item.poster_path}`} className='w-full h-[70px] hover:scale-110 rounded' alt="" />
                                <div className='text-center'>{item.title}</div>
                                {/* <div>{item.id}</div> */}
                            </div>
                        ))
                    }
                </div>
                <h1 className='my-5  text-xl font-bold'>Top Rated Movies</h1>
                <div className={myloader? '' :'grid lg:grid-cols-7 grid-cols-3 gap-10 w-full'}>
                    {
                        myloader ? <div className=' flex justify-center'><img  src={myLoad} width={30} alt="" /></div> :
                        topRated.map((items,i)=>(
                            <div onClick={()=>detailsPage(items.id, items.media_type)}  key={i} className=''>
                                <img src={`${imgBaseUrl}/original/${items.poster_path}`} className='hover:scale-110 rounded w-full h-[70px]' alt="" />
                                <div className='text-center'>{items.name}</div>
                            </div>
                        ))
                    }
                </div>
                <h1 className='my-5 text-xl font-bold'>People</h1>
                <div className={myloader? '' :'grid lg:grid-cols-7 grid-cols-3 gap-10 w-full'}>
                    {
                        myloader ? <div className=' flex justify-center'><img  src={myLoad} width={30} alt="" /></div> :
                        people.map((items,i)=>(
                            <div onClick={()=>detailsPage(items.id, items.media_type,i)}  key={i} className=''>
                                <img src={`${imgBaseUrl}/original/${items.profile_path}`} className='hover:scale-110 rounded w-full h-[70px]' alt="" />
                                <div className='text-center'>{items.name}</div>
                            </div>
                        ))
                    }
                </div>
                <h1 className='my-5 text-xl font-bold'>Discover</h1>
                <div className={myloader? '' :'grid lg:grid-cols-7 grid-cols-3 gap-10 w-full'}>
                    {
                        myloader ? <div className=' flex justify-center'><img  src={myLoad} width={30} alt="" /></div> :
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