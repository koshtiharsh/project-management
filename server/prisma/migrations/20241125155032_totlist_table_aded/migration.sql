/*
  Warnings:

  - You are about to drop the column `subscription` on the `TodoList` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "TodoList" DROP COLUMN "subscription";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "subscription" JSONB[] DEFAULT ARRAY[]::JSONB[];
