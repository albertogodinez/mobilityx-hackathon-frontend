import {
  MatButtonModule,
  MatCheckboxModule,
  MatSidenavModule,
  MatButtonToggleModule,
  MatListModule,
  MatIconModule,
  MatCardModule,
  MatProgressBarModule,
  MatDividerModule,
  MatExpansionModule,
} from '@angular/material';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [
    MatButtonModule,
    MatCheckboxModule,
    MatSidenavModule,
    MatButtonToggleModule,
    MatListModule,
    MatIconModule,
    MatCardModule,
    MatProgressBarModule,
    MatDividerModule,
    MatExpansionModule ],
  exports: [
    MatButtonModule,
    MatCheckboxModule,
    MatSidenavModule,
    MatButtonToggleModule,
    MatListModule,
    MatIconModule,
    MatCardModule,
    MatProgressBarModule,
    MatDividerModule,
    MatExpansionModule ],
})
export class MaterialModule {}
