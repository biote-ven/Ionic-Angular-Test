import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { IonicModule } from '@ionic/angular'; 
import { ApiService } from 'src/app/services/api.service';
import { ITutor } from 'src/app/models';
import { BehaviorSubject, combineLatest, Observable, of, Subject } from 'rxjs';
import { startWith, map, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-tutors',
  templateUrl: './tutors.page.html',
  styleUrls: ['./tutors.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule,  HttpClientModule]
})
export class TutorsPage implements OnInit {

  tutors$: Observable<ITutor[]> | undefined;
  filteredTutors$: Observable<ITutor[]> | undefined;
  filterValue: string = '';
  private filterSubject = new BehaviorSubject<string>('');
  isLoading: boolean = true; // Controla el estado de carga
  showError: boolean = false; // Controla el mensaje de error (toast)

  constructor(private api: ApiService
  ) { }

  ngOnInit() {
    this.loadTutors();
  }


  loadTutors = () => {
    this.isLoading = true; // Activa el spinner
    this.tutors$ = this.api.getTutors().pipe(
      catchError((error) => {
        console.error('Error al cargar los tutores:', error);
        this.showError = true; // Muestra el toast de error
        return of([]); // Devuelve un array vacío en caso de error
      }),
      map((tutors) => {
        this.isLoading = false; // Desactiva el spinner
        return tutors;
      })
    );

    this.filteredTutors$ = combineLatest([
      this.tutors$,
      this.filterSubject.pipe(startWith('')), // Inicia con un valor vacío
    ]).pipe(
      map(([tutors, filterValue]) => {
        // Aplica el filtro
        return tutors.filter((tutor) =>
          tutor.speciality.toLowerCase().includes(filterValue.toLowerCase())
        );
      })
    );
  }


  applyFilter = () => {
    this.filterSubject.next(this.filterValue);
  }

}
