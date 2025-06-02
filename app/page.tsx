'use client'

// Import libraries
import styles from "./page.module.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const handleToDraft = (): void => {
    router.push('/draft');
  };

  const handleTeamSelect = async (teamColor: 'red' | 'blue') => {

  }

  return (
    <div className={styles.page}>
      <main>

        {/* Button for Draft Page */}
        <button onClick={handleToDraft}>
          <p>Draft Page</p>
        </button>

        {/* Button for Red Team */}
        <button onClick={handleToDraft}>
          <p>Red Team</p>
        </button>

        {/* Button for Blue Team */}
        <button onClick={handleToDraft}>
          <p>Blue Team</p>
        </button>

      </main>
    </div>
  );
}
