import { NextResponse } from 'next/server';
import { sql } from '@/lib/db';

// GET all trainers
export async function GET() {
  try {
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
      ORDER BY created_at DESC
    `;

    // Parse specialties JSON string to array
    const trainers = rows.map((trainer) => ({
      ...trainer,
      specialties: JSON.parse(trainer.specialties),
      availability: [], // Empty array for now
    }));

    return NextResponse.json(trainers);
  } catch (error) {
    console.error('Error fetching trainers:', error);
    return NextResponse.json(
      { error: 'Failed to fetch trainers' },
      { status: 500 }
    );
  }
}

// POST new trainer
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, specialties } = body;

    const id = Date.now().toString();
    const now = new Date().toISOString();

    // Store specialties as JSON string
    const specialtiesJSON = JSON.stringify(specialties);

    await sql`
      INSERT INTO trainers (id, name, email, phone, specialties, created_at, updated_at)
      VALUES (${id}, ${name}, ${email}, ${phone}, ${specialtiesJSON}, ${now}, ${now})
    `;

    const newTrainer = {
      id,
      name,
      email,
      phone,
      specialties,
      availability: [],
      createdAt: new Date(now),
      updatedAt: new Date(now),
    };

    return NextResponse.json(newTrainer, { status: 201 });
  } catch (error) {
    console.error('Error creating trainer:', error);
    return NextResponse.json(
      { error: 'Failed to create trainer' },
      { status: 500 }
    );
  }
}
