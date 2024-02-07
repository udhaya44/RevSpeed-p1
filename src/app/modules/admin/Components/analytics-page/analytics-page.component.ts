import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { AdminService } from '../../admin.service';

Chart.register(...registerables);

@Component({
  selector: 'app-analytics-page',
  templateUrl: './analytics-page.component.html',
  styleUrls: ['./analytics-page.component.scss']
})
export class AnalyticsPageComponent implements OnInit {

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.renderCharts();
  }

  // Render both bar and pie charts
  renderCharts() {
    this.renderUserChart();
    this.renderPlanChart();
  }

// Bar chart
renderUserChart() {
  const barChartLabels: string[] = [];
  const barChartData: number[] = [];

  this.adminService.getPieChartDetails().subscribe(data => {
    if (data && data.plans && data.users) {
      // Iterate through each plan in the data
      for (const plan of data.plans) {
        // Add the plan name to the labels array
        barChartLabels.push(plan.planName);

        // Count the number of users for the current plan using filtering
        const usersCount = data.users.filter((user: { userplanid: any; }) => user.userplanid === plan.id).length;

        // Add the user count to the data array
        barChartData.push(usersCount);
      }

      this.renderChart(barChartLabels, barChartData, 'bar', 'barchart', 'Number of Users', 'rgba(75,192,192,0.4)');
    }
  });
}


  // Pie chart
  renderPlanChart() {
    // Get the canvas element with the ID 'piechart'
    // const ctx = document.getElementById('piechart') as HTMLCanvasElement;

     // Make a service call to get data for the pie chart
    this.adminService.getPieChartDetails().subscribe(data => {
       // Check if the required data is present
      if (data && data.plans && data.users) {
        // Count users for different plan durations (monthly, quarterly, yearly)
        const monthlyCount = data.users.filter((user: { userplanid: any; }) => {
          const plan = data.plans.find((p: { id: any; }) => p.id === user.userplanid);
          return plan && plan.validity <= 30;
        }).length;

        const quarterlyCount = data.users.filter((user: { userplanid: any; }) => {
          const plan = data.plans.find((p: { id: any; }) => p.id === user.userplanid);
          return plan && plan.validity > 30 && plan.validity <= 91;
        }).length;

        const yearlyCount = data.users.filter((user: { userplanid: any; }) => {
          const plan = data.plans.find((p: { id: any; }) => p.id === user.userplanid);
          return plan && plan.validity > 91 && plan.validity <= 360;
        }).length;

        this.renderChart(['Monthly', 'Quarterly', 'Yearly'], [monthlyCount, quarterlyCount, yearlyCount], 'pie', 'piechart', '', ['rgba(255, 99, 132, 0.7)', 'rgba(54, 162, 235, 0.7)', 'rgba(255, 206, 86, 0.7)']);
      }
    });
  }

  // General chart rendering function
  renderChart(labels: any[], data: any[], type: any, element: any, chartLabel: any, backgroundColor: string | string[]) {
    new Chart(element, {
      type: type,
      data: {
        //x-axis
        labels: labels,
        datasets: [{
          label: chartLabel,
          // y-axis
          data: data,
          borderWidth: 1,
          backgroundColor: backgroundColor,
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
}
