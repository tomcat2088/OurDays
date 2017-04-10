/**
 * Created by ocean on 2017/3/28.
 */
import React, {Component} from 'react'

import {
    StyleSheet,
    ListView,
    Text,
    Image,
    View,
    Switch,
    TextInput,
    TouchableOpacity,
    Alert
} from 'react-native'
import BlurImage from "../components/ui controls/BlurImage";
import TopFixNavigationBar from "../components/ui controls/TopFixNavigationBar";

const window = require('Dimensions').get('window')
var theme = require('../components/ui controls/Theme');
var DaysStore = require('../components/stores/DaysStore');
var AppInfo = require('../components/service/AppInfo');
var daysNotificationService = require('../components/service/DaysNotificationService')

class BoolSettingType {
    constructor(props) {
        this._state = props.state;
        this._valueChanged = props.valueChanged;

    }

    state() {
        if (this._state) {
            return this._state();
        }
        return true;
    }

    valueChanged(val) {
        if (this._valueChanged) {
            this._valueChanged(val);
        }
    }
}

export default class SettingPage extends Component {
    static navigatorStyle = {
        navBarHidden: true,
        screenBackgroundColor: '#000'
    };

    constructor(props) {
        super(props);
        this.state = {
            'update': ''
        }
    }

    componentWillReceiveProps(nextProps) {
    }

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    render() {
        let data = {
            'sections': ['推送设置', '系统'],
            '推送设置': [
                { '开启早间推送(8:00)' : new BoolSettingType({
                    state: () => { return daysNotificationService.config.morningNotifyOn },
                    valueChanged: (val) => daysNotificationService.configure({ 'morningNotifyOn': val })
                }) },
                { '开启午间推送(12:00)' : new BoolSettingType({
                    state: () => daysNotificationService.config.noonNotifyOn,
                    valueChanged: (val) => daysNotificationService.configure({ 'noonNotifyOn': val })
                }) },
                { '开启晚间推送(5:00)' : new BoolSettingType({
                    state: () => daysNotificationService.config.afternoonNotifyOn,
                    valueChanged: (val) => daysNotificationService.configure({ 'afternoonNotifyOn': val })
                }) },
            ],
            '系统': [
                { '版本' : AppInfo.version() },
            ]
        };
        let ds = new ListView.DataSource({
            getRowData: (data, sectionID, rowID) => data[sectionID][rowID],
            getSectionHeaderData: (data, sectionID) => sectionID,
            rowHasChanged           : (row1, row2) => row1 !== row2,
            sectionHeaderHasChanged : (s1, s2) => s1 !== s2
        });
        let dataSource = ds.cloneWithRowsAndSections(data, data.sections)
        return (
            <View style={ styles.container }>
                <BlurImage
                    source={ require('../resources/bg_02.jpg')}
                    style={{position: 'absolute', width: window.width, height: window.height}}
                ></BlurImage>
                <ListView
                    style={[styles.listView]}
                    dataSource={ dataSource }
                    renderRow={ this._renderRow.bind(this) }
                    renderSectionHeader={ this._renderSection.bind(this) }
                    stickySectionHeadersEnabled={false}
                >
                </ListView>
                <TopFixNavigationBar
                    onLeftPress={ this._goBack.bind(this) }
                    onRightPress={ this._edit.bind(this) }
                    leftTitle={ '返回' }
                    title={ '设置' }
                />
            </View>
        )
    }

    _renderRow(data) {
        let key = Object.keys(data)[0];
        let val = data[key];
        if (val instanceof BoolSettingType) {
            return this._renderBoolSettingRow(key, val);
        }
        return (
            <TouchableOpacity onPress={ () => this._onRowSelected(key) }>
                <View style={ [styles.listViewRow] }>
                    <Text style={[theme.lightText, theme.middleText]}>{ key }</Text>
                    <Text style={[theme.lightText, theme.middleText]}>{ val }</Text>
                </View>
            </TouchableOpacity>
        )
    }

    _renderBoolSettingRow(key, val) {
        console.warn('render');
        return (
            <TouchableOpacity onPress={ () => this._onRowSelected(key) }>
                <View style={ [styles.listViewRow] }>
                    <Text style={[theme.lightText, theme.middleText]}>{ key }</Text>
                    <Switch
                        value={ val.state() }
                        onValueChange={ (newVal) => {
                            val.valueChanged(newVal);
                            this.setState({ 'update': '' });
                        } }></Switch>
                </View>
            </TouchableOpacity>
        )
    }

    _renderSection(data) {
        return (
            <TouchableOpacity onPress={ () => this._onRowSelected(data) }>
                <View style={ [styles.listViewSection] }>
                    <Text style={[theme.middleText, { color: '#ffc600' }]}>{ data }</Text>
                </View>
            </TouchableOpacity>
        )
    }

    _goBack() {
        this.props.navigator.pop();
    }

    _edit() {
        this.setState({edit: !this.state.edit});
    }

    _onRowSelected(category) {
        this.setState({ selectedCategory: category });
        if (this.props.categorySetCallback) {
            this.props.categorySetCallback(category);
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000000',
    },
    listView: {
        overflow: 'hidden',
        backgroundColor: '#00000000',
        marginTop: 64
    },
    listViewRow: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 44,
        paddingLeft:24,
        paddingRight:16,
        paddingTop:10,
        paddingBottom:10,
        borderBottomColor: 'rgba(120,120,120,0.3)',
        borderBottomWidth: 1
    },
    listViewSection: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 44,
        paddingLeft:16,
        paddingRight:16,
        paddingTop:10,
        paddingBottom:10,
        borderBottomColor: 'rgba(120,120,120,0.3)',
        borderBottomWidth: 1,
    },
    deleteButton: {
        height: 44,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255,0,0,0.8)'
    },
    input: {
        flex: 1,
    }
});