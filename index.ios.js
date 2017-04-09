/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
} from 'react-native';

import HomePage from './app/pages/HomePage'
import EventPreviewPage from './app/pages/EventPreviewPage'
import EventEditPage from './app/pages/EventEditPage'
import CategoryEditPage from './app/pages/CategoryEditPage'

import { Navigation } from 'react-native-navigation';

function registerScreens() {
    Navigation.registerComponent('Main', () => HomePage);
    Navigation.registerComponent('EventPreviewPage', () => EventPreviewPage);
    Navigation.registerComponent('EventEditPage', () => EventEditPage);
    Navigation.registerComponent('CategoryEditPage', () => CategoryEditPage);
}
registerScreens();

Navigation.startSingleScreenApp({
    screen: {
        screen: 'Main', // unique ID registered with Navigation.registerScreen
        title: 'Main', // title of the screen as appears in the nav bar (optional)
        navigatorStyle: {
            navBarHidden: true,
            screenBackgroundColor: '#000'
        }, // override the navigator style for the screen, see "Styling the navigator" below (optional)
        navigatorButtons: {} // override the nav buttons for the screen, see "Adding buttons to the navigator" below (optional)
    },
    passProps: {},
    animationType: 'slide-down'
});

// const App = StackNavigator({
//         Main: {
//             screen: HomePage
//         },
//         EventPreviewPage: {
//             screen: EventPreviewPage
//         },
//         EventEditPage: {
//             screen: EventEditPage
//         }
//     },
//     {
//         headerMode: 'screen',
//         navigationOptions: {
//             header: { visible: false }
//         },
//     })

let notificationService = require('./app/components/service/NotificationService')
notificationService.setup();
let daysNotificationService = require('./app/components/service/DaysNotificationService')
daysNotificationService.setup();

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
