/**
 * Created by ocean on 2017/3/28.
 */

import React, {Component} from 'react'

import {
    View,
    Text,
    StyleSheet,
    AppRegistry,
    Button,
    ActivityIndicator,
    Slider
} from 'react-native'

import { NavigationActions } from 'react-navigation'
import BlurImage from '../components/ui controls/BlurImage'
import TopFixNavigationBar from "../components/ui controls/TopFixNavigationBar";

const window = require('Dimensions').get('window')

export default class HomePage extends Component {
    static navigationOptions = {
        title: '详情'
    };
    constructor(props) {
        super(props);
        this.state = {value: 0}
    }
    render() {
        let day = this.props.navigation.state.params.day;
        return (
            <View style={ styles.container }>
                <BlurImage
                    source={ require('../resources/bg_01.jpg')}
                    style={{ position: 'absolute', width:window.width, height:window.height}}
                />
                <TopFixNavigationBar
                    onLeftPress={ this._goBack.bind(this) }
                    leftTitle={ '返回' }
                    rightTitle={ '编辑' }
                    title="日历"
                />
                <View style={ styles.content }>
                    <Text style={{
                        fontSize: 64,
                        color: '#fff'
                    }}>{ day.distance() }</Text>
                    <Text style={{
                        fontSize: 17,
                        color: '#fff',
                        marginTop: 30,
                        marginBottom: 10
                    }}>{ day.eventName }</Text>
                    <Text style={{
                        fontSize: 14,
                        color: '#ccc'
                    }}>{ '目标日:' + (new Date(day.eventDate)).toLocaleDateString() }</Text>
                </View>
            </View>
        )
    }

    _goBack() {
        const backAction = NavigationActions.back();
        this.props.navigation.dispatch(backAction);
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000000',
        alignItems: 'center',
        justifyContent: 'center'
    },
    content: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0)'
    }
});