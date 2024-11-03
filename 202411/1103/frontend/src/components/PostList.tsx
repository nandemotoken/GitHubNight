import { useState, useEffect } from 'react';
import { ghost } from '../lib/ghost';
import { Link } from 'react-router-dom';
import type { PostOrPage } from '@tryghost/content-api';

export function PostList() {
  const [posts, setPosts] = useState<PostOrPage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const fetchedPosts = await ghost.posts.browse({
          limit: 'all',
          include: ['tags', 'authors']
        });
        setPosts(fetchedPosts);
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {posts.map(post => (
        <article key={post.id} className="border rounded-lg p-4 hover:shadow-lg transition">
          {post.feature_image && (
            <img 
              src={post.feature_image}
              alt={post.title || ''}
              className="w-full h-48 object-cover rounded-t-lg mb-4"
            />
          )}
          <h2 className="text-xl font-bold mb-2">{post.title || ''}</h2>
          <p className="text-gray-600 mb-4">{post.excerpt || ''}</p>
          <Link 
            to={`/post/${post.slug}`}
            className="text-blue-500 hover:text-blue-700"
          >
            Read more →
          </Link>
        </article>
      ))}
    </div>
  );
}