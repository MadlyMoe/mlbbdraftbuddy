import { createDraft, getDrafts } from "@/lib/draft";
import { NextResponse } from "next/server";
import { auth } from "@/auth";

/*
 *  API Route to get all drafts for the authenticated user
 *  GET /api/draft
 *
 *  Response: 200 (OK)
 *  Example Output:
 *  [
 *    {
 *      "id": "cmbiwajtu0004zzcgxj2a8pft",
 *      "teamColor": "red",
 *      "teamBans": [],
 *      "enemyBans": [],
 *      "teamPicks": [],
 *      "enemyPicks": [],
 *      "createdAt": "2025-06-05T04:47:26.947Z",
 *      "updatedAt": "2025-06-05T04:47:26.947Z",
 *      "userId": "cmbivzpe10000zzvlupffgy75"
 *    },
 *    ...
 *  ]
 */

export async function GET(req: Request) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const drafts = await getDrafts(session.user?.id);

    return NextResponse.json(drafts, { status: 200 });
  } catch (err) {
    console.log("GET: /api/draft error: ", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

/*
 *  API Route to create a new draft
 *  POST /api/draft
 *
 *  Example Input:
 *  {
 *    "teamColor": "red",             // required, either "red" or "blue"
 *    "teamBans": [/* optional *\/],   // array of team bans
 *    "enemyBans": [/* optional *\/],  // array of enemy bans
 *    "teamPicks": [/* optional *\/],  // array of team picks
 *    "enemyPicks": [/* optional *\/]  // array of enemy picks
 *  }
 *
 *
 *  Response: 201 (Created)
 *  Example Output:
 *  {
 *    "id": "cmbiwajtu0004zzcgxj2a8pft",
 *    "teamColor": "red",
 *    "teamBans": [],
 *    "enemyBans": [],
 *    "teamPicks": [],
 *    "enemyPicks": [],
 *    "createdAt": "2025-06-05T04:47:26.947Z",
 *    "updatedAt": "2025-06-05T04:47:26.947Z",
 *    "userId": "cmbivzpe10000zzvlupffgy75"
 *  }
 */

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const {
      teamColor,
      teamBans = [],
      enemyBans = [],
      teamPicks = [],
      enemyPicks = [],
    } = await req.json();

    if (!teamColor) {
      return NextResponse.json({ error: "Missing teamColor" }, { status: 400 });
    }

    const draft = await createDraft(
      teamColor,
      teamBans,
      enemyBans,
      teamPicks,
      enemyPicks,
      session.user?.id
    );
    if (draft) return NextResponse.json(draft, { status: 201 });
    else
      return NextResponse.json(
        { error: "Internal server error" },
        { status: 500 }
      );
  } catch (err) {
    console.log("POST: /api/draft error: ", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
