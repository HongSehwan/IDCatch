import React, { useState, useEffect } from 'react'
import * as FileSystem from 'expo-file-system'
import { SafeAreaView, StyleSheet, View, Text, Image } from 'react-native'
import { callGoogleVIsionApi } from '../../Idcard/Camera/TextDetection'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { BLACK_COLOR } from '../../../color'
import { useNavigation } from '@react-navigation/native'

const RegistrationView = ({ route }) => {
  const navigation = useNavigation()
  const [loadingExtract, setLoadingExtract] = useState(true)
  const [extract, setExtract] = useState('')
  const { uri } = route.params
  useEffect(async () => {
    if (uri) {
      const result = await FileSystem.readAsStringAsync(uri, {
        encoding: 'base64',
      })
      const extract = await callGoogleVIsionApi(result)
      setExtract(extract)
      setLoadingExtract(false)
    }
  }, [])

  const TryAgain = () => {
    navigation.navigate('CEOAuth')
  }

  const CertificationCheck = () => {
    navigation.navigate('CEOCertification')
  }

  return (
    <SafeAreaView style={styles.container}>
      <Image style={styles.image} source={{ uri: uri }} />
      <Text style={styles.heading}>사업자등록증 촬영 결과</Text>
      <Text style={styles.extracted}>
        {loadingExtract ? 'Loading...' : extract ? extract : null}
      </Text>
      <View style={styles.Btn}>
        <View style={styles.Again}>
          <TouchableOpacity onPress={TryAgain}>
            <Text style={styles.AgainText}>다시찍기</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.Complete}>
          <TouchableOpacity onPress={CertificationCheck}>
            <Text style={styles.CompleteText}>인증하기</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: 50,
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 50,
    marginBottom: 30,
    borderRadius: 10,
  },
  heading: {
    fontSize: 25,
    color: BLACK_COLOR,
    marginBottom: 20,
  },
  extracted: {
    color: BLACK_COLOR,
  },
  Btn: {
    flexDirection: 'row',
  },
  Again: {
    height: 50,
    width: 90,
    marginTop: 80,
    marginRight: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'tomato',
    borderRadius: 5,
  },
  AgainText: {
    color: 'white',
    fontSize: 20,
  },
  Complete: {
    height: 50,
    width: 90,
    marginTop: 80,
    marginLeft: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'tomato',
    borderRadius: 5,
  },
  CompleteText: {
    color: 'white',
    fontSize: 20,
  },
})

export default RegistrationView
