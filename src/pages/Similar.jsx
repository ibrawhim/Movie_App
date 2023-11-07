import axios from 'axios'
import React, { useEffect, useState } from 'react'
import ReactPaginate from 'react-paginate';
import { useNavigate } from 'react-router-dom';



const Similar = () => {


  const key = import.meta.env.VITE_APP_MY_KEY
  const myId = JSON.parse(localStorage.getItem('myId'))
  let url2 = `https://api.themoviedb.org/3/movie/${myId}/similar?language=en-US&page=1&api_key=${key}`
  let url6 = `https://api.themoviedb.org/3/tv/${myId.e}/similar?language=en-US&page=1&api_key=${key}`

  const [similar, setsimilar] = useState([])
  const [pageNumber, setpageNumber] = useState(0)
  

    
    useEffect(() => {
        const fetchData2 = async () => {
            try {
              const response = await axios.get(myId.mediaType? (url6) : `${url2}`);  
              setsimilar(response.data.results);

            } catch (error) {
              console.error('Error fetching data:', error);
            }
        }
        fetchData2()
    }, [similar ])
    const imgBaseUrl = "https://image.tmdb.org/t/p";
    const moviePage = 10
    const pageVisited = pageNumber * moviePage
    const pageCount = Math.ceil(similar.length / moviePage)
    
    const changePage = ({ selected }) => {
      setpageNumber(selected);
    };
    
    const navigate = useNavigate()

      const detailsPage = (e,mediaType) => {
        if (mediaType=='tv') {
            localStorage.setItem('myId',JSON.stringify({e,mediaType}))
            navigate('/details')
        }
        else {
            localStorage.setItem('myId',JSON.stringify(e))
            navigate('/details')
          }
          
        }
        return (
          <>
        <div className='my-10 w-full h-screen'>
        <h1 className='ms-5 my-5 font-bold text-xl'>Similar Movies</h1>
        <div className='grid lg:grid-cols-5 grid-cols-3 gap-16 mx-5'>
        {similar.length > 0 ?
              similar.slice(pageVisited, pageVisited + moviePage).map((item,i)=>(
                <div onClick={()=>detailsPage(item.id, item.media_type)} key={i} className=''>
                    <img src={`${imgBaseUrl}/original/${item.poster_path}`} className='w-full h-[70px] hover:scale-110 rounded' alt="" />
                    <div className='text-center'>{!myId.mediaType? `${item.title}`: `${item.name}`}</div>
                </div>
              )) 
            :
            <div>
                No Similar found
            </div>
        }
        </div>
        <ReactPaginate className='flex bg-red-500 mx-auto justify-center py-2 rounded lg:w-[13%] w-[25%] gap-2 mt-7 font-bold'
        nextLabel="next"
        previousLabel="previous"
        pageCount={pageCount}
        onPageChange={changePage}
        containerClassName="pagination"
        pageLinkClassName="page-link"
        previousLinkClassName="page-link"
        nextLinkClassName="page-link"
        activeClassName="active"
        />
        </div>
    </>
  )
}

export default Similar