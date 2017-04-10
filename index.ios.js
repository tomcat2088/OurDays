/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Platform
} from 'react-native';

import HomePage from './app/pages/HomePage'
import EventPreviewPage from './app/pages/EventPreviewPage'
import EventEditPage from './app/pages/EventEditPage'
import CategoryEditPage from './app/pages/CategoryEditPage'
import SettingPage from './app/pages/SettingPage'

import { Navigation } from 'react-native-navigation';

function registerScreens() {
    Navigation.registerComponent('Main', () => HomePage);
    Navigation.registerComponent('EventPreviewPage', () => EventPreviewPage);
    Navigation.registerComponent('EventEditPage', () => EventEditPage);
    Navigation.registerComponent('CategoryEditPage', () => CategoryEditPage);
    Navigation.registerComponent('SettingPage', () => SettingPage);
}
registerScreens();

Navigation.startSingleScreenApp({
    screen: {
        screen: 'Main',
        title: 'Main',
        navigatorStyle: {
            navBarHidden: true,
            screenBackgroundColor: '#000'
        },
        navigatorButtons: {}
    },
    passProps: {},
    animationType: 'slide-down'
});

if (Platform.OS === 'ios') {
    let notificationService = require('./app/components/service/NotificationService')
    notificationService.setup();
    let daysNotificationService = require('./app/components/service/DaysNotificationService')
    daysNotificationService.setup();
} else if(Platform.OS === 'android') {
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',

    },
    image: {
        width:200,
        height:100,
        borderColor: '#900',
        borderWidth: 2,
    }
});

AppRegistry.registerComponent('OurDays', () => App);
