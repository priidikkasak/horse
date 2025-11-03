import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET all custom fields
export async function GET() {
  try {
    const fields = await prisma.horseCustomField.findMany({
      orderBy: { displayOrder: 'asc' },
    });

    return NextResponse.json(fields);
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
    const existing = await prisma.horseCustomField.findUnique({
      where: { key },
    });

    if (existing) {
      return NextResponse.json(
        { error: 'A field with this key already exists' },
        { status: 400 }
      );
    }

    const field = await prisma.horseCustomField.create({
      data: {
        label,
        key,
        fieldType,
        options: options || null,
        required: required || false,
        placeholder: placeholder || null,
        helpText: helpText || null,
        displayOrder: displayOrder || 0,
      },
    });

    return NextResponse.json(field, { status: 201 });
  } catch (error) {
    console.error('Error creating custom field:', error);
    return NextResponse.json(
      { error: 'Failed to create custom field' },
      { status: 500 }
    );
  }
}
