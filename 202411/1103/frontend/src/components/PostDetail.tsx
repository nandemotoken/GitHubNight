import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ghost } from '../lib/ghost';
import type { PostOrPage, Author } from '@tryghost/content-api';

export function PostDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<PostOrPage | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      if (!slug) return;
      try {
        const fetchedPost = await ghost.posts.read({ slug }, { include: ['authors'] });
        setPost(fetchedPost);
      } catch (error) {
        console.error('Error fetching post:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  if (loading) return <div>Loading...</div>;
  if (!post) return <div>Post not found</div>;

  return (
    <article className="max-w-3xl mx-auto p-4">
      <h1 className="text-4xl font-bold mb-4">{post.title || ''}</h1>
      {post.feature_image && (
        <img 
          src={post.feature_image}
          alt={post.title || ''}
          className="w-full h-64 object-cover rounded-lg mb-4"
        />
      )}
      <div className="flex items-center mb-6">
        {post.primary_author?.profile_image && (
          <img 
            src={post.primary_author.profile_image}
            alt={post.primary_author.name || ''}
            className="w-10 h-10 rounded-full mr-3"
          />
        )}
        <div>
          <p className="font-medium">{post.primary_author?.name}</p>
          <p className="text-gray-500">
            {post.published_at ? new Date(post.published_at).toLocaleDateString() : ''}
          </p>
        </div>
      </div>
      <div 
        className="prose max-w-none"
        dangerouslySetInnerHTML={{ __html: post.html || '' }}
      />
    </article>
  );
}