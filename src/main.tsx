import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import FormValidation from './components/Day1/FormValidation.tsx'
import ReactDays from './components/Fed/React Challeneg/ReactDays.tsx'
// import Dashboard from './components/Fed/Dashboard/Dashboard.tsx'
import Layout from './components/Layout.tsx'
import Dashboard from './components/Fed/Dashboard/Dashboard.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />, 
    children: [
      {
        index: true,
        element: <Dashboard />
      },
      {
        path: '/30-days-challenge',
        element: <ReactDays />
      }
    ]
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
