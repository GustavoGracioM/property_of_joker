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
import Login from './Login.jsx'

import { AuthProvider } from "./AuthContext.jsx"
import ProtectedRoute from "./component/ProtectedRoute.jsx"

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthProvider>
      <StrictMode>
        <Routes>
          {/* PUBLICO */}
          <Route path="/login" element={<Login />} />

          {/* PROTEGIDO POR JWT */}
          <Route path="/" element={
            <ProtectedRoute><Home /></ProtectedRoute>
          } />
          <Route path="/create" element={
            <ProtectedRoute><Crop /></ProtectedRoute>
          } />
          <Route path="/profile" element={
            <ProtectedRoute><Profile /></ProtectedRoute>
          } />
          <Route path="/post/:id" element={
            <ProtectedRoute><SinglePost /></ProtectedRoute>
          } />
          <Route path="/reels" element={
            <ProtectedRoute><Reels /></ProtectedRoute>
          } />
          <Route path="/reels/:id" element={
            <ProtectedRoute><SingleReels /></ProtectedRoute>
          } />
          <Route path="/music" element={
            <ProtectedRoute><Music /></ProtectedRoute>
          } />

        </Routes>
      </StrictMode>
    </AuthProvider>
  </BrowserRouter>
)
