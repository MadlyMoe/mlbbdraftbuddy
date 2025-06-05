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
    *       "allyBans": [1, 6],
    *       "allyPicks": [1, 9],
    *       "enemyBans": [6, 4],
    *       "enemyPicks": [12, 7]
    *   }
    * 
    *   Example Output:
    *   {
    *       "draft": {
    *           "allyBans": [1, 6],
    *           "allyPicks": [1, 6],
    *           "enemyBans": [1, 6],
    *           "enemyPicks": [1, 6]
    *       }
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
