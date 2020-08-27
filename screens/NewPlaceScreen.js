/** @format */

import React, { useState, useCallback } from 'react'
import {
    View,
    Text,
    TextInput,
    Button,
    StyleSheet,
    ScrollView,
} from 'react-native'
import { useDispatch } from 'react-redux'
import Colors from '../constants/Colors'
import * as placesActions from '../store/places-actions'
import ImagePicker from '../components/ImagePicker'
import LocationPicker from '../components/LocationPicker'

const NewPlaceScreen = (props) => {
    const [titleValue, setTitleValue] = useState('')
    const [selectedImage, setSelectedImage] = useState()
    const [selectedLocation, setSelectedlocation] = useState()
    const titleChangeHandler = (text) => {
        setTitleValue(text)
    }

    const dispatch = useDispatch()

    const savePlaceHandler = () => {
        dispatch(
            placesActions.addPlace(titleValue, selectedImage, selectedLocation)
        )
        props.navigation.goBack()
    }

    const locationPickedHandler = useCallback((location) => {
        setSelectedlocation(location)
    }, [])

    const imageTakenHandler = (imagePath) => {
        setSelectedImage(imagePath)
    }

    return (
        <ScrollView>
            <View style={styles.form}>
                <Text styles={styles.label}> Title </Text>
                <TextInput
                    styles={styles.textInput}
                    onChangeText={titleChangeHandler}
                    value={titleValue}
                />
                <ImagePicker onImageTaken={imageTakenHandler} />
                <LocationPicker
                    navigation={props.navigation}
                    onLocationPicked={locationPickedHandler}
                />
                <Button
                    title='Save Place'
                    color={Colors.primary}
                    onPress={savePlaceHandler}
                />
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    form: {
        margin: 30,
    },
    label: {
        fontSize: 18,
        marginBottom: 15,
    },
    textInput: {
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        marginBottom: 15,
        paddingVertical: 4,
        paddingHorizontal: 2,
    },
})

NewPlaceScreen.navigationOptions = (navData) => {
    return {
        headerTitle: 'All Places',
    }
}
export default NewPlaceScreen
