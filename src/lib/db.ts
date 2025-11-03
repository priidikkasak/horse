import { sql } from '@vercel/postgres';

export async function initDatabase() {
  try {
    // Create horses table
    await sql`
      CREATE TABLE IF NOT EXISTS horses (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        breed TEXT NOT NULL,
        age INTEGER NOT NULL,
        color TEXT NOT NULL,
        owner TEXT NOT NULL,
        status TEXT NOT NULL,
        stall_number TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    // Create trainers table
    await sql`
      CREATE TABLE IF NOT EXISTS trainers (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        phone TEXT NOT NULL,
        specialties TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    // Create medical_records table
    await sql`
      CREATE TABLE IF NOT EXISTS medical_records (
        id TEXT PRIMARY KEY,
        horse_id TEXT NOT NULL REFERENCES horses(id) ON DELETE CASCADE,
        date TIMESTAMP NOT NULL,
        type TEXT NOT NULL,
        description TEXT NOT NULL,
        veterinarian TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    // Create vaccinations table
    await sql`
      CREATE TABLE IF NOT EXISTS vaccinations (
        id TEXT PRIMARY KEY,
        horse_id TEXT NOT NULL REFERENCES horses(id) ON DELETE CASCADE,
        name TEXT NOT NULL,
        date TIMESTAMP NOT NULL,
        next_due TIMESTAMP NOT NULL,
        veterinarian TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    // Create training_notes table
    await sql`
      CREATE TABLE IF NOT EXISTS training_notes (
        id TEXT PRIMARY KEY,
        horse_id TEXT NOT NULL REFERENCES horses(id) ON DELETE CASCADE,
        date TIMESTAMP NOT NULL,
        trainer TEXT NOT NULL,
        duration INTEGER NOT NULL,
        notes TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Error initializing database:', error);
    throw error;
  }
}

export { sql };
