import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { BlogPost, BlogMetadata, Tag, Category } from './types';

const postsDirectory = path.join(process.cwd(), 'posts');

export function getAllPostSlugs(): string[] {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }
  
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames
    .filter(fileName => fileName.endsWith('.md'))
    .map(fileName => fileName.replace(/\.md$/, ''));
}

export function getPostBySlug(slug: string): BlogPost | null {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);
    
    const metadata: BlogMetadata = {
      title: data.title || 'Untitled',
      date: data.date || new Date().toISOString().split('T')[0],
      description: data.description,
      tags: data.tags || [],
      category: data.category,
      draft: data.draft || false,
      readingTime: calculateReadingTime(content),
    };

    return {
      slug,
      metadata,
      content,
    };
  } catch (error) {
    console.error(`Error reading post ${slug}:`, error);
    return null;
  }
}

export function getAllPosts(): BlogPost[] {
  const slugs = getAllPostSlugs();
  const posts = slugs
    .map(slug => getPostBySlug(slug))
    .filter((post): post is BlogPost => post !== null && !post.metadata.draft)
    .sort((a, b) => {
      return new Date(b.metadata.date).getTime() - new Date(a.metadata.date).getTime();
    });

  return posts;
}

export function getRecentPosts(limit: number = 5): BlogPost[] {
  const allPosts = getAllPosts();
  return allPosts.slice(0, limit);
}

export function getPostsByTag(tag: string): BlogPost[] {
  const allPosts = getAllPosts();
  return allPosts.filter(post => 
    post.metadata.tags?.includes(tag)
  );
}

export function getPostsByCategory(category: string): BlogPost[] {
  const allPosts = getAllPosts();
  return allPosts.filter(post => 
    post.metadata.category === category
  );
}

export function getAllTags(): Tag[] {
  const allPosts = getAllPosts();
  const tagCount: { [key: string]: number } = {};

  allPosts.forEach(post => {
    post.metadata.tags?.forEach(tag => {
      tagCount[tag] = (tagCount[tag] || 0) + 1;
    });
  });

  return Object.entries(tagCount)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);
}

export function getAllCategories(): Category[] {
  const allPosts = getAllPosts();
  const categoryCount: { [key: string]: number } = {};

  allPosts.forEach(post => {
    if (post.metadata.category) {
      categoryCount[post.metadata.category] = (categoryCount[post.metadata.category] || 0) + 1;
    }
  });

  return Object.entries(categoryCount)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);
}

export function getRelatedPosts(currentSlug: string, limit: number = 3): BlogPost[] {
  const allPosts = getAllPosts();
  const currentPost = allPosts.find(post => post.slug === currentSlug);
  
  if (!currentPost) return [];

  const relatedPosts = allPosts
    .filter(post => post.slug !== currentSlug)
    .map(post => {
      let score = 0;
      
      // 같은 카테고리면 점수 증가
      if (post.metadata.category === currentPost.metadata.category) {
        score += 3;
      }
      
      // 공통 태그 개수만큼 점수 증가
      const commonTags = post.metadata.tags?.filter(tag => 
        currentPost.metadata.tags?.includes(tag)
      ) || [];
      score += commonTags.length * 2;
      
      return { post, score };
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ post }) => post);

  return relatedPosts;
}

function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200; // 평균 읽기 속도
  const words = content.trim().split(/\s+/).length;
  const readingTime = Math.ceil(words / wordsPerMinute);
  return readingTime;
}

export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // 특수문자 제거
    .replace(/\s+/g, '-') // 공백을 하이픈으로
    .replace(/-+/g, '-') // 연속된 하이픈을 하나로
    .trim();
}