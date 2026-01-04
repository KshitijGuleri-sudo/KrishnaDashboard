import { useEffect } from 'react'

function Hero() {
	return (
		<section className="relative overflow-hidden bg-gradient-to-br from-brand-50 via-white to-accent-50 min-h-screen flex items-center">
			{/* Background Elements */}
			<div className="absolute inset-0 overflow-hidden">
				<div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-brand-200/30 to-accent-200/30 rounded-full blur-3xl"></div>
				<div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-accent-200/30 to-brand-200/30 rounded-full blur-3xl"></div>
			</div>
			
			<div className="relative mx-auto max-w-7xl px-6 lg:px-8 py-20">
				<div className="grid items-center gap-16 lg:grid-cols-2">
					<div className="space-y-8">
						<div className="space-y-6 reveal">
							<div className="inline-flex items-center rounded-full bg-brand-100 px-4 py-2 text-sm font-medium text-brand-700">
								<span className="w-2 h-2 bg-brand-500 rounded-full mr-2 animate-pulse"></span>
								Available Worldwide
							</div>
							<h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight">
								<span className="bg-gradient-to-r from-brand-600 via-brand-700 to-accent-600 bg-clip-text text-transparent">
									Timeless
								</span>
								<br />
								<span className="text-gray-900">Photography</span>
							</h1>
							<p className="text-xl text-gray-600 leading-relaxed max-w-lg">
								Capturing authentic moments with a refined, natural aesthetic. 
								Portraits, weddings, and editorial work that tells your story.
							</p>
						</div>
						
						<div className="flex flex-col sm:flex-row gap-4 reveal reveal-delay-1">
							<a href="/gallery" className="group font-ui inline-flex items-center justify-center rounded-full bg-gradient-to-r from-brand-500 to-brand-600 px-8 py-4 text-base font-medium text-white hover:from-brand-600 hover:to-brand-700 transition-all duration-200 shadow-lg hover:shadow-xl">
								<span>View Portfolio</span>
								<svg className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
								</svg>
							</a>
							<a href="/contact" className="font-ui inline-flex items-center justify-center rounded-full border-2 border-brand-200 px-8 py-4 text-base font-medium text-brand-700 hover:border-brand-300 hover:bg-brand-50 transition-all duration-200">
								Book a Session
							</a>
						</div>

						{/* Stats */}
						<div className="grid grid-cols-3 gap-8 pt-8 reveal reveal-delay-2">
							<div className="text-center">
								<div className="font-display text-3xl font-bold text-brand-600">500+</div>
								<div className="text-sm text-gray-600">Sessions</div>
							</div>
							<div className="text-center">
								<div className="font-display text-3xl font-bold text-brand-600">5+</div>
								<div className="text-sm text-gray-600">Years</div>
							</div>
							<div className="text-center">
								<div className="font-display text-3xl font-bold text-brand-600">50+</div>
								<div className="text-sm text-gray-600">Cities</div>
							</div>
						</div>
					</div>
					
					<div className="relative reveal reveal-delay-1">
						<div className="relative overflow-hidden rounded-3xl shadow-2xl">
							<img 
								src="https://images.pexels.com/photos/918596/pexels-photo-918596.jpeg" 
								alt="Featured Photography" 
								loading="eager" 
								decoding="async" 
								className="h-[600px] w-full object-cover" 
							/>
							<div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
							<div className="absolute bottom-6 left-6 right-6">
								<div className="rounded-2xl bg-white/95 backdrop-blur-sm p-4 shadow-lg">
									<div className="flex items-center justify-between">
										<div>
											<p className="font-medium text-gray-900">Featured Work</p>
											<p className="text-sm text-gray-600">Portrait Session • 2025</p>
										</div>
										<div className="flex space-x-2">
											<div className="w-2 h-2 bg-brand-500 rounded-full"></div>
											<div className="w-2 h-2 bg-gray-300 rounded-full"></div>
											<div className="w-2 h-2 bg-gray-300 rounded-full"></div>
										</div>
									</div>
								</div>
							</div>
						</div>
						
						{/* Floating Elements */}
						<div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-brand-400 to-accent-400 rounded-full opacity-20 blur-xl"></div>
						<div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-tr from-accent-400 to-brand-400 rounded-full opacity-20 blur-xl"></div>
					</div>
				</div>
			</div>
		</section>
	);
}

