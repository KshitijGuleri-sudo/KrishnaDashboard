export default function Services() {
	const services = [
		{ title: "Portraits", desc: "Studio or on-location portrait sessions tailored to you." },
		{ title: "Couples & Weddings", desc: "From proposals to wedding days, candid and timeless." },
		{ title: "Editorial", desc: "Brand stories and lifestyle campaigns with a refined look." },
	];
	return (
		<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 reveal">
			<h1 className="font-display text-3xl font-semibold tracking-tight">Services</h1>
			<div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
				{services.map((s) => (
					<div key={s.title} className="rounded-2xl border p-6">
						<h3 className="font-semibold">{s.title}</h3>
						<p className="text-gray-600 mt-1">{s.desc}</p>
					</div>
				))}
			</div>
		</div>
	);
}
