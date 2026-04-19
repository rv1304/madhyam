"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function CreatePost() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [contentBody, setContentBody] = useState('');
  const [tags, setTags] = useState('');
  const [error, setError] = useState('');

  const handlePublish = async (e) => {
    e.preventDefault();
    setError('');

    const tagsArray = tags.split(',').map(tag => tag.trim()).filter(t => t);

    try {
      const BASE = process.env.NEXT_PUBLIC_BLOG_URL || '/api/blog';
      const response = await fetch(`${BASE}/posts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include', // Important to pass JWT from auth middleware
        body: JSON.stringify({
          title,
          content_body: contentBody,
          tags: tagsArray
        })
      });

      if (response.ok) {
        const data = await response.json();
        alert('Post Published!');
        router.push(`/article/${data.slug}`);
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Failed to publish post');
      }
    } catch (err) {
      console.error(err);
      setError('An error occurred while publishing.');
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '40px 20px', fontFamily: 'system-ui' }}>
      <nav style={{ marginBottom: '40px', borderBottom: '1px solid #eee', paddingBottom: '20px' }}>
        <Link href="/" style={{ textDecoration: 'none', color: '#000', fontWeight: 'bold' }}>← Back to Home</Link>
      </nav>

      <h1>Create New Post</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      
      <form onSubmit={handlePublish} style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '20px' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Title</label>
          <input 
            type="text" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            placeholder="My Awesome Article"
            required
            style={{ width: '100%', padding: '10px', fontSize: '18px', border: '1px solid #ccc', borderRadius: '4px' }}
          />
        </div>

        <div>
           <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Tags (comma mapping)</label>
           <input 
            type="text" 
            value={tags} 
            onChange={(e) => setTags(e.target.value)} 
            placeholder="tech, coding, nextjs"
            style={{ width: '100%', padding: '10px', fontSize: '16px', border: '1px solid #ccc', borderRadius: '4px' }}
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Content</label>
          <textarea 
            value={contentBody} 
            onChange={(e) => setContentBody(e.target.value)} 
            placeholder="Tell your story..."
            required
            rows={15}
            style={{ width: '100%', padding: '10px', fontSize: '16px', border: '1px solid #ccc', borderRadius: '4px', resize: 'vertical' }}
          />
        </div>

        <button 
          type="submit" 
          style={{ padding: '12px 24px', background: 'rgb(26, 137, 23)', color: '#fff', fontSize: '16px', fontWeight: 'bold', border: 'none', borderRadius: '99px', cursor: 'pointer', alignSelf: 'flex-start' }}
        >
          Publish
        </button>
      </form>
    </div>
  );
}
