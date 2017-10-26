import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { select, NgRedux } from "ng2-redux";
import { AppState } from "../../reducers/rootReducer";
import { Observable } from "rxjs/Observable";
import { DELETE_PATIENT } from "../../action/patient";
import { PatientupdatePage } from "../patientupdate/patientupdate";


@IonicPage()
@Component({
  selector: 'page-patientdetails',
  templateUrl: 'patientdetails.html',
})

export class PatientdetailsPage {


  @select((s: AppState) => s.patient.viewData) view: Observable<Array<any>>

  items;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public ngRedux: NgRedux<AppState>) {
    this.items = this.navParams.get('items');

    // this.view.subscribe((data) => {
    //   console.log(data)
    // })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PatientdetailsPage');
  }

  delete(item) {
    this.ngRedux.dispatch({
      type: DELETE_PATIENT,
      payload: item
    });
  }

  itemTapped(item) {
    this.navCtrl.push(PatientupdatePage, {
      move: item
    });
  }
}
