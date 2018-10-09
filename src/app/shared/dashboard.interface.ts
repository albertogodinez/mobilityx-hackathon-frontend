import { Report } from './report.interface';
import { Session } from './session.interface';

export class Dashboard {
  dashboardId: number;
  report: Report;
  sessions: Session[];
  total_sessions = 0;
  current_streak = 0;
  longest_streak = 0;
  minutes_practiced = 0;
  most_common_words: string[];
}
