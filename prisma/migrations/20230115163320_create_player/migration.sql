-- CreateEnum
CREATE TYPE "types" AS ENUM ('is:inpulsivo', 'is:exigente', 'is:cauteloso', 'is:aleatorio');

-- CreateTable
CREATE TABLE "players" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "type" "types" NOT NULL,
    "balance" DECIMAL(12,2) NOT NULL DEFAULT 300.00,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "players_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "players_username_key" ON "players"("username");
