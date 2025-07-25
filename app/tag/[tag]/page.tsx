import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import BlogCard from "../../components/BlogCard";
import { getAllTags, getPostsByTag } from "../../lib/markdown";

interface TagPageProps {
  params: Promise<{
    tag: string;
  }>;
}

export async function generateStaticParams() {
  const tags = getAllTags();
  return tags.map((tag) => ({
    tag: encodeURIComponent(tag.name),
  }));
}

export async function generateMetadata({
  params,
}: TagPageProps): Promise<Metadata> {
  const { tag } = await params;
  const decodedTag = decodeURIComponent(tag);
  console.log(decodedTag, "decodedTag");
  const posts = getPostsByTag(decodedTag);

  if (posts.length === 0) {
    return {
      title: "태그를 찾을 수 없습니다",
    };
  }

  return {
    title: `${decodedTag} 태그`,
    description: `${decodedTag} 태그가 있는 ${posts.length}개의 포스트를 확인해보세요.`,
    openGraph: {
      title: `${decodedTag} 태그`,
      description: `${decodedTag} 태그가 있는 ${posts.length}개의 포스트를 확인해보세요.`,
    },
  };
}

export default async function TagPage({ params }: TagPageProps) {
  const { tag } = await params;
  const decodedTag = decodeURIComponent(tag);
  const posts = getPostsByTag(decodedTag);
  const allTags = getAllTags();

  if (posts.length === 0) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Breadcrumb */}
      <nav className="mb-8">
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Link href="/" className="hover:text-gray-900 transition-colors">
            홈
          </Link>
          <span>/</span>
          <Link href="/blog" className="hover:text-gray-900 transition-colors">
            블로그
          </Link>
          <span>/</span>
          <span className="text-gray-900">#{decodedTag}</span>
        </div>
      </nav>

      {/* Header */}
      <div className="mb-12">
        <div className="flex items-center mb-4">
          <h1 className="text-3xl font-bold text-gray-900">#{decodedTag}</h1>
          <span className="ml-3 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
            {posts.length}개 포스트
          </span>
        </div>
        <p className="text-gray-600">
          &quot;{decodedTag}&quot; 태그가 있는 모든 포스트입니다.
        </p>
      </div>

      {/* Posts */}
      <div className="space-y-8 mb-12">
        {posts.map((post) => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </div>

      {/* Related Tags */}
      <section className="border-t border-gray-200 pt-8">
        <h2 className="text-xl font-bold text-gray-900 mb-6">
          다른 태그 둘러보기
        </h2>
        <div className="flex flex-wrap gap-3">
          {allTags
            .filter((tag) => tag.name !== decodedTag)
            .slice(0, 10)
            .map((tag) => (
              <Link
                key={tag.name}
                href={`/tag/${encodeURIComponent(tag.name)}`}
                className="inline-flex items-center px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full transition-colors"
              >
                <span className="font-medium">#{tag.name}</span>
                <span className="ml-2 text-sm text-gray-500">
                  ({tag.count})
                </span>
              </Link>
            ))}
        </div>
      </section>
    </div>
  );
}
