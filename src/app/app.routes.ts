import { Routes } from '@angular/router';
import { CourseComponent } from './components/course/course.component';  // Importera din komponent
import { RamschemaComponent } from './components/ramschema/ramschema.component'; 
export const routes: Routes = [
  { path: 'courses', component: CourseComponent }, 
  { path: 'ramschema', component: RamschemaComponent },  // Definiera en rutt för CourseComponent
  { path: '', redirectTo: '/courses', pathMatch: 'full' }  // Standardruta som omdirigerar till kurser
  ];


  