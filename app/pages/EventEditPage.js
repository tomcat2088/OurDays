/**
 * Created by ocean on 2017/3/28.
 */

import React, {Component} from 'react'

import {
    View,
    Text,
    TextInput,
    StyleSheet,
    AppRegistry,
    Button,
    ActivityIndicator,
    Slider,
    Switch,
    TouchableOpacity,
} from 'react-native'
import TopFixNavigationBar from "../components/ui controls/TopFixNavigationBar";
import BlurImage from "../components/ui controls/BlurImage";
import { NavigationActions } from 'react-navigation'
import Picker from 'react-native-picker';
import DatePickerDialog from "react-native-datepicker-dialog/lib/datepicker/DatePickerDialog.ios";

var DaysStore = require('../components/stores/DaysStore')
const window = require('Dimensions').get('window')
const theme = require('../components/ui controls/Theme');

export default class EventEditPage extends Component {
    constructor(props) {
        super(props);
        this.daysStore = new DaysStore();
        let editDayIndex = props.navigation.state.params.index;
        let editDay = this.daysStore.fetchDays()[editDayIndex];
        this.state = {
            editDayIndex: editDayIndex,
            editDay: editDay,
            eventName: editDay.eventName,
            eventDate: editDay.formattedEventDate(),
            category: editDay.category,
            repeat: editDay.repeat,
            alwaysTop: this.daysStore.isTopDay(editDayIndex)
        }
    }

    render() {
        return (
            <View style={ styles.container }>
                <BlurImage
                    source={ require('../resources/bg_01.jpg')}
                    style={{ position: 'absolute', width:window.width, height:window.height}}
                />
                <View style={ styles.inputList }>
                    <View style={ styles.editItem }>
                        <Text style={ [theme.middleText, theme.lightText] }>事件名</Text>
                        <TextInput
                            style={ [theme.middleText, theme.lightText, {width: 200, textAlign: 'right'}] }
                            placeholder={ '请输入事件名' }
                            placeholderTextColor = { '#aaa' }
                            value={ this.state.eventName }></TextInput>
                    </View>
                    <View style={ styles.editItem }>
                        <Text style={ [theme.middleText, theme.lightText] }>日期</Text>
                        <TouchableOpacity onPress={ this._pickEventDate.bind(this) }>
                            <Text
                                style={ [theme.middleText, theme.lightText] }>{ this.state.eventDate }</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={ styles.editItem }>
                        <Text style={ [theme.middleText, theme.lightText] }>分类</Text>
                        <TouchableOpacity onPress={ this._pickEventCategory.bind(this) }>
                            <Text
                                style={ [theme.middleText, theme.lightText] }>{ this.state.category }</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={ styles.editItem }>
                        <Text style={ [theme.middleText, theme.lightText] }>重复</Text>
                        <TouchableOpacity onPress={ this._pickEventRepeat.bind(this) }>
                            <Text
                                style={ [theme.middleText, theme.lightText] }>{ this.state.repeat }</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={ styles.editItem }>
                        <Text style={ [theme.middleText, theme.lightText] }>置顶</Text>
                        <Switch
                            value={ this.state.alwaysTop }
                            onValueChange={ (isOn) => this.setState({ alwaysTop: isOn }) }></Switch>
                    </View>
                    <TouchableOpacity style={ [styles.completeButton] } onPress={ this._save.bind(this) }>
                        <Text style={ [theme.middleText, theme.lightText] }>保存</Text>
                    </TouchableOpacity>
                </View>
                <TopFixNavigationBar
                    onLeftPress={ this._goBack.bind(this) }
                    onRightPress={ this._delete.bind(this) }
                    leftTitle={ '返回' }
                    rightTitle={ '删除' }
                    title={ '编辑事件' }
                />
                <DatePickerDialog ref="datePickDialog" onDatePicked={this._eventDatePicked.bind(this)} />
            </View>
        )
    }

    _goBack() {
        const backAction = NavigationActions.back();
        this.props.navigation.dispatch(backAction);
    }

    _delete() {
        const backAction = NavigationActions.back();
        this.props.navigation.dispatch(backAction);
    }

    _save() {
        this.state.editDay.eventName = this.state.eventName;
        this.state.editDay.category = this.state.category;
        this.state.editDay.repeat = this.state.repeat;
        this.daysStore.save(this.state.currentDayIndex, this.state.editDay);
    }

    _pickEventDate() {
        this.refs.datePickDialog.open({
            date: new Date(this.state.editDay.eventDate),
        });
    }

    _eventDatePicked(date) {
        this.state.editDay.eventDate = (new Date(date)).getTime();
        this.setState({
            eventDate: this.state.editDay.formattedEventDate(date)
        });
    }

    _pickEventCategory() {
        let categories = this.daysStore.fetchCategory();
        Picker.init({
            pickerConfirmBtnText: '选择',
            pickerCancelBtnText: '取消',
            pickerTitleText: '选择类别',
            pickerData: categories,
            selectedValue: [ categories.indexOf(this.state.category) ],
            onPickerConfirm: data => {
                this.setState({ category: data })
            }
        });
        Picker.show();
    }

    _pickEventRepeat() {
        let repeats = this.daysStore.repeatTypes();
        Picker.init({
            pickerConfirmBtnText: '选择',
            pickerCancelBtnText: '取消',
            pickerTitleText: '选择重复',
            pickerData: repeats,
            selectedValue: [ repeats.indexOf(this.state.repeat) ],
            onPickerConfirm: data => {
                this.setState({ repeat: data })
            }
        });
        Picker.show();
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000000',
    },
    inputList: {
        flex: 1,
        marginTop: 64,
        backgroundColor: 'rgba(0,0,0,0)'
    },
    editItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 44,
        paddingLeft:16,
        paddingRight:16,
        paddingTop:5,
        paddingBottom:5,
        borderBottomColor: 'rgba(120,120,120,0.3)',
        borderBottomWidth: 1
    },
    completeButton: {
        height: 44,
        backgroundColor: '#28cc4c',
        marginLeft: 16,
        marginRight: 16,
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 6,
    }
});