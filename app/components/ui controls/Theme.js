/**
 * Created by ocean on 2017/3/28.
 */
import React, {Component} from 'react'
import {
    StyleSheet
} from 'react-native'

const DefaultTheme = StyleSheet.create({
    exLargeText: {
        fontSize: 60
    },
    largeText: {
        fontSize: 30
    },
    middleText: {
        fontSize: 17,
    },
    smallText: {
        fontSize: 14
    },
    lightText: {
        color: '#fff',
        backgroundColor: 'rgba(0,0,0,0)'
    },
    darkText: {
        color: '#222',
        backgroundColor: 'rgba(0,0,0,0)'
    },
    grayText: {
        color: '#aaa',
        backgroundColor: 'rgba(0,0,0,0)'
    }
});

module.exports = DefaultTheme;