/** @format */

import React, { useState } from 'react'
import { View, Button, Text, StyleSheet, Image } from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import * as Permissions from 'expo-permissions'
import Colors from '../constants/Colors'

const ImgPicker = (props) => {
    const [pickedImage, setPickedImage] = useState()
    const verifyPermissions = async () => {
        //ask user for permission of camera for iphone
        const result = await Permissions.askAsync(
            Permissions.CAMERA_ROLL,
            Permissions.CAMERA
        )
        if (result.status !== 'granted') {
            Alert.alert(
                'Insufficient permissions!',
                'Please gerant camera permission to add pictures',
                [{ text: 'Okay' }]
            )
            return false
        }
        return true
    }
    const takeImageHandler = async () => {
        //Launch camera returns a promise
        const hasPermission = await verifyPermissions()
        if (!hasPermission) {
            return
        }
        const image = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [16, 9],
            quality: 0.5,
        })
        setPickedImage(image.uri)
        props.onImageTaken(image.uri)
    }

    return (
        <View style={styles.imagePicker}>
            <View style={styles.imagePreview}>
                {!pickedImage ? (
                    <Text>No image picked yet.</Text>
                ) : (
                    <Image style={styles.image} source={{ uri: pickedImage }} />
                )}
            </View>
            <Button
                title='Take Image'
                color={Colors.primary}
                onPress={takeImageHandler}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    imagePicker: {
        alignItems: 'center',
        marginBottom: 15,
    },
    imagePreview: {
        width: '100%',
        height: 200,
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#ccc',
        borderWidth: 1,
    },
    image: {
        width: '100%',
        height: '100%',
    },
})

export default ImgPicker
