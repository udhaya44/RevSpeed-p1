import { Component } from '@angular/core';

@Component({
  selector: 'app-speedtest',
  templateUrl: './speedtest.component.html',
  styleUrl: './speedtest.component.scss'
})
export class SpeedtestComponent {
  faqs = [
    {
      question: 'How do I test my internet speed?',
      answer: 'Use Revspeed’s test at the top of this page to check your internet speed. Test results will show your upload and download speeds, plus your ping rate (a measure of latency).'
    },
    {
      question: 'How do I read an internet speed test?',
      answer: 'There are many variables measured by a speed test. Wi-Fi strength is defined by upload and download speeds and ping rate. The download speed should generally be close to the amount of Mbps your internet plan offers, though your upload speed will likely be slower, unless you have a fiber internet connection.Your ping rate is a measure of latency, or how long your device might experience lag. If your internet connection is strong, your ping rate will be under 150 milliseconds (ms). The lower the ping rate, the better your internet connection.'
    },
    {
      question: 'What are good internet speed test results?',
      answer: 'There is no right or wrong answer to an internet speed test. However, you’ll want your download speeds to measure close to the speed promised by your internet provider. For instance, if you have a 100 Mbps plan, you’ll want your download speed to be close to that number (unless you have a fiber internet plan, your upload speed will often be slower than that). A good ping rate measures under 150ms. The lower the ping rate, the better.'
    }
  ];


  panelOpenState = false;
}
