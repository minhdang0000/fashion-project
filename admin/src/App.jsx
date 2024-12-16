import React, {useState, useEffect} from 'react'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import { Routes, Route } from 'react-router-dom'
import Add from './pages/Add'
import List from './pages/List'
import Orders from './pages/Orders'
import Login from './components/Login'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Suppliers from './pages/Suppliers'
import Brands from './pages/Brands'
import Invoices from './pages/Invoices'
import SellStatistics from './pages/SellStatistics'

export const backendUrl = import.meta.env.VITE_BACKEND_URL
export const currency = '₫'

const App = () => {


  const [token,setToken] = useState(localStorage.getItem('token')?localStorage.getItem('token'):'');

  useEffect(() => {
    localStorage.setItem('token', token)
  },[token])


  return (
    <div className='bg-gray-50 min-h-screen'>
      <ToastContainer />
      { token === ""
      ? <Login setToken={setToken} />
      :  <>
      <Navbar setToken={setToken} />
      <hr className='-mt-12'/>
      <div className='flex w-full'>
        <Sidebar />
        <div className='w-[70%] mx-auto ml-[max(5vw,25px)] my-8 text-gray-600 text-base'>
          <Routes>
            <Route path='/add' element={<Add token={token} />}/>
            <Route path='/list' element={<List token={token}  />}/>
            <Route path='/orders' element={<Orders token={token}  />}/>
            <Route path='/suppliers' element={<Suppliers token={token}  />}/>
            <Route path='/brands' element={<Brands token={token}  />}/>
            <Route path='/invoices' element={<Invoices token={token}  />}/>
            <Route path='/statistics' element={<SellStatistics token={token}  />}/>
          </Routes>
        </div>
      </div>
      </>
      }
     
    </div>
  )
}

export default App

