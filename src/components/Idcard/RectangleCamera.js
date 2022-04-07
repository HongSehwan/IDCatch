import { PropTypes } from 'prop-types'
import React, { PureComponent } from 'react'
import RNRestart from 'react-native-restart'
import axios from 'axios'
import Config from 'react-native-config'
import {
  ActivityIndicator,
  Animated,
  Dimensions,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  LogBox,
} from 'react-native'
import Scanner, {
  Filters,
  RectangleOverlay,
} from 'react-native-rectangle-scanner'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen'
import { ScrollView } from 'react-native-gesture-handler'
import ImageAutoHeight from 'react-native-image-auto-height'

LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
])

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    height: 70,
    justifyContent: 'center',
    width: 65,
  },
  buttonActionGroup: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  buttonBottomContainer: {
    alignItems: 'flex-end',
    bottom: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    left: 25,
    position: 'absolute',
    right: 25,
  },
  buttonContainer: {
    alignItems: 'flex-end',
    bottom: 25,
    flexDirection: 'column',
    justifyContent: 'space-between',
    position: 'absolute',
    right: 25,
    top: 25,
  },
  buttonGroup: {
    backgroundColor: '#00000080',
    borderRadius: 17,
  },
  buttonIcon: {
    color: 'white',
    fontSize: 22,
    marginBottom: 3,
    textAlign: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 13,
  },
  buttonTopContainer: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    justifyContent: 'space-between',
    left: 25,
    position: 'absolute',
    right: 25,
    top: 40,
  },
  cameraButton: {
    backgroundColor: 'white',
    borderRadius: 50,
    flex: 1,
    margin: 3,
  },
  cameraNotAvailableContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 15,
  },
  cameraNotAvailableText: {
    color: 'white',
    fontSize: 25,
    textAlign: 'center',
  },
  cameraOutline: {
    borderColor: 'white',
    borderRadius: 50,
    borderWidth: 3,
    height: 70,
    width: 70,
  },
  container: {
    backgroundColor: 'black',
    flex: 1,
  },
  flashControl: {
    alignItems: 'center',
    borderRadius: 30,
    height: 50,
    justifyContent: 'center',
    margin: 8,
    paddingTop: 7,
    width: 50,
  },
  loadingCameraMessage: {
    color: 'white',
    fontSize: 18,
    marginTop: 10,
    textAlign: 'center',
  },
  loadingContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  overlay: {
    bottom: 0,
    flex: 1,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
  },
  processingContainer: {
    alignItems: 'center',
    backgroundColor: 'rgba(220, 220, 220, 0.7)',
    borderRadius: 16,
    height: 140,
    justifyContent: 'center',
    width: 200,
  },
  scanner: {
    flex: 1,
  },
  idCardResult: {
    fontSize: wp(5),
    fontWeight: '700',
    fontFamily: 'DoHyeon-Regular',
    color: 'grey',
  },
  btnContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: hp(1.5),

    ...Platform.select({
      ios: {
        paddingBottom: hp(4.5),
      },
    }),
  },
  btnArea_l: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  delbtnoutline: {
    margin: wp(6),
    marginRight: wp(7),
    width: wp(30),
    height: hp(7),
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'tomato',
  },
  btn_l_text: {
    fontFamily: 'DoHyeon-Regular',
    fontWeight: '700',
    color: 'white',
  },
  btnArea_r: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  delbtn: {
    margin: wp(6),
    marginLeft: wp(7),
    width: wp(30),
    height: hp(7),
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'tomato',
  },
  btn_r_text: {
    fontFamily: 'DoHyeon-Regular',
    fontWeight: '700',
    color: 'white',
  },
  completebtn: {
    margin: wp(5),
    width: wp(15),
    height: hp(3.5),
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
})

