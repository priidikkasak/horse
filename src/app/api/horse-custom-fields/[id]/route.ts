import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// PUT update custom field
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { label, key, fieldType, options, required, placeholder, helpText, displayOrder } = body;

    // Check if key is being changed and if it conflicts with another field
    const existing = await prisma.horseCustomField.findUnique({
      where: { key },
    });

    if (existing && existing.id !== id) {
      return NextResponse.json(
        { error: 'A field with this key already exists' },
        { status: 400 }
      );
    }

    const field = await prisma.horseCustomField.update({
      where: { id },
      data: {
        label,
        key,
        fieldType,
        options: options || null,
        required: required || false,
        placeholder: placeholder || null,
        helpText: helpText || null,
        displayOrder: displayOrder !== undefined ? displayOrder : undefined,
      },
    });

    return NextResponse.json(field);
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

    await prisma.horseCustomField.delete({
      where: { id },
    });

    return NextResponse.json({ message: 'Custom field deleted successfully' });
  } catch (error) {
    console.error('Error deleting custom field:', error);
    return NextResponse.json(
      { error: 'Failed to delete custom field' },
      { status: 500 }
    );
  }
}
