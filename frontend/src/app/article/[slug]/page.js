"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function SingleArticle({ params }) {
  const [post, setPost] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // React allows unwrapping params dynamically in Next app router, 
    // but occasionally requires await params. Let's do a safe access.
    const fetchPost = async () => {
      try {
        const BASE = process.env.NEXT_PUBLIC_BLOG_URL || '/api/blog';
        const res = await fetch(`${BASE}/posts/${slug}`);
        if (res.ok) {
          const data = await res.json();
          setPost(data);
        } else {
          setError('Article not found.');
        }
      } catch (err) {
        console.error(err);
        setError('Failed to fetch article.');
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [params.slug]);

  if (loading) return <div style={{ textAlign: 'center', padding: '50px' }}>Loading...</div>;
  if (error) return <div style={{ textAlign: 'center', padding: '50px', color: 'red' }}>{error}</div>;
  if (!post) return null;

  return (
    <div style={{ maxWidth: '700px', margin: '0 auto', padding: '60px 20px', fontFamily: 'Georgia, serif' }}>
      <nav style={{ marginBottom: '40px', fontFamily: 'system-ui' }}>
        <Link href="/" style={{ textDecoration: 'none', color: 'rgb(26, 137, 23)', fontWeight: 'bold' }}>← Back to Home</Link>
      </nav>

      <h1 style={{ fontSize: '42px', lineHeight: '1.2', marginBottom: '16px', color: '#111' }}>{post.title}</h1>
      
      <div style={{ display: 'flex', gap: '8px', marginBottom: '32px', fontFamily: 'system-ui', color: '#666' }}>
        {post.tags?.map((tag, i) => (
          <span key={i} style={{ background: '#f2f2f2', padding: '4px 8px', borderRadius: '4px', fontSize: '13px' }}>
            {tag}
          </span>
        ))}
      </div>

      <div style={{ fontSize: '20px', lineHeight: '1.8', color: '#222', whiteSpace: 'pre-wrap' }}>
        {post.content_body}
      </div>
    </div>
  );
}
