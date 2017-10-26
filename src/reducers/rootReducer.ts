import { combineReducers } from 'redux';
import { PatientDetails, PatientReducer, PATIENT_INITIAL_STATE } from './patient';

export interface AppState {
    patient: PatientDetails
}

export const INITIAL_STATE = {
    patient: PATIENT_INITIAL_STATE
}
export const rootReducer = combineReducers<AppState>({
    patient: PatientReducer
})