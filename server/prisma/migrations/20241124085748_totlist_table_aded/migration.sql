/*
  Warnings:

  - Added the required column `CognitoId` to the `TodoList` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "TodoList" DROP CONSTRAINT "TodoList_userId_fkey";

-- AlterTable
ALTER TABLE "TodoList" ADD COLUMN     "CognitoId" TEXT NOT NULL;
