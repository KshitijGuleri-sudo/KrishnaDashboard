import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'
import './index.css'
import SimpleLogin from './pages/SimpleLogin.jsx'
import AdminDashboardPage from './pages/AdminDashboardPage.jsx'
import EditorDashboardPage from './pages/EditorDashboardPage.jsx'
import ClientDashboardPage from './pages/ClientDashboardPage.jsx'

const router = createBrowserRouter([
	{
		path: '/',
		element: <Navigate to="/login" replace />,
	},
	{
		path: '/login',
		element: <SimpleLogin />,
	},
	{
		path: '/admin-dashboard',
		element: <AdminDashboardPage />,
	},
	{
		path: '/editor-dashboard',
		element: <EditorDashboardPage />,
	},
	{
		path: '/client-dashboard',
		element: <ClientDashboardPage />,
	},
	{
		path: '*',
		element: <Navigate to="/login" replace />,
	},
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
