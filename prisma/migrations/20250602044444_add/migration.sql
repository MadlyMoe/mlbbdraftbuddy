/*
  Warnings:

  - Added the required column `teamColor` to the `Draft` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Draft" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "teamColor" TEXT NOT NULL,
    "teamBans" TEXT,
    "enemyBans" TEXT,
    "teamPicks" TEXT,
    "enemyPicks" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Draft" ("createdAt", "enemyBans", "enemyPicks", "id", "teamBans", "teamPicks", "updatedAt") SELECT "createdAt", "enemyBans", "enemyPicks", "id", "teamBans", "teamPicks", "updatedAt" FROM "Draft";
DROP TABLE "Draft";
ALTER TABLE "new_Draft" RENAME TO "Draft";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
