"use client";

import Link from "next/link";
import styles from "./blog.module.css";

export default function BlogPage() {
  return (
    <div className={styles.page}>
      {/* Navbar */}
      <nav className={styles.navbar}>
        <Link href="/homepage" className={styles.logo}>
          माध्यम
        </Link>
        <div className={styles.navRight}>
          <Link href="/homepage" className={styles.navLink}>Home</Link>
          <Link href="/profile" className={styles.avatar}>RV</Link>
        </div>
      </nav>

      {/* Article */}
      <article className={styles.article}>
        {/* Header */}
        <header className={styles.articleHeader}>
          <span className={styles.tagPill}>JavaScript</span>
          <h1 className={styles.title}>
            Why React Server Components Will Change Everything
          </h1>
          <p className={styles.subtitle}>
            React Server Components represent a fundamental shift in how we build web applications. Here's what it means for your next project — and why you should care deeply.
          </p>
          {/* Author row */}
          <div className={styles.authorRow}>
            <div className={styles.authorAvatar}>AS</div>
            <div>
              <div className={styles.authorName}>Arjun Sharma</div>
              <div className={styles.authorMeta}>
                6 min read · Mar 20, 2025
              </div>
            </div>
            <div className={styles.followSection}>
              <button className={styles.followBtn}>Follow</button>
            </div>
          </div>
          {/* Action bar */}
          <div className={styles.actionBar}>
            <div className={styles.actionLeft}>
              <button className={styles.actionBtn} title="Clap">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={styles.actionIcon}>
                  <path d="M9 11l3-3 3 3M12 8V3M6.2 17.8A8 8 0 1 0 17.8 6.2" />
                </svg>
                312
              </button>
              <button className={styles.actionBtn} title="Comment">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={styles.actionIcon}>
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
                14
              </button>
            </div>
            <div className={styles.actionRight}>
              <button className={styles.actionIconBtn} title="Save">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={styles.actionIcon}>
                  <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
                </svg>
              </button>
              <button className={styles.actionIconBtn} title="Share">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={styles.actionIcon}>
                  <circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" />
                  <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" /><line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
                </svg>
              </button>
            </div>
          </div>
        </header>

        {/* Hero */}
        <div className={styles.heroImage}></div>

        {/* Body */}
        <div className={styles.body}>
          <p>
            When React 18 shipped with concurrent features, many of us thought we had finally reached peak React. Hooks felt mature. Suspense was finally stable. But then, quietly, the React team started talking about something much bigger — a new model for rendering that would fundamentally change what "a React component" even means.
          </p>
          <p>
            That something is <strong>React Server Components</strong> (RSC). And after using them in production for several months, I'm confident they will reshape how we build web applications — not incrementally, but fundamentally.
          </p>

          <h2>What Actually Are Server Components?</h2>
          <p>
            The core idea is deceptively simple: some components run only on the server, never on the client. They can't have state, they can't use effects, but they can directly access databases, file systems, and environment secrets. The resulting HTML is then streamed to the browser.
          </p>
          <p>
            What this unlocks is enormous. You can fetch data right inside the component — no useState, no useEffect, no API route. Just{" "}
            <code className={styles.inlineCode}>await db.query(...)</code> at the top of your component and use the result directly.
          </p>

          <div className={styles.callout}>
            <strong>Key insight:</strong> Server Components are not a performance optimization bolted on top of React. They are a new mental model for what "a component" is — one that blurs the line between server and client rendering.
          </div>

          <h2>Why This Changes Everything</h2>
          <p>
            Consider a typical data-fetching pattern today. You write an API route, then a custom hook to call it with SWR or React Query, then handle loading and error states in your component. That's three files and a lot of ceremony for what should be a trivial operation.
          </p>
          <p>
            With Server Components, you just write the component. It runs on the server, fetches the data, and returns markup. The bundle stays small. The latency from client to server round-trips disappears entirely for that piece of data. The mental overhead evaporates.
          </p>

          <h2>The Practical Impact</h2>
          <p>
            Teams adopting RSC are reporting measurably smaller JavaScript bundles — because libraries used only on the server never ship to the client. They're seeing faster data-fetching waterfalls because server-to-database latency is orders of magnitude less than client-to-server.
          </p>
          <p>
            More importantly, architecture becomes way simpler. That sprawling custom hook file you have? Most of it probably doesn't need to exist. That complex state machine managing fetch lifecycle? Gone.
          </p>

          <p>
            The web is entering a new phase. The question isn't whether to adopt Server Components — it's when and how. And based on everything I've seen, the answer to "when" is: as soon as you possibly can.
          </p>
        </div>

        {/* Author Bio */}
        <div className={styles.authorBio}>
          <div className={styles.bioAvatar}>AS</div>
          <div className={styles.bioInfo}>
            <div className={styles.bioName}>Arjun Sharma</div>
            <p className={styles.bioText}>
              Software engineer with a focus on frontend architecture. Writing about React, distributed systems, and the craft of software.
            </p>
            <button className={styles.followBtn}>Follow</button>
          </div>
        </div>

        {/* More from author */}
        <div className={styles.moreSection}>
          <h3 className={styles.moreTitle}>More from Arjun Sharma</h3>
          <div className={styles.moreGrid}>
            {[
              { title: "Designing a Distributed Cache from Scratch", tag: "System Design", date: "Mar 10" },
              { title: "The Senior Engineer's Quiet Superpower: Saying No", tag: "Career", date: "Feb 28" },
            ].map((item) => (
              <Link key={item.title} href="/blog" className={styles.moreCard}>
                <div className={styles.moreThumb}></div>
                <span className={styles.moreTag}>{item.tag}</span>
                <span className={styles.moreCardTitle}>{item.title}</span>
                <span className={styles.moreDate}>{item.date}</span>
              </Link>
            ))}
          </div>
        </div>
      </article>
    </div>
  );
}
