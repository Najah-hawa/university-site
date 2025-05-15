export interface Course {
  courseCode: string;
  courseName: string;
  points: number;
  subject: string;
  syllabus: string;
  // Indexsignatur för att tillåta dynamisk indexering
  [key: string]: string | number; // Tillåter sträng eller nummer som värde för vilken nyckel som helst
}
