import './App.css'
import Navbar from './components/Navbar'
import { Route, Routes, useRoutes } from 'react-router-dom'
import Home from './pages/Home'
import Footer from './components/Footer'
import Details from './pages/Details'



function App() {

  return (
    <>
    <div className='bg-black text-white' style={{fontFamily:'Ysabeau Infant'}}>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/details' element={<Details/>}/>
      </Routes>
      <Footer/>
    </div>
    </>
  )
}

export default App
