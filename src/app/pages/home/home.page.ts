import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular'; // Import IonicModule
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonicModule]
})
export class HomePage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }


  goTutors = () => {
    this.router.navigate(['/tutors']);
  };

  goUsers = () => {
    this.router.navigate(['/users']);
  };

  goReservations = () => {
    this.router.navigate(['/reservas']);
  };

}
