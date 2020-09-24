export interface UserData { 
    email: string, 
    username: string,
    password: string,
    code: string, 
}

export interface File {
    eTag: string;
    key: string;
    size: number;
    url: string;
}

export interface AuthState {
    user: any | null;
    status: string;
    signUpError: Object | null;
    signInError: Object | null;
    verifyError: Object | null;
    signOutError: Object | null;
    forgotPasswordError: Object | null;
    forgotPasswordSubmitError: Object | null;
}

export interface FileState {
    files: File[];
    createFolderError: Object | null;
    recoverError: Object | null;
    uploadError: Object | null;
    removeError: Object | null;
    uploading: boolean;
    uploadSuccess: boolean;
    loadedFile: number;
    totalFile: number;
}

export interface FolderState {
    folders: File[];
    createFolderError: Object | null;
    creating: boolean;
    createSuccess: boolean;
}