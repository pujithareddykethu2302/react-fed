import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ReactDays from './components/Fed/React Challeneg/ReactDays.tsx'
import Layout from './components/Layout.tsx'
import Dashboard from './components/Fed/Dashboard/Dashboard.tsx'
import ChallengeDetails from './components/Fed/ChallengeDetails/ChallengeDetails.tsx'
import { ChallengeProvider } from './components/Common/ChallengeContext.tsx'

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
      },
      {
        element: <ChallengeDetails />,
        path: '/30-days-challenge/challenge-details/:id',
      }
    ]
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <ChallengeProvider>
    <RouterProvider router={router} />
    </ChallengeProvider>
  </StrictMode>,
)
