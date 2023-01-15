-- CreateTable
CREATE TABLE "properties" (
    "id" TEXT NOT NULL,
    "rent_value" DECIMAL(5,2) NOT NULL,
    "price" DECIMAL(5,2) NOT NULL,
    "order" SERIAL NOT NULL,
    "status" TEXT,
    "id_player" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "properties_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "properties_order_key" ON "properties"("order");

-- AddForeignKey
ALTER TABLE "properties" ADD CONSTRAINT "properties_id_player_fkey" FOREIGN KEY ("id_player") REFERENCES "players"("id") ON DELETE SET NULL ON UPDATE CASCADE;
