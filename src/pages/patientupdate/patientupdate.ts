import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NgRedux, select } from 'ng2-redux';
import { AppState } from '../../reducers/rootReducer';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ADD_PATIENT_SUCCESS, VIEW_DETAILS, UPDATE_PATIENT } from '../../action/patient';
import { Observable } from "rxjs/Observable";
/**
 * Generated class for the PatientupdatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-patientupdate',
  templateUrl: 'patientupdate.html',
})
export class PatientupdatePage {
  patientForm: FormGroup;

  moved: any;
  id: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private ngRedux: NgRedux<AppState>,
    private fb: FormBuilder) {

    this.moved = this.navParams.get('move')
    this.id = this.moved._id

    this.patientForm = this.fb.group({
      name: [null, Validators.required],
      disease: [null, Validators.required],
      age: [null, Validators.required],
      email: [null, Validators.required],
      phoneNo: [null, Validators.required],
      medication: [null, Validators.required],
      cost: [null, Validators.required],
      date: [null, Validators.required],
      id: [this.id]

    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PatientupdatePage');
  }

  update() {
    this.ngRedux.dispatch({
      type: UPDATE_PATIENT,
      payload: this.patientForm.value,
    })
  }


}
