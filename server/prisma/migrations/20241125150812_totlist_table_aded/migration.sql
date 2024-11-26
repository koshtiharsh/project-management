-- AlterTable
ALTER TABLE "TodoList" ADD COLUMN     "subscription" JSONB[] DEFAULT ARRAY[]::JSONB[];
