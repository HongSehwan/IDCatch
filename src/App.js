import React, { useEffect, useState } from 'react'
import AppLoading from 'expo-app-loading'
import * as Font from 'expo-font'
import { Alert, Image, useColorScheme } from 'react-native'
import { Asset } from 'expo-asset'
import { Ionicons } from '@expo/vector-icons'
import { NavigationContainer } from '@react-navigation/native'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ThemeProvider } from 'styled-components/native'
import { darkTheme, lightTheme } from './styled'
import Root from './navigation/Root'
import auth from '@react-native-firebase/auth'
import OutNav from './navigation/OutNav'

const queryClient = new QueryClient()

const loadFonts = (fonts) => fonts.map((font) => Font.loadAsync(font))
const loadImage = (images) =>
  images.map((image) => {
    if (typeof image === 'string') {
      return Image.prefetch(image)
    } else {
      return Asset.loadAsync(image)
    }
  })

export default function App() {
  const [ready, setReady] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(true)
  const onFinish = () => setReady(true)
  const startLoading = async () => {
    const fonts = loadFonts([Ionicons.font])
    const images = loadImage([require('./LoadingImg.png')])
    await Promise.all([...fonts, ...images])
  }
  // useEffect(() => {
  //   auth().onAuthStateChanged((user) => {
  //     if (user) {
  //       setIsLoggedIn(true)
  //     } else {
  //       setIsLoggedIn(false)
  //     }
  //   })
  // }, [])
  const isDark = useColorScheme() === 'dark'
  if (!ready) {
    return (
      <AppLoading
        startAsync={startLoading}
        onFinish={onFinish}
        onError={console.error}
      />
    )
  }
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
        <NavigationContainer>
          {isLoggedIn ? <Root /> : <OutNav />}
        </NavigationContainer>
      </ThemeProvider>
    </QueryClientProvider>
  )
}
