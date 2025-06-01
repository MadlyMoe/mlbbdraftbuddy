'use client'

// Import libraries
import Image from "next/image";
import styles from "./page.module.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const handleToDraft = (): void => {
    router.push('/draft');
  };

  return (
    <div className={styles.page}>
      <main>
        {/* Button for Draft Page */}
        <button onClick={handleToDraft}>
          <p>Draft Page</p>
        </button>
      </main>
    </div>
  );
}
