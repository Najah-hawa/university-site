import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CourseService } from '../../services/course.service';
import { Course } from '../../models/Course';
import { RamschemaService } from '../../services/ramschema.service';

@Component({
  selector: 'app-course',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {
  courses: Course[] = [];
  filteredCourses: Course[] = [];
  searchTerm: string = '';
  selectedSubject: string = '';
  sortColumn: string = 'courseCode'; // Ändra till string
  sortAsc: boolean = true;
  uniqueSubjects: string[] = [];
  selectedCourses: Course[] = [];

  constructor(
    private courseService: CourseService,
    private ramschemaService: RamschemaService
  ) {}
//hämta alla kurser, extrahera unika ämnen till filtret och även Lyssna på RamschemaService. 
  ngOnInit(): void {
    this.courseService.getCourses().subscribe((data) => {
      this.courses = data;
      const subjects = this.courses.map(course => course.subject);
      this.uniqueSubjects = [...new Set(subjects)].sort();
      this.applyFilters();
    });

    this.ramschemaService.selectedCourses$.subscribe((selected: Course[]) => {
      this.selectedCourses = selected;
    });
  }

//söka i kursnamn och kurskod och filtrerar även på ämne. 
  applyFilters(): void {
    const term = this.searchTerm.toLowerCase();
    this.filteredCourses = this.courses
      .filter(course => {
        const matchSearch =
          course.courseCode.toLowerCase().includes(term) ||
          course.courseName.toLowerCase().includes(term);
        const matchSubject =
          !this.selectedSubject || course.subject === this.selectedSubject;
        return matchSearch && matchSubject;
      })
      .sort((a, b) => this.sortFunction(a, b));  // sortFunction() för att sortera resultatet. 
  }

//styr sortering av tabellen sortera kurserna i listan, beroende på vilket kolumnnamn (sortColumn) användaren har klickat på
  private sortFunction(a: Course, b: Course): number {
    const valA = a[this.sortColumn];
    const valB = b[this.sortColumn];

    if (typeof valA === 'number' && typeof valB === 'number') {  //Om det vi sorterar på är ett tal (t.ex. points), då jämförs de som vanliga siffror:
      return this.sortAsc ? valA - valB : valB - valA; //valA - valB ger stigande sortering (lägsta först) medan valB - valA ger fallande sortering (högsta först)
    }

    if (typeof valA === 'string' && typeof valB === 'string') { //här gäller för text samma sak
      return this.sortAsc ? valA.localeCompare(valB) : valB.localeCompare(valA);
    }

    return 0;  //Om värdena inte är av typen string eller number, så returneras 0
  }

//Växla sorteringsriktning  när man klickar på en kolumnrubrik 
  toggleSortDirection(): void {
    this.sortAsc = !this.sortAsc;
    this.applyFilters();
  }

//metod för att lägga till kurs i ramschema och  undivika dubletter
  addToSchedule(course: Course): void {
    if (!this.isCourseAdded(course)) {
      this.ramschemaService.addCourseToSchedule(course);
    }
  }

  isCourseAdded(course: Course): boolean {
    return this.selectedCourses.some(c => c.courseCode === course.courseCode);
  }

  
}