function FeaturedWork() {
	const work = [
		{ 
			title: 'Portraits', 
			desc: 'Authentic, editorial-inspired portraits that capture your true essence.',
			image: 'https://images.pexels.com/photos/8642561/pexels-photo-8642561.jpeg',
			count: '150+'
		},
		{ 
			title: 'Weddings', 
			desc: 'Timeless wedding photography with candid moments and elegant details.',
			image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg',
			count: '80+'
		},
		{ 
			title: 'Editorial', 
			desc: 'Brand campaigns and lifestyle photography with a modern aesthetic.',
			image: 'https://images.pexels.com/photos/1024960/pexels-photo-1024960.jpeg',
			count: '40+'
		},
	];
	
	return (
		<section className="py-20 lg:py-28 bg-white">
			<div className="mx-auto max-w-7xl px-6 lg:px-8">
				<div className="text-center space-y-4 mb-16 reveal">
					<h2 className="font-display text-4xl font-bold tracking-tight text-gray-900">Featured Work</h2>
					<p className="text-xl text-gray-600 max-w-2xl mx-auto">
						Explore my portfolio across different photography styles and categories.
					</p>
				</div>
				
				<div className="grid gap-8 lg:grid-cols-3">
					{work.map((item, idx) => (
						<a key={item.title} href="/gallery" className={`group block rounded-3xl overflow-hidden bg-white shadow-lg hover:shadow-2xl transition-all duration-500 card-hover reveal ${idx === 0 ? 'reveal-delay-1' : idx === 1 ? 'reveal-delay-2' : 'reveal-delay-3'}`}>
							<div className="relative h-64 overflow-hidden">
								<img src={item.image} alt={item.title} className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-700" />
								<div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
								<div className="absolute top-4 right-4">
									<span className="rounded-full bg-white/90 backdrop-blur px-3 py-1 text-sm font-medium text-gray-900">
										{item.count}
									</span>
								</div>
							</div>
							<div className="p-6">
								<h3 className="font-display text-xl font-semibold text-gray-900 mb-2 group-hover:text-brand-600 transition-colors">
									{item.title}
								</h3>
								<p className="text-gray-600 leading-relaxed">{item.desc}</p>
							</div>
						</a>
					))}
				</div>
			</div>
		</section>
	);
}

