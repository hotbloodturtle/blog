import { getAllPosts } from '../lib/markdown';
import BlogCard from '../components/BlogCard';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '블로그',
  description: '개발 관련 글들을 모아놓은 블로그입니다.',
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          모든 포스트
        </h1>
        <p className="text-gray-600">
          {posts.length}개의 포스트가 있습니다.
        </p>
      </div>

      {posts.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-gray-400 mb-4">
            <svg
              className="mx-auto h-12 w-12"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            아직 포스트가 없습니다
          </h3>
          <p className="text-gray-600">
            첫 번째 포스트를 작성해보세요!
          </p>
        </div>
      ) : (
        <div className="space-y-8">
          {posts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}