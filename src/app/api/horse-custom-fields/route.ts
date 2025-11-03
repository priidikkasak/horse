import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

// GET all custom fields
export async function GET() {
  try {
    const { rows } = await sql`
      SELECT
        id,
        label,
        key,
        "fieldType",
        options,
        required,
        placeholder,
        "helpText",
        "displayOrder",
        "createdAt",
        "updatedAt"
      FROM horse_custom_fields
      ORDER BY "displayOrder" ASC
    `;

    return NextResponse.json(rows);
  } catch (error) {
    console.error('Error fetching custom fields:', error);
    return NextResponse.json(
      { error: 'Failed to fetch custom fields' },
      { status: 500 }
    );
  }
}

// POST create new custom field
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { label, key, fieldType, options, required, placeholder, helpText, displayOrder } = body;

    // Check if key already exists
    const { rows: existing } = await sql`
      SELECT id FROM horse_custom_fields WHERE key = ${key}
    `;

    if (existing.length > 0) {
      return NextResponse.json(
        { error: 'A field with this key already exists' },
        { status: 400 }
      );
    }

    // Generate ID
    const id = `cf_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
    const now = new Date().toISOString();

    const { rows } = await sql`
      INSERT INTO horse_custom_fields (
        id,
        label,
        key,
        "fieldType",
        options,
        required,
        placeholder,
        "helpText",
        "displayOrder",
        "createdAt",
        "updatedAt"
      ) VALUES (
        ${id},
        ${label},
        ${key},
        ${fieldType},
        ${JSON.stringify(options || null)},
        ${required || false},
        ${placeholder || null},
        ${helpText || null},
        ${displayOrder || 0},
        ${now},
        ${now}
      )
      RETURNING *
    `;

    return NextResponse.json(rows[0], { status: 201 });
  } catch (error) {
    console.error('Error creating custom field:', error);
    return NextResponse.json(
      { error: 'Failed to create custom field' },
      { status: 500 }
    );
  }
}
