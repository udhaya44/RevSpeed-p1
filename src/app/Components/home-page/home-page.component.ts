import { Component } from '@angular/core';
import { AuthService } from '../Services/auth.service';
import { log } from 'util';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent {

  selectedLocType: string = 'home'; 
  selectedTabIndex: number = 0;

  reviews: any[];
  activeReviewIndex: number = 0;

  constructor(private auth: AuthService) {
    this.reviews = [];
  }

  cardTitle = 'Card Title';
  cardDescription = 'RevSpeed Basic Combo';
  isExpanded = true;
  isExpanded1 = true;
  isExpanded2 = true;


  updateLocationType(locType: string) {
    this.selectedLocType = locType;
    console.log(locType);
    
  }
  toggleCard() {
    // this.isExpanded = !this.isExpanded;
    // this.isExpanded1 = false;
    // this.isExpanded2 = false;
  }
  toggleCard1() {
    // this.isExpanded1 = !this.isExpanded;
    // this.isExpanded =false
    // this.isExpanded2 = false;
  }
  toggleCard2() {
    // this.isExpanded2 = !this.isExpanded;
    // this.isExpanded =false
    // this.isExpanded1 = false;
    

  }
  


 
  //calling service for review card
  ngOnInit(): void {
    this.auth.getReviews().subscribe((data) => {
      this.reviews = data;
    });
  }

  getStars(rating: number): number[] {
    // Assuming you have 5 stars
    return Array.from({ length: rating }, (_, index) => (index < rating ? 1 : 0));
  }
  

}
