import Config from "react-native-config";

const fetch = require("cross-fetch");

const callGoogleVIsionApi = async (base64) => {
    let googleVisionRes = await fetch(Config.GOOGLE_API + Config.GOOGLE_API_KEY, {
        method: "POST",
        body: JSON.stringify({
            requests: [
                {
                    image: {
                        content: base64,
                    },
                    features: [
                        { type: "TEXT_DETECTION", maxResults: 5 },
                        { type: "DOCUMENT_TEXT_DETECTION", maxResults: 5 },
                    ],
                },
            ],
        }),
    });
    try {
        const result = await googleVisionRes.json();
        console.log(result.responses);
        const [data] = result?.responses;
        const fullText = data?.fullTextAnnotation?.text;
        return fullText;
    } catch (error) {
        console.log(error);
    }
};

// callGoogleVIsionApi("gs://idcatch/image/IDCatch_logo.png");
module.exports = {
    callGoogleVIsionApi,
};
