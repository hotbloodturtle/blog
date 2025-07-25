import Link from 'next/link';
import { getRecentPosts, getAllTags } from './lib/markdown';

export default function Home() {
  const recentPosts = getRecentPosts(5);
  const tags = getAllTags().slice(0, 10); // 상위 10개 태그만 표시

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <section className="text-center mb-16">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
          개발자의 블로그
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          개인 생각 정리 및 웹앱 개발 기술 지식을 공유하는 공간입니다.
        </p>
        <Link
          href="/blog"
          className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
        >
          블로그 둘러보기
        </Link>
      </section>

      {/* Recent Posts */}
      <section className="mb-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-900">최근 포스트</h2>
          <Link
            href="/blog"
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            모든 포스트 보기 →
          </Link>
        </div>

        {recentPosts.length === 0 ? (
          <div className="text-center py-12 text-gray-600">
            아직 작성된 포스트가 없습니다.
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {recentPosts.map((post) => (
              <article
                key={post.slug}
                className="bg-white rounded-lg border border-gray-200 hover:border-gray-300 transition-colors overflow-hidden"
              >
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                    <Link
                      href={`/blog/${post.slug}`}
                      className="hover:text-blue-600 transition-colors"
                    >
                      {post.metadata.title}
                    </Link>
                  </h3>
                  
                  {post.metadata.description && (
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                      {post.metadata.description}
                    </p>
                  )}

                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <time>{post.metadata.date}</time>
                    {post.metadata.readingTime && (
                      <span>{post.metadata.readingTime}분 읽기</span>
                    )}
                  </div>

                  {post.metadata.tags && post.metadata.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-4">
                      {post.metadata.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* Popular Tags */}
      {tags.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">인기 태그</h2>
          <div className="flex flex-wrap gap-3">
            {tags.map((tag) => (
              <Link
                key={tag.name}
                href={`/tag/${encodeURIComponent(tag.name)}`}
                className="inline-flex items-center px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full transition-colors"
              >
                <span className="font-medium">{tag.name}</span>
                <span className="ml-2 text-sm text-gray-500">({tag.count})</span>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
