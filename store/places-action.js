/** @format */
import * as FileSystem from 'expo-file-system'

export const ADD_PLACE = 'ADD_PLACE'
export const SET_PLACES = 'SET_PLACES'
import { insertPlace, fetchPlaces } from '../helpers/db'

export const addPlace = (title, image) => {
    return async (dispatch) => {
        //Takes the filename out of the file path
        const fileName = image.split('/').pop()

        //document directory files will persit till application gets deleted creates a new path using last file name
        const newPath = FileSystem.documentDirectory + fileName
        //Moves file from the image to a new path
        try {
            await FileSystem.moveAsync({
                from: image,
                to: newPath,
            })
            const dbResult = await insertPlace(
                title,
                newPath,
                'Dummy address',
                15.6,
                12.3
            )
            console.log(dbResult)
            dispatch({
                type: ADD_PLACE,
                placeData: {
                    id: dbResult.insertId,
                    title: title,
                    image: newPath,
                },
            })
        } catch (err) {
            console.log(err)
            throw err
        }
    }
}

export const loadPlaces = () => {
    return async (dispatch) => {
        try {
            const dbResult = await fetchPlaces()
            console.log(dbResult)
            //dbResult.rows._array is where we store the database of places
            dispatch({ type: SET_PLACES, places: dbResult.rows._array })
        } catch (err) {
            throw err
        }
    }
}
