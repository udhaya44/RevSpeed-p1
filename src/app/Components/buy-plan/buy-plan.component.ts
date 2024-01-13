import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-buy-plan',
  templateUrl: './buy-plan.component.html',
  styleUrl: './buy-plan.component.scss'
})
export class BuyPlanComponent {
 
  // You may need to add necessary properties and methods here

  constructor(public dialogRef: MatDialogRef<BuyPlanComponent>) { }

  ngOnInit(): void {
    // Initialize any properties or perform any setup logic
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  // Add a method for buying the plan and validating customer existence
  buyPlan(planId: number): void {
    // Perform validation logic and add the plan to the customer in the JSON database
    // You may need to call a service method here to handle the API request

    // Example validation: Check if the customer is already present
    const customerExists = this.checkIfCustomerExists();

    if (customerExists) {
      // Customer already exists, handle accordingly (e.g., show an error message)
      console.log('Customer already exists.');
    } else {
      // Customer doesn't exist, proceed to add the plan to the customer
      console.log('Adding plan to the customer.');

      // Here, you can call your service method to add the plan to the customer in the database
      // You may need to pass the planId and perform necessary API requests
    }

    // Close the dialog after performing the necessary actions
    this.closeDialog();
  }

  // Example validation method, you should replace this with your actual validation logic
  private checkIfCustomerExists(): boolean {
    // Replace this with your actual logic to check if the customer exists
    // You might want to check a customer database or API endpoint
    // For simplicity, we return true in this example
    return true;
  }

}
