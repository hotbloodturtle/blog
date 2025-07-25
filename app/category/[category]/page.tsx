import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import BlogCard from "../../components/BlogCard";
import { getAllCategories, getPostsByCategory } from "../../lib/markdown";

interface CategoryPageProps {
  params: Promise<{
    category: string;
  }>;
}

export async function generateStaticParams() {
  const categories = getAllCategories();
  return categories.map((category) => ({
    category: encodeURIComponent(category.name),
  }));
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { category } = await params;
  const decodedCategory = decodeURIComponent(category);
  console.log(decodedCategory, "decodedCategory");
  const posts = getPostsByCategory(decodedCategory);

  if (posts.length === 0) {
    return {
      title: "카테고리를 찾을 수 없습니다",
    };
  }

  return {
    title: `${decodedCategory} 카테고리`,
    description: `${decodedCategory} 카테고리의 ${posts.length}개 포스트를 확인해보세요.`,
    openGraph: {
      title: `${decodedCategory} 카테고리`,
      description: `${decodedCategory} 카테고리의 ${posts.length}개 포스트를 확인해보세요.`,
    },
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params;
  const decodedCategory = decodeURIComponent(category);
  const posts = getPostsByCategory(decodedCategory);
  const allCategories = getAllCategories();

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
          <span className="text-gray-900">{decodedCategory}</span>
        </div>
      </nav>

      {/* Header */}
      <div className="mb-12">
        <div className="flex items-center mb-4">
          <h1 className="text-3xl font-bold text-gray-900">
            {decodedCategory}
          </h1>
          <span className="ml-3 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
            {posts.length}개 포스트
          </span>
        </div>
        <p className="text-gray-600">
          &quot;{decodedCategory}&quot; 카테고리의 모든 포스트입니다.
        </p>
      </div>

      {/* Posts */}
      <div className="space-y-8 mb-12">
        {posts.map((post) => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </div>

      {/* Related Categories */}
      <section className="border-t border-gray-200 pt-8">
        <h2 className="text-xl font-bold text-gray-900 mb-6">
          다른 카테고리 둘러보기
        </h2>
        <div className="flex flex-wrap gap-3">
          {allCategories
            .filter((category) => category.name !== decodedCategory)
            .map((category) => (
              <Link
                key={category.name}
                href={`/category/${encodeURIComponent(category.name)}`}
                className="inline-flex items-center px-4 py-2 bg-green-100 hover:bg-green-200 text-green-700 rounded-full transition-colors"
              >
                <span className="font-medium">{category.name}</span>
                <span className="ml-2 text-sm text-green-600">
                  ({category.count})
                </span>
              </Link>
            ))}
        </div>
      </section>
    </div>
  );
}
