"use client";

import Image from "next/image";
import styles from "@/styles/TTSV2/hero.module.css";

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.background}></div>

      <div className={`${styles.spotlight} ${styles.left}`}></div>
      <div className={`${styles.spotlight} ${styles.right}`}></div>

      <div className={styles.particles}></div>

      <div className={styles.content}>
        <div className={styles.logoWrap}>
          <div className={styles.goldShine}>
            <div className={styles.shine}></div>
          </div>

          <Image
            src="/TTSV2/logo.png"
            alt="TikTok Stars"
            width={1200}
            height={600}
            priority
            className={styles.logo}
          />
        </div>

        <div className={styles.tagline}>
          <span>BE SEEN.</span>
          <span>BE HEARD.</span>
          <span>BE A STAR.</span>
        </div>

        <div className={styles.buttons}>
          <a href="#enter" className={styles.primary}>
            ENTER NOW
          </a>

          <a href="#about" className={styles.secondary}>
            EXPLORE
          </a>
        </div>
      </div>

      <div className={styles.scroll}>
        <div className={styles.mouse}>
          <span></span>
        </div>
      </div>
    </section>
  );
}