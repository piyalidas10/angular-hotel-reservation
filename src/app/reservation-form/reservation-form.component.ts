import { Component, inject, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { ReservationService } from '../reservation/reservation.service';
import { Reservation } from '../models/reservation';
import { Router, ActivatedRoute } from '@angular/router';
import { HomeComponent } from '../home/home.component';

@Component({
  selector: 'app-reservation-form',
  templateUrl: './reservation-form.component.html',
  styleUrls: ['./reservation-form.component.css'],
  imports: [ReactiveFormsModule, HomeComponent],
})
export class ReservationFormComponent implements OnInit {

  reservationForm: FormGroup = new FormGroup({});
  private reservationService = inject(ReservationService);

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute){

  }

  ngOnInit(): void {
    this.reservationForm = this.formBuilder.group({
      checkInDate: ['', Validators.required],
      checkOutDate: ['', Validators.required],
      guestName: ['', Validators.required],
      guestEmail: ['', [Validators.required, Validators.email]],
      roomNumber: ['', Validators.required]
    })

    let id = this.activatedRoute.snapshot.paramMap.get('id')

    if(id){
      let reservation = this.reservationService.getReservation(id)

      if(reservation)
        this.reservationForm.patchValue(reservation)
    }
  }

  onSubmit() {
    if(this.reservationForm.valid){

      let reservation: Reservation = this.reservationForm.value;

      let id = this.activatedRoute.snapshot.paramMap.get('id')

      if(id){
        // Update
        this.reservationService.updateReservation(id, reservation)
      } else {
        // New
        this.reservationService.addReservation(reservation)   

      }

      this.router.navigate(['/list'])
    }
  }

}
