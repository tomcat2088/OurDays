/**
 * Created by ocean on 2017/4/7.
 */

import {
    AsyncStorage
} from 'react-native'

let notificationService = require('./NotificationService')
let DaysStore = require('../stores/DaysStore')
let moment = require('moment');

class DaysNotificationService {
    setup() {
        DaysStore.listenOn(this);
        DaysStore.fetchDays();
        this.config = {
            morningNotifyOn: true,
            noonNotifyOn: false,
            afternoonNotifyOn: true,
        };
        this.loadConfiguration();
    }

    configure(conf) {
        for (let key in conf) {
            if (key in this.config) {
                this.config[key] = conf[key];
            }
        }
        this.saveConfiguration();
    }

    loadConfiguration() {
        let _this = this;
        AsyncStorage.getItem('NotificationConfigure', function(error, result) {
            if (!error) {
                let conf = JSON.parse(result);
                _this.configure(conf);
            }
        });
    }

    saveConfiguration() {
        let _this = this;
        AsyncStorage.setItem('NotificationConfigure', JSON.stringify(this.config), function () {
            _this.setupNotification();
        });
    }

    daysStoreUpdated() {
        this.setupNotification();
    }

    setupNotification() {
        let days = DaysStore.days;
        notificationService.removeAllLocalNotification();
        this.setupSpecificNotification(days);
        this.setupDailyNotification(days);
    }

    setupDailyNotification(days) {
        // 这个服务转移到线上
    }

    setupSpecificNotification(days) {
        for (let index in days) {
            this.setupNotificationForDay(days[index]);
        }
    }

    setupNotificationForDay(day: Day) {
        let repeatType = '';
        let notificationDate = new Date(day.eventDate);
        let alert = '温馨提醒： ' +  day.eventName;
        if (day.repeat === '每周提醒我') {
            repeatType = 'week';
            alert = '每周提醒： ' + day.eventName;
        } else if (day.repeat === '每月提醒我') {
            repeatType = 'month';
            alert = '每月提醒： ' + day.eventName;
        } else if (day.repeat === '周年纪念日') {
            repeatType = 'year';
            alert = '温馨提醒： 今天是' + day.eventName + '纪念日';
        }
        notificationDate.setHours(8,0,0,0);
        notificationService.localNotificationSchedule(alert, notificationDate.getTime(), repeatType);
        notificationDate.setHours(12,0,0,0);
        notificationService.localNotificationSchedule(alert, notificationDate.getTime(), repeatType);
        notificationDate.setHours(17,0,0,0);
        notificationService.localNotificationSchedule(alert, notificationDate.getTime(), repeatType);
    }
}

const sharedService = new DaysNotificationService();
module.exports = sharedService;