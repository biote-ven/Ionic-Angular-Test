import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular'; // Import IonicModule
import { CommonModule } from '@angular/common';
import { ApiService } from 'src/app/services/api.service';
import { IUser } from 'src/app/models';
import { catchError, map, Observable, of } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student',
  templateUrl: './student.page.html',
  styleUrls: ['./student.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class StudentPage implements OnInit {

  users$: Observable<IUser[]> | undefined;
  isLoading: boolean = true; 
  showError: boolean = false; 

  constructor(private api: ApiService,
    private router: Router
  ) { }

  ngOnInit() {
    this.loadStudents();
    
  }

  loadStudents = () => {
    this.isLoading = true; // Activa el spinner
    this.users$ = this.api.getUsers().pipe(
      catchError((error) => {
        console.error('Error al cargar los estudiantes:', error);
        this.showError = true; // Muestra el toast de error
        this.isLoading = false; // Desactiva el spinner
        return of([]); // Devuelve un array vacío en caso de error
      }),
      map((users) => {
        this.isLoading = false; // Desactiva el spinner
        return users;
      })
    );
  };


  editStudent = (itemUser: IUser) => {
    localStorage.setItem('studentToEdit', JSON.stringify(itemUser));
    this.router.navigate(['/users-detail']);
  };

}
