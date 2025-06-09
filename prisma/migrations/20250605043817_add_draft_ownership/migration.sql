-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Draft" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "teamColor" TEXT NOT NULL,
    "teamBans" JSONB NOT NULL,
    "enemyBans" JSONB NOT NULL,
    "teamPicks" JSONB NOT NULL,
    "enemyPicks" JSONB NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "userId" TEXT,
    CONSTRAINT "Draft_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Draft" ("createdAt", "enemyBans", "enemyPicks", "id", "teamBans", "teamColor", "teamPicks", "updatedAt") SELECT "createdAt", "enemyBans", "enemyPicks", "id", "teamBans", "teamColor", "teamPicks", "updatedAt" FROM "Draft";
DROP TABLE "Draft";
ALTER TABLE "new_Draft" RENAME TO "Draft";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
