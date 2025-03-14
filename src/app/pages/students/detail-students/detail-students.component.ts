import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IonicModule, ToastController } from '@ionic/angular'; // Import IonicModule


@Component({
  selector: 'app-detail-students',
  templateUrl: './detail-students.component.html',
  styleUrls: ['./detail-students.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, 
    FormsModule, 
    ReactiveFormsModule]
})
export class DetailStudentsComponent  implements OnInit {

  form = new FormGroup({
    last_name: new FormControl('', [Validators.required]),
    first_name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.minLength(6), Validators.email]),
    phone: new FormControl('', [Validators.required]),
  });

  constructor(private toastController: ToastController) { }

  ngOnInit() {
    // Recuperar el objeto desde localStorage
    const studentToEdit = localStorage.getItem('studentToEdit');

    if (studentToEdit) {
      const student = JSON.parse(studentToEdit); // Convertir de string a objeto
      this.form.patchValue(student); // Rellenar el formulario con los datos del estudiante
      localStorage.removeItem('studentToEdit');
    }

  }

  async submit() {
    if (this.form.valid) {
      // Aquí puedes hacer algo con los datos del formulario, como enviarlos a un servidor
      console.log(this.form.value);

      // Muestra el mensaje toast
      const toast = await this.toastController.create({
        message: 'Estudiante guardado correctamente',
        duration: 5000, // Duración de 5 segundos
        position: 'bottom' // Posición del toast
      });

      await toast.present();
    }
  }

}
