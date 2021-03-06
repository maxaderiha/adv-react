import firebase from 'firebase';
import {appName} from '../config';
import {Record} from 'immutable';
import {all, call, take, put, cps, takeEvery} from 'redux-saga/effects'
import {push} from 'react-router-redux';


const ReducerRecord = Record({
    user: null,
    error: null,
    loading: null,
});

export const moduleName = 'auth';
const prefix = `${appName}/${moduleName}`;

export const SIGN_UP_REQUEST = `${prefix}/SIGN_UP_REQUEST`;
export const SIGN_UP_SUCCESS = `${prefix}/SIGN_UP_SUCCESS`;
export const SIGN_UP_ERROR = `${prefix}/SIGN_UP_ERROR`;
export const SIGN_IN_REQUEST = `${prefix}/SIGN_IN_REQUEST`;
export const SIGN_IN_SUCCESS = `${prefix}/SIGN_IN_SUCCESS`;
export const SIGN_IN_ERROR = `${prefix}/SIGN_IN_ERROR`;
export const SIGN_OUT_REQUEST = `${prefix}/SIGN_OUT_REQUEST`;
export const SIGN_OUT_SUCCESS = `${prefix}/SIGN_OUT_SUCCESS`;

export default function reducer(state = new ReducerRecord(), action) {
    const {type, payload} = action;

    switch (type) {
        case SIGN_UP_REQUEST:
        case SIGN_IN_REQUEST:
            return state.set('loading', true);

        case SIGN_UP_SUCCESS:
        case SIGN_IN_SUCCESS:
            return state
                .set('loading', false)
                .set('user', payload.user)
                .set('error', null);

        case SIGN_UP_ERROR:
        case SIGN_IN_ERROR:
            return state
                .set('loading', false)
                .set('error', payload.error);

        case SIGN_OUT_SUCCESS:
            return new ReducerRecord();

        default:
            return state;
    }
}

export function signUp(email, password) {
    return {
        type: SIGN_UP_REQUEST,
        payload: {email, password},
    };
}

export function signIn(email, password) {
    return {
        type: SIGN_IN_REQUEST,
        payload: {email, password},
    }
}

export function signOut() {
    return {
        type: SIGN_OUT_REQUEST,
    }
}

export const signUpSaga = function* () {
    const auth = firebase.auth();

    while (true) {
        const action = yield take(SIGN_UP_REQUEST);

        try {
            const user = yield call([auth, auth.createUserWithEmailAndPassword], action.payload.email, action.payload.password);

            yield put({
                type: SIGN_UP_SUCCESS,
                payload: {user},
            })
        } catch (error) {
            yield put({
                type: SIGN_UP_ERROR,
                payload: {error},
            })
        }
    }
};

export const signInSaga = function* () {
    const auth = firebase.auth();

    while (true) {
        const action = yield take(SIGN_IN_REQUEST);

        try {
            const user = yield call([auth, auth.signInWithEmailAndPassword], action.payload.email, action.payload.password);

            yield put({
                type: SIGN_IN_SUCCESS,
                payload: {user},
            })
        } catch (error) {
            yield put({
                type: SIGN_IN_ERROR,
                payload: {error},
            })
        }
    }
};

export const signOutSaga = function* () {
    const auth = firebase.auth();

    try {
        yield call([auth, auth.signOut]);

        yield put({
            type: SIGN_OUT_SUCCESS,
        });
        yield put(push('/auth/signin'));
    } catch (_) {

    }
};

export const watchStatusChange = function* () {
    const auth = firebase.auth();

    try {
        yield cps([auth, auth.onAuthStateChanged]);
    } catch (user) {
        yield put({
            type: SIGN_IN_SUCCESS,
            payload: {user},
        })
    }
};

export const saga = function* () {
    yield all([
        watchStatusChange(),
        signUpSaga(),
        signInSaga(),
        takeEvery(SIGN_OUT_REQUEST, signOutSaga),
    ])
};