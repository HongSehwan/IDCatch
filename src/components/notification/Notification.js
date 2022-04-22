import { AppState } from "react-native";
import PushNotificationIOS from "@react-native-community/push-notification-ios";
import PushNotification from "react-native-push-notification";
import auth from "@react-native-firebase/auth";
import { firebase } from "@react-native-firebase/firestore";

const _handleAppStateChange = (nextAppState) => {
    if (nextAppState === "active") {
        _registerLocalNotification();
    }
};

PushNotification.getChannels(function (channel_ids) {
    console.log(channel_ids); // ['channel_id_1']
});

const _registerLocalNotification = () => {
    const db = firebase.firestore();
    db.collection("Auth")
        .doc(0 + auth().currentUser?.providerData[0].phoneNumber.split("+82")[1] + "NUM")
        .get()
        .then((data) => {
            const nums = data.data().PhoneNumHistory[0];
            const numsArr = nums.split(",");
            const resultNum = numsArr[numsArr.length - 1];
            PushNotification.createChannel(
                {
                    channelId: "com.idcatch", // (required)
                    channelName: "com.idcatch", // (required)
                    channelDescription: "com.idcatch", // (optional) default: undefined.
                    playSound: false, // (optional) default: true
                    vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
                },
                (created) => console.log(`createChannel returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
            );
            PushNotification.setApplicationIconBadgeNumber(0);
            PushNotification.cancelAllLocalNotifications();

            const messages = [`${resultNum}님이 인증에 성공하였습니다.`];
            const message = messages[0];
            PushNotification.localNotificationSchedule({
                /* Android Only Properties */
                channelId: "com.idcatch",
                vibrate: true,
                vibration: 300,
                priority: "hight",
                visibility: "public",
                importance: "hight",

                /* iOS and Android properties */
                message, // (required)
                title: "성인 인증 결과",
                playSound: false,
                number: 1,
                actions: '["OK"]',

                date: new Date(Date.now() + 3 * 1000),
            });
            setTimeout(() => {
                PushNotification.deleteChannel("com.idcatch");
            }, 4000);
        });
};
export default {
    register: async () => {
        PushNotification.configure({
            onNotification: function (notification) {
                notification.finish(PushNotificationIOS.FetchResult.NoData);
            },
            popInitialNotification: true,

            requestPermissions: Platform.OS === "ios",
        });

        _registerLocalNotification();

        AppState.addEventListener("change", _handleAppStateChange, { once: true });
    },
    // unregister: () => {
    //     AppState.removeEventListener("change", _handleAppStateChange);
    // },
};
