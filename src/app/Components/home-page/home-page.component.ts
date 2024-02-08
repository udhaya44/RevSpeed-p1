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
    this.reviews = [
      {
        "userName": "John Doe",
        "companyName": "RevSpeed Internet",
        "rating": "5",
        "comment": "RevSpeed Internet provides an exceptional broadband service. The speed is incredible, and the connection is rock-solid.",
        "submissionDate": "2024-02-08T10:00:00.000Z",
        "id": 1
      },
      {
        "userName": "Alice Smith",
        "companyName": "RevSpeed Broadband",
        "rating": "4",
        "comment": "RevSpeed Broadband offers reliable and high-speed internet. Their service has greatly improved my online experience.",
        "submissionDate": "2024-02-08T10:15:00.000Z",
        "id": 2
      },
      {
        "userName": "Emily Johnson",
        "companyName": "RevSpeed Connectivity Solutions",
        "rating": "5",
        "comment": "RevSpeed Connectivity Solutions has transformed the way I do business online. Their broadband service is fast and dependable.",
        "submissionDate": "2024-02-08T10:30:00.000Z",
        "id": 3
      },
      {
        "userName": "David Brown",
        "companyName": "RevSpeed NetWave",
        "rating": "4",
        "comment": "RevSpeed NetWave offers top-notch internet connectivity. I'm impressed by the consistent speed and reliable connection.",
        "submissionDate": "2024-02-08T10:45:00.000Z",
        "id": 4
      },
      {
        "userName": "Sophia Miller",
        "companyName": "RevSpeed FastLink",
        "rating": "5",
        "comment": "RevSpeed FastLink delivers lightning-fast internet service. Their broadband connection has greatly improved my productivity.",
        "submissionDate": "2024-02-08T11:00:00.000Z",
        "id": 5
      }
    ];
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
