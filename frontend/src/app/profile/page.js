"use client";

import Link from "next/link";
import styles from "./profile.module.css";

const POSTS = [
  {
    id: 1,
    tag: "JavaScript",
    title: "Why React Server Components Will Change Everything",
    excerpt: "React Server Components represent a fundamental shift in how we build web apps.",
    readTime: "6 min read",
    date: "Mar 20, 2025",
    claps: 312,
  },
  {
    id: 2,
    tag: "System Design",
    title: "Designing a Distributed Cache from Scratch",
    excerpt: "Caching is deceptively simple. But building one that scales across data centers?",
    readTime: "9 min read",
    date: "Mar 10, 2025",
    claps: 528,
  },
  {
    id: 3,
    tag: "Career",
    title: "The Senior Engineer's Quiet Superpower: Saying No",
    excerpt: "After ten years in software, I've learned that the most important skill isn't coding.",
    readTime: "4 min read",
    date: "Feb 28, 2025",
    claps: 924,
  },
];

export default function ProfilePage() {
  return (
    <div className={styles.page}>
      {/* Navbar */}
      <nav className={styles.navbar}>
        <Link href="/homepage" className={styles.logo}>
          माध्यम
        </Link>
        <div className={styles.navRight}>
          <Link href="/blog" className={styles.writeBtn}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={styles.writeBtnIcon}>
              <path d="M12 20h9M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
            </svg>
            Write
          </Link>
          <Link href="/profile" className={styles.avatar}>
            RV
          </Link>
        </div>
      </nav>

      {/* Profile Header */}
      <div className={styles.profileHeader}>
        <div className={styles.profileHeaderInner}>
          <div className={styles.bigAvatar}>RV</div>
          <div className={styles.profileInfo}>
            <h1 className={styles.profileName}>Raghav Vashisht</h1>
            <p className={styles.profileBio}>
              Software engineer & occasional writer. Building things on the web. Interested in distributed systems, great UX, and strong coffee.
            </p>
            <div className={styles.profileStats}>
              <span className={styles.stat}><strong>3</strong> Stories</span>
              <span className={styles.statDot}>·</span>
              <span className={styles.stat}><strong>1.7k</strong> Claps</span>
              <span className={styles.statDot}>·</span>
              <span className={styles.stat}><strong>248</strong> Followers</span>
            </div>
          </div>
          <div className={styles.profileActions}>
            <Link href="/blog" className={styles.newStoryBtn}>New story</Link>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className={styles.tabRow}>
        <div className={styles.tabInner}>
          <button className={`${styles.tab} ${styles.tabActive}`}>Home</button>
          <button className={styles.tab}>Lists</button>
          <button className={styles.tab}>About</button>
        </div>
      </div>

      {/* Content */}
      <div className={styles.content}>
        <main className={styles.stories}>
          <h2 className={styles.storiesHeading}>Your stories</h2>
          {POSTS.map((post) => (
            <article key={post.id} className={styles.card}>
              <div className={styles.cardTop}>
                <div className={styles.cardText}>
                  <span className={styles.tagPill}>{post.tag}</span>
                  <Link href="/blog" className={styles.cardTitle}>{post.title}</Link>
                  <p className={styles.cardExcerpt}>{post.excerpt}</p>
                </div>
                <div className={styles.cardThumb}></div>
              </div>
              <div className={styles.cardMeta}>
                <span className={styles.metaDate}>{post.date}</span>
                <span className={styles.metaDot}>·</span>
                <span className={styles.metaRead}>{post.readTime}</span>
                <span className={styles.metaDot}>·</span>
                <span className={styles.metaClaps}>👏 {post.claps}</span>
                <div className={styles.cardActions}>
                  <button className={styles.editBtn}>Edit</button>
                  <button className={styles.moreBtn}>···</button>
                </div>
              </div>
            </article>
          ))}
        </main>
      </div>
    </div>
  );
}
