import { Component } from '@angular/core';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.scss'
})
export class ContactUsComponent {

  constructor() {
    console.log('FAQs:', this.faqs);
  }

  activeIndex: number | null = null;

  toggleAccordion(index:any): void {
    console.log("Toggling accordion for index",);
    console.log(`Toggling accordion for index: ${index}`);
    this.activeIndex = (this.activeIndex === index) ? null : index;
    console.log(`Active Index after toggle: ${this.activeIndex}`);
  }


  faqs = [
    {
      question: 'Who is Revspeed?',
      answer: 'Revspeed is an internet service provider bringing the latest in internet and home phone technology to 20 states across the Midwest and Southeast U.S.'
    },
    {
      question: 'How many team members can I invite?',
      answer: 'You can invite up to 2 additional users on the Free plan. There is no limit on team members for the Premium plan.'
    },
    {
      question: 'How do I determine which services I need?',
      answer: 'Choose from our best Business Internet, Phone, Mobile, and TV solutions. Get one-on-one guidance from a U.S.-based specialist who can walk you through all your options and help you get the right mix of services for your business. Give us a call at 844.923.0163 Monday-Friday, 8 am-11 pm ET.'
    },
    {
      question:'How long does RevSpeed Business installation take?',
      answer:'Getting new technology services shouldn’t be a hassle. That’s why we work around your schedule to bring you convenient 1-hour installation appointments—and we’ll even send you reminder notifications leading up to it.'
    },
    {
      question:'Can I move my internet service from another provider?',
      answer:'Yes, you can move your internet service to Brightspeed from another provider. Keep in mind that switching services may result in early termination fees from your previous provider. If you’d like to talk it through with a support agent, call 1-855-889-0307 '
    }
  ];
  panelOpenState = false;
}
