"use client";

import Link from "next/link";
import styles from "./homepage.module.css";

const MOCK_POSTS = [
  {
    id: 1,
    author: "Arjun Sharma",
    authorAvatar: "AS",
    tag: "JavaScript",
    title: "Why React Server Components Will Change Everything",
    excerpt:
      "React Server Components represent a fundamental shift in how we build web apps. Here's what it means for your next project and why you should care.",
    readTime: "6 min read",
    date: "Mar 20",
    claps: 312,
  },
  {
    id: 2,
    author: "Priya Nair",
    authorAvatar: "PN",
    tag: "System Design",
    title: "Designing a Distributed Cache from Scratch",
    excerpt:
      "Caching is deceptively simple. But building one that scales across data centers? That's a different beast entirely. Let's break it down.",
    readTime: "9 min read",
    date: "Mar 19",
    claps: 528,
  },
  {
    id: 3,
    author: "Kabir Mehta",
    authorAvatar: "KM",
    tag: "Career",
    title: "The Senior Engineer's Quiet Superpower: Saying No",
    excerpt:
      "After ten years in software, I've learned that the most important skill isn't coding. It's the discipline to decline the right things.",
    readTime: "4 min read",
    date: "Mar 18",
    claps: 924,
  },
  {
    id: 4,
    author: "Sneha Rao",
    authorAvatar: "SR",
    tag: "AI/ML",
    title: "Building a RAG Pipeline Without the Hype",
    excerpt:
      "Retrieval-Augmented Generation sounds fancy. But at its core it's a surprisingly elegant engineering problem. Here's a practical guide.",
    readTime: "7 min read",
    date: "Mar 17",
    claps: 741,
  },
  {
    id: 5,
    author: "Vivek Anand",
    authorAvatar: "VA",
    tag: "Open Source",
    title: "I Spent 6 Months Maintaining an Open Source Project. Here's What I Learned.",
    excerpt:
      "From dealing with toxic contributors to celebrating unexpected wins, open source is a wild ride. An honest reflection.",
    readTime: "5 min read",
    date: "Mar 16",
    claps: 619,
  },
];

const TAGS = ["For you", "Following", "JavaScript", "System Design", "AI/ML", "Career", "Open Source"];

export default function HomePage() {
  return (
    <div className={styles.page}>
      {/* Navbar */}
      <nav className={styles.navbar}>
        <Link href="/homepage" className={styles.logo}>
          माध्यम
        </Link>
        <div className={styles.navCenter}>
          <div className={styles.searchBar}>
            <svg className={styles.searchIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
            <input type="text" placeholder="Search" className={styles.searchInput} />
          </div>
        </div>
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

      {/* Tag Tabs */}
      <div className={styles.tagRow}>
        <div className={styles.tagScroll}>
          {TAGS.map((tag, i) => (
            <button key={tag} className={i === 0 ? `${styles.tag} ${styles.tagActive}` : styles.tag}>
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Main content */}
      <div className={styles.layout}>
        {/* Feed */}
        <main className={styles.feed}>
          {MOCK_POSTS.map((post) => (
            <article key={post.id} className={styles.card}>
              <div className={styles.cardHeader}>
                <div className={styles.authorAvatar}>{post.authorAvatar}</div>
                <div>
                  <span className={styles.authorName}>{post.author}</span>
                  <span className={styles.cardMeta}> · {post.date}</span>
                </div>
              </div>
              <div className={styles.cardBody}>
                <div className={styles.cardText}>
                  <Link href="/blog" className={styles.cardTitle}>{post.title}</Link>
                  <p className={styles.cardExcerpt}>{post.excerpt}</p>
                </div>
                <div className={styles.cardImage}></div>
              </div>
              <div className={styles.cardFooter}>
                <span className={styles.tagPill}>{post.tag}</span>
                <span className={styles.readTime}>{post.readTime}</span>
                <div className={styles.footerRight}>
                  <button className={styles.clapBtn}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={styles.clapIcon}>
                      <path d="M9 11l3-3 3 3M12 8V3M6.2 17.8A8 8 0 1 0 17.8 6.2" />
                    </svg>
                    {post.claps}
                  </button>
                  <button className={styles.moreBtn}>···</button>
                </div>
              </div>
            </article>
          ))}
        </main>

        {/* Sidebar */}
        <aside className={styles.sidebar}>
          <div className={styles.sideSection}>
            <h3 className={styles.sideTitle}>Staff Picks</h3>
            {MOCK_POSTS.slice(0, 3).map((p) => (
              <div key={p.id} className={styles.sideCard}>
                <div className={styles.sideAuthor}>
                  <div className={styles.sideAvatar}>{p.authorAvatar}</div>
                  <span className={styles.sideAuthorName}>{p.author}</span>
                </div>
                <Link href="/blog" className={styles.sideCardTitle}>{p.title}</Link>
                <span className={styles.sideCardMeta}>{p.date} · {p.readTime}</span>
              </div>
            ))}
          </div>
          <div className={styles.sideSection}>
            <h3 className={styles.sideTitle}>Recommended topics</h3>
            <div className={styles.topicGrid}>
              {["JavaScript", "AI", "Technology", "Career", "Culture", "Design", "Science"].map((t) => (
                <button key={t} className={styles.topicChip}>{t}</button>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
