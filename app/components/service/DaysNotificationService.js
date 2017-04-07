/**
 * Created by ocean on 2017/4/7.
 */

let notificationService = require('./NotificationService')
let DaysStore = require('../stores/DaysStore')
let moment = require('moment');

class DaysNotificationService {
    setup() {
        DaysStore.listenOn(this);
        DaysStore.fetchDays();
    }

    daysStoreUpdated() {
        let days = DaysStore.days;
        notificationService.removeAllLocalNotification();
        let alert = '本周有' + this.numberOfDaysInThisWeek(days) + '个重要日。点击查看 >>> ';
        let morning = new Date();
        morning.setHours(8,0,0,0);
        let evening = new Date();
        evening.setHours(18,1,0,0);
        notificationService.localNotificationSchedule(alert, morning.getTime(), 'day');
        notificationService.localNotificationSchedule(alert, evening.getTime(), 'day');
        console.warn(alert)
    }

    numberOfDaysInThisWeek(days) {
        let dayCount = 0;
        let todayBegin = new Date();
        todayBegin.setHours(0,0,1,0);
        let todayEnd = new Date();
        todayEnd.setHours(23,59,59,0);
        let todayWeekDay = todayBegin.getDay();
        let weekBeginTimestamp = todayBegin.getTime() - (todayWeekDay - 1) * 24 * 60 * 60 * 1000;
        let weekEndTimestamp = todayEnd.getTime() + (7 - todayWeekDay) * 24 * 60 * 60 * 1000;
        for (let index in days) {
            let day = days[index];
            if (day.eventDate >= weekBeginTimestamp && day.eventDate <= weekEndTimestamp) {
                dayCount++;
            }
        }
        return dayCount;
    }
}

const sharedService = new DaysNotificationService();
module.exports = sharedService;