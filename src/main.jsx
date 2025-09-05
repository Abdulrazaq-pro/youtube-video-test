import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import Test from './pages/Test.jsx'   // 👈 new test page
import { VideoProvider } from './context/DataContext.jsx'
import About from './pages/About.jsx'

const router = createBrowserRouter([
  { path: '/', element: <App /> },
  { path: '/test', element: <Test /> }, // 👈 /test route
  { path: '/about', element: <About /> }, // 👈 /test route
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <VideoProvider>
      <RouterProvider router={router} />
    </VideoProvider>
  </StrictMode>
)