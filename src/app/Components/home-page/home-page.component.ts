import { Component } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent {
  cardTitle = 'Card Title';
  cardDescription = 'RevSpeed Basic Combo';
  isExpanded = false;
  isExpanded1 = true;
  isExpanded2 = false;


  toggleCard() {
    this.isExpanded = !this.isExpanded;
    this.isExpanded1 = false;
    this.isExpanded2 = false;
  }
  toggleCard1() {
    this.isExpanded1 = !this.isExpanded;
    this.isExpanded =false
    this.isExpanded2 = false;
  }
  toggleCard2() {
    this.isExpanded2 = !this.isExpanded;
    this.isExpanded =false
    this.isExpanded1 = false;
    

  }

}
