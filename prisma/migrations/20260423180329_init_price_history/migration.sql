-- CreateTable
CREATE TABLE "TrackedProduct" (
    "id" TEXT NOT NULL,
    "query" TEXT NOT NULL,
    "normalizedKey" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TrackedProduct_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PriceSnapshot" (
    "id" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "source" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "shipping" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "totalPrice" DOUBLE PRECISION NOT NULL,
    "productUrl" TEXT NOT NULL,
    "imageUrl" TEXT,
    "capturedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PriceSnapshot_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TrackedProduct_normalizedKey_key" ON "TrackedProduct"("normalizedKey");

-- CreateIndex
CREATE INDEX "PriceSnapshot_productId_idx" ON "PriceSnapshot"("productId");

-- CreateIndex
CREATE INDEX "PriceSnapshot_capturedAt_idx" ON "PriceSnapshot"("capturedAt");

-- CreateIndex
CREATE INDEX "PriceSnapshot_source_idx" ON "PriceSnapshot"("source");

-- AddForeignKey
ALTER TABLE "PriceSnapshot" ADD CONSTRAINT "PriceSnapshot_productId_fkey" FOREIGN KEY ("productId") REFERENCES "TrackedProduct"("id") ON DELETE CASCADE ON UPDATE CASCADE;
