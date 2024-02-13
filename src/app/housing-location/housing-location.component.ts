import {Component, EventEmitter, Input, Output} from '@angular/core';
import { CommonModule } from '@angular/common';
import { HousingLocation } from '../housinglocation';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-housing-location',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  template: `
    <section class="listing">
      <div class="photo-container">
        <img class="listing-photo" [src]="housingLocation.photo" alt="Exterior photo of {{housingLocation.name}}">
        <input class="select-check" type="checkbox" (change)="toggleSelection($event)">
        <button class="delete-btn" (click)="deleteHousingLocation()">
          <img src="./../../assets/delete.svg" alt="delete">
        </button>
      </div>
      <h2 class="listing-heading">{{ housingLocation.name }}</h2>
      <p class="listing-location">{{ housingLocation.city}}, {{housingLocation.state }}</p>
      <a [routerLink]="['/details', housingLocation.id]">Learn More</a>
<!--      <button (click)="deleteHousingLocation()"><img class="delete-btn" src="./../../assets/delete.svg" alt="delete" width="16"></button>-->
    </section>
  `,
  styleUrls: ['./housing-location.component.css'],
})

export class HousingLocationComponent {

  @Input() housingLocation!: HousingLocation;
  @Output() deleteRequest = new EventEmitter<HousingLocation>();
  @Output() selectionChange = new EventEmitter<{ housingLocation: HousingLocation; isSelected: boolean }>();

  deleteHousingLocation() {
    this.deleteRequest.emit(this.housingLocation);
  }

  toggleSelection(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const isSelected = inputElement.checked;
    this.selectionChange.emit({ housingLocation: this.housingLocation, isSelected });
  }

}
