/*  API Route
*
*   /api/draft/suggestion
*   In the future it will be /api/draft/{id}/suggestion
* 
* */

import { getSuggestions } from "@/lib/suggestions";

export async function POST(req: Request) {

    /*
    *   Returns a suggestion object based on the current draft
    *   
    *   Example Input:
    *   {
    *       "allyPicks": ["Miya", "Layla"],
    *       "enemyPicks": ["Tigreal", "Zilong"]
    *   }
    * 
    *   Example Output:
    *   {
    *       "suggestions": [
    *           {
    *               "heroId": "1",
    *               "heroName": "Miya",
    *               "winrate": 0.12,
    *               "confidence": 0.99,
    *           },
    *           {
    *               "heroId": "128".
    *               "heroName": "Kalea",
    *               "winrate": 0.88,
    *               "confidence": 0.01,
    *           }
    *       ]   
    *   }
    * 
    */

    const { allyPicks, enemyPicks } = await req.json();
    const suggestions = await getSuggestions(allyPicks, enemyPicks);

    return Response.json({ suggestions });
}
