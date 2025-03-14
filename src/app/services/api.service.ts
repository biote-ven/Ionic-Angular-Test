import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';
import { ConstService } from 'src/app/services/const.service';
import { IBooking, ITutor, IUser } from 'src/app/models';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private constService: ConstService,
    public http: HttpClient
  ) { }

  //GET TUTORS
  getTutors(): Observable<ITutor[] | []> {
    return this.http.get<ITutor[] | []>(`${this.constService.BASEURL}${this.constService.TUTORS}`)
    .pipe(
      map(values => {
        return values;
      }),
      catchError(error => {
        console.error('Error al obtener los Tutores:', error);
        return throwError(() => error);
      })
    );
  }

  //GET USERS
  getUsers(): Observable<IUser[] | []> {
      return this.http.get<IUser[] | []>(`${this.constService.BASEURL}${this.constService.USERS}`)
      .pipe(
        map(values => {
          return values;
        }),
        catchError(error => {
          console.error('Error al obtener los Usuarios:', error);
          return throwError(() => error);
        })
      );
  }

  //GET BOOKINGS
  getBookings(): Observable<IBooking[] | []> {
    return this.http.get<IBooking[] | []>(`${this.constService.BASEURL}${this.constService.BOOKING}`)
    .pipe(
      map(values => {
        return values;
      }),
      catchError(error => {
        console.error('Error al obtener las Reservas:', error);
        return throwError(() => error);
      })
    );
  }
}
