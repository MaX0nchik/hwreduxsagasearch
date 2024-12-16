import { debounce, put, retry, spawn, takeLatest } from "redux-saga/effects";
import { searchSkillsRequest, changeSearchField, searchSkillsSuccess, searchSkillsFailure } from "../slices/skills";
import {searchSkills} from "../api/index"

function filterChangeSearchAction({type, payload}){
    return type === changeSearchField().type && payload.search.trim() !== '';
}

function* handleChangeSearchSaga(action){
    yield put(searchSkillsRequest(action.payload.search));
}

function* watchChangeSearchSaga(){
    yield debounce(100, filterChangeSearchAction, handleChangeSearchSaga);
}

function* handleSearchSkillsSaga(action){
    try{
        const retryCount = 1;
        const retryDelay = 1 * 1000;
        const data = yield retry(
            retryCount,
            retryDelay,
            searchSkills,
            action.payload
        );
        yield put(searchSkillsSuccess(data));
    }
    catch(e){
        yield put(searchSkillsFailure(e.message));
    }
}

function* watchSearchSkillsSaga(){
    yield takeLatest(searchSkillsRequest().type, handleSearchSkillsSaga);
}

export default function* saga() {
    yield spawn(watchChangeSearchSaga);
    yield spawn(watchSearchSkillsSaga);
}