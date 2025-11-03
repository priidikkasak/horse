import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

// PUT update custom field
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { label, key, fieldType, options, required, placeholder, helpText, displayOrder } = body;

    // Check if key already exists (excluding current field)
    const { rows: existing } = await sql`
      SELECT id FROM horse_custom_fields WHERE key = ${key} AND id != ${id}
    `;

    if (existing.length > 0) {
      return NextResponse.json(
        { error: 'A field with this key already exists' },
        { status: 400 }
      );
    }

    const now = new Date().toISOString();

    const { rows } = await sql`
      UPDATE horse_custom_fields
      SET
        label = ${label},
        key = ${key},
        "fieldType" = ${fieldType},
        options = ${JSON.stringify(options || null)},
        required = ${required || false},
        placeholder = ${placeholder || null},
        "helpText" = ${helpText || null},
        "displayOrder" = ${displayOrder || 0},
        "updatedAt" = ${now}
      WHERE id = ${id}
      RETURNING *
    `;

    if (rows.length === 0) {
      return NextResponse.json(
        { error: 'Field not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(rows[0]);
  } catch (error) {
    console.error('Error updating custom field:', error);
    return NextResponse.json(
      { error: 'Failed to update custom field' },
      { status: 500 }
    );
  }
}

// DELETE custom field
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const { rows } = await sql`
      DELETE FROM horse_custom_fields WHERE id = ${id}
      RETURNING id
    `;

    if (rows.length === 0) {
      return NextResponse.json(
        { error: 'Field not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: 'Custom field deleted successfully' });
  } catch (error) {
    console.error('Error deleting custom field:', error);
    return NextResponse.json(
      { error: 'Failed to delete custom field' },
      { status: 500 }
    );
  }
}
