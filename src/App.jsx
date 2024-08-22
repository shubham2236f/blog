import { useEffect, useState } from 'react'
import {useDispatch} from "react-redux"
import './App.css'
import  { login, logout } from './store/authSlice';
import authservice from './appwrite/auth';
import Header from './component/Header/Header';
import Footer from './component/Footer/Footer';
import { Outlet } from 'react-router-dom';

function App() {
  const [loding,setLoding] = useState(true);
  const dispatch = useDispatch();

  useEffect(()=>{
    authservice.getCurrentUser().then((userData)=>{
        if (userData) {
          dispatch(login({userData}));
        } else {
          dispatch(logout());
        }
    })
    .finally(()=>setLoding(false))
  },[])

  return !loding ? (
    <div className='min-h-screen w-full flex flex-wrap content-between bg-gray-400'>
      <div className='w-full block'>
        <Header/>
        <main>
          Todo:<Outlet/>
        </main>
        <Footer/>
      </div>
    </div>
  ) : null 
}

export default App
