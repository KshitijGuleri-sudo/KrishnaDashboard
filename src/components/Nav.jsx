import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

export default function Nav() {
	const [open, setOpen] = useState(false);
	const [elevated, setElevated] = useState(false);

	useEffect(() => {
		const onKey = (e) => { if (e.key === 'Escape') setOpen(false); };
		const onScroll = () => { setElevated(window.scrollY > 2); };
		window.addEventListener('keydown', onKey);
		window.addEventListener('scroll', onScroll);
		onScroll();
		return () => {
			window.removeEventListener('keydown', onKey);
			window.removeEventListener('scroll', onScroll);
		};
	}, []);

	const linkClass = ({ isActive }) => `font-ui text-sm font-medium transition-colors duration-200 ${isActive ? 'text-gray-900' : 'text-gray-600 hover:text-gray-900'}`;

	return (
		<header className={`fixed inset-x-0 top-0 z-50 bg-white/95 backdrop-blur-md border-b ${elevated ? 'border-gray-200 shadow-sm' : 'border-gray-100'}`}>
			<div className="mx-auto max-w-7xl px-6 lg:px-8">
				<div className="flex h-20 items-center justify-between">
					<Link to="/" className="font-display text-xl font-semibold tracking-tight text-gray-900 hover:text-brand-600 transition-colors duration-200">
						Kshitij Photography
					</Link>
					<nav className="hidden md:flex items-center gap-8">
						<NavLink to="/gallery" className={linkClass}>Gallery</NavLink>
						<NavLink to="/about" className={linkClass}>About</NavLink>
						<NavLink to="/services" className={linkClass}>Services</NavLink>
						<NavLink to="/contact" className={linkClass}>Contact</NavLink>
						<Link to="/contact" className="font-ui inline-flex items-center rounded-full bg-gray-900 px-6 py-2.5 text-sm font-medium text-white hover:bg-black transition-all duration-200 shadow-md">
							Book Now
						</Link>
					</nav>
					<button aria-label="Menu" onClick={() => setOpen((v) => !v)} className="md:hidden inline-flex items-center justify-center rounded-lg border border-gray-200 px-3 py-2 text-gray-900 hover:bg-gray-50 transition-colors duration-200">
						<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"/></svg>
					</button>
				</div>
			</div>
			{open && (
				<div className="md:hidden border-t border-gray-100 bg-white/95 backdrop-blur-md">
					<div className="mx-auto max-w-7xl px-6 lg:px-8 py-6 grid gap-4 text-sm">
						<Link onClick={() => setOpen(false)} to="/gallery" className="font-ui text-gray-700 hover:text-gray-900 transition-colors duration-200">Gallery</Link>
						<Link onClick={() => setOpen(false)} to="/about" className="font-ui text-gray-700 hover:text-gray-900 transition-colors duration-200">About</Link>
						<Link onClick={() => setOpen(false)} to="/services" className="font-ui text-gray-700 hover:text-gray-900 transition-colors duration-200">Services</Link>
						<Link onClick={() => setOpen(false)} to="/contact" className="font-ui text-gray-700 hover:text-gray-900 transition-colors duration-200">Contact</Link>
						<Link onClick={() => setOpen(false)} to="/contact" className="font-ui inline-flex items-center rounded-full bg-gray-900 px-6 py-2.5 text-sm font-medium text-white hover:bg-black transition-all duration-200 w-fit mt-2">
							Book Now
						</Link>
					</div>
				</div>
			)}
		</header>
	);
}
