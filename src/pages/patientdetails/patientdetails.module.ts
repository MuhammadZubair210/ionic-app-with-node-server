import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PatientdetailsPage } from './patientdetails';

@NgModule({
  declarations: [
    PatientdetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(PatientdetailsPage),
  ],
})
export class PatientdetailsPageModule {}
