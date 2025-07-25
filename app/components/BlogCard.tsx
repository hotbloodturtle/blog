import Link from 'next/link';
import { BlogPost } from '../lib/types';

interface BlogCardProps {
  post: BlogPost;
}

export default function BlogCard({ post }: BlogCardProps) {
  const { slug, metadata } = post;

  return (
    <article className="bg-white rounded-lg border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all duration-200 overflow-hidden">
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h2 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">
              <Link
                href={`/blog/${slug}`}
                className="hover:text-blue-600 transition-colors"
              >
                {metadata.title}
              </Link>
            </h2>
            
            {metadata.description && (
              <p className="text-gray-600 mb-4 line-clamp-3">
                {metadata.description}
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <time dateTime={metadata.date}>
            {new Date(metadata.date).toLocaleDateString('ko-KR', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </time>
          
          <div className="flex items-center space-x-3">
            {metadata.readingTime && (
              <span>{metadata.readingTime}분 읽기</span>
            )}
            {metadata.category && (
              <Link
                href={`/category/${encodeURIComponent(metadata.category)}`}
                className="px-2 py-1 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition-colors"
              >
                {metadata.category}
              </Link>
            )}
          </div>
        </div>

        {metadata.tags && metadata.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {metadata.tags.map((tag) => (
              <Link
                key={tag}
                href={`/tag/${encodeURIComponent(tag)}`}
                className="px-2 py-1 bg-gray-100 text-gray-700 text-sm rounded-md hover:bg-gray-200 transition-colors"
              >
                #{tag}
              </Link>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}