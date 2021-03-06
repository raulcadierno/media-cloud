import * as types from '../actions/ActionTypes';
import { updateObject } from '../../shared/utility';
import { FileState, File } from '../types';

const initialState: FileState = {
    files: [],
    recoverError: null,
    uploadError: null,
    removeError: null,
    uploading: false,
    uploadSuccess: false,
    loadedFile: 0,
    totalFile: 0,
    downloading: false,
}


const recoverFiles = (state: FileState) => {
    return updateObject( state, {
        downloading: true,
        recoverError: null
    });
}

const recoverFilesSuccess = (state: FileState, payload: File[]) => {
    return updateObject( state, {
        files: payload,
        downloading: false
    });
}

const recoverFail = (state: FileState, payload: Error) => {
    return updateObject( state, {
        recoverError: payload,
        downloading: false
    })
}

//Reseteamos valores de visualizacion de la subida
const uploadFile = (state: FileState) => {
    return updateObject( state, {
        uploadError: null,
        uploading: true,
        uploadSuccess: false,
        loadedFile: 0,
        totalFile: 1,
    });
}

const uploadingFile = (state: FileState, payload: {
    loaded: number
    total: number
}) => {
    return updateObject( state, {
        loadedFile: payload.loaded,
        totalFile: payload.total,
    });
}

const uploadFileSuccessWait = (state: FileState, payload: File) => {
    return updateObject( state, {
        files: [payload].concat(state.files),
        uploadSuccess: true,
    });
}

const uploadFileSuccess = (state: FileState) => {
    return updateObject( state, {
        uploading: false
    });
}

const uploadFail = (state: FileState, payload: Error) => {
    return updateObject( state, {
        uploadError: payload,
        uploading: false
    })
}


const removeFile = (state: FileState, payload: string) => {
    return updateObject( state, {
        removeError: null,
        files: state.files.filter(file => file.key !== payload)
    })
}

const removeFail = (state: FileState, payload: Error) => {
    return updateObject( state, {
        removeError: payload
    })
}



const reducer = ( state = initialState, action: types.ActionTypes ) => {
    switch (action.type) {
        case types.RECOVER_FILES: return recoverFiles(state);
        case types.RECOVER_FILES_OK: return recoverFilesSuccess(state, action.payload);
        case types.RECOVER_FILES_NOK: return recoverFail(state, action.payload);
        case types.UPLOAD_FILE: return uploadFile(state);
        case types.UPLOADING_FILE: return uploadingFile(state, action.payload);
        case types.UPLOAD_FILE_OK_WAIT: return uploadFileSuccessWait(state, action.payload);
        case types.UPLOAD_FILE_OK: return uploadFileSuccess(state);
        case types.UPLOAD_FILE_NOK: return uploadFail(state, action.payload);
        case types.REMOVE_FILE: return removeFile(state, action.payload);
        case types.REMOVE_FILE_NOK: return removeFail(state, action.payload);
        default: return state;
    }
}

export default reducer;
