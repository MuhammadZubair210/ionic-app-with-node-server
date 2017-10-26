import { ADD_PATIENT_SUCCESS, VIEW_DETAILS, ADD_PATIENT, DELETE_PATIENT, UPDATE_PATIENT } from '../action/patient';
import { Injectable } from '@angular/core';
import { ActionsObservable } from 'redux-observable';
import { Storage } from '@ionic/storage';
import { NgRedux } from "ng2-redux";
import { AppState } from '../reducers/rootReducer';
import { Http, Headers, RequestOptions } from '@angular/http';

// rxjs imports
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/fromPromise';


@Injectable()

export class patientApp {
    contacts: String;
    cont: String;

    constructor(public ngRedux: NgRedux<AppState>, public _http: Http) { }

    patient = (action: ActionsObservable<any>) => {
        return action.ofType(ADD_PATIENT_SUCCESS)
            .switchMap(({ payload, navCtrl }) => {
                var headers = new Headers();
                headers.append('Content-Type', 'application/json');
                console.log(payload)
                return this._http.post("api/contacts", payload, { headers: headers })
                    .map(result => this.contacts = result.json())
            })
    }

    a: any;
    AllPatients = (action: ActionsObservable<any>) => {
        action.ofType(VIEW_DETAILS)
        return this._http.get("/api/contacts")
            .map(result => {
                this.cont = result.json();
                console.log(this.cont)
                this.ngRedux.dispatch({
                    type: VIEW_DETAILS,
                    payload: this.cont
                })
            })
    }

    deletePatient = (action: ActionsObservable<any>) => {
        return action.ofType(DELETE_PATIENT)
            .switchMap(({ payload, navCtrl }) => {
                return this._http.delete("api/contact/" + payload)
                    .map(result =>
                        this.contacts = result.json().data
                    )
            })
    }

    updatePatient = (action: ActionsObservable<any>) => {
        return action.ofType(UPDATE_PATIENT)
            .switchMap(({ payload, navCtrl }) => {
                var headers = new Headers();
                headers.append('Content-Type', 'application/json');
                console.log(payload)
                console.log(payload.id)
                return this._http.put("api/contact/" + payload.id, payload, { headers: headers })
                    .map(result => this.contacts = result.json().data)

            })

    }
}


