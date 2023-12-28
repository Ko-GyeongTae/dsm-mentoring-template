import Image from 'next/image'
import styles from './page.module.css'

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <p>
          <code className={styles.code}>학번 | 이름</code>
        </p>
      </div>

      <div className={styles.center}>    
        <input type='file'/>
        <button>전송</button>
      </div>

      <div>
        <a
          href="https://github.com/Ko-GyeongTae"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            고경태 GITHUB <span>-&gt;</span>
          </h2>
          <p>
            서비스 제작자 깃허브 바로가기
          </p>
        </a>
      </div>
    </main>
  )
}
