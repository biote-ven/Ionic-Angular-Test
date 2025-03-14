//import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

//import { AppModule } from './app/app.module';

/*platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));*/


import { bootstrapApplication } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'; // <-- Importa HttpClientModule
import { importProvidersFrom } from '@angular/core';
import { provideRouter, Route } from '@angular/router';
import { IonicModule } from '@ionic/angular'; // <-- Importa IonicModule
import { AppComponent } from './app/app.component';

// Define las rutas de la aplicación
const routes: Route[] = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadComponent: () => import('./app/pages/home/home.page').then((m) => m.HomePage) },
  { path: 'tutors', loadComponent: () => import('./app/pages/tutors/tutors.page').then((m) => m.TutorsPage) },
  { path: 'users', loadComponent: () => import('./app/pages/students/student.page').then((m) => m.StudentPage) },
  { path: 'reservas', loadComponent: () => import('./app/pages/classes/classes.page').then((m) => m.ClassesPage) },
  { path: 'users-detail', loadComponent: () => import('./app/pages/students/detail-students/detail-students.component').then((m) => m.DetailStudentsComponent) },
];

// Inicia la aplicación
bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(HttpClientModule, IonicModule.forRoot()), // <-- Configura HttpClientModule e IonicModule
    provideRouter(routes), // <-- Configura las rutas
  ],
}).catch((err) => console.error(err));