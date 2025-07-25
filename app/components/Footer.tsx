export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-gray-50 mt-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-8">
          <div className="text-center text-gray-600">
            <p className="text-sm">
              © {new Date().getFullYear()} Blog. All rights reserved.
            </p>
            <p className="text-xs mt-2">
              Built with Next.js and Tailwind CSS
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}