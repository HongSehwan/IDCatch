import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native'
import { images, colors, fonts } from '../../../styled'
const HomeBtn = ({ img, text }) => {
  const navigation = useNavigation()
  const navPressHandler = async () => {
    switch (img) {
      default:
        navigation.navigate(img)
        break
    }
  }
  return (
    <View>
      <TouchableOpacity style={styles.fnBtn} onPress={navPressHandler}>
        <View style={styles.fn}>
          <Image style={styles.image} source={images[img]} />
          <Text style={styles.text}>{text}</Text>
        </View>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  fnBtn: {
    backgroundColor: 'white',
    width: '100%',
    padding: 20,
  },

  fn: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },

  image: {
    width: 60,
    height: 60,
    marginBottom: 10,
  },

  text: {
    fontSize: 14,
    // fontSize: fonts.fontSize,
    // fontFamily: fonts.font1,
  },
})

export default HomeBtn
