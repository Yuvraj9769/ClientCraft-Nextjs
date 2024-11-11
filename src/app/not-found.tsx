import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
      <div className="text-center text-gray-900 dark:text-white">
        <h1 className="text-6xl font-extrabold mb-4">404</h1>
        <p className="text-lg mb-6">
          Oops! The page you are looking for does not exist.
        </p>
        <Link
          href="/"
          className="inline-block px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-300 transition-all duration-200"
        >
          Go to Home
        </Link>
      </div>
    </div>
  );
}
