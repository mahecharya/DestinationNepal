import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Homepage from './pages/Homepage'
import Header from './components/Header'
import Footer from './components/Footer'

const App = () => {
  return (
    <div>
      <Header/>
<Routes>
  <Route path="/" element={<Homepage />}/>
</Routes>
<Footer/>
      
    </div>
  )
}

export default App
