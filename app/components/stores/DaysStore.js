/**
 * Created by ocean on 2017/3/28.
 */
import React, {Component} from 'react'
import {
    AsyncStorage
} from 'react-native'

var stringformat = require('stringformat');
var moment = require('moment');
var uuid = require('react-native-uuid');

class Day {
    constructor() {
       this.eventName = '';
       this.eventDate = 0;
       this.category = 'category';
       this.repeat = 'week';
       this.id = uuid.v4();
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

    assign(day: Day) {
        day.eventName = this.eventName;
        day.eventDate = this.eventDate;
        day.category = this.category;
        day.repeat = this.repeat;
    }
}

const DaysStorageKey = 'Days_Store_Key';

class DaysStore extends Component {
    constructor(props) {
        super(props);
        this.days = [];
        this.topDayUid = '';
        this.listeners = [];
        this.categories = ['生活','工作','学习'];
    }

    listenOn(reciever) {
        this.listeners.push(reciever);
    }

    listenOff(reciever) {
        let index = this.listeners.indexOf(reciever);
        if (index >= 0) {
            this.listeners.splice(index , 1);
        }
    }

    updated() {
        for ( let listenerIndex in this.listeners ) {
            let listener = this.listeners[listenerIndex];
            if (listener.daysStoreUpdated) {
                listener.daysStoreUpdated();
            }
        }
    }

    fetchDays(success, failed) {
        var _this = this;
        this._loadAll(function () {
            if (success != undefined) {
                success(_this.days);
            }
        }, failed);
    }

    fetchCategory(success, failed) {
        var _this = this;
        this._loadAll(function () {
            if (success != undefined) {
                success(_this.categories);
            }
        }, failed);
    }

    addCategory(category) {
        this.categories.push(category);
        this._saveAll();
        this.updated();
    }

    deleteCategory(category) {
        let index = this.categories.indexOf(category);
        if (index >= 0) {
            this.categories.splice(index, 1);
        }
        this._saveAll();
        this.updated();
    }

    repeatTypes() {
        return ['提醒我一次', '每周提醒我', '每月提醒我', '周年纪念日'];
    }

    newDay() {
        var day: Day = new Day();
        day.eventName = '';
        day.category = this.categories[0];
        day.eventDate = (new Date()).getTime();
        day.repeat = this.repeatTypes()[0];
        return day;
    }

    deleteDay(day: Day, success, failed) {
        let index = this.days.indexOf(day);
        if (index >= 0) {
            this.days.splice(index, 1);
        }
        var _this = this;
        this._saveAll(function(error) {
            if (error) {
                if (failed) {
                    return failed(error);
                }
            } else {
                if (success) {
                    _this.updated();
                    return success();
                }
            }
        });

    }

    saveDay(day: Day, success, failed) {
        let savedDay = this.dayForUid(day.id);
        if (savedDay) {
            if (day != savedDay) {
                day.assign(savedDay);
            }
        } else {
            this.days.splice(0, 0, day);
        }
        this._saveAll(function(error) {
           if (error) {
               if (failed) {
                   return failed(error);
               }
           } else {
               if (success) {
                   return success();
               }
           }
        });
    }

    topDay() {
        let day = this.dayForUid(this.topDayUid);
        if (!day) {
            if (this.days.length > 0) {
                return this.days[0];
            } else {
                return undefined;
            }
        }
        return day;
    }

    nearestDay() {
        let nearestDay = undefined;
        var nearestDistance = 400;
        for (let index in this.days) {
            let day = this.days[index];
            let distance = day.distance();
            if (distance < nearestDistance && distance >=0) {
                nearestDistance = distance;
                nearestDay = day;
            }
        }
        return nearestDay;
    }

    isTopDay(day: Day) {
        return day.id == this.topDayUid;
    }

    makeTopDay(day: Day) {
        this.topDayUid = day.id;
        this._saveAll();
    }

    sortedDays(category) {
        let categoryExist = false;
        for (let i in this.categories) {
            if (category == this.categories[i]) {
                categoryExist = true;
            }
        }
        let sortedArr = [];
        let topDay = undefined;
        for (let index in this.days) {
            if (!category ||
                !categoryExist ||
                category == this.days[index].category) {
                if (this.days[index].id != this.topDayUid) {
                    sortedArr.push(this.days[index]);
                } else {
                    topDay = this.days[index];
                }
            }
        }
        if (topDay) {
            sortedArr.splice(0,0,topDay);
        }
        return sortedArr;
    }

    dayForUid(uid) {
        for (var index in this.days) {
            if (this.days[index].id == uid) {
                return this.days[index];
            }
        }
        return undefined;
    }

    _saveAll(callback) {
        var storageData = {
            topDayUid: this.topDayUid,
            days: this.days,
            categories: this.categories
        }
        AsyncStorage.setItem(DaysStorageKey, JSON.stringify(storageData), callback);
        this.updated();
    }

    _loadAll(success, failed) {
        var _this = this;
        AsyncStorage.getItem(DaysStorageKey, function(error, data) {
            if (data) {
                let obj = JSON.parse(data);
                _this.days = [];
                _this.topDayUid = obj.topDayUid;
                if (obj.categories instanceof Array && obj.categories.length > 0) {
                    _this.categories = obj.categories;
                }
                for (var dayDicIndex in obj.days) {
                    var dayDic = obj.days[dayDicIndex];
                    var day: Day = new Day();
                    day.eventDate = dayDic.eventDate;
                    day.eventName = dayDic.eventName;
                    day.category = dayDic.category;
                    day.repeat = dayDic.repeat;
                    day.id = dayDic.id;
                    _this.days.push(day);
                }
                if ((!_this.topDayUid || _this.topDayUid == '') && _this.days.length > 0) {
                    _this.topDayUid = _this.days[0].id;
                }
                if (success) {
                    success(_this.days);
                    _this.updated();
                }
            } else {
                if (success) {
                    success(_this.days);
                    _this.updated();
                }
            }
        });
    }
}

var sharedStore = new DaysStore();
module.exports = sharedStore;