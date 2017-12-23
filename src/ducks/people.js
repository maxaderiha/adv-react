import {appName} from '../config';
import {Record, OrderedMap} from 'immutable';
import {put, call, all, takeEvery} from 'redux-saga/effects';
import {reset} from 'redux-form';
import {formName} from '../components/people-form/people-form'
import firebase from 'firebase';


const ReducerState = Record({
    entities: new OrderedMap([]),
    loading: false,
});

const PersonRecord = Record({
    uid: null,
    firstName: null,
    lastName: null,
    email: null,
});

export const moduleName = 'people';
const prefix = `${appName}/${moduleName}`;

export const ADD_PERSON_REQUEST = `${prefix}/ADD_PERSON_REQUEST`;
export const ADD_PERSON_SUCCESS = `${prefix}/ADD_PERSON_SUCCESS`;
export const ADD_PERSON_ERROR = `${prefix}/ADD_PERSON_ERROR`;

export const LOAD_ALL_REQUEST = `${prefix}/LOAD_ALL_REQUEST`;
export const LOAD_ALL_SUCCESS = `${prefix}/LOAD_ALL_SUCCESS`;
export const LOAD_ALL_ERROR = `${prefix}/LOAD_ALL_ERROR`;

export default function reducer(state = new ReducerState(), action) {
    const {type, payload} = action;

    switch (type) {
        case ADD_PERSON_REQUEST:
            return state.set('loading', true);

        case ADD_PERSON_SUCCESS:
            return state
                .set('loading', false)
                .setIn(['entities', payload.uid], new PersonRecord(payload));

        case ADD_PERSON_ERROR:
            return state.set('loading', false);

        default:
            return state;
    }
}

export function addPerson(person) {
    return {
        type: ADD_PERSON_REQUEST,
        payload: person,
    }
}

export const addPersonSaga = function* (action) {
    const peopleRef = firebase.database().ref('people');

    try {
        const ref = yield call([peopleRef, peopleRef.push], {...action.payload});

        yield put({
            type: ADD_PERSON_SUCCESS,
            payload: {...action.payload, uid: ref.key},
        });

        yield put(reset(formName));
    } catch (error) {
        yield put({
            type: ADD_PERSON_ERROR,
            payload: {error}
        });
    }
};

export const saga = function* () {
    yield all([
        takeEvery(ADD_PERSON_REQUEST, addPersonSaga),
    ])
};