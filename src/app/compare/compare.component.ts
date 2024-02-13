import { Component } from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-compare',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    RouterLink
  ],
  template: `

    <table class='compareClass' *ngIf="selectedItems.length > 0">
      <thead>
      <tr>
        <th>Name</th>
        <th>City</th>
        <th>State</th>
        <th>Available Units</th>
        <th>WiFi</th>
        <th>Laundry</th>
        <th>Details</th>
      </tr>
      </thead>
      <tbody>
      <tr *ngFor="let item of selectedItems">
        <td>{{ item.name }}</td>
        <td>{{ item.city }}</td>
        <td>{{ item.state }}</td>
        <td>{{ item.availableUnits }}</td>
        <td>{{ item.wifi ? 'Yes' : 'No' }}</td>
        <td>{{ item.laundry ? 'Yes' : 'No' }}</td>
        <td><a [routerLink]="['/details', item.id]">Learn More</a></td>
      </tr>
      </tbody>
    </table>
  `,
  styleUrl: './compare.component.css'
})
export class CompareComponent {

  selectedItems: any[] = [];

  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    this.selectedItems = navigation?.extras.state?.['selectedItems'] || [];
  }

}
