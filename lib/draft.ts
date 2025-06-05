// Get Prisma
import prisma from "./prisma"
// Create Draft object

export async function createDraft(
  teamColor: string, 
  teamBans: any[] = [], 
  teamPicks: any[] = [], 
  enemyBans: any[] = [], 
  enemyPicks: any[] = []
) {
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
    },
  })

  return draft;
}
