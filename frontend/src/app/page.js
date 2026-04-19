"use client";

import Link from "next/link";
import styles from "./home.module.css";
import { useEffect, useState } from 'react';

export default function HomePage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const BASE = process.env.NEXT_PUBLIC_BLOG_URL || '/api/blog';
        const res = await fetch(`${BASE}/posts`);
        if (res.ok) {
          const data = await res.json();
          setPosts(data);
        }
      } catch (err) {
        console.error('Error fetching posts:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div className={styles.page}>
      <nav className={styles.nav}>
        <Link href="/" className={styles.brand}>माध्यम</Link>
        <div className={styles.navLinks}>
          <Link href="/create" className={styles.navLogin}>Write</Link>
          <Link href="/login" className={styles.navLogin}>Sign in</Link>
          <Link href="/signup" className={styles.navSignup}>Get started</Link>
        </div>
      </nav>

      <div className={styles.hero}>
        <h1 className={styles.heroTitle}>Human stories & ideas</h1>
        <p className={styles.heroSub}>A place to read, write, and deepen your understanding.</p>
        <Link href="/create" className={styles.heroBtn}>Start writing</Link>
      </div>

      <div style={{ maxWidth: '800px', margin: '40px auto', padding: '0 20px' }}>
        <h2 style={{ borderBottom: '1px solid #eee', paddingBottom: '10px', marginBottom: '20px' }}>Latest Reads</h2>
        {loading ? (
          <p>Loading posts...</p>
        ) : posts.length === 0 ? (
          <p>No posts published yet.</p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
            {posts.map(post => (
              <div key={post._id} style={{ borderBottom: '1px solid #f0f0f0', paddingBottom: '20px' }}>
                <Link href={`/article/${post.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <h3 style={{ fontSize: '24px', marginBottom: '10px', fontWeight: 'bold' }}>{post.title}</h3>
                  <div style={{ color: '#555', marginBottom: '14px', lineHeight: '1.5' }}>
                    {post.content_body.substring(0, 180)}...
                  </div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    {post.tags?.map((tag, i) => (
                      <span key={i} style={{ background: '#f2f2f2', padding: '4px 10px', borderRadius: '4px', fontSize: '13px', color: '#444' }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
