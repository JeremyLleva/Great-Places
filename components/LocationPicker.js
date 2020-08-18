/** @format */

import React, { useState } from 'react'
import {
    View,
    Button,
    Text,
    ActivityIndicator,
    Alert,
    StyleSheet,
} from 'react-native'
import * as Location from 'expo-location'
import * as Permissions from 'expo-permissions'

import Colors from '../constants/Colors'
import MapPreview from './MapPreview'

const LocationPicker = (props) => {
    const [isFetching, setIsFetching] = useState(false)
    const [pickedLocation, setPickedLocation] = useState()

    const verifyPermissions = async () => {
        //ask user for permission of camera for iphone
        const result = await Permissions.askAsync(Permissions.LOCATION)
        if (result.status !== 'granted') {
            Alert.alert(
                'Insufficient permissions!',
                'Please grant location permission to add pictures',
                [{ text: 'Okay' }]
            )
            return false
        }
        return true
    }
    const getLocationHandler = async () => {
        //Grabs permission for location and retrives via expo-location
        const hasPermission = await verifyPermissions()
        if (!hasPermission) {
            return
        }
        try {
            setIsFetching(true)
            const location = await Location.getCurrentPositionAsync({
                timeout: 10000,
            })
            console.log(location)
            //Set location information based off return call of getCurrentPositionAsync
            setPickedLocation({
                lat: location.coords.latitude,
                lng: location.coords.longitude,
            })
        } catch (err) {
            Alert.alert(
                'Could not fetch location',
                'Please try again later or pick a location on the map.',
                [{ text: 'Okay' }]
            )
        }
        setIsFetching(false)
    }
    return (
        <View style={styles.locationPicker}>
            <MapPreview style={styles.mapPreview} location={pickedLocation}>
                {isFetching ? (
                    <ActivityIndicator size='large' />
                ) : (
                    <Text>No location chosen yet</Text>
                )}
            </MapPreview>
            <Button
                title='Get User Location'
                color={Colors.primary}
                onPress={getLocationHandler}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    locationPicker: {
        marginBottom: 15,
    },
    mapPreview: {
        marginBottom: 10,
        width: '100%',
        height: 150,
        borderColor: '#ccc',
        borderWidth: 1,
    },
})

export default LocationPicker
