import { RecordSessionComponent } from './../record-session/record-session.component';
import { Component, OnInit } from '@angular/core';
import { DashboardComponent } from './../dashboard/dashboard.component';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SideNavComponent implements OnInit {

  public showDashboard = true;
  public showRecordPage = false;
  constructor() { }

  ngOnInit() {
  }

  recordPressed() {
    console.log('record button has been pressed');
    this.showRecordPage = !this.showRecordPage;
    this.showDashboard = !this.showDashboard;
  }

  backToDashboard() {
    console.log('back to dashboard');
    this.showRecordPage = !this.showRecordPage;
    this.showDashboard = !this.showDashboard;
  }

}
