import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Course } from '../models/Course';

@Injectable({
  providedIn: 'root',
})
export class RamschemaService {
  private selectedCoursesSubject = new BehaviorSubject<Course[]>([]);
  selectedCourses$ = this.selectedCoursesSubject.asObservable();

  private selectedCourses: Course[] = [];

  addCourseToSchedule(course: Course): void {
    if (!this.selectedCourses.find(c => c.courseCode === course.courseCode)) {
      this.selectedCourses.push(course);
      this.selectedCoursesSubject.next([...this.selectedCourses]);
    }
  }

  removeCourseFromSchedule(course: Course): void {
    this.selectedCourses = this.selectedCourses.filter(
      c => c.courseCode !== course.courseCode
    );
    this.selectedCoursesSubject.next([...this.selectedCourses]);
  }

  // 🔧 Lägg till denna metod:
  setInitialCourses(courses: Course[]): void {
    this.selectedCourses = courses;
    this.selectedCoursesSubject.next([...this.selectedCourses]);
  }
}
