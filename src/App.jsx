import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Nav from './components/Nav.jsx'

function useScrollRestore() {
	const location = useLocation();
	useEffect(() => {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}, [location.pathname]);
}

function Footer() {
	return (
		<footer className="mt-32 border-t border-gray-100 bg-gradient-to-b from-white to-gray-50">
			<div className="mx-auto max-w-7xl px-6 lg:px-8 py-12">
				<div className="flex flex-col items-center justify-between gap-6 md:flex-row">
					<div className="text-center md:text-left">
						<p className="font-display text-lg font-semibold text-gray-900">Kshitij Photography</p>
						<p className="text-sm text-gray-500 mt-1">Capturing moments that last forever</p>
					</div>
					<div className="flex items-center gap-6 text-sm text-gray-500">
						<a href="/gallery" className="hover:text-gray-900 transition-colors duration-200">Gallery</a>
						<a href="/about" className="hover:text-gray-900 transition-colors duration-200">About</a>
						<a href="/services" className="hover:text-gray-900 transition-colors duration-200">Services</a>
						<a href="/contact" className="hover:text-gray-900 transition-colors duration-200">Contact</a>
					</div>
				</div>
				<div className="mt-8 pt-8 border-t border-gray-200 text-center text-sm text-gray-500">
					<p>© {new Date().getFullYear()} Kshitij Photography. All rights reserved.</p>
				</div>
			</div>
		</footer>
	);
}

export default function Layout() {
	useScrollRestore();
	return (
		<div className="min-h-screen bg-white text-gray-900">
			<Nav />
			<main className="pt-20">
				<Outlet />
			</main>
			<Footer />
		</div>
	);
}
