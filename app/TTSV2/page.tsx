import styles from "../styles/TTSV2/page.module.css";
import Image from "next/image";

export default function TTSV2Page() {
  return (
    <main className={styles.page}>
      <div className={styles.background}></div>

      <div className={styles.leftLight}></div>
      <div className={styles.rightLight}></div>

      <div className={styles.content}>
        <div className={styles.logoWrap}>
          <div className={styles.shine}></div>

          <Image
            src="/TTSV2/logo.png"
            alt="TikTok Stars"
            width={1100}
            height={550}
            priority
            className={styles.logo}
          />
        </div>

        <h1 className={styles.title}>
          South Africa's Biggest
          <br />
          TikTok Talent Competition
        </h1>

        <p className={styles.subtitle}>
          Season 2 is here. Bigger prizes. Bigger stages. Bigger dreams.
        </p>

        <div className={styles.buttons}>
          <button className={styles.primary}>
            ENTER NOW
          </button>

          <button className={styles.secondary}>
            WATCH SEASON 2
          </button>
        </div>

        <div className={styles.scroll}>
          SCROLL
        </div>
      </div>
    </main>
  );
}