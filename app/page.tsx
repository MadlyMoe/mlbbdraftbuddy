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
    try {
      const res = await fetch('/api/draft', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ teamColor }),
      });

      if (!res.ok) throw new Error('Failed to create draft');

      const { draft } = await res.json();
      
      const testId = 'TEST123';
      const testTeamColor = 'blue';
      // sessionStorage.setItem('draftId', draft.id);
      sessionStorage.setItem('draftId', testId);
      // sessionStorage.setItem('teamColor', teamColor);
      sessionStorage.setItem('teamColor', testTeamColor);

      router.push('/draft');
    } catch (err) {
      console.log('Error creating draft', err);
    }
  }

  return (
    <div className={styles.page}>
      <main>

        {/* Button for Draft Page */}
        <button onClick={handleToDraft}>
          <p>Draft Page</p>
        </button>

        {/* Button for Red Team */}
        <button onClick={() => handleTeamSelect('red')}>
          <p>Red Team</p>
        </button>

        {/* Button for Blue Team */}
        <button onClick={() => handleTeamSelect('blue')}>
          <p>Blue Team</p>
        </button>

      </main>
    </div>
  );
}
