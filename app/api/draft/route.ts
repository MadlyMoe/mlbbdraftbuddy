import { createDraft } from "@/lib/draft";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const {
            teamColor,
            teamBans = [],
            enemyBans = [],
            teamPicks = [],
            enemyPicks = [],
        } = await req.json();

        if (!teamColor) {
            return NextResponse.json(
                {error: 'Missing teamColor'},
                {status: 400}
            )
        }

        const draft = await createDraft(teamColor, teamBans, enemyBans, teamPicks, enemyPicks);
        return NextResponse.json(draft, {status: 201});
    } catch (err) {
        console.log("POST: /api/draft error: ", err);
        return NextResponse.json({error: "Internal server error" }, {status: 500});
    }
};