function Process() {
	const steps = [
		{ 
			num: '01', 
			title: 'Consultation', 
			desc: 'We discuss your vision, style preferences, and location options.',
			icon: '💬'
		},
		{ 
			num: '02', 
			title: 'Photoshoot', 
			desc: 'A relaxed, guided session capturing authentic moments.',
			icon: '📸'
		},
		{ 
			num: '03', 
			title: 'Delivery', 
			desc: 'Hand-edited images delivered within 7 days via online gallery.',
			icon: '✨'
		},
	];
	
	return (
		<section className="py-20 lg:py-28 bg-gradient-to-br from-brand-50 to-accent-50">
			<div className="mx-auto max-w-7xl px-6 lg:px-8">
				<div className="text-center space-y-4 mb-16 reveal">
					<h2 className="font-display text-4xl font-bold tracking-tight text-gray-900">How It Works</h2>
					<p className="text-xl text-gray-600 max-w-2xl mx-auto">
						A simple, streamlined process from consultation to final delivery.
					</p>
				</div>
				
				<div className="grid gap-8 lg:grid-cols-3">
					{steps.map((step, idx) => (
						<div key={step.title} className={`text-center reveal ${idx === 0 ? 'reveal-delay-1' : idx === 1 ? 'reveal-delay-2' : 'reveal-delay-3'}`}>
							<div className="relative mb-6">
								<div className="mx-auto w-20 h-20 bg-gradient-to-br from-brand-500 to-brand-600 rounded-full flex items-center justify-center text-white text-2xl shadow-lg">
									{step.icon}
								</div>
								<div className="absolute -top-2 -right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md">
									<span className="text-xs font-bold text-brand-600">{step.num}</span>
								</div>
							</div>
							<h3 className="font-display text-xl font-semibold text-gray-900 mb-3">{step.title}</h3>
							<p className="text-gray-600 leading-relaxed">{step.desc}</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}

function Testimonials() {
	const testimonials = [
		{ 
			name: 'Priya & Arjun', 
			role: 'Wedding Couple', 
			text: 'Kshitij captured our wedding day perfectly. Every photo feels like a memory we can step back into.',
			rating: 5
		},
		{ 
			name: 'Ishita', 
			role: 'Portrait Client', 
			text: 'The portrait session was so relaxed and fun. The photos are stunning and feel authentically me.',
			rating: 5
		},
		{ 
			name: 'Studio Raj', 
			role: 'Brand Partner', 
			text: 'Professional, creative, and detail-oriented. Our campaign images elevated the entire brand.',
			rating: 5
		},
	];
	
	return (
		<section className="py-20 lg:py-28 bg-white">
			<div className="mx-auto max-w-7xl px-6 lg:px-8">
				<div className="text-center space-y-4 mb-16 reveal">
					<h2 className="font-display text-4xl font-bold tracking-tight text-gray-900">Client Stories</h2>
					<p className="text-xl text-gray-600 max-w-2xl mx-auto">
						What clients say about working with me.
					</p>
				</div>
				
				<div className="grid gap-8 lg:grid-cols-3">
					{testimonials.map((testimonial, idx) => (
						<div key={testimonial.name} className={`rounded-3xl border border-brand-100 bg-white p-8 shadow-lg hover:shadow-xl transition-all duration-300 card-hover reveal ${idx === 0 ? 'reveal-delay-1' : idx === 1 ? 'reveal-delay-2' : 'reveal-delay-3'}`}>
							<div className="flex items-center gap-1 mb-4">
								{Array.from({ length: testimonial.rating }).map((_, i) => (
									<svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5 text-brand-500">
										<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.801 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118L10.95 13.91a1 1 0 00-1.175 0l-2.736 1.972c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L3.405 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
									</svg>
								))}
							</div>
							<blockquote className="text-gray-700 leading-relaxed mb-6">"{testimonial.text}"</blockquote>
							<div className="flex items-center">
								<div className="w-12 h-12 bg-gradient-to-br from-brand-400 to-brand-600 rounded-full flex items-center justify-center text-white font-semibold mr-4">
									{testimonial.name.split(' ').map(n => n[0]).join('')}
								</div>
								<div>
									<div className="font-semibold text-gray-900">{testimonial.name}</div>
									<div className="text-sm text-gray-500">{testimonial.role}</div>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}

function CTA() {
	return (
		<section className="py-20 lg:py-28 bg-gradient-to-r from-brand-600 via-brand-700 to-accent-600">
			<div className="mx-auto max-w-7xl px-6 lg:px-8">
				<div className="text-center space-y-8 reveal">
					<div className="space-y-4">
						<h2 className="font-display text-4xl font-bold tracking-tight text-white">
							Ready to Create Something Beautiful?
						</h2>
						<p className="text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
							Let's capture your story with authentic, timeless photography. 
							Get in touch and I'll respond within 24 hours.
						</p>
					</div>
					
					<div className="flex flex-col sm:flex-row gap-4 justify-center">
						<a href="/contact" className="group font-ui inline-flex items-center justify-center rounded-full bg-white px-8 py-4 text-base font-medium text-brand-600 hover:bg-gray-50 transition-all duration-200 shadow-lg hover:shadow-xl">
							<span>Book Your Session</span>
							<svg className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
							</svg>
						</a>
						<a href="/gallery" className="font-ui inline-flex items-center justify-center rounded-full border-2 border-white/30 px-8 py-4 text-base font-medium text-white hover:border-white/50 hover:bg-white/10 transition-all duration-200">
							View Portfolio
						</a>
					</div>
					
					<div className="pt-8">
						<p className="text-white/70 text-sm">
							Based in Pune, India • Available worldwide
						</p>
					</div>
				</div>
			</div>
		</section>
	);
}

export default function Home() {
	useEffect(() => {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}, []);
	return (
		<>
			<Hero />
			<FeaturedWork />
			<Process />
			<Testimonials />
			<CTA />
		</>
	);
}
