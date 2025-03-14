import { Injectable } from '@angular/core';



@Injectable({
  providedIn: 'root'
})
export class ConstService {

  public BASEURL: string = 'https://test.worldsacross.com/api';
  public TUTORS: string = '/tutors';
  public USERS: string = '/users';
  public BOOKING: string = '/booking';


  

  constructor() { }
}
