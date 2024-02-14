import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HousingLocationComponent } from '../housing-location/housing-location.component';
import { HousingLocation } from '../housinglocation';
import { HousingService } from '../housing.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    HousingLocationComponent
  ],
  template: `
    <section>
      <div class="search-and-compare">
        <form class="search-form" (submit)="filterResults(filter.value); $event.preventDefault()">
          <input type="text" placeholder="Filter by city" #filter>
          <button class="primary" type="submit">Search</button>
        </form>
        <button class="primary compare-btn" (click)="navigateToCompare()">Compare</button>
      </div>
    </section>
    <section class="results">
      <app-housing-location
        *ngFor="let housingLocation of filteredLocationList"
        [housingLocation]="housingLocation"
        (deleteRequest)="handleDelete(housingLocation)"
      (selectionChange)="handleSelectionChange($event)">
      </app-housing-location>
    </section>
  `,
  styleUrls: ['./home.component.css'],
})

export class HomeComponent {
  housingLocationList: HousingLocation[] = [];
  housingService: HousingService = inject(HousingService);
  filteredLocationList: HousingLocation[] = [];
  selectedItems: HousingLocation[] = [];

  constructor(private router: Router) {
    this.housingService.getAllHousingLocations().then((housingLocationList: HousingLocation[]) => {
      this.housingLocationList = housingLocationList;
      this.filteredLocationList = housingLocationList;
    });
  }

  filterResults(text: string) {
    if (!text) {
      this.filteredLocationList = this.housingLocationList;
      return;
    }

    this.filteredLocationList = this.housingLocationList.filter(
      housingLocation => housingLocation?.city.toLowerCase().includes(text.toLowerCase())
    );
  }

  handleDelete(housingLocation: HousingLocation) {
    // Remove from the local list
    this.filteredLocationList = this.filteredLocationList.filter(hl => hl !== housingLocation);
    this.housingLocationList = this.housingLocationList.filter(hl => hl !== housingLocation);
    this.selectedItems = this.selectedItems.filter(hl => hl !== housingLocation);
    // Optionally, call your service to delete from the backend
    // this.housingService.deleteHousingLocation(housingLocation.id).then(() => {
    //   // Handle any additional logic after deletion, if necessary
    // });
  }

  handleSelectionChange($event: { housingLocation: HousingLocation; isSelected: boolean }) {
    if ($event.isSelected) {
      // Add to the list of selected items
      this.selectedItems.push($event.housingLocation);
    } else {
      // Remove from the list of selected items
      this.selectedItems = this.selectedItems.filter(hl => hl !== $event.housingLocation);
    }
    console.log(this.selectedItems);
  }

  navigateToCompare() {
    this.router.navigate(['/compare'], { state: { selectedItems: this.selectedItems } });
  }
}
