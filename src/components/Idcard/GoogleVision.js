// import React, { useEffect } from 'react'
// import styled from 'styled-components'
// import axios from 'axios'
// import { useSelector } from 'react-redux'
// import Config from 'react-native-config'
// import storage from '@react-native-firebase/storage'

// const KakaoVision = () => {
//   const { filepath } = useSelector((state) => state.authReducer)
//   useEffect(() => {
//     axios.post(`dapi.kakao.com/v2/vision/text/ocr`, filepath, {
//       headers: {
//         Authorization: `KakaoAK ${Config.REST_API_KEY}`,
//         'Content-Type': 'multipart/form-data',
//       },
//       withCredentials: true,
//     })
//   }, [])
// }

// export default KakaoVision