export default class RectangleCamera extends PureComponent {
  static propTypes = {
    cameraIsOn: PropTypes.bool,
    onLayout: PropTypes.func,
    onSkip: PropTypes.func,
    onCancel: PropTypes.func,
    onPictureTaken: PropTypes.func,
    onPictureProcessed: PropTypes.func,
    hideSkip: PropTypes.bool,
    initialFilterId: PropTypes.number,
    onFilterIdChange: PropTypes.func,
    googleVisionDetetion: PropTypes.bool,
  }

  static defaultProps = {
    cameraIsOn: undefined,
    onLayout: () => {},
    onSkip: () => {},
    onCancel: () => {},
    onPictureTaken: () => {},
    onPictureProcessed: () => {},
    onFilterIdChange: () => {},
    hideSkip: false,
    initialFilterId: Filters.PLATFORM_DEFAULT_FILTER_ID,
    googleVisionDetetion: undefined,
  }

  constructor(props) {
    super(props)
    this.state = {
      flashEnabled: false,
      showScannerView: false,
      didLoadInitialLayout: false,
      filterId: props.initialFilterId || Filters.PLATFORM_DEFAULT_FILTER_ID,
      detectedRectangle: false,
      isMultiTasking: false,
      loadingCamera: true,
      processingImage: false,
      takingPicture: false,
      feedbackState: false,
      overlayFlashOpacity: new Animated.Value(0),
      device: {
        initialized: false,
        hasCamera: false,
        permissionToUseCamera: false,
        flashIsAvailable: false,
        previewHeightPercent: 1,
        previewWidthPercent: 1,
      },
      idCard_sn: '',
      currentImage: '',
      preparedImgages: '',
      isScanned: false,
      s3Links: [],
      idCardName: '',
    }

    this.camera = React.createRef()
    this.imageProcessorTimeout = null
  }

  componentDidMount() {
    if (this.state.didLoadInitialLayout && !this.state.isMultiTasking) {
      this.turnOnCamera()
    }
  }

  componentDidUpdate() {
    if (this.state.didLoadInitialLayout) {
      if (this.state.isMultiTasking) return this.turnOffCamera(true)
      if (this.state.device.initialized) {
        if (!this.state.device.hasCamera) return this.turnOffCamera()
        if (!this.state.device.permissionToUseCamera)
          return this.turnOffCamera()
      }

      if (this.props.cameraIsOn === true && !this.state.showScannerView) {
        return this.turnOnCamera()
      }

      if (this.props.cameraIsOn === false && this.state.showScannerView) {
        return this.turnOffCamera(true)
      }

      if (this.props.cameraIsOn === undefined) {
        return this.turnOnCamera()
      }
    }
    return null
  }

  componentWillUnmount() {
    clearTimeout(this.imageProcessorTimeout)
  }

  // Called after the device gets setup. This lets you know some platform specifics
  // like if the device has a camera or flash, or even if you have permission to use the
  // camera. It also includes the aspect ratio correction of the preview
  onDeviceSetup = (deviceDetails) => {
    const {
      hasCamera,
      permissionToUseCamera,
      flashIsAvailable,
      previewHeightPercent,
      previewWidthPercent,
    } = deviceDetails
    this.setState({
      loadingCamera: false,
      device: {
        initialized: true,
        hasCamera,
        permissionToUseCamera,
        flashIsAvailable,
        previewHeightPercent: previewHeightPercent || 1,
        previewWidthPercent: previewWidthPercent || 1,
      },
    })
  }

  // Set the camera view filter
  onFilterIdChange = (id) => {
    this.setState({ filterId: id })
    this.props.onFilterIdChange(id)
  }

  // Determine why the camera is disabled.
  getCameraDisabledMessage() {
    if (this.state.isMultiTasking) {
      return 'Camera is not allowed in multi tasking mode.'
    }

    const { device } = this.state
    if (device.initialized) {
      if (!device.hasCamera) {
        return 'Could not find a camera on the device.'
      }
      if (!device.permissionToUseCamera) {
        return 'Permission to use camera has not been granted.'
      }
    }
    return 'Failed to set up the camera.'
  }

