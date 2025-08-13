import axios from 'axios';

import { getHeroByIdExtended } from "@/lib/hero-fetcher";

// Weighing Functions

//const apiUrl = "https://mlbb-stats.ridwaanhall.com"
const apiUrl = "http://127.0.0.1:8000"

// We could probably cache this for like an hour to give their api a break
export async function heroTotal() {
    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: apiUrl + '/api/hero-position/'
    };

    const response = await axios.request(config);
    return response.data.data.total;
}

export async function isLaneAvailableForHero(
  potentialHeroId: number,
  allyPicks: number[]
) {
  let potentialDraft = [...allyPicks, potentialHeroId];
  // Make sure it's last?

  let maskedConflicts = 0;
  const playableLanes = new Set<string>();

  for (const [index, heroId] of potentialDraft.entries()) {
    const hero = await getHeroByIdExtended(heroId);
    hero.lanes.forEach(lane => playableLanes.add(lane));

    /*  
    *   Check the number of heroes vs playable lanes
    *   If there are more heroes than playable lanes
    *   Then there must be a conflict
    */
    if (index+1 > playableLanes.size + maskedConflicts) {
      if (heroId == potentialHeroId) {
        return false;
      }
      // Mask any found conflicts
      maskedConflicts++;
    }
  }
  return true;
}

export async function weighingFunction(heroId: number, allyPicks: number[], enemyPicks: number[]) {

  const hero = await getHeroByIdExtended(heroId)

  if (!hero || !Array.isArray(hero.counters) || !Array.isArray(hero.counteredBy) || !Array.isArray(hero.synergyWith)) {
    console.warn(`Skipping heroId ${heroId} due to missing or invalid data.`);
    console.log(hero)
    return 0;
  }

  // Individual
  const individualScore = (0.5*hero.winRate) + (1*hero.banRate) + (0.25*hero.pickRate)

  // Enemy draft

  const strongAgainst = hero.counters.filter(num => enemyPicks.includes(num));
  const weakAgainst = hero.counteredBy.filter(num => enemyPicks.includes(num));

  const enemyDraftScore = (0.3*(strongAgainst.length/5)) + (-0.3*(weakAgainst.length/5))

  // Team draft
  const synergyWith = hero.synergyWith.filter(num => allyPicks.includes(num));
  const isLaneOpen = await isLaneAvailableForHero(heroId, allyPicks);

  const teamDraftScore = (0.3*(synergyWith.length/5)) + (0.4*isLaneOpen);

  return (individualScore + enemyDraftScore + teamDraftScore);



}

export async function getSuggestions(allyPicks: number[], enemyPicks: number[], allyBans: number[], enemyBans: number[]) {

    // Get hero total heros
    const total = await heroTotal();

    const allSuggestions = [];

    for(let heroId = 1; heroId < total; heroId++){
      if (
        allyPicks.includes(heroId) ||
        enemyPicks.includes(heroId) ||
        allyBans.includes(heroId) ||
        enemyBans.includes(heroId)
      )
        continue;

      const heroScore = await weighingFunction(heroId, allyPicks, enemyPicks);

      const heroDetails = await getHeroByIdExtended(heroId);

      const suggestion = {
        heroId: String(heroId),
        heroName: heroDetails.heroName,
        winrate: heroDetails.winRate,
        confidence: heroScore,
      }

      allSuggestions.push(suggestion);

    }

    allSuggestions.sort((a, b) => b.confidence - a.confidence);

    const top5 = allSuggestions.slice(0,5);


    return top5;
}
