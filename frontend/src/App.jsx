import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Homepage from './pages/Homepage'
import Header from './components/Header'
import Footer from './components/Footer'
import Register from './pages/Register'

const App = () => {
  return (
    <div>
      <Header/>
<Routes>
  <Route path="/" element={<Homepage />}/>
  <Route path="/register" element={<Register />}/>
</Routes>
<Footer/>
      
    </div>
  )
}

export default App