  // On some android devices, the aspect ratio of the preview is different than
  // the screen size. This leads to distorted camera previews. This allows for correcting that.
  getPreviewSize() {
    const dimensions = Dimensions.get('window')
    // We use set margin amounts because for some reasons the percentage values don't align the camera preview in the center correctly.
    const heightMargin =
      ((1 - this.state.device.previewHeightPercent) * dimensions.height) / 2
    const widthMargin =
      ((1 - this.state.device.previewWidthPercent) * dimensions.width) / 2
    if (dimensions.height > dimensions.width) {
      // Portrait
      return {
        height: this.state.device.previewHeightPercent,
        width: this.state.device.previewWidthPercent,
        marginTop: heightMargin,
        marginLeft: widthMargin,
      }
    }

    // Landscape
    return {
      width: this.state.device.previewHeightPercent,
      height: this.state.device.previewWidthPercent,
      marginTop: widthMargin,
      marginLeft: heightMargin,
    }
  }

  // Capture the current frame/rectangle. Triggers the flash animation and shows a
  // loading/processing state. Will not take another picture if already taking a picture.
  capture = () => {
    if (this.state.takingPicture) return
    if (this.state.processingImage) return
    this.setState({ takingPicture: true, processingImage: true })
    this.camera.current.capture()
    this.triggerSnapAnimation()

    // If capture failed, allow for additional captures
    this.imageProcessorTimeout = setTimeout(() => {
      if (this.state.takingPicture) {
        this.setState({ takingPicture: false })
      }
    }, 100)
  }

  // The picture was captured but still needs to be processed.
  onPictureTaken = (event) => {
    this.setState({ takingPicture: false })
    this.props.onPictureTaken(event)
  }

  // The picture was taken and cached. You can now go on to using it.
  onPictureProcessed = ({ croppedImage, initialImage }) => {
    const saveImgPath = '.' + croppedImage.split('///')[1]
    const copy = croppedImage.slice()
    const currentImageData = copy.split('/')
    const saveImgName = currentImageData[currentImageData.length - 1]
    this.props.setIdcardData(saveImgPath, saveImgName)

    this.setState({
      takingPicture: false,
      processingImage: false,
      showScannerView: this.props.cameraIsOn || false,
      feedbackState: true,
      currentImage: croppedImage,
    })
  }

