export interface Horse {
  id: string;
  name: string;
  breed: string;
  age: number;
  color: string;
  owner: string;
  status: 'active' | 'injured' | 'retired';
  stallNumber?: string;
  medicalRecords: MedicalRecord[];
  vaccinations: Vaccination[];
  trainingNotes: TrainingNote[];
  createdAt: Date;
  updatedAt: Date;
}

export interface MedicalRecord {
  id: string;
  horseId: string;
  date: Date;
  diagnosis: string;
  treatment: string;
  veterinarian: string;
  notes?: string;
}

export interface Vaccination {
  id: string;
  horseId: string;
  vaccineName: string;
  dateAdministered: Date;
  nextDueDate: Date;
  veterinarian: string;
  batchNumber?: string;
}

export interface TrainingNote {
  id: string;
  horseId: string;
  date: Date;
  trainerId: string;
  activity: string;
  duration: number; // minutes
  notes: string;
  performance: 'excellent' | 'good' | 'average' | 'needs improvement';
}

export interface Trainer {
  id: string;
  name: string;
  email: string;
  phone: string;
  specialties: string[];
  availability: AvailabilitySlot[];
  createdAt: Date;
}

export interface AvailabilitySlot {
  id: string;
  trainerId: string;
  dayOfWeek: number; // 0-6 (Sunday-Saturday)
  startTime: string; // "HH:MM" format
  endTime: string;
  isBooked: boolean;
}

export interface Lesson {
  id: string;
  trainerId: string;
  horseId: string;
  clientName: string;
  clientEmail: string;
  date: Date;
  startTime: string;
  endTime: string;
  duration: number; // minutes
  type: 'private' | 'group' | 'training';
  status: 'scheduled' | 'completed' | 'cancelled';
  price: number;
  notes?: string;
}

export interface DashboardStats {
  totalHorses: number;
  activeHorses: number;
  occupancyRate: number; // percentage
  totalRevenue: number;
  monthlyRevenue: number;
  totalLessons: number;
  monthlyLessons: number;
  horseUtilization: HorseUtilization[];
}

export interface HorseUtilization {
  horseId: string;
  horseName: string;
  lessonsThisMonth: number;
  hoursThisMonth: number;
  utilizationRate: number; // percentage
}
