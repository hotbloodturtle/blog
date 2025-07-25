---
title: "Next.js로 블로그 만들기 완벽 가이드"
date: "2024-01-20"
description: "Next.js 15와 TypeScript를 사용해서 개인 블로그를 만드는 방법을 단계별로 설명합니다."
tags: ["Next.js", "TypeScript", "블로그", "웹개발"]
category: "튜토리얼"
---

# Next.js로 블로그 만들기 완벽 가이드

Next.js 15를 사용해서 개인 블로그를 만드는 방법을 단계별로 알아보겠습니다.

## 프로젝트 설정

먼저 Next.js 프로젝트를 생성합니다:

```bash
npx create-next-app@latest my-blog --typescript --tailwind --eslint
cd my-blog
```

## 필요한 패키지 설치

마크다운 처리를 위한 패키지들을 설치합니다:

```bash
npm install gray-matter react-markdown remark-gfm
npm install @types/gray-matter --save-dev
```

## 폴더 구조

```
my-blog/
├── app/
│   ├── blog/
│   │   └── [slug]/
│   │       └── page.tsx
│   ├── components/
│   │   ├── Header.tsx
│   │   └── BlogCard.tsx
│   ├── lib/
│   │   └── markdown.ts
│   └── layout.tsx
├── posts/
│   ├── first-post.md
│   └── second-post.md
└── public/
```

## 마크다운 처리 함수

`app/lib/markdown.ts` 파일을 생성합니다:

```typescript
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'posts');

export function getAllPosts() {
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames
    .filter(name => name.endsWith('.md'))
    .map(fileName => {
      const slug = fileName.replace(/\.md$/, '');
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data, content } = matter(fileContents);

      return {
        slug,
        metadata: data,
        content
      };
    });

  return allPostsData.sort((a, b) => {
    return new Date(b.metadata.date).getTime() - new Date(a.metadata.date).getTime();
  });
}
```

## 블로그 포스트 페이지

동적 라우팅을 사용해서 개별 포스트 페이지를 만듭니다:

```typescript
// app/blog/[slug]/page.tsx
import { getAllPosts } from '@/app/lib/markdown';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map(post => ({
    slug: post.slug
  }));
}

export default function BlogPost({ params }: { params: { slug: string } }) {
  const posts = getAllPosts();
  const post = posts.find(p => p.slug === params.slug);

  if (!post) {
    return <div>포스트를 찾을 수 없습니다.</div>;
  }

  return (
    <article className="prose max-w-none">
      <h1>{post.metadata.title}</h1>
      <time>{post.metadata.date}</time>
      <ReactMarkdown remarkPlugins={[remarkGfm]}>
        {post.content}
      </ReactMarkdown>
    </article>
  );
}
```

## 성능 최적화 팁

1. **정적 생성 활용**: `generateStaticParams`로 모든 포스트를 빌드 타임에 생성
2. **이미지 최적화**: Next.js Image 컴포넌트 사용
3. **메타데이터 설정**: SEO를 위한 적절한 메타데이터 설정

## 마치며

이제 기본적인 블로그 구조가 완성되었습니다. 다음 단계로는 검색 기능, 태그 시스템 등을 추가할 수 있습니다.