import { tassign } from 'tassign';
import { ADD_PATIENT_SUCCESS, ADD_PATIENT, VIEW_DETAILS, DELETE_PATIENT, UPDATE_PATIENT } from '../action/patient';


export interface PatientDetails {
    patientData: Array<any>;
    viewData: Array<any>;
    deleteData: Array<any>;
    updateData: Array<any>;
};


export const PATIENT_INITIAL_STATE = {
    patientData: null,
    viewData: null,
    deleteData: null,
    updateData: null
}


export const PatientReducer = (state: PatientDetails = PATIENT_INITIAL_STATE, action) => {

    switch (action.type) {
        case ADD_PATIENT_SUCCESS:
            console.log(action, action.payload)
            return tassign(state, { patientData: action.payload });
        case VIEW_DETAILS:
            console.log(action, action.payload)
            return tassign(state, { viewData: action.payload });
        case DELETE_PATIENT:
            console.log(action, action.payload)
            return tassign(state, { deleteData: action.payload });
        case UPDATE_PATIENT:
            console.log(action, action.payload)
            return tassign(state, { updateData: action.payload });
        default:
            return state;
    }

}