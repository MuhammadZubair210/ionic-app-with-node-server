import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { NgRedux, NgReduxModule } from 'ng2-redux';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { patientApp } from "../epics";
import { createEpicMiddleware, combineEpics } from 'redux-observable';
import { rootReducer, AppState, INITIAL_STATE } from '../reducers/rootReducer'
import { HttpModule, Http } from "@angular/http";
import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import * as reducers from 'reducers'
import { PatientdetailsPage } from "../pages/patientdetails/patientdetails";
import { PatientupdatePage } from "../pages/patientupdate/patientupdate";
import { StatingPage } from "../pages/stating/stating";


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    PatientdetailsPage,
    PatientupdatePage,
    StatingPage
  ],
  imports: [
    HttpModule,
    BrowserModule,
    IonicModule.forRoot(MyApp),
    NgReduxModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    PatientdetailsPage,
    PatientupdatePage,
    StatingPage
  ],
  providers: [
    patientApp,
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule {
  constructor(ngRedux: NgRedux<AppState>,
    public patientapp: patientApp) {
    const middleware = [
      createEpicMiddleware(combineEpics(this.patientapp.patient)),
      createEpicMiddleware(combineEpics(this.patientapp.AllPatients)),
      createEpicMiddleware(combineEpics(this.patientapp.deletePatient)),
      createEpicMiddleware(combineEpics(this.patientapp.updatePatient))
    ]
    ngRedux.configureStore(rootReducer, INITIAL_STATE, middleware)
  }
}
