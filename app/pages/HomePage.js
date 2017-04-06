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
    Image,
    TouchableOpacity,
    ListView,
    Animated
} from 'react-native'
import TopFixNavigationBar from "../components/ui controls/TopFixNavigationBar";
import BlurImage from "../components/ui controls/BlurImage";

import DaysStore from '../components/stores/DaysStore'
import EventList from '../components/ui controls/EventList'

const window = require('Dimensions').get('window')
const MainAreaHeight: number = 200;

const listViewYOffsetAnimated = new Animated.Value(0);
const listViewOnScrollAnimated = Animated.event([{nativeEvent: {contentOffset: {y: listViewYOffsetAnimated}}}]);
export default class HomePage extends Component {
    constructor(props) {
        super(props);
        this.daysStore = DaysStore;
        this.state = {
            eventMainAreaInitHeight: MainAreaHeight,
            eventMainAreaHeight: MainAreaHeight,
            eventMainAreaImageScale: 1,
            topDay: this.daysStore.nearestDay()
        };
    }

    componentDidMount() {
        DaysStore.listenOn(this);
    }

    componentWillUnmount() {
        DaysStore.listenOff(this);
    }

    daysStoreUpdated() {
        this.setState({ topDay: this.daysStore.nearestDay() });
    }

    render() {
        var headerColor = listViewYOffsetAnimated.interpolate({
            inputRange: [0, 140, 10000000],
            outputRange: ['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.7)', 'rgba(0, 0, 0, 0.7)']
        });
        return (
            <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,1)' }}>
                <BlurImage
                    source={ require('../resources/bg_01.jpg')}
                    style={{ position: 'absolute', width:window.width, height:window.height, backgroundColor: '#000'}}
                />
                { this._topDayView() }
                <EventList
                    style={ styles.eventList }
                    onScroll={ listViewOnScrollAnimated }
                    daysStore={ this.daysStore }
                    onRowSelected={ this._rowSelected.bind(this) }>
                </EventList>
                <TopFixNavigationBar
                    style= {{ backgroundColor: headerColor }}
                    title= "Our Days - Life"
                    leftImageSource={ require('../resources/ic_menu.png') }
                    rightImageSource={ require('../resources/ic_add.png') }
                    onRightPress={ this._add.bind(this) }/>
            </View>
        )
    }

    _topDayView() {
        if (this.state.topDay) {

            var distance = Math.ceil(parseInt((this.state.topDay.eventDate - (new Date()).getTime()) / 1000 / 60 / 60) / 24);
            if (distance == 0) {
                distance = (new Date(this.state.topDay.eventDate)).getDay() - (new Date()).getDay();
            }
            return (
                <Animated.View style={{
                    backgroundColor: 'rgba(0,0,0,0)',
                    position: 'absolute',
                    width: window.width,
                    height: listViewYOffsetAnimated.interpolate({
                        inputRange: [
                            -60,
                            0,
                            60
                        ],
                        outputRange: [
                            this.state.eventMainAreaInitHeight + 60 - 64,
                            this.state.eventMainAreaInitHeight - 64,
                            this.state.eventMainAreaInitHeight - 60 - 64],
                    }),
                    alignItems: 'center',
                    justifyContent: 'center',
                    top: 64,
                    overflow: 'hidden',
                    opacity: listViewYOffsetAnimated.interpolate({
                        inputRange: [
                            0,
                            100
                        ],
                        outputRange: [1, 0],
                    })
                }}>
                    <Animated.Text style={{
                        fontSize: listViewYOffsetAnimated.interpolate({
                            inputRange: [
                                -100,
                                0
                            ],
                            outputRange: [44 * 1.4, 44],
                        }),
                        color: '#fff'
                    }}>{distance}</Animated.Text>
                    <Animated.Text style={{
                        fontSize: listViewYOffsetAnimated.interpolate({
                            inputRange: [
                                -100,
                                0
                            ],
                            outputRange: [16 * 1.4, 16],
                        }),
                        color: '#fff',
                        marginTop: 3,
                        marginBottom: 6
                    }}>{ this.state.topDay.eventName }</Animated.Text>
                    <Animated.Text style={{
                        fontSize: listViewYOffsetAnimated.interpolate({
                            inputRange: [
                                -100,
                                0
                            ],
                            outputRange: [12 * 1.4, 12],
                        }),
                        color: '#ccc'
                    }}>{ '目标日:' + (new Date(this.state.topDay.eventDate)).toLocaleDateString() }</Animated.Text>
                </Animated.View>
            )
        }
    }

    _rowSelected(index, data) {
        this.props.navigator.push({
            screen: 'EventPreviewPage',
            passProps: { 'selectedDayIndex' : index }
        });
    }

    _add() {
        this.props.navigator.push({
            screen: 'EventEditPage',
        });
    }
}

const styles = StyleSheet.create({
    eventDisplayArea: {
        backgroundColor: '#007',
    },
    eventList: {
        marginTop: MainAreaHeight
    }
})