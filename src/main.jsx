import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router'
import './index.css'
import Home from './Home.jsx'
import Crop from './Cut/Crop.jsx'
import Profile from './Profile.jsx'
import SinglePost from './SinglePost.jsx'
import Reels from './Reels.jsx'
import Music from './Music.jsx'
import SingleReels from './SingleReels.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <StrictMode>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/create' element={<Crop />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/post/:id' element={<SinglePost />} />
        <Route path='/reels' element={<Reels />} />
        <Route path='/reels/:id' element={<SingleReels />} />
        <Route path="/music" element={<Music />}/>
      </Routes>
    </StrictMode>
  </BrowserRouter>
)
