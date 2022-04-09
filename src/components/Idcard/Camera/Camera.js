import React, { useState, useEffect, useRef } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import { Camera } from 'expo-camera'
import { useNavigation } from '@react-navigation/native'
import { images } from '../../../styled'

function CameraHandler() {
  const camera = useRef()
  const [hasPermission, setHasPermission] = useState(null)
  const [type, setType] = useState(Camera.Constants.Type.back)
  const navigation = useNavigation()
  const takePicture = async () => {
    try {
      const photo = await camera.current.takePictureAsync()
      navigation.navigate('photo preview', { photo: photo })
    } catch (error) {
      console.log(error)
      alert('사진 촬영에 오류가 있습니다.')
    }
  }
  useEffect(() => {
    ;(async () => {
      const { status } = await Camera.requestCameraPermissionsAsync()
      setHasPermission(status === 'granted')
    })()
  }, [])

  if (hasPermission === null) {
    return <View />
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>
  }
  return (
    // (previewVisible && capturedImage) ? (
    //     <CameraPreview photo={capturedImage} retakePicture={__retakePicture} />
    //   ) : (
    <View style={styles.container}>
      <Camera ref={camera} style={styles.camera} type={type}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.buttonFlip}
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back,
              )
            }}
          >
            <Image style={styles.buttonFlipImg} source={images.flip}></Image>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonTakePic} onPress={takePicture}>
            <Image
              style={styles.buttonTakePicImg}
              source={images.circle}
            ></Image>
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
    backgroundColor: 'blue',
  },
  buttonContainer: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    flexDirection: 'column',
    margin: 20,
    height: '10%',
  },
  buttonFlip: {
    flex: 0.1,
    alignItems: 'center',
    marginRight: 10,
    position: 'absolute',
    bottom: 13,
    right: 0,
  },
  buttonFlipImg: {
    width: 38,
    height: 38,
  },
  buttonTakePic: {
    alignSelf: 'center',
  },
  buttonTakePicImg: {
    width: 68,
    height: 68,
  },
})

export default CameraHandler
