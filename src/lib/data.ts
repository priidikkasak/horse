import { Horse, Trainer, Lesson, MedicalRecord, Vaccination, TrainingNote } from "@/types";

// Mock data for development
export const mockHorses: Horse[] = [
  {
    id: "1",
    name: "Thunder",
    breed: "Thoroughbred",
    age: 5,
    color: "Bay",
    owner: "John Smith",
    status: "active",
    stallNumber: "A12",
    medicalRecords: [],
    vaccinations: [],
    trainingNotes: [],
    createdAt: new Date("2023-01-15"),
    updatedAt: new Date("2024-10-15"),
  },
  {
    id: "2",
    name: "Midnight",
    breed: "Arabian",
    age: 7,
    color: "Black",
    owner: "Sarah Johnson",
    status: "active",
    stallNumber: "B05",
    medicalRecords: [],
    vaccinations: [],
    trainingNotes: [],
    createdAt: new Date("2022-06-20"),
    updatedAt: new Date("2024-10-10"),
  },
  {
    id: "3",
    name: "Spirit",
    breed: "Quarter Horse",
    age: 4,
    color: "Chestnut",
    owner: "Mike Davis",
    status: "active",
    stallNumber: "A08",
    medicalRecords: [],
    vaccinations: [],
    trainingNotes: [],
    createdAt: new Date("2023-03-10"),
    updatedAt: new Date("2024-10-12"),
  },
];

export const mockTrainers: Trainer[] = [
  {
    id: "1",
    name: "Emily Rodriguez",
    email: "emily@stables.com",
    phone: "+1-555-0101",
    specialties: ["Dressage", "Show Jumping"],
    availability: [],
    createdAt: new Date("2022-01-01"),
  },
  {
    id: "2",
    name: "David Chen",
    email: "david@stables.com",
    phone: "+1-555-0102",
    specialties: ["Western Riding", "Trail Riding"],
    availability: [],
    createdAt: new Date("2022-03-15"),
  },
];

export const mockLessons: Lesson[] = [
  {
    id: "1",
    trainerId: "1",
    horseId: "1",
    clientName: "Alice Brown",
    clientEmail: "alice@email.com",
    date: new Date("2024-11-05"),
    startTime: "10:00",
    endTime: "11:00",
    duration: 60,
    type: "private",
    status: "scheduled",
    price: 75,
  },
  {
    id: "2",
    trainerId: "2",
    horseId: "2",
    clientName: "Bob Wilson",
    clientEmail: "bob@email.com",
    date: new Date("2024-11-05"),
    startTime: "14:00",
    endTime: "15:00",
    duration: 60,
    type: "private",
    status: "scheduled",
    price: 75,
  },
];

export const mockMedicalRecords: MedicalRecord[] = [
  {
    id: "1",
    horseId: "1",
    date: new Date("2024-09-15"),
    type: "Minor hoof bruise",
    description: "Rest and cold therapy applied. Should be fully recovered in 2 weeks",
    veterinarian: "Dr. Sarah Miller",
  },
];

export const mockVaccinations: Vaccination[] = [
  {
    id: "1",
    horseId: "1",
    name: "Tetanus",
    date: new Date("2024-05-10"),
    nextDue: new Date("2025-05-10"),
    veterinarian: "Dr. Sarah Miller",
  },
  {
    id: "2",
    horseId: "1",
    name: "West Nile Virus",
    date: new Date("2024-04-15"),
    nextDue: new Date("2025-04-15"),
    veterinarian: "Dr. Sarah Miller",
  },
];

export const mockTrainingNotes: TrainingNote[] = [
  {
    id: "1",
    horseId: "1",
    date: new Date("2024-10-30"),
    trainer: "Emily Rodriguez",
    duration: 45,
    notes: "Jumping exercises - Excellent progress on 3-foot jumps. Ready to move up.",
  },
  {
    id: "2",
    horseId: "1",
    date: new Date("2024-10-28"),
    trainer: "Emily Rodriguez",
    duration: 60,
    notes: "Dressage practice - Working on transitions. Needs more practice.",
  },
];

// Helper functions to get related data
export function getHorseById(id: string): Horse | undefined {
  return mockHorses.find(horse => horse.id === id);
}

export function getMedicalRecordsByHorseId(horseId: string): MedicalRecord[] {
  return mockMedicalRecords.filter(record => record.horseId === horseId);
}

export function getVaccinationsByHorseId(horseId: string): Vaccination[] {
  return mockVaccinations.filter(vac => vac.horseId === horseId);
}

export function getTrainingNotesByHorseId(horseId: string): TrainingNote[] {
  return mockTrainingNotes.filter(note => note.horseId === horseId);
}

export function getTrainerById(id: string): Trainer | undefined {
  return mockTrainers.find(trainer => trainer.id === id);
}

export function getLessonsByTrainerId(trainerId: string): Lesson[] {
  return mockLessons.filter(lesson => lesson.trainerId === trainerId);
}

export function getLessonsByHorseId(horseId: string): Lesson[] {
  return mockLessons.filter(lesson => lesson.horseId === horseId);
}
