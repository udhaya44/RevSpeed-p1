import { Component } from '@angular/core';
import { faDashboard, faChartLine, faUser, faUserTie, faList  }from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrl: './side-nav.component.scss'
})
export class SideNavComponent {
  faDashboard = faDashboard;
  faChartLine = faChartLine;
  faUser = faUser;
  faUserTie = faUserTie;
  faList = faList;
}
