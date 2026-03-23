import Link from "next/link";
import styles from "./home.module.css";

export default function HomePage() {
  return (
    <div className={styles.page}>
      <nav className={styles.nav}>
        <Link href="/" className={styles.brand}>माध्यम</Link>
        <div className={styles.navLinks}>
          <Link href="/login" className={styles.navLogin}>Sign in</Link>
          <Link href="/signup" className={styles.navSignup}>Get started</Link>
        </div>
      </nav>

      <div className={styles.hero}>
        <h1 className={styles.heroTitle}>Human stories & ideas</h1>
        <p className={styles.heroSub}>A place to read, write, and deepen your understanding.</p>
        <Link href="/signup" className={styles.heroBtn}>Start reading</Link>
      </div>
    </div>
  );
}
