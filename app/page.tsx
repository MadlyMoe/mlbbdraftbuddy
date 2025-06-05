"use client";

// Import libraries
import styles from "./page.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Home() {
  const router = useRouter();

  const handleToDraft = (): void => {
    router.push("/draft");
  };

  const handleTeamSelect = async (teamColor: "red" | "blue") => {
    try {
      const res = await fetch("/api/draft", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          teamColor,
          teamBans: [],
          enemyBans: [],
          teamPicks: [],
          enemyPicks: [],
        }),
      });

      if (!res.ok) throw new Error("Failed to create draft");

      const draft = await res.json();

      sessionStorage.setItem("draftId", draft.id);
      sessionStorage.setItem("teamColor", teamColor);

      router.push("/draft");
    } catch (err) {
      console.log("Error creating draft", err);
    }
  };

  return (
    <div className={styles.page}>
      <main>
        {/* Button for Draft Page */}
        <button onClick={handleToDraft}>
          <p>Draft Page</p>
        </button>

        {/* Button for Red Team */}
        <button onClick={() => handleTeamSelect("red")}>
          <p>Red Team</p>
        </button>

        {/* Button for Blue Team */}
        <button onClick={() => handleTeamSelect("blue")}>
          <p>Blue Team</p>
        </button>

        {/* Button for Sign In */}
        <Link href="/signin" className="p-2">
          Sign In
        </Link>

        {/* Button for Sign Out */}
        <Link href="/signout" className="p-2">
          Sign Out
        </Link>

        {/* Button for User Stats */}
        <Link href="/debug" className="p-2">
          Debug
        </Link>
      </main>
    </div>
  );
}
