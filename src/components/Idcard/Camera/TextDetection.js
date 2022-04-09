import Config from 'react-native-config'

const fetch = require('cross-fetch')

const callGoogleVIsionApi = async (base64) => {
  // Convert the image data to a Buffer and base64 encode it.

  // var imageFile = fs.readFileSync('/path/to/file');
  // const base64 = Buffer.from(imageUrl).toString('base64');
  let googleVisionRes = await fetch(Config.GOOGLE_API + Config.GOOGLE_API_KEY, {
    method: 'POST',
    body: JSON.stringify({
      requests: [
        {
          image: {
            content: base64,
          },
          // "image":{
          //     "source":{
          //       "imageUri":
          //         imageUrl
          //     },
          // },
          features: [
            { type: 'TEXT_DETECTION', maxResults: 5 },
            { type: 'DOCUMENT_TEXT_DETECTION', maxResults: 5 },
          ],
        },
      ],
    }),
  })
  const result = await googleVisionRes.json()
  const [text] = result.responses
  const fullText = text.fullTextAnnotation.text
  return fullText
}

callGoogleVIsionApi('gs://idcatch/image/IDCatch_logo.png')
module.exports = {
  callGoogleVIsionApi,
}
