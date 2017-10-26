import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import { NgRedux, select } from 'ng2-redux';
import { AppState } from '../../reducers/rootReducer';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ADD_PATIENT_SUCCESS, VIEW_DETAILS } from '../../action/patient';
import { Observable } from "rxjs/Observable";
import { ListPage } from "../list/list";

@IonicPage()
@Component({
  selector: 'page-stating',
  templateUrl: 'stating.html',
})
export class StatingPage {

  patientForm: FormGroup;
  @select((s: AppState) => s.patient.patientData) view: Observable<Array<any>>

  constructor(private ngRedux: NgRedux<AppState>,
    private fb: FormBuilder, public navCtrl: NavController) {

    this.view.subscribe((data) => {
      console.log(data);
    });

    this.patientForm = this.fb.group({
      name: [null, Validators.required],
      disease: [null, Validators.required],
      age: [null, Validators.required],
      email: [null, Validators.required],
      phoneNo: [null, Validators.required],
      medication: [null, Validators.required],
      cost: [null, Validators.required],
      date: [null, Validators.required],

    })
  }

  submit() {
    this.view.subscribe((data) => {
      this.ngRedux.dispatch({
        type: ADD_PATIENT_SUCCESS,
        payload: this.patientForm.value
      })
    })

  }

}
