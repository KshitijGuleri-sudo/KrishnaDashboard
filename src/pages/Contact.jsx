export default function Contact() {
	return (
		<div className="mx-auto max-w-xl px-4 sm:px-6 lg:px-8 reveal">
			<h1 className="font-display text-3xl font-semibold tracking-tight">Get in touch</h1>
			<form className="mt-6 space-y-4">
				<div>
					<label className="block text-sm font-medium text-gray-700">Name</label>
					<input className="mt-1 w-full rounded-md border px-3 py-2 outline-none focus:ring-2 focus:ring-gray-900" placeholder="Your name" />
				</div>
				<div>
					<label className="block text-sm font-medium text-gray-700">Email</label>
					<input type="email" className="mt-1 w-full rounded-md border px-3 py-2 outline-none focus:ring-2 focus:ring-gray-900" placeholder="you@example.com" />
				</div>
				<div>
					<label className="block text-sm font-medium text-gray-700">Message</label>
					<textarea rows={4} className="mt-1 w-full rounded-md border px-3 py-2 outline-none focus:ring-2 focus:ring-gray-900" placeholder="Tell me about your project" />
				</div>
				<div className="flex justify-end">
					<button type="submit" className="inline-flex items-center rounded-md bg-gray-900 px-5 py-2.5 text-white hover:bg-gray-800">Send</button>
				</div>
			</form>
		</div>
	);
}
