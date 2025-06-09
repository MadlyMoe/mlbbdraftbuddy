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
  });

  return draft;
}

// For Admin Only
export async function getAllDrafts() {
  return await prisma.draft.findMany();
}

// For User
export async function getDrafts(userId: string | undefined) {
  if (!userId) {
    return null;
  }
  return await prisma.draft.findMany({
    where: {
      userId: userId,
    },
  });
}

// Get only one draft by id
export async function getDraft(draftId: string, userId: string | undefined) {
  if (!userId) {
    return null;
  }

  const draft = await prisma.draft.findUnique({
    where: { id: draftId },
  });

  if (!draft) {
    throw new Error("Draft not found");
  }

  const isOwner = draft.userId === userId;

  if (!isOwner) {
    return null;
  }

  return draft;
}

export async function deleteDraft(draftId: string, userId: string | undefined) {
  if (!userId) {
    return null;
  }

  // Return just the draft owner's userId
  const draftOwner = await prisma.draft.findUnique({
    where: { id: draftId },
    select: { userId: true },
  });

  // Check if owner then delete
  if (draftOwner?.userId === userId) {
    await prisma.draft.delete({ where: { id: draftId } });
    return true;
  } else {
    return null;
  }
}

export async function updateDraft(
  draftId: string,
  teamColor: string,
  teamBans: any[] = [],
  enemyBans: any[] = [],
  teamPicks: any[] = [],
  enemyPicks: any[] = [],
  userId: string | undefined
) {
  if (!userId) {
    return null;
  }

  // Return just the draft owner's userId
  const draftOwner = await prisma.draft.findUnique({
    where: { id: draftId },
    select: { userId: true },
  });

  // Check if owner then delete
  if (draftOwner?.userId === userId) {
    const updateDraft = await prisma.draft.update({
      where: { id: draftId },
      data: {
        teamColor: teamColor,
        teamBans: teamBans,
        enemyBans: enemyBans,
        teamPicks: teamPicks,
        enemyPicks: enemyPicks,
        User: { connect: { id: userId } },
      },
    });
    return updateDraft;
  } else {
    return null;
  }
}
