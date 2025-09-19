import { Component, inject, OnInit } from '@angular/core';
import { ReservationService } from '../reservation/reservation.service';
import { Reservation } from '../models/reservation';
import { HomeComponent } from '../home/home.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-reservation-list',
  templateUrl: './reservation-list.component.html',
  styleUrls: ['./reservation-list.component.css'],
  imports: [HomeComponent, RouterLink],
})
export class ReservationListComponent implements OnInit {
  private reservationService = inject(ReservationService);
  reservations: Reservation[] = [];

  constructor(){}

  ngOnInit(): void {
    this.reservations = this.reservationService.getReservations();
  }

  deleteReservation(id: string){
    this.reservationService.deleteReservation(id);
  }

}
