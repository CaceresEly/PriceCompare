-- CreateTable
CREATE TABLE "PriceAlert" (
    "id" TEXT NOT NULL,
    "query" TEXT NOT NULL,
    "normalizedKey" TEXT NOT NULL,
    "externalProductId" TEXT,
    "productTitle" TEXT NOT NULL,
    "targetPrice" DOUBLE PRECISION NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "lastSentAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PriceAlert_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "PriceAlert_normalizedKey_idx" ON "PriceAlert"("normalizedKey");

-- CreateIndex
CREATE INDEX "PriceAlert_externalProductId_idx" ON "PriceAlert"("externalProductId");

-- CreateIndex
CREATE INDEX "PriceAlert_isActive_idx" ON "PriceAlert"("isActive");
