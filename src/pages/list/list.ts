import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AppState } from "../../reducers/rootReducer";
import { Observable } from "rxjs/Observable";
import { select, NgRedux } from "ng2-redux";
import { VIEW_DETAILS } from "../../action/patient";
import { PatientdetailsPage } from "../patientdetails/patientdetails";

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {

  selectedItem: any;
  items = [];
  it = [];
  @select((s: AppState) => s.patient.viewData) view: Observable<Array<any>>

  constructor(private ngRedux: NgRedux<AppState>, public navCtrl: NavController, public navParams: NavParams) {

    // this.view.subscribe((datas) => {
    //   this.items = datas;
    // })
    console.log(this.view)
    this.initializeitems();

    this.selectedItem = navParams.get('item');
  }
  itt: any;
  initializeitems() {
    this.view.subscribe((datas) => {
      this.itt = datas
      this.items = this.itt.data;
      console.log(this.itt.data)
    })
  }

  itemTapped(item) {
    this.navCtrl.push(PatientdetailsPage, {
      items: item
    });
  }

  dataa = [];

  getItems(ev) {
    // Reset items back to all of the items
    this.initializeitems();

    // set val to the value of the ev target
    var val = ev.target.value;
    if (val && val.trim() != '') {
      this.items = this.items.filter((item) => {
        console.log(item)
        return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1 || item.date.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

}
