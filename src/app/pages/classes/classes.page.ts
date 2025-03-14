import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { IonicModule } from '@ionic/angular'; // Import IonicModule
import { BehaviorSubject, combineLatest, map, Observable, startWith } from 'rxjs';
import { IBooking } from 'src/app/models';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-classes',
  templateUrl: './classes.page.html',
  styleUrls: ['./classes.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule,  HttpClientModule]
})
export class ClassesPage implements OnInit {

  bookings$: Observable<IBooking[]> | undefined;
  filteredBookings$: Observable<IBooking[]> | undefined;
  filterValue: string = '';
  private filterSubject = new BehaviorSubject<string>('');

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.bookings$ = this.api.getBookings();

    this.filteredBookings$ = combineLatest([
      this.bookings$,
      this.filterSubject.pipe(startWith('')), // Inicia con un valor vacío
    ]).pipe(
      map(([tutors, filterValue]) => {
        // Aplica el filtro
        return tutors.filter((bookings) =>
          bookings.user.last_name.toLowerCase().includes(filterValue.toLowerCase())
        );
      })
    );
  }

  applyFilter = () => {
    this.filterSubject.next(this.filterValue);
  }

}
