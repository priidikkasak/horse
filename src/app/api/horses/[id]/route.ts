import { NextResponse } from 'next/server';
import { sql } from '@/lib/db';

// GET single horse
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
        breed,
        age,
        color,
        owner,
        status,
        stall_number as "stallNumber",
        created_at as "createdAt",
        updated_at as "updatedAt"
      FROM horses
      WHERE id = ${id}
    `;

    if (rows.length === 0) {
      return NextResponse.json(
        { error: 'Horse not found' },
        { status: 404 }
      );
    }

    const horse = rows[0];

    // Fetch related data
    const { rows: medicalRecords } = await sql`
      SELECT
        id,
        date,
        type,
        description,
        veterinarian
      FROM medical_records
      WHERE horse_id = ${id}
      ORDER BY date DESC
    `;

    const { rows: vaccinations } = await sql`
      SELECT
        id,
        name,
        date,
        next_due as "nextDue",
        veterinarian
      FROM vaccinations
      WHERE horse_id = ${id}
      ORDER BY date DESC
    `;

    const { rows: trainingNotes } = await sql`
      SELECT
        id,
        date,
        trainer,
        duration,
        notes
      FROM training_notes
      WHERE horse_id = ${id}
      ORDER BY date DESC
    `;

    return NextResponse.json({
      ...horse,
      medicalRecords,
      vaccinations,
      trainingNotes,
    });
  } catch (error) {
    console.error('Error fetching horse:', error);
    return NextResponse.json(
      { error: 'Failed to fetch horse' },
      { status: 500 }
    );
  }
}

// PUT update horse
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { name, breed, age, color, owner, status, stallNumber } = body;

    const now = new Date().toISOString();

    await sql`
      UPDATE horses
      SET
        name = ${name},
        breed = ${breed},
        age = ${age},
        color = ${color},
        owner = ${owner},
        status = ${status},
        stall_number = ${stallNumber || null},
        updated_at = ${now}
      WHERE id = ${id}
    `;

    return NextResponse.json({ message: 'Horse updated successfully' });
  } catch (error) {
    console.error('Error updating horse:', error);
    return NextResponse.json(
      { error: 'Failed to update horse' },
      { status: 500 }
    );
  }
}

// DELETE horse
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    await sql`DELETE FROM horses WHERE id = ${id}`;

    return NextResponse.json({ message: 'Horse deleted successfully' });
  } catch (error) {
    console.error('Error deleting horse:', error);
    return NextResponse.json(
      { error: 'Failed to delete horse' },
      { status: 500 }
    );
  }
}
