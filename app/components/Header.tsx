import Link from 'next/link';

export default function Header() {
  return (
    <header className="border-b border-gray-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold text-gray-900 hover:text-gray-700 transition-colors">
              Blog
            </Link>
          </div>
          
          <nav className="flex items-center space-x-8">
            <Link
              href="/"
              className="text-gray-600 hover:text-gray-900 transition-colors font-medium"
            >
              홈
            </Link>
            <Link
              href="/blog"
              className="text-gray-600 hover:text-gray-900 transition-colors font-medium"
            >
              블로그
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}