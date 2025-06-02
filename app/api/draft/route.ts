import { createDraft } from "@/lib/draft";
import { create } from "domain";
import { NextResponse } from "next/server";

export async function POST(req: Request) {

    const { teamColor, teamBans, enemyBans, teamPicks, enemyPicks } = await req.json();
    const draft = createDraft(teamColor, teamBans, enemyBans, teamPicks, enemyPicks);
    if (!draft) 
    {
        return NextResponse.json(
            { error: 'Cannot create draft' },
            { status: 500 }
        );
    }

    return NextResponse.json(
        draft,
        { status: 201}
    )

};