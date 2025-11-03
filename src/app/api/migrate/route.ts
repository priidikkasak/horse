import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

export async function GET() {
  try {
    // Add customData column to horses table
    await sql`
      ALTER TABLE horses
      ADD COLUMN IF NOT EXISTS "customData" JSONB NOT NULL DEFAULT '{}'
    `;

    // Drop and recreate horse_custom_fields table with correct column names
    await sql`DROP TABLE IF EXISTS horse_custom_fields`;

    await sql`
      CREATE TABLE horse_custom_fields (
        id TEXT PRIMARY KEY,
        label TEXT NOT NULL,
        key TEXT NOT NULL UNIQUE,
        "fieldType" TEXT NOT NULL,
        options JSONB,
        required BOOLEAN NOT NULL DEFAULT false,
        placeholder TEXT,
        "helpText" TEXT,
        "displayOrder" INTEGER NOT NULL DEFAULT 0,
        "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    return NextResponse.json({
      message: 'Migration completed successfully',
      changes: [
        'Added customData column to horses table',
        'Recreated horse_custom_fields table with correct column names'
      ]
    });
  } catch (error) {
    console.error('Migration error:', error);
    return NextResponse.json(
      { error: 'Migration failed', details: String(error) },
      { status: 500 }
    );
  }
}
