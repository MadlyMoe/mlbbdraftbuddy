import { getAllHeros } from "@/lib/hero-fetcher";

export async function GET(req: Request) {

    /*
    *   Returns a list of heros with id, name, roles, lanes, and image
    *   
    * 
    *   Example Output:
    *   {
    *       "heros": [
    *           {
    *               "heroId": "1",
    *               "heroName": "Miya",
    *               "roles": [
    *                   "marksman"
    *               ],
    *               "lanes": [
    *                   "gold"
    *               ],
    *               "icon": "https://google.com",
    *               "banner": "https://google.com",
    *           },
    *           {
    *               "heroId": "2",
    *               "heroName": "Balmond",
    *               "roles": [
    *                   "tank",
    *                   "fighter"
    *               ],
    *               "lanes": [
    *                   "exp",
    *                   "jungle"
    *               ],
    *               "icon": "https://google.com",
    *               "banner": "https://google.com",
    *           }
    *       ]
    *   }
    * 
    */


    const heros = await getAllHeros();

    return Response.json({ heros });
}