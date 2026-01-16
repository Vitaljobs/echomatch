-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_DailyWellness" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "playerId" TEXT NOT NULL,
    "date" DATETIME NOT NULL,
    "sessionType" TEXT NOT NULL,
    "sessionLoad" INTEGER NOT NULL,
    "sleepHours" REAL,
    "sleepBedtime" TEXT,
    "sleepWakeTime" TEXT,
    "lastMealTime" TEXT,
    "hydrationIntake" INTEGER,
    "urineColorMorning" INTEGER,
    "urineColorEvening" INTEGER,
    "nightAwakenings" INTEGER,
    "notes" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_DailyWellness" ("createdAt", "date", "hydrationIntake", "id", "lastMealTime", "nightAwakenings", "notes", "playerId", "sessionLoad", "sessionType", "sleepBedtime", "sleepHours", "sleepWakeTime", "urineColorEvening", "urineColorMorning") SELECT "createdAt", "date", "hydrationIntake", "id", "lastMealTime", "nightAwakenings", "notes", "playerId", "sessionLoad", "sessionType", "sleepBedtime", "sleepHours", "sleepWakeTime", "urineColorEvening", "urineColorMorning" FROM "DailyWellness";
DROP TABLE "DailyWellness";
ALTER TABLE "new_DailyWellness" RENAME TO "DailyWellness";
CREATE UNIQUE INDEX "DailyWellness_playerId_date_key" ON "DailyWellness"("playerId", "date");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
