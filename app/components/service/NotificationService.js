/**
 * Created by ocean on 2017/4/7.
 */

import {
    PushNotificationIOS
} from 'react-native'

class NotificationService {
    setup() {
        PushNotificationIOS.addEventListener('register', this._onRegistered);
        PushNotificationIOS.addEventListener('registrationError', this._onRegistrationError);
        PushNotificationIOS.addEventListener('notification', this._onRemoteNotification);
        PushNotificationIOS.addEventListener('localNotification', this._onLocalNotification);
        PushNotificationIOS.requestPermissions();
    }

    release() {
        PushNotificationIOS.removeEventListener('register', this._onRegistered);
        PushNotificationIOS.removeEventListener('registrationError', this._onRegistrationError);
        PushNotificationIOS.removeEventListener('notification', this._onRemoteNotification);
        PushNotificationIOS.removeEventListener('localNotification', this._onLocalNotification);
    }

    _onRegistered(deviceToken) {

    }

    _onRegistrationError(error) {

    }

    _onRemoteNotification(notification) {

    }

    _onLocalNotification(notification){

    }

    removeAllLocalNotification() {
        PushNotificationIOS.cancelAllLocalNotifications();
    }

    localNotificationSchedule(alert, fireDate, repeat) {
        PushNotificationIOS.scheduleLocalNotification({
            fireDate: fireDate,
            alertBody: alert,
            repeatInterval: repeat
        })
    }

    sendLocalNotification(alert) {
        PushNotificationIOS.presentLocalNotification({
            alertBody: alert
        });
    }
}

const sharedService = new NotificationService();
module.exports = sharedService;