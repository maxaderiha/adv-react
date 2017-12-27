import {appName} from '../config';
import {Record, OrderedMap} from 'immutable';
import {put, call, all, takeEvery, select, fork} from 'redux-saga/effects';
import {delay} from 'redux-saga';
import {reset} from 'redux-form';
import {formName} from '../components/people/people-form/people-form'
import firebase from 'firebase';
import {fbDataToEntities} from "./utils";
import {createSelector} from 'reselect';


const ReducerState = Record({
    entities: new OrderedMap([]),
    loading: false,
});

const PersonRecord = Record({
    uid: null,
    firstName: null,
    lastName: null,
    email: null,
    events: [],
});

export const moduleName = 'people';
const prefix = `${appName}/${moduleName}`;

export const ADD_PERSON_REQUEST = `${prefix}/ADD_PERSON_REQUEST`;
export const ADD_PERSON_SUCCESS = `${prefix}/ADD_PERSON_SUCCESS`;
export const ADD_PERSON_ERROR = `${prefix}/ADD_PERSON_ERROR`;

export const LOAD_ALL_REQUEST = `${prefix}/LOAD_ALL_REQUEST`;
export const LOAD_ALL_SUCCESS = `${prefix}/LOAD_ALL_SUCCESS`;
export const LOAD_ALL_ERROR = `${prefix}/LOAD_ALL_ERROR`;

export const ADD_EVENT_REQUEST = `${prefix}/ADD_EVENT_REQUEST`;
export const ADD_EVENT_SUCCESS = `${prefix}/ADD_EVENT_SUCCESS`;


export default function reducer(state = new ReducerState(), action) {
    const {type, payload} = action;

    switch (type) {
        case ADD_PERSON_REQUEST:
        case LOAD_ALL_REQUEST:
            return state.set('loading', true);

        case ADD_PERSON_SUCCESS:
            return state
                .set('loading', false)
                .setIn(['entities', payload.uid], new PersonRecord(payload));

        case LOAD_ALL_SUCCESS:
            return state
                .set('loading', false)
                .set('entities', fbDataToEntities(payload, PersonRecord));

        case ADD_PERSON_ERROR:
            return state.set('loading', false);

        case ADD_EVENT_SUCCESS:
            return state.setIn(['entities', payload.personUid, 'events'], payload.events);

        default:
            return state;
    }
}

export const stateSelector = state => state[moduleName];
export const entitiesSelector = createSelector(stateSelector, state => state.entities);
export const idSelector = (_, props) => props.uid;
export const peopleListSelector = createSelector(entitiesSelector, entities => entities.valueSeq().toArray());
export const personSelector = createSelector(entitiesSelector, idSelector, (entities, id) => entities.get(id));


export function addPerson(person) {
    return {
        type: ADD_PERSON_REQUEST,
        payload: person,
    }
}

export function loadAll() {
    return {
        type: LOAD_ALL_REQUEST,
    }
}

export function addEventToPerson(personUid, eventUid) {
    return {
        type: ADD_EVENT_REQUEST,
        payload: {personUid, eventUid},
    }
}

export const addEventToPersonSaga = function* (action) {
    const {personUid, eventUid} = action.payload;
    const eventsRef = firebase.database().ref(`people/${personUid}/events`);

    const state = yield select(stateSelector);
    const events = state.getIn(['entities', personUid, 'events']).concat(eventUid);

    try {
        yield call([eventsRef, eventsRef.set], events);

        yield put({
            type: ADD_EVENT_SUCCESS,
            payload: {
                personUid,
                events,
            }
        })
    } catch (_) {

    }

};

export const loadAllSaga = function* () {
    const peopleRef = firebase.database().ref('people').orderByKey();

    try {
        const data = yield call([peopleRef, peopleRef.once], 'value');

        yield put({
            type: LOAD_ALL_SUCCESS,
            payload: data.val(),
        });
    } catch (error) {
        yield put({
            type: LOAD_ALL_ERROR,
            payload: {error},
        })
    }
};

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

export const backgroundSyncSaga = function* () {
    while (true) {
        yield call(loadAllSaga);
        yield delay(5000);
    }
};

export const saga = function* () {
    yield fork(backgroundSyncSaga);

    yield all([
        takeEvery(ADD_PERSON_REQUEST, addPersonSaga),
        takeEvery(LOAD_ALL_REQUEST, loadAllSaga),
        takeEvery(ADD_EVENT_REQUEST, addEventToPersonSaga),
    ]);
};