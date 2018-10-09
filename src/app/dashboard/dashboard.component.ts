import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { SharedService } from '../shared.service';
import { Dashboard } from '../shared/dashboard.interface';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  dashboard: Dashboard;
  MAX_SESSIONS = 10;
  progress = 0;
  progress_string = '0';
  level = 1;
  @Output() recordPressed: EventEmitter<void> = new EventEmitter<void>();

  constructor(private sharedService: SharedService) { }

  ngOnInit() {
    this.dashboard = this.sharedService.getDashboard();
    this.progress += this.dashboard.total_sessions*10;
    console.log('progress'+ this.progress);
    if(this.dashboard.total_sessions / this.MAX_SESSIONS > 1) {
      this.level =2;
    }
  }

  routeToRecord() {
    console.log('routing to record');
    this.recordPressed.emit();
  }

}
