import { useEffect, useMemo, useState } from 'react'

// Multiple high-quality images for variety
const IMAGE_URLS = [

]

const ALL_IMAGES = Array.from({ length: 24 }).map((_, i) => ({
	id: i + 1,
	src: IMAGE_URLS[i % IMAGE_URLS.length],
	category: i % 4 === 0 ? 'portraits' : i % 4 === 1 ? 'weddings' : i % 4 === 2 ? 'editorial' : 'dance',
	ratio: i % 5 === 0 ? 'wide' : i % 5 === 1 ? 'tall' : i % 5 === 2 ? 'large' : 'square',
}))

const CATEGORIES = [
	{ key: 'all', label: 'All Work' },
	{ key: 'portraits', label: 'Portraits' },
	{ key: 'weddings', label: 'Weddings' },
	{ key: 'editorial', label: 'Editorial' },
	{ key: 'dance', label: 'Dance' },
]

export default function Gallery() {
	const [active, setActive] = useState('all')
	const [lightbox, setLightbox] = useState(null) // { id, src, category }

	useEffect(() => {
		const onKey = (e) => { if (e.key === 'Escape') setLightbox(null) }
		window.addEventListener('keydown', onKey)
		return () => window.removeEventListener('keydown', onKey)
	}, [])

	const images = useMemo(() => {
		if (active === 'all') return ALL_IMAGES
		return ALL_IMAGES.filter((img) => img.category === active)
	}, [active])

	const activeCategory = CATEGORIES.find((c) => c.key === active)

	// Enhanced masonry layout with varied sizes
	const getTileClasses = (img) => {
		switch (img.ratio) {
			case 'wide': return 'col-span-2 aspect-[16/9]'
			case 'tall': return 'row-span-2 aspect-[3/4]'
			case 'large': return 'col-span-2 row-span-2 aspect-square'
			default: return 'aspect-square'
		}
	}

	return (
		<div className="py-20 lg:py-28 bg-gradient-to-b from-white to-brand-50/20">
			<div className="mx-auto max-w-7xl px-6 lg:px-8">
				<div className="text-center space-y-6 mb-16 reveal">
					<h1 className="font-display text-5xl font-bold tracking-tight text-gray-900">Gallery</h1>
					<p className="text-xl text-gray-600 max-w-2xl mx-auto">
						Explore portraits, weddings, editorial, and dance photography.
					</p>
				</div>

				<div className="flex flex-wrap justify-center gap-3 mb-12 reveal">
					{CATEGORIES.map((c) => (
						<button
							key={c.key}
							onClick={() => setActive(c.key)}
							className={`font-ui rounded-full px-6 py-3 text-sm font-medium transition-all duration-200 ${
								active === c.key
									? 'bg-gradient-to-r from-brand-500 to-brand-600 text-white shadow-lg'
									: 'bg-white border border-gray-200 text-gray-700 hover:border-brand-300 hover:text-brand-700 hover:bg-brand-50'
							}`}
						>
							{c.label}
						</button>
					))}
				</div>

				<div className="mb-8 text-center reveal">
					<p className="font-ui text-sm text-gray-500">
						Showing {images.length} {activeCategory?.label?.toLowerCase()}
					</p>
				</div>

				{/* Enhanced masonry grid */}
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-[200px]">
					{images.map((img, idx) => (
						<button
							key={img.id}
							onClick={() => setLightbox({ id: img.id, src: img.src, category: img.category })}
							className={`group relative overflow-hidden rounded-3xl bg-white focus:outline-none focus:ring-2 focus:ring-brand-500 card-hover reveal ${idx % 4 === 0 ? 'reveal-delay-1' : idx % 4 === 1 ? 'reveal-delay-2' : idx % 4 === 2 ? 'reveal-delay-3' : ''}`}
						>
							<div className={`h-full w-full ${getTileClasses(img)}`}>
								<img 
									src={img.src} 
									alt={`${img.category} ${img.id}`} 
									loading="lazy" 
									decoding="async" 
									className="h-full w-full object-cover transition-all duration-700 group-hover:scale-110" 
								/>
								{/* Enhanced overlay */}
								<div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
								{/* Category badge */}
								<div className="absolute bottom-4 left-4 right-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
									<span className="inline-flex items-center rounded-full bg-white/95 backdrop-blur px-3 py-1.5 text-xs font-medium text-gray-900 capitalize shadow-lg">
										{img.category}
									</span>
								</div>
								{/* Hover icon */}
								<div className="absolute top-4 right-4 transform scale-0 group-hover:scale-100 transition-transform duration-300">
									<div className="rounded-full bg-white/90 backdrop-blur p-2 shadow-lg">
										<svg className="h-4 w-4 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
										</svg>
									</div>
								</div>
							</div>
						</button>
					))}
				</div>

				{lightbox && (
					<div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm p-4 sm:p-8 flex items-center justify-center" onClick={() => setLightbox(null)}>
						<div className="relative w-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
							<div className="absolute -top-12 right-0 left-0 mx-auto flex max-w-5xl items-center justify-end gap-3 text-white/90">
								<a href={lightbox.src} target="_blank" rel="noreferrer" className="font-ui inline-flex items-center rounded-full border border-white/30 px-3 py-1.5 text-xs hover:bg-white/10">Open original</a>
								<button aria-label="Close" className="font-ui inline-flex items-center rounded-full border border-white/30 px-3 py-1.5 text-xs hover:bg-white/10" onClick={() => setLightbox(null)}>Close ✕</button>
							</div>
							<div className="overflow-hidden rounded-3xl bg-white shadow-2xl ring-1 ring-black/10">
								<div className="relative">
									<img src={lightbox.src} alt={`${lightbox.category} ${lightbox.id}`} className="w-full h-auto max-w-[90vw] max-h-[85vh] object-contain" decoding="async" />
									<div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4 text-white">
										<div className="flex items-center justify-between">
											<p className="font-ui text-sm capitalize">{lightbox.category}</p>
											<p className="font-ui text-xs text-white/80">Pexels</p>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				)}

				<div className="mt-16 text-center reveal">
					<div className="rounded-3xl bg-gradient-to-r from-brand-50 to-accent-50 p-12">
						<h3 className="font-display text-2xl font-semibold text-gray-900 mb-4">Love what you see?</h3>
						<p className="text-gray-600 mb-6">Let's create something beautiful together.</p>
						<a href="/contact" className="font-ui inline-flex items-center rounded-full bg-gradient-to-r from-brand-500 to-brand-600 px-8 py-3 text-base font-medium text-white hover:from-brand-600 hover:to-brand-700 shadow-lg hover:shadow-xl transition-all duration-200">
							Book Your Session
						</a>
					</div>
				</div>
			</div>
		</div>
	)
}
