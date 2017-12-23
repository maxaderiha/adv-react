import {all, take, call, put} from 'redux-saga/effects';
import firebase from 'firebase';
import {createSelector} from 'reselect';
import {Record, OrderedMap, OrderedSet} from 'immutable';
import {fbDataToEntities} from './utils';
import {appName} from '../config';


export const moduleName = 'events';
const prefix = `${appName}/${moduleName}`;

export const LOAD_ALL_REQUEST = `${prefix}/LOAD_ALL_REQUEST`;
export const LOAD_ALL_SUCCESS = `${prefix}/LOAD_ALL_SUCCESS`;
export const LOAD_ALL_ERROR = `${prefix}/LOAD_ALL_ERROR`;

export const SELECT_EVENT = `${prefix}/SELECT_EVENT`;

/**
 * Reducer
 **/
export const ReducerRecord = Record({
    entities: new OrderedMap({}),
    selected: OrderedSet([]),
    loading: false,
    loaded: false,
});

export const EventRecord = Record({
    uid: null,
    title: null,
    url: null,
    where: null,
    when: null,
    month: null,
    submissionDeadLine: null,
});

export default function reducer(state = new ReducerRecord(), action) {
    const {type, payload} = action;

    switch (type) {
        case LOAD_ALL_REQUEST:
            return state.set('loading', true);

        case LOAD_ALL_SUCCESS:
            return state
                .set('loading', false)
                .set('loaded', true)
                .set('entities', fbDataToEntities(payload, EventRecord));

        case SELECT_EVENT: {
            const {uid} = payload;

            return state.selected.contains(uid)
                ? state.update('selected', selected => selected.remove(uid))
                : state.update('selected', selected => selected.add(uid));
        }

        default:
            return state;
    }
}

/**
 * Selectors
 **/
export const stateSelector = state => state[moduleName];
export const entitiesSelector = createSelector(stateSelector, state => state.entities);
export const eventsListSelector = createSelector(entitiesSelector, entities => (
    entities.valueSeq().toArray()
));

/**
 * Action Creators
 **/
export function loadAll() {
    return {
        type: LOAD_ALL_REQUEST,
    }
}

export function selectEvent(uid) {
    return {
        type: SELECT_EVENT,
        payload: {uid},
    }
}

/**
 * Sagas
 **/
export const loadAllSaga = function* () {
    while (true) {
        yield take(LOAD_ALL_REQUEST);

        const ref = firebase.database().ref('events');

        const data = yield call([ref, ref.once], 'value');

        yield put({
            type: LOAD_ALL_SUCCESS,
            payload: data.val(),
        })

    }
};

export function* saga() {
    yield all([
        loadAllSaga(),
    ]);
}