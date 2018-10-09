import { MaterialModule } from './shared/material.module';
import { SpeechRecognitionService } from './services/speechRecognition.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';

import { SharedService } from './shared.service';
import { RecordSessionComponent } from './record-session/record-session.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SideNavComponent } from './sidenav/sidenav.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FlexLayoutModule } from '@angular/flex-layout';

import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'recordSession', component: RecordSessionComponent}
];
@NgModule({
  declarations: [AppComponent, LoginComponent, RecordSessionComponent, SideNavComponent, DashboardComponent],
  // tslint:disable-next-line:max-line-length
  imports: [BrowserModule, HttpClientModule, FormsModule, ReactiveFormsModule, BrowserAnimationsModule, MaterialModule, FlexLayoutModule, RouterModule.forRoot(routes)],
  bootstrap: [AppComponent],
  providers: [SharedService, SpeechRecognitionService]
})
export class AppModule {}
