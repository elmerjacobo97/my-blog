import { getAllPosts } from '@/lib/posts';
import { SearchClient } from '@/components/search-client';

export default function BlogHome() {
  const posts = getAllPosts();

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <SearchClient posts={posts} />
    </div>
  );
}
