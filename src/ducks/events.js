import {all, take, takeEvery, call, put, select} from 'redux-saga/effects';
import firebase from 'firebase';
import {createSelector} from 'reselect';
import {Record, OrderedMap, OrderedSet} from 'immutable';
import {fbDataToEntities} from './utils';
import {appName} from '../config';


export const moduleName = 'events';
const prefix = `${appName}/${moduleName}`;

export const LOAD_LAZY_START = `${prefix}/LOAD_LAZY_START`;
export const LOAD_LAZY_REQUEST = `${prefix}/LOAD_LAZY_REQUEST`;
export const LOAD_LAZY_SUCCESS = `${prefix}/LOAD_LAZY_SUCCESS`;
export const LOAD_LAZY_ERROR = `${prefix}/LOAD_LAZY_ERROR`;

export const SELECT_EVENT = `${prefix}/SELECT_EVENT`;

export const DELETE_EVENT_REQUEST = `${prefix}/DELETE_EVENT_REQUEST`;
export const DELETE_EVENT_SUCCESS = `${prefix}/DELETE_EVENT_SUCCESS`;
export const DELETE_EVENT_ERROR = `${prefix}/DELETE_EVENT_ERROR`;


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

/**
 * Reducer
 **/
export default function reducer(state = new ReducerRecord(), action) {
    const {type, payload} = action;

    switch (type) {
        case LOAD_LAZY_START:
            return state.set('loading', true);

        case LOAD_LAZY_SUCCESS:
            return state
                .set('loading', false)
                .set('loaded', Object.keys(payload).length < 10)
                .mergeIn(['entities'], fbDataToEntities(payload, EventRecord));

        case SELECT_EVENT: {
            const {uid} = payload;

            return state.selected.contains(uid)
                ? state.update('selected', selected => selected.remove(uid))
                : state.update('selected', selected => selected.add(uid));
        }

        case DELETE_EVENT_REQUEST:
            return state.set('loading', true);

        case DELETE_EVENT_SUCCESS:
            return state
                .deleteIn(['entities', payload.uid])
                .update('selected', selected => selected.remove(payload.uid))
                .set('loading', false);

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
export const selectedSelector = createSelector(stateSelector, state => state.selected)
export const selctedEventsSelector = createSelector(entitiesSelector, selectedSelector, (entities, selected) => (
    selected.toArray().map(uid => entities.get(uid))
));

/**
 * Action Creators
 **/

export function selectEvent(uid) {
    return {
        type: SELECT_EVENT,
        payload: {uid},
    }
}

export function loadLazy() {
    return {
        type: LOAD_LAZY_REQUEST,
    }
}

export function deleteEvent(uid) {
    return {
        type: DELETE_EVENT_REQUEST,
        payload: {uid},
    }
}

/**
 * Sagas
 **/
export const loadLazySaga = function* () {
    while (true) {
        yield take(LOAD_LAZY_REQUEST);//только после обработки этого экшена редьюсером выполнение пойдет дальше мы не можем получить состояние стора до данного экшена

        const state = yield select(stateSelector);

        if (state.loading || state.loaded) continue;

        yield put({
            type: LOAD_LAZY_START,
        });

        const lastEvent = state.entities.last();
        const ref = firebase.database().ref('events')
            .orderByKey()
            .limitToFirst(10)
            .startAt(lastEvent ? lastEvent.uid : '');

        const data = yield call([ref, ref.once], 'value');

        yield put({
            type: LOAD_LAZY_SUCCESS,
            payload: data.val(),
        });
    }
};

export const deleteEventSaga = function* (action) {
    const {payload} = action;
    const ref = firebase.database().ref(`events/${payload.uid}`);

    try {
        yield call([ref, ref.remove]);

        yield put({
            type: DELETE_EVENT_SUCCESS,
            payload: payload,
        });
    } catch (error) {
        yield put({
            type: DELETE_EVENT_ERROR,
            payload: {error},
        })
    }
};

export function* saga() {
    yield all([
        loadLazySaga(),
        takeEvery(DELETE_EVENT_REQUEST, deleteEventSaga),
    ]);
}