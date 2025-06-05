// Get Prisma
import prisma from "./prisma";
// Create Draft object

export async function createDraft(
  teamColor: string, 
  teamBans: any[] = [], 
  teamPicks: any[] = [], 
  enemyBans: any[] = [], 
  enemyPicks: any[] = [],
  userId: string | undefined
) {
  if (!teamColor || !["blue", "red"].includes(teamColor) || !userId) {
    return null;
  }

  const draft = await prisma.draft.create({
    data: {
      teamColor: teamColor,
      teamBans: teamBans,
      enemyBans: enemyBans,
      teamPicks: teamPicks,
      enemyPicks: enemyPicks,
      User: { connect: { id: userId } },
    },
  })

  return draft;
}
