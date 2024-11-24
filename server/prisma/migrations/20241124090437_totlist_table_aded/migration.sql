/*
  Warnings:

  - You are about to drop the column `CognitoId` on the `TodoList` table. All the data in the column will be lost.
  - Added the required column `cognitoId` to the `TodoList` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TodoList" DROP COLUMN "CognitoId",
ADD COLUMN     "cognitoId" TEXT NOT NULL;
