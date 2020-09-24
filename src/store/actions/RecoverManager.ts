import * as types from './ActionTypes';
import { Storage } from 'aws-amplify';
import { File as CustomFile } from '../types';

//Recupera TODOS los ficheros del bucket del usuario autenticado
export const recoverFiles = () => {
    return (dispatch: any) => {  
        //Obtener todos los ficheros (nombre y eTag)
        Storage.list('', {level: 'protected'})
        .then((result: any) => {
            //Separamos ficheros de carpetas
            const folders = result.filter((file: CustomFile) => file.key.endsWith('default'));
            const files = result.filter((file: CustomFile) => !file.key.endsWith('default'));

            dispatch({
                type: types.RECOVER_FOLDERS,
                payload: folders
            });

            //A cada fichero, recuperar su URL
            let promises = files.map(async (file: CustomFile) => {
                const result = await Storage.get(file.key);
                return file = { ...file, url: result+"" };
            });     
            //Ejecutamos promesas recuperadas y almacenamos el resultado en la store
            Promise.all(promises)
            .then(result => {
                dispatch({
                    type: types.RECOVER_FILES,
                    payload: result
                })
            });          
        }).catch((err) => {
            console.log(err);
            if (err.message !== "Cannot read property 'map' of undefined") {
                dispatch({
                    type: types.RECOVER_FILES_NOK,
                    payload: err
                });
            }       
        });
    }
}