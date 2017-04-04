/**
 * Created by ocean on 2017/3/28.
 */
import React, {Component} from 'react'
import 'react-native'

var stringformat = require('stringformat');


class Day {
    constructor() {
       this.eventName = '';
       this.eventDate = 0;
       this.category = 'category';
       this.repeat = 'week';
    }

    distance() {
        var distance = Math.ceil(parseInt((this.eventDate - (new Date()).getTime())  / 1000 / 60 / 60) / 24);
        if (distance == 0) {
            distance = (new Date(this.eventDate)).getDay() - (new Date()).getDay();
        }
        return distance;
    }
}

class DaysStore {
    constructor(category) {
        this.days = [];
    }

    fetchDays() {
        return this.mockData(20);
    }

    topDay() {
        return this.fetchDays()[0];
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