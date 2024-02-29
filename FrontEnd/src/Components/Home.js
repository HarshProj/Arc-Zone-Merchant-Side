import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react';

import './CSS/Home.css'





function Home() {


  const navigate = useNavigate()


  useEffect(() => {
    const token = localStorage.getItem("jwt");
      if(!token){
        navigate('/signin')
      }
  }, []);





  return (
    <div>
      <div className="home-msg">
        <h1>Thank you for joining our team</h1>
      </div>
    </div>
  )
}

export default Home