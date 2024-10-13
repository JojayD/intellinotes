import Link from "next/link"; // Import Link for navigation

// Define the Home component
export default function Home() {
	return (
		<div className='min-h-screen flex flex-col bg-gray-100'>
			{/* Hero Section */}
			<section className='bg-blue-600 text-white py-20 flex-grow'>
				<div className='container mx-auto text-center'>
					<h1 className='text-5xl font-bold'>Welcome to Intellinotes</h1>
					<p className='mt-4 text-lg'>
						Your AI-driven solution for interactive note-taking
					</p>
					<Link href='/login'>
						<button className='mt-8 px-8 py-3 bg-green-500 text-white rounded-lg hover:bg-green-700 transition'>
							Get Started
						</button>
					</Link>
				</div>
			</section>

			{/* Other sections... */}

			{/* Footer Section */}
			<footer className='bg-gray-800 text-white py-6'>
				<div className='container mx-auto text-center'>
					<p className='text-sm'>
						&copy; {new Date().getFullYear()} Intellinotes. All rights reserved.
					</p>
					<div className='mt-4'>
						<Link
							href='/'
							className='mr-4 hover:underline'
						>
							Home
						</Link>
						<Link
							href='/about'
							className='mr-4 hover:underline'
						>
							About
						</Link>
						<Link
							href='/contact'
							className='hover:underline'
						>
							Contact
						</Link>
					</div>
				</div>
			</footer>
		</div>
	);
}
