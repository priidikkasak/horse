import { mockHorses, mockLessons } from "./data";
import { DashboardStats, HorseUtilization } from "@/types";

export function calculateDashboardStats(): DashboardStats {
  const totalHorses = mockHorses.length;
  const activeHorses = mockHorses.filter((h) => h.status === "active").length;

  // Calculate occupancy rate (assuming 20 stalls total)
  const totalStalls = 20;
  const occupancyRate = (totalHorses / totalStalls) * 100;

  // Calculate revenue
  const totalRevenue = mockLessons.reduce((sum, lesson) => sum + lesson.price, 0);

  // Calculate monthly revenue (current month)
  const now = new Date();
  const monthlyLessons = mockLessons.filter((lesson) => {
    const lessonDate = new Date(lesson.date);
    return (
      lessonDate.getMonth() === now.getMonth() &&
      lessonDate.getFullYear() === now.getFullYear()
    );
  });
  const monthlyRevenue = monthlyLessons.reduce((sum, lesson) => sum + lesson.price, 0);

  // Calculate lessons
  const totalLessons = mockLessons.length;

  // Calculate horse utilization
  const horseUtilization: HorseUtilization[] = mockHorses.map((horse) => {
    const horseLessons = monthlyLessons.filter((lesson) => lesson.horseId === horse.id);
    const lessonsThisMonth = horseLessons.length;
    const hoursThisMonth = horseLessons.reduce(
      (sum, lesson) => sum + lesson.duration / 60,
      0
    );

    // Utilization rate based on 40 hours per month max (e.g., 2 hours/day average)
    const maxHoursPerMonth = 40;
    const utilizationRate = Math.min((hoursThisMonth / maxHoursPerMonth) * 100, 100);

    return {
      horseId: horse.id,
      horseName: horse.name,
      lessonsThisMonth,
      hoursThisMonth: Math.round(hoursThisMonth * 10) / 10,
      utilizationRate: Math.round(utilizationRate),
    };
  });

  return {
    totalHorses,
    activeHorses,
    occupancyRate: Math.round(occupancyRate * 10) / 10,
    totalRevenue,
    monthlyRevenue,
    totalLessons,
    monthlyLessons: monthlyLessons.length,
    horseUtilization,
  };
}
