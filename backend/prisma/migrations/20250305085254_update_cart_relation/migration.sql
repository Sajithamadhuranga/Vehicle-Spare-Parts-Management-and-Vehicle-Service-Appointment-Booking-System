/*
  Warnings:

  - You are about to drop the `Comment` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Comment";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "SparePart" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" REAL NOT NULL
);

-- CreateTable
CREATE TABLE "CartItem" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "partId" INTEGER NOT NULL,
    CONSTRAINT "CartItem_partId_fkey" FOREIGN KEY ("partId") REFERENCES "SparePart" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
