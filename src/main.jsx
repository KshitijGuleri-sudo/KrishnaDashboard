import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'
import './index.css'
import Dashboard from './pages/Dashboard.jsx'

const router = createBrowserRouter([
	{
		path: '/',
		element: <Navigate to="/dashboard" replace />,
	},
	{
		path: '/dashboard',
		element: <Dashboard />,
	},
	{
		path: '/dashboard/projects',
		element: <Dashboard />,
	},
	{
		path: '/dashboard/uploads',
		element: <Dashboard />,
	},
	{
		path: '/dashboard/payments',
		element: <Dashboard />,
	},
	{
		path: '/dashboard/settings',
		element: <Dashboard />,
	},
	{
		path: '*',
		element: <Navigate to="/dashboard" replace />,
	},
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
