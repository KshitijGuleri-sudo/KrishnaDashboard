import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'
import './index.css'
import { AuthProvider } from './context/AuthContext.jsx'
import ProtectedRoute from './components/auth/ProtectedRoute.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import Unauthorized from './pages/Unauthorized.jsx'
import Dashboard from './pages/Dashboard.jsx'
import AdminDashboard from './pages/admin/AdminDashboard.jsx'
import EditorDashboard from './pages/editor/EditorDashboard.jsx'
import ClientDashboard from './pages/client/ClientDashboard.jsx'

const router = createBrowserRouter([
	{
		path: '/',
		element: <Navigate to="/login" replace />,
	},
	{
		path: '/login',
		element: <Login />,
	},
	{
		path: '/register',
		element: <Register />,
	},
	{
		path: '/unauthorized',
		element: <Unauthorized />,
	},
	{
		path: '/dashboard',
		element: (
			<ProtectedRoute>
				<Dashboard />
			</ProtectedRoute>
		),
	},
	{
		path: '/admin',
		element: (
			<ProtectedRoute requiredRole="admin">
				<AdminDashboard />
			</ProtectedRoute>
		),
	},
	{
		path: '/editor',
		element: (
			<ProtectedRoute requiredRole="editor">
				<EditorDashboard />
			</ProtectedRoute>
		),
	},
	{
		path: '/client',
		element: (
			<ProtectedRoute requiredRole="client">
				<ClientDashboard />
			</ProtectedRoute>
		),
	},
	{
		path: '*',
		element: <Navigate to="/login" replace />,
	},
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
)
