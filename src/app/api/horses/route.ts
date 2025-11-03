import { NextResponse } from 'next/server';
import { sql } from '@/lib/db';

// GET all horses
export async function GET() {
  try {
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
      ORDER BY created_at DESC
    `;

    // Fetch related data for each horse
    const horsesWithDetails = await Promise.all(
      rows.map(async (horse) => {
        const { rows: medicalRecords } = await sql`
          SELECT
            id,
            date,
            type,
            description,
            veterinarian
          FROM medical_records
          WHERE horse_id = ${horse.id}
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
          WHERE horse_id = ${horse.id}
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
          WHERE horse_id = ${horse.id}
          ORDER BY date DESC
        `;

        return {
          ...horse,
          medicalRecords,
          vaccinations,
          trainingNotes,
        };
      })
    );

    return NextResponse.json(horsesWithDetails);
  } catch (error) {
    console.error('Error fetching horses:', error);
    return NextResponse.json(
      { error: 'Failed to fetch horses' },
      { status: 500 }
    );
  }
}

// POST new horse
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, breed, age, color, owner, status, stallNumber } = body;

    const id = Date.now().toString();
    const now = new Date();

    await sql`
      INSERT INTO horses (id, name, breed, age, color, owner, status, stall_number, created_at, updated_at)
      VALUES (${id}, ${name}, ${breed}, ${age}, ${color}, ${owner}, ${status}, ${stallNumber || null}, ${now}, ${now})
    `;

    const newHorse = {
      id,
      name,
      breed,
      age,
      color,
      owner,
      status,
      stallNumber: stallNumber || null,
      createdAt: now,
      updatedAt: now,
      medicalRecords: [],
      vaccinations: [],
      trainingNotes: [],
    };

    return NextResponse.json(newHorse, { status: 201 });
  } catch (error) {
    console.error('Error creating horse:', error);
    return NextResponse.json(
      { error: 'Failed to create horse' },
      { status: 500 }
    );
  }
}