  // Flashes the screen on capture
  triggerSnapAnimation() {
    Animated.sequence([
      Animated.timing(this.state.overlayFlashOpacity, {
        toValue: 0.2,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(this.state.overlayFlashOpacity, {
        toValue: 0,
        duration: 50,
        useNativeDriver: true,
      }),
      Animated.timing(this.state.overlayFlashOpacity, {
        toValue: 0.6,
        delay: 100,
        duration: 120,
        useNativeDriver: true,
      }),
      Animated.timing(this.state.overlayFlashOpacity, {
        toValue: 0,
        duration: 90,
        useNativeDriver: true,
      }),
    ]).start()
  }

  // Hides the camera view. If the camera view was shown and onDeviceSetup was called,
  // but no camera was found, it will not uninitialize the camera state.
  turnOffCamera(shouldUninitializeCamera = false) {
    if (shouldUninitializeCamera && this.state.device.initialized) {
      this.setState(({ device }) => ({
        showScannerView: false,
        device: { ...device, initialized: false },
      }))
    } else if (this.state.showScannerView) {
      this.setState({ showScannerView: false })
    }
  }

  // Will show the camera view which will setup the camera and start it.
  // Expect the onDeviceSetup callback to be called
  turnOnCamera() {
    if (!this.state.showScannerView) {
      this.setState({
        showScannerView: true,
        loadingCamera: true,
      })
    }
  }

  // Renders the camera controls. This will show controls on the side for large tablet screens
  // or on the bottom for phones. (For small tablets it will adjust the view a little bit).
  renderCameraControls() {
    const dimensions = Dimensions.get('window')
    const aspectRatio = dimensions.height / dimensions.width
    const isPhone = aspectRatio > 1.6
    const cameraIsDisabled =
      this.state.takingPicture || this.state.processingImage
    const disabledStyle = { opacity: cameraIsDisabled ? 0.8 : 1 }
    if (!isPhone) {
      if (dimensions.height < 500) {
        return (
          <View style={styles.buttonContainer}>
            <View
              style={[
                styles.buttonActionGroup,
                {
                  flexDirection: 'row',
                  alignItems: 'flex-end',
                  marginBottom: 28,
                },
              ]}
            >
              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.cameraButton}
                onPress={this.capture}
              />
            </View>
          </View>
        )
      }
      return (
        <View style={styles.buttonContainer}>
          <View
            style={[
              styles.buttonActionGroup,
              { justifyContent: 'flex-end', marginBottom: 20 },
            ]}
          >
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.cameraButton}
              onPress={this.capture}
            />
          </View>
        </View>
      )
    }

    return (
      <>
        <View style={styles.buttonBottomContainer}>
          <View style={styles.buttonGroup}>
            <View style={[styles.cameraOutline, disabledStyle]}>
              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.cameraButton}
                onPress={this.capture}
              />
            </View>
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'flex-end',
            }}
          >
            {this.state.isScanned && (
              <TouchableOpacity
                style={styles.completebtn}
                // onPress={() => RNRestart.Restart()}
                onPress={() => {
                  this.props.navigation.navigate({ name: 'Profile' })
                }}
              >
                <Text style={{ color: 'black', fontSize: wp(4.5) }}>완료</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </>
    )
  }

  feedback = (option) => {
    if (option == 1) {
      this.setState({
        feedbackState: false,
        googleVisionDetetion: false,
      })
    } else {
      const file = 'file://' + this.state.currentImage
      this.setState({
        feedbackState: false,
        preparedImgages: 'file://' + this.state.currentImage,
        isScanned: true,
      })
      // const currentImage = this.state.currentImage.split('/')
      // this.props.setIdcardData(
      //   currentImage[currentImage.length - 1],
      //   'file://' + this.state.currentImage,
      // )
    }
  }

  feedbackOverlay() {
    if (this.state.feedbackState) {
      return (
        <>
          <SafeAreaView style={[styles.overlay, { backgroundColor: 'white' }]}>
            <View
              style={{
                height: hp(10),
                justifyContent: 'flex-end',
                alignItems: 'center',
                paddingBottom: hp(3),
              }}
            >
              <Text style={styles.idCardResult}>신분증 촬영 사진</Text>
            </View>
            <ScrollView
              style={{
                height: hp(65),
              }}
            >
              <ImageAutoHeight
                source={{
                  uri: this.state.currentImage,
                }}
                style={{ width: '100%', height: '100%' }}
              />
            </ScrollView>

            <View
              style={{
                height: hp(20),
                paddingBottom: hp(3),
              }}
            >
              <View style={styles.btnContainer}>
                <View style={styles.btnArea_l}>
                  <TouchableOpacity
                    style={styles.delbtnoutline}
                    onPress={() => {
                      {
                        this.feedback(1)
                      }
                    }}
                  >
                    <Text style={styles.btn_l_text}>다시 찍기</Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.btnArea_r}>
                  <TouchableOpacity
                    style={styles.delbtn}
                    onPress={() => {
                      {
                        this.feedback(2)
                      }
                    }}
                  >
                    <Text style={styles.btn_r_text}>사용하기</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <View>
              <Text>a</Text>
            </View>
          </SafeAreaView>
        </>
      )
    }
  }
  // Renders the camera controls or a loading/processing state
  renderCameraOverlay() {
    let loadingState = null
    if (this.state.loadingCamera) {
      loadingState = (
        <View style={styles.overlay}>
          <View style={styles.loadingContainer}>
            <ActivityIndicator color="white" />
            <Text style={styles.loadingCameraMessage}>Loading Camera</Text>
          </View>
        </View>
      )
    } else if (this.state.processingImage) {
      loadingState = (
        <View style={styles.overlay}>
          <View style={styles.loadingContainer}>
            <View style={styles.processingContainer}>
              <ActivityIndicator color="#333333" size="large" />
              <Text style={{ color: '#333333', fontSize: 30, marginTop: 10 }}>
                Processing
              </Text>
            </View>
          </View>
        </View>
      )
    }

    return (
      <>
        {loadingState}
        <SafeAreaView style={[styles.overlay]}>
          {this.renderCameraControls()}
        </SafeAreaView>
      </>
    )
  }

  // Renders either the camera view, a loading state, or an error message
  // letting the user know why camera use is not allowed
  renderCameraView() {
    if (this.state.showScannerView) {
      const previewSize = this.getPreviewSize()
      let rectangleOverlay = null
      if (!this.state.loadingCamera && !this.state.processingImage) {
        rectangleOverlay = (
          <RectangleOverlay
            detectedRectangle={this.state.detectedRectangle}
            previewRatio={previewSize}
            backgroundColor="rgba(255,181,6, 0.2)"
            borderColor="rgb(255,181,6)"
            borderWidth={4}
          />
        )
      }

      // NOTE: I set the background color on here because for some reason the view doesn't line up correctly otherwise. It's a weird quirk I noticed.
      return (
        <View
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0)',
            position: 'relative',
            marginTop: previewSize.marginTop,
            marginLeft: previewSize.marginLeft,
            height: `${previewSize.height * 100}%`,
            width: `${previewSize.width * 100}%`,
          }}
        >
          <Scanner
            onPictureTaken={this.onPictureTaken}
            onPictureProcessed={this.onPictureProcessed}
            enableTorch={this.state.flashEnabled}
            filterId={this.state.filterId}
            ref={this.camera}
            capturedQuality={0.6}
            onRectangleDetected={({ detectedRectangle }) =>
              this.setState({ detectedRectangle })
            }
            onDeviceSetup={this.onDeviceSetup}
            onTorchChanged={({ enabled }) =>
              this.setState({ flashEnabled: enabled })
            }
            style={styles.scanner}
          />
          {rectangleOverlay}
          <Animated.View
            style={{
              ...styles.overlay,
              backgroundColor: 'white',
              opacity: this.state.overlayFlashOpacity,
            }}
          />
          {this.renderCameraOverlay()}
          {this.feedbackOverlay()}
        </View>
      )
    }

    let message = null
    if (this.state.loadingCamera) {
      message = (
        <View style={styles.overlay}>
          <View style={styles.loadingContainer}>
            <ActivityIndicator color="white" />
            <Text style={styles.loadingCameraMessage}>Loading Camera</Text>
          </View>
        </View>
      )
    } else {
      message = (
        <Text style={styles.cameraNotAvailableText}>
          {this.getCameraDisabledMessage()}
        </Text>
      )
    }

    return <View style={styles.cameraNotAvailableContainer}>{message}</View>
  }

  render() {
    return (
      <View
        style={styles.container}
        onLayout={(event) => {
          // This is used to detect multi tasking mode on iOS/iPad
          // Camera use is not allowed
          this.props.onLayout(event)
          if (this.state.didLoadInitialLayout && Platform.OS === 'ios') {
            const screenWidth = Dimensions.get('screen').width
            const isMultiTasking =
              Math.round(event.nativeEvent.layout.width) <
              Math.round(screenWidth)
            if (isMultiTasking) {
              this.setState({ isMultiTasking: true, loadingCamera: false })
            } else {
              this.setState({ isMultiTasking: false })
            }
          } else {
            this.setState({ didLoadInitialLayout: true })
          }
        }}
      >
        {this.renderCameraView()}
      </View>
    )
  }
}
