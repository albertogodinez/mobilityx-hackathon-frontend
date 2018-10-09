import { SharedService } from './../shared.service';
import { Session } from './../shared/session.interface';
import { Component, OnInit, OnDestroy, EventEmitter, Output } from '@angular/core';
import { SpeechRecognitionService } from '../services/speechRecognition.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-record-session',
  templateUrl: './record-session.component.html',
  styleUrls: ['./record-session.component.css']
})
export class RecordSessionComponent implements OnInit, OnDestroy {
  session: Session;
  errorMsg = '';
  speechData = '';
  words: string[];
  transcriptSub: Subscription;
  sessions: Session[] = [];
  startTime;
  endTime;
  @Output() showDashboard: EventEmitter<void> = new EventEmitter<void>();
  constructor(
    private sharedService: SharedService,
    public speechRecognitionService: SpeechRecognitionService,
  ) { }

  ngOnInit() {
    this.sessions = this.sharedService.getAllSessions();

    this.speechRecognitionService.init();
    this.transcriptSub = this.speechRecognitionService.phrase$
      .subscribe(
        word => {
          console.log(word);
          this.speechData += word;
        }
      );
  }

  ngOnDestroy() {
    this.transcriptSub.unsubscribe();
  }

  sendSession() {
    this.session = new Session();
    this.session.transcript = 'This is our first test for the session';
    const currentDate = new Date();
    this.session.time_start = currentDate.getTime();
    this.session.time_end = currentDate.getTime();
    this.sharedService.sendSession(this.session);
  }

  getSeconds() {
    if (!this.endTime) {
      return 0;
    }
    return Math.round((this.endTime.getTime() - this.startTime.getTime()) / 1000);
  }

  getMinutes () {
    return this.getSeconds() / 60.00;

  }

  startRecording() {
    this.speechData = '';
    this.words = [];
    this.speechRecognitionService.startListening();
    this.startTime = new Date();
  }

  stopRecording() {
    this.speechRecognitionService.abort();
    this.endTime = new Date();

    this.countWords();
    // console.log('speechData- ' + this.speechData);
  }

  countWords() {
    // console.log('countwords: ' + this.speechData);
    this.session = new Session();
    this.session.transcript = this.speechData;
    this.session.sessionId = Math.floor(Math.random() * 1000);
    if (this.speechData.length > 0) {
      this.words = this.speechData.split(' ');
    }
    this.session.words = this.words;
    // console.log('words array - ' + this.words);
    this.session.word_count = this.words.length;
    // TODO: Edit this
    this.session.total_time = Math.round(this.getMinutes() * 100) / 100;
    this.session.pace =
    Math.round((this.words.length / this.session.total_time) * 100) / 100;

    this.sharedService.updateSession(this.session);
    this.sessions = this.sharedService.getAllSessions();
  }

  backToDashboard() {
    this.showDashboard.emit();
  }

  private _setError(err?: any) {
    if (err) {
      console.log('Speech Recognition:', err);
      this.errorMsg = err.message;
    } else {
      this.errorMsg = null;
    }
  }
}
