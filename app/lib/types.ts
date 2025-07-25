export interface BlogMetadata {
  title: string;
  date: string;
  description?: string;
  tags?: string[];
  category?: string;
  draft?: boolean;
  readingTime?: number;
}

export interface BlogPost {
  slug: string;
  metadata: BlogMetadata;
  content: string;
}

export type Tag = {
  name: string;
  count: number;
}

export type Category = {
  name: string;
  count: number;
}

export interface SearchIndex {
  slug: string;
  title: string;
  content: string;
  tags: string[];
  category?: string;
}