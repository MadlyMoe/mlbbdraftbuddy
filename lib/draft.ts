// Get Prisma
import prisma from "./prisma"
// Create Draft object

export async function createDraft(teamColor: string, teamBans?: string, teamPicks?: string, enemyBans?: string, enemyPicks?: string){

  if (!teamColor || !['blue', 'red'].includes(teamColor)) {
    return null;
  }

  const draft = await prisma.draft.create({
    data: {
      teamColor: teamColor,
      teamBans: teamBans,
      enemyBans: enemyBans,
      teamPicks: teamPicks,
      enemyPicks: enemyPicks,
    }
  })

  return draft;

}

