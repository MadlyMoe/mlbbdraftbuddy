/*
  Warnings:

  - You are about to alter the column `enemyBans` on the `Draft` table. The data in that column could be lost. The data in that column will be cast from `String` to `Json`.
  - You are about to alter the column `enemyPicks` on the `Draft` table. The data in that column could be lost. The data in that column will be cast from `String` to `Json`.
  - You are about to alter the column `teamBans` on the `Draft` table. The data in that column could be lost. The data in that column will be cast from `String` to `Json`.
  - You are about to alter the column `teamPicks` on the `Draft` table. The data in that column could be lost. The data in that column will be cast from `String` to `Json`.
  - Made the column `enemyBans` on table `Draft` required. This step will fail if there are existing NULL values in that column.
  - Made the column `enemyPicks` on table `Draft` required. This step will fail if there are existing NULL values in that column.
  - Made the column `teamBans` on table `Draft` required. This step will fail if there are existing NULL values in that column.
  - Made the column `teamPicks` on table `Draft` required. This step will fail if there are existing NULL values in that column.

*/
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
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Draft" ("createdAt", "enemyBans", "enemyPicks", "id", "teamBans", "teamColor", "teamPicks", "updatedAt") SELECT "createdAt", "enemyBans", "enemyPicks", "id", "teamBans", "teamColor", "teamPicks", "updatedAt" FROM "Draft";
DROP TABLE "Draft";
ALTER TABLE "new_Draft" RENAME TO "Draft";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
