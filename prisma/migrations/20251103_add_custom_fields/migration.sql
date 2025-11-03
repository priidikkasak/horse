-- AlterTable horses - add customData column
ALTER TABLE "horses" ADD COLUMN IF NOT EXISTS "customData" JSONB NOT NULL DEFAULT '{}';

-- CreateTable horse_custom_fields
CREATE TABLE IF NOT EXISTS "horse_custom_fields" (
    "id" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "fieldType" TEXT NOT NULL,
    "options" JSONB,
    "required" BOOLEAN NOT NULL DEFAULT false,
    "placeholder" TEXT,
    "helpText" TEXT,
    "displayOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "horse_custom_fields_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX IF NOT EXISTS "horse_custom_fields_key_key" ON "horse_custom_fields"("key");
