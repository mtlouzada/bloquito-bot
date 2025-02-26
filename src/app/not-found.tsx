import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-600 to-blue-500 text-white">
      <div className="text-center">
        <img
          src="/404-illustration.svg" // Replace with your illustration path
          alt="404 Illustration"
          className="w-64 h-64 mx-auto"
        />
        <h1 className="text-9xl font-bold mt-6">404</h1>
        <p className="text-2xl mt-4">Oops! Page not found.</p>
        <p className="mt-2">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          href="/"
          className="mt-6 inline-block px-6 py-3 bg-white text-purple-600 rounded-lg shadow-lg hover:bg-purple-100 transition duration-300"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
}