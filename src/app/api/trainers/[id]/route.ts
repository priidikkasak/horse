import { NextResponse } from 'next/server';
import { sql } from '@/lib/db';

// GET single trainer
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const { rows } = await sql`
      SELECT
        id,
        name,
        email,
        phone,
        specialties,
        created_at as "createdAt",
        updated_at as "updatedAt"
      FROM trainers
      WHERE id = ${id}
    `;

    if (rows.length === 0) {
      return NextResponse.json(
        { error: 'Trainer not found' },
        { status: 404 }
      );
    }

    const trainer = {
      ...rows[0],
      specialties: JSON.parse(rows[0].specialties),
      availability: [],
    };

    return NextResponse.json(trainer);
  } catch (error) {
    console.error('Error fetching trainer:', error);
    return NextResponse.json(
      { error: 'Failed to fetch trainer' },
      { status: 500 }
    );
  }
}

// PUT update trainer
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { name, email, phone, specialties } = body;

    const now = new Date().toISOString();

    // Store specialties as JSON string
    const specialtiesJSON = JSON.stringify(specialties);

    await sql`
      UPDATE trainers
      SET
        name = ${name},
        email = ${email},
        phone = ${phone},
        specialties = ${specialtiesJSON},
        updated_at = ${now}
      WHERE id = ${id}
    `;

    return NextResponse.json({ message: 'Trainer updated successfully' });
  } catch (error) {
    console.error('Error updating trainer:', error);
    return NextResponse.json(
      { error: 'Failed to update trainer' },
      { status: 500 }
    );
  }
}

// DELETE trainer
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    await sql`DELETE FROM trainers WHERE id = ${id}`;

    return NextResponse.json({ message: 'Trainer deleted successfully' });
  } catch (error) {
    console.error('Error deleting trainer:', error);
    return NextResponse.json(
      { error: 'Failed to delete trainer' },
      { status: 500 }
    );
  }
}
