/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet
} from 'react-native';

import {
    StackNavigator
} from 'react-navigation'

import HomePage from './app/pages/HomePage'
import EventPreviewPage from './app/pages/EventPreviewPage'
import EventEditPage from './app/pages/EventEditPage'

const App = StackNavigator({
        Main: {
            screen: HomePage
        },
        EventPreviewPage: {
            screen: EventPreviewPage
        },
        EventEditPage: {
            screen: EventEditPage
        }
    },
    {
        headerMode: 'screen',
        navigationOptions: {
            header: { visible: false }
        }
    })

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
