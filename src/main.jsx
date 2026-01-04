import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import Home from './pages/Home.jsx'
import Gallery from './pages/Gallery.jsx'
import About from './pages/About.jsx'
import Services from './pages/Services.jsx'
import Contact from './pages/Contact.jsx'
import Dashboard from './pages/Dashboard.jsx'

const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		children: [
			{ index: true, element: <Home /> },
			{ path: 'gallery', element: <Gallery /> },
			{ path: 'about', element: <About /> },
			{ path: 'services', element: <Services /> },
			{ path: 'contact', element: <Contact /> },
		],
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
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
