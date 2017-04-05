/**
 * Created by ocean on 2017/3/28.
 */
import React, {Component} from 'react'
import 'react-native'

var stringformat = require('stringformat');
var moment = require('moment');

class Day {
    constructor() {
       this.eventName = '';
       this.eventDate = 0;
       this.category = 'category';
       this.repeat = 'week';
       this._id = 3;
    }

    distance() {
        var distance = Math.ceil(parseInt((this.eventDate - (new Date()).getTime())  / 1000 / 60 / 60) / 24);
        if (distance == 0) {
            distance = (new Date(this.eventDate)).getDay() - (new Date()).getDay();
        }
        return distance;
    }

    formattedEventDate(timestamp) {
        if (!timestamp)
            timestamp = this.eventDate;
        let date = moment(timestamp).format('YYYY-MM-DD');
        let weekDay =  moment(timestamp).format('dddd');
        let weekMap = {
            'Monday': '周一',
            'Tuesday': '周二',
            'Wednesday': '周三',
            'Thursday': '周四',
            'Friday': '周五',
            'Saturday': '周六',
            'Sunday': '周日',
        }
        weekDay = weekMap[weekDay];
        return date + '  (' + weekDay + ')'
    }
}

class DaysStore {
    constructor(category) {
        this.days = [];
    }

    fetchDays() {
        return this.mockData(20);
    }

    fetchCategory() {
        return ['生活','工作','学习'];
    }

    repeatTypes() {
        return ['无重复', '每天', '每周', '每月'];
    }

    saveDay(dayIndex, day) {

    }

    topDay() {
        return this.fetchDays()[0];
    }

    isTopDay(index) {
        return index == 0;
    }

    mockData(numberOfDays: number) {
        var days = [];
        for (var i = 0; i < numberOfDays;i++) {
            var day: Day = new Day();
            day.eventDate = (new Date()).getTime() + 1000 * 24 * 60 * 60 * (i - numberOfDays / 2);
            day.eventName = '事件' + i;
            day.category = '生活';
            day.repeat = 'day';
            days.push(day);
        }
        return days;
    }
}

module.exports = DaysStore;