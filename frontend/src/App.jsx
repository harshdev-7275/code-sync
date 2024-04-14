import { useState } from 'react'

import './App.css'
import {BrowserRouter, Outlet, Route, Routes} from "react-router-dom"

import Navbar from './components/Navbar'
import Footer from './components/Footer'






function App() {
  

  return (
   <>
   <Navbar/>
<Outlet/>
   </>
  )
}

export default App
