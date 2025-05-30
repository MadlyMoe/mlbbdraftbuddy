
/*  API Route
*
*   /api/draft/suggestion
*   In the future it will be /api/draft/{id}/suggestion
* 
* */

import { getSuggestions } from "@/lib/suggestions";

export async function POST(req: Request) {
    const { allyPicks, enemyPicks } = await req.json();
    const suggestions = getSuggestions(allyPicks, enemyPicks);

    return Response.json({ suggestions });
}