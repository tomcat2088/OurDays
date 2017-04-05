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

export default class EventPreviewPage extends Component {
    static navigationOptions = {
        title: '详情'
    };
    constructor(props) {
        super(props);
        this.state = {
            currentDayIndex: this.props.navigation.state.params.selectedDayIndex,
            daysCount: this.props.navigation.state.params.days.length,
            current: 0
        }
    }
    render() {
        let days = this.props.navigation.state.params.days;
        let ds = new ViewPager.DataSource({
            pageHasChanged: (p1, p2) => p1 !== p2
        });
        let pagerDataSource = ds.cloneWithPages(days);
        return (
            <View style={ styles.container }>
                <BlurImage
                    source={ require('../resources/bg_01.jpg')}
                    style={{ position: 'absolute', width:window.width, height:window.height}}
                />
                <ViewPager
                    style={ { flex: 1 } }
                    dataSource={ pagerDataSource }
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
        const backAction = NavigationActions.back();
        this.props.navigation.dispatch(backAction);
    }

    _edit() {
        let { navigate } = this.props.navigation;
        navigate( 'EventEditPage', { index: this.state.currentDayIndex } )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000000',
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