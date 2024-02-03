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
    this.renderTypeUserChart();
    this.renderRevenueChart();
  }

 // Different types of users
 renderTypeUserChart(){
  let broadBandUserCount: number = 0;
  let businessUserCount: number = 0;
  this.adminService.getAllUsers().subscribe(data =>{
    if (data && Array.isArray(data)) {
      // Count broadBandUser and businessUser
      broadBandUserCount = data.filter(user => user.broadBandUser).length;
      businessUserCount = data.filter(user => user.businessUser).length;

      // Render the pie chart with the counts
      this.renderChart(['Broadband Users', 'Business Users'], [broadBandUserCount, businessUserCount], 'pie', 'Di-types-piechart', 'Type of Users', ['rgba(255, 99, 132, 0.7)', 'rgba(54, 162, 235, 0.7)']);
    }
  });
}


// Bar chart
renderUserChart() {
  const barChartLabels: string[] = [];
  const barChartData: number[] = [];
  
  console.log('inside function');
  
  this.adminService.getUserServiceLinkTableDetails().subscribe(
    data => {
      console.log('inside get userservice');
      if (data && Array.isArray(data)) {
        // Iterate over each item in the array
        data.forEach(item => {
          // Check if either businessPlans or broadbandPlans exist
          if (item.businessPlans || item.broadbandPlans) {
            const planName = item.businessPlans ? item.businessPlans.planName : item.broadbandPlans.planName;

            // Check if the planName is already in the labels array
            const existingIndex = barChartLabels.indexOf(planName);

            if (existingIndex !== -1) {
              // If the planName exists, increment the count in the data array
              barChartData[existingIndex]++;
            } else {
              // If the planName doesn't exist, add it to the labels array and set count to 1 in the data array
              barChartLabels.push(planName);
              barChartData.push(1);
            }
          }
        });

        // Render the chart using the extracted data
        this.renderChart(barChartLabels, barChartData, 'bar', 'barchart', 'Number of Users', 'rgba(75,192,192,0.4)');
      }
    },
    error => {
      console.error('Error fetching data:', error);
    }
  );
}

// Pie chart
renderPlanChart() {
  // Make a service call to get data for the pie chart
  this.adminService.getUserServiceLinkTableDetails().subscribe(data => {

    // Check if the required data is present
    if (data && Array.isArray(data)) {
      // Count users for different plan validity periods (based on days) for both business and broadband
      const monthlyCount = data.filter(user => user.businessPlans && user.businessPlans.validity <= 30).length;
      const quarterlyCount = data.filter(user => user.businessPlans && user.businessPlans.validity > 30 && user.businessPlans.validity <= 91).length;
      const yearlyCount = data.filter(user => user.businessPlans && user.businessPlans.validity > 91 && user.businessPlans.validity <= 360).length;

      // Render the chart
      this.renderChart(['Monthly', 'Quarterly', 'Yearly'], [monthlyCount, quarterlyCount, yearlyCount], 'pie', 'piechart', '', ['rgba(255, 99, 132, 0.7)', 'rgba(54, 162, 235, 0.7)', 'rgba(255, 206, 86, 0.7)']);
    }
  });
}

// Bar chart for revenue
renderRevenueChart() {
  let totalRevenue: number = 0;
  let businessRevenue: number = 0;
  let broadbandRevenue: number = 0;

  // Calculate revenue based on plan prices and user subscriptions
  this.adminService.getActiveSubscriptions().subscribe(totalSubData => {
    console.log('total sub data------', totalSubData);
    this.adminService.getAllPlans().subscribe(plansData => {
      console.log('total plan data', plansData);

      if (totalSubData && Array.isArray(totalSubData) && plansData && plansData.plans && Array.isArray(plansData.plans)) {
        totalSubData.forEach(sub => {
          const planId = sub.business_plan_id || sub.broadband_plan_id;
          const plan = plansData.plans.find(p => p.id === planId);

          if (plan) {
            const price = plan.price;
            totalRevenue += price;

            if (sub.business_is_active) {
              businessRevenue += price;
            }

            if (sub.broadband_active) {
              broadbandRevenue += price;
            }
          }
        });

        console.log('revenues-----', totalRevenue, businessRevenue, broadbandRevenue);

        const labels: string[] = ['Total Revenue', 'Business Revenue', 'Broadband Revenue'];
        const data: number[] = [totalRevenue, businessRevenue, broadbandRevenue];

        this.renderChart(labels, data, 'bar', 'revenue-barchart', 'Revenue', 'rgba(75,192,192,0.4)');
      }
    });
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
