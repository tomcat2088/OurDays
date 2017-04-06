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

var ViewPager = require('react-native-viewpager');

import { NavigationActions } from 'react-navigation'
import BlurImage from '../components/ui controls/BlurImage'
import TopFixNavigationBar from "../components/ui controls/TopFixNavigationBar";

const window = require('Dimensions').get('window')
const theme = require('../components/ui controls/Theme');
const DaysStore = require('../components/stores/DaysStore')
export default class EventPreviewPage extends Component {
    static navigatorStyle = {
        navBarHidden: true,
        screenBackgroundColor: '#000'
    };
    constructor(props) {
        super(props);
        const ds = new ViewPager.DataSource({
            pageHasChanged: (r1, r2) => r1 !== r2
        });
        this.state = {
            currentDayIndex: props.selectedDayIndex,
            daysCount: DaysStore.days.length,
            current: 0,
            dataSource: ds.cloneWithPages(DaysStore.days)
        }
    }

    componentDidMount() {
        DaysStore.listenOn(this);
    }

    componentWillUnmount() {
        DaysStore.listenOff(this);
    }

    daysStoreUpdated() {
        const ds = new ViewPager.DataSource({
            pageHasChanged: (r1, r2) => r1 !== r2
        });
        this.setState({ dataSource: ds.cloneWithPages(DaysStore.days) });
    }

    render() {
        return (
            <View style={ styles.container }>
                <BlurImage
                    source={ require('../resources/bg_01.jpg')}
                    style={{ position: 'absolute', width:window.width, height:window.height}}
                />
                <ViewPager
                    style={ { flex: 1 } }
                    dataSource={ this.state.dataSource }
                    renderPage={ this._renderPage.bind(this) }
                    initialPage={this.state.currentDayIndex}
                    renderPageIndicator = { this._renderIndicator.bind(this) }
                    onChangePage={ this._onChangePage.bind(this) }>
                </ViewPager>
                <TopFixNavigationBar
                    onLeftPress={ this._goBack.bind(this) }
                    onRightPress={ this._edit.bind(this) }
                    leftTitle={ '返回' }
                    rightTitle={ '编辑' }
                    title= { '日历' }
                />
            </View>
        )
    }

    _renderPage(day) {
        return (
            <View style={ styles.content }>
                <Text
                    style={ [theme.exLargeText, theme.lightText ]}>
                    { day.distance() }
                </Text>
                <Text style={ [
                    {
                        marginTop: 30,
                        marginBottom: 10
                    }, theme.middleText, theme.lightText
                ]}>{ day.eventName }</Text>
                <Text
                    style={ [theme.smallText, theme.grayText ]}>
                    { '目标日:' + (new Date(day.eventDate)).toLocaleDateString() }
                </Text>
            </View>
        )
    }

    _onChangePage(pageNumber) {
        this.setState({ currentDayIndex: pageNumber });
    }

    _renderIndicator() {
        return (
        <View style={ styles.pagerIndicator }>
            <Text style={ [styles.pagerIndicatorText, theme.smallText] }>{  this.state.currentDayIndex + 1 } / { this.state.daysCount }</Text>
        </View>
        )
    }

    _goBack() {
        this.props.navigator.pop();
    }

    _edit() {
        this.props.navigator.push({
            screen: 'EventEditPage',
            passProps: { index: this.state.currentDayIndex }
        });
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000000',
        overflow: 'hidden'
    },
    content: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0)'
    },
    pagerIndicator: {
        backgroundColor: 'rgba(0,0,0,0)',
        height: 60,
        justifyContent: 'center',
        alignItems: 'center'
    },
    pagerIndicatorText: {
        color: '#fff',
    }
});