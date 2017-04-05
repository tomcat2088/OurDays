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

export default class HomePage extends Component {
    constructor(props) {
        super(props);
        this.daysStore = new DaysStore();
        this.state = {
            eventMainAreaInitHeight: MainAreaHeight,
            eventMainAreaHeight: MainAreaHeight,
            eventMainAreaImageScale: 1,
            topDay: this.daysStore.topDay()
        };
    }

    render() {
        let listViewYOffsetAnimated = new Animated.Value(0);
        let listViewOnScrollAnimated = Animated.event([{ nativeEvent: { contentOffset: { y: listViewYOffsetAnimated } } }]);

        var distance = Math.ceil(parseInt((this.state.topDay.eventDate - (new Date()).getTime())  / 1000 / 60 / 60) / 24);
        if (distance == 0) {
            distance = (new Date(this.state.topDay.eventDate)).getDay() - (new Date()).getDay();
        }
        var headerColor = listViewYOffsetAnimated.interpolate({
            inputRange: [0, 140, 10000000],
            outputRange: ['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.7)', 'rgba(0, 0, 0, 0.7)']
        });
        return (
            <View style={{ flex: 1, backgroundColor: '#000000' }}>
                <BlurImage
                    source={ require('../resources/bg_01.jpg')}
                    style={{ position: 'absolute', width:window.width, height:window.height}}
                />

                <Animated.View style={{
                    backgroundColor: 'rgba(0,0,0, 0.0)',
                    position: 'absolute',
                    width: window.width,
                    height: listViewYOffsetAnimated.interpolate({
                        inputRange: [
                            -60,
                            0,
                            60
                        ],
                        outputRange: [
                            this.state.eventMainAreaInitHeight + 60 - 64 ,
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
                        outputRange: [1,0],
                    })
                }}>
                    <Animated.Text style={{
                        fontSize: listViewYOffsetAnimated.interpolate({
                            inputRange: [
                                -100,
                                0
                            ],
                            outputRange: [44 * 1.4,44],
                        }),
                        color: '#fff'
                    }}>{distance}</Animated.Text>
                    <Animated.Text style={{
                        fontSize: listViewYOffsetAnimated.interpolate({
                            inputRange: [
                                -100,
                                0
                            ],
                            outputRange: [16 * 1.4,16],
                        }),
                        color: '#fff',
                        marginTop: 3,
                        marginBottom: 6
                    }}>{ this.state.topDay.eventName }</Animated.Text>
                    <Animated.Text style={{
                        fontSize:  listViewYOffsetAnimated.interpolate({
                            inputRange: [
                                -100,
                                0
                            ],
                            outputRange: [12 * 1.4,12],
                        }),
                        color: '#ccc'
                    }}>{ '目标日:' + (new Date(this.state.topDay.eventDate)).toLocaleDateString() }</Animated.Text>
                </Animated.View>
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
                    rightImageSource={ require('../resources/ic_add.png') } />
            </View>
        )
    }

    _rowSelected(index, data) {
        let { navigate } = this.props.navigation;
        navigate('EventPreviewPage', { 'selectedDayIndex' : index, days: this.daysStore.fetchDays() });
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