import { Dashboard } from './shared/dashboard.interface';
import { User } from './login/user.interface';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Session } from './shared/session.interface';

@Injectable()
export class SharedService {
  // Hackathon URL - http://ba36291c.ngrok.io/
  private url = 'http://ba36291c.ngrok.io/';
  // private url = 'http://localhost:3000/';
  private allSessions: Session[] = [];
  private dashboard: Dashboard = new Dashboard();
  constructor(private httpClient: HttpClient) {}

  getAllSessions() {
    return this.allSessions;
  }
  updateSession(session: Session) {
    console.log('updating sessions with session - ' + JSON.stringify(session));
    this.allSessions.push(session);
    this.allSessions.forEach(item => {
      console.log('session - ' + JSON.stringify(item));
    });
    this.fillDashboard(session);
    // console.log('all sessions have been updated - ' + this.allSessions);
  }

  loginUser(user: User) {
    console.log('logging in user: ' + JSON.stringify(user));
    const loginUrl = this.url + 'login';
    return this.httpClient.get<User>(loginUrl).subscribe(
      data => {
        console.log('data has been received from ');
      },
      err => {
        this.handleError('httpClientCall', err);
      },
      () => console.log('done logging in - returning'),
    );
  }

  sendSession(session: Session) {
    console.log('sending session to server - ' + JSON.stringify(session));
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'my-auth-token'
      })
    };

    const sessionUrl = this.url + 'items';
    return this.httpClient.post<Session>(sessionUrl, session, httpOptions).subscribe(
      data => {
        console.log('data has been received from server');
      },
      err => {
        this.handleError('sendSession', err);
      },
      () => console.log('done sending session - returning'),
    );
  }

  fillDashboard(session: Session) {
    this.dashboard.total_sessions++;
    this.dashboard.minutes_practiced += session.total_time;
  }

  getDashboard() {
    return this.dashboard;
  }

  handleError(methodName: string, error: Error) {
    console.log(methodName + ' encountered following error - ' + JSON.stringify(error));
  }
}
