import {all, take, call, put} from 'redux-saga/effects';
import firebase from 'firebase';
import {appName} from '../config';
import {Record, OrderedMap} from 'immutable';

export const moduleName = 'events';
const prefix = `${appName}/${moduleName}`;

export const LOAD_ALL_REQUEST = `${prefix}/LOAD_ALL_REQUEST`;
export const LOAD_ALL_SUCCESS = `${prefix}/LOAD_ALL_SUCCESS`;
export const LOAD_ALL_ERROR = `${prefix}/LOAD_ALL_ERROR`;


export const ReducerRecord = Record({
    entities: new OrderedMap({}),
    loading: false,
    loaded: false,
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
                .set('entities', new OrderedMap(payload));

        default:
            return state;
    }
}

export function loadAll() {
    return {
        type: LOAD_ALL_REQUEST,
    }
}

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