import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RamschemaService } from '../../services/ramschema.service';
import { Course } from '../../models/Course';

@Component({
  selector: 'app-ramschema',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './ramschema.component.html',
  styleUrls: ['./ramschema.component.css']
})
export class RamschemaComponent implements OnInit {
  selectedCourses: Course[] = [];
  totalPoints: number = 0;

  constructor(private ramschemaService: RamschemaService) {}

  ngOnInit(): void {
    // 1. Hämta tidigare sparade kurser från localStorage
    const savedCourses = localStorage.getItem('selectedCourses');
    if (savedCourses) {
      this.selectedCourses = JSON.parse(savedCourses);
      this.calculateTotalPoints();
      // Uppdatera även RamschemaService med sparade kurser (valfritt)
      this.ramschemaService.setInitialCourses(this.selectedCourses);
    }

    // 2. Lyssna på ändringar från service
    this.ramschemaService.selectedCourses$.subscribe((selected: Course[]) => {
      this.selectedCourses = selected;
      this.calculateTotalPoints();
      this.saveToLocalStorage();
    });
  }

  removeFromSchedule(course: Course): void {
    this.ramschemaService.removeCourseFromSchedule(course);
    // OBS: this.selectedCourses uppdateras genom subscription ovan, så spara därifrån
  }

  private saveToLocalStorage(): void {
    localStorage.setItem('selectedCourses', JSON.stringify(this.selectedCourses));
  }

  private calculateTotalPoints(): void {
    this.totalPoints = this.selectedCourses.reduce((sum, course) => {
      const points = typeof course.points === 'string' ? parseFloat(course.points) : course.points;
      return sum + (isNaN(points) ? 0 : points);
    }, 0);
  }
}
