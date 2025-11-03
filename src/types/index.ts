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
  horseId?: string;
  date: Date;
  type: string;
  description: string;
  veterinarian: string;
}

export interface Vaccination {
  id: string;
  horseId?: string;
  name: string;
  date: Date;
  nextDue: Date;
  veterinarian: string;
}

export interface TrainingNote {
  id: string;
  horseId?: string;
  date: Date;
  trainer: string;
  duration: number;
  notes: string;
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
