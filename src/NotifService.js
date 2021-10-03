import PushNotification from 'react-native-push-notification';
import NotificationHandler from './NotificationHandler';
import {guidGenerator} from './Utils/Guid';

export default class NotifService {
  constructor(onRegister, onNotification) {
    this.createDefaultChannels();

    NotificationHandler.attachRegister(onRegister);
    NotificationHandler.attachNotification(onNotification);

    // Clear badge number at start
    PushNotification.getApplicationIconBadgeNumber(function (number) {
      if (number > 0) {
        PushNotification.setApplicationIconBadgeNumber(0);
      }
    });

    PushNotification.getChannels(function (channels) {
      console.log(channels);
    });
  }

  createDefaultChannels() {
    PushNotification.createChannel(
      {
        channelId: 'default-channel-id', // (required)
        channelName: `Default channel`, // (required)
        channelDescription: 'A default channel', // (optional) default: undefined.
        soundName: 'default', // (optional) See `soundName` parameter of `localNotification` function
        importance: 4, // (optional) default: 4. Int value of the Android notification importance
        vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
      },
      (created) =>
        console.log(`createChannel 'default-channel-id' returned '${created}'`), // (optional) callback returns whether the channel was created, false means it already existed.
    );
  }

  scheduleNotif({title, message, date, detail, type, guid}) {
    const _id = parseInt(Math.random() * 1000000000, 10);
    PushNotification.localNotificationSchedule({
      id: _id,
      date: date,
      channelId: 'default-channel-id',
      invokeApp: false, // (optional) This enable click on actions to bring back the application to foreground or stay in background, default: true
      title: title, // (optional)
      message: message, // (required)
      userInfo: {
        id: _id,
        detail: detail,
        type: type,
        guid: guid,
      }, // (optional) default: {} (using null throws a JSON value '<null>' error)
    });
  }

  checkPermission(cbk) {
    return PushNotification.checkPermissions(cbk);
  }

  requestPermissions() {
    return PushNotification.requestPermissions();
  }

  cancelNotif(id) {
    PushNotification.cancelLocalNotifications({id: id});
  }

  cancelAll() {
    PushNotification.cancelAllLocalNotifications();
  }

  abandonPermissions() {
    PushNotification.abandonPermissions();
  }

  getScheduledLocalNotifications(callback) {
    PushNotification.getScheduledLocalNotifications(callback);
  }
}
