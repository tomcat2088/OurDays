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
    Alert,
    Switch,
    TouchableOpacity,
} from 'react-native'
import TopFixNavigationBar from "../components/ui controls/TopFixNavigationBar";
import BlurImage from "../components/ui controls/BlurImage";
import { NavigationActions } from 'react-navigation'
import Picker from 'react-native-picker';
import DatePickerDialog from "react-native-datepicker-dialog/lib/datepicker/DatePickerDialog.ios";
var MessageBarAlert = require('react-native-message-bar').MessageBar;
var MessageBarManager = require('react-native-message-bar').MessageBarManager;

var DaysStore = require('../components/stores/DaysStore')
const window = require('Dimensions').get('window')
const theme = require('../components/ui controls/Theme');
var moment = require('moment');


export default class EventEditPage extends Component {
    static navigatorStyle = {
        navBarHidden: true,
        screenBackgroundColor: '#000'
    };
    constructor(props) {
        super(props);
        this.daysStore = DaysStore;
        var isCreate = false;
        let editDayIndex = props.index;
        let editDay = this.daysStore.days[editDayIndex];
        if (!editDay) {
            editDay = this.daysStore.newDay();
            if (props.category != '') {
                editDay.category = props.category;
            }
            isCreate = true;
        }
        this.state = {
            isCreate: isCreate,
            editDayIndex: editDayIndex,
            editDay: editDay,
            eventName: editDay.eventName,
            eventDate: editDay.formattedEventDate(),
            category: editDay.category,
            repeat: editDay.repeat,
            alwaysTop: this.daysStore.isTopDay(editDay)
        }
    }

    componentDidMount() {
        MessageBarManager.registerMessageBar(this.refs.alert);
    }

    componentWillUnmount() {
        MessageBarManager.unregisterMessageBar();
    }

    render() {
        return (
            <View style={ styles.container }>
                <BlurImage
                    source={ require('../resources/bg_01.jpg')}
                    style={{position: 'absolute', width: window.width, height: window.height}}
                />
                <View style={ styles.inputList }>
                    <View style={ styles.editItem }>
                        <Text style={ [theme.middleText, theme.lightText] }>事件名</Text>
                        <TextInput
                            style={ [theme.middleText, theme.lightText, {width: 200, textAlign: 'right'}] }
                            placeholder={ '请输入事件名' }
                            placeholderTextColor={ '#aaa' }
                            defaultValue={this.state.eventName}
                            onChangeText={ (newText) => this.setState({ eventName: newText }) }>
                        </TextInput>
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
                            onValueChange={ (isOn) => this.setState({alwaysTop: isOn}) }></Switch>
                    </View>
                    <TouchableOpacity style={ [styles.completeButton] } onPress={ this._save.bind(this) }>
                        <Text style={ [theme.middleText, theme.lightText] }>保存</Text>
                    </TouchableOpacity>
                </View>
                <TopFixNavigationBar
                    onLeftPress={ this._goBack.bind(this) }
                    onRightPress={ this.state.isCreate ? undefined : this._delete.bind(this) }
                    leftTitle={ '返回' }
                    rightTitle={ this.state.isCreate ? undefined : '删除' }
                    title={ this.state.isCreate ? '新建事件' : '编辑事件' }
                />
                <MessageBarAlert ref="alert" />
            </View>
        )
    }

    _goBack() {
        Picker.hide();
        this.props.navigator.pop();
    }

    _delete() {
        Alert.alert(
            '警告',
            '确定要删除吗？',
            [
                {text: '取消', style: 'cancel'},
                {text: '删除', onPress: () => {
                    var _this = this;
                    DaysStore.deleteDay(this.state.editDay, function () {
                        _this.props.navigator.pop();
                    }, function (error) {

                    })
                }},
            ],
            { cancelable: false }
        )
    }

    _save() {
        if (this.state.eventName == '') {
            Alert.alert(
                '警告',
                '事件名不能为空',
                [
                    {text: '确定', style: 'cancel'},
                ],
                { cancelable: false }
            )
        } else {
            this.state.editDay.eventName = this.state.eventName;
            this.state.editDay.category = this.state.category;
            this.state.editDay.repeat = this.state.repeat;
            let _this = this;
            this.daysStore.saveDay(this.state.editDay, function () {
                _this.props.navigator.pop();
            }, function (error) {
                // save with error
            });
            if (this.state.alwaysTop) {
                this.daysStore.makeTopDay(this.state.editDay);
            }
        }
    }

    _pickEventDate() {
        var currentDate = new Date(this.state.editDay.eventDate);
        Picker.init({
            pickerConfirmBtnColor: [255, 255, 255, 1],
            pickerCancelBtnColor: [255, 255, 255, 1],
            pickerTitleColor: [255, 255, 255, 1],
            pickerToolBarBg: [0, 0, 0, 0.7],
            pickerBg: [0, 0, 0, 0.5],
            pickerFontColor: [255, 255 ,255, 1],
            pickerConfirmBtnText: '选择',
            pickerCancelBtnText: '取消',
            pickerTitleText: '选择时间',
            pickerData: this._createDateData(),
            selectedValue: [currentDate.getFullYear() + '年', (currentDate.getMonth() + 1) + '月', currentDate.getDate() + '日'],
            onPickerConfirm: (pickedValue, pickedIndex) => {
                let year = parseInt(pickedValue[0]);
                let month = parseInt(pickedValue[1]);
                let day = parseInt(pickedValue[2]);
                let date = new Date();
                date.setFullYear(year);
                date.setMonth(month - 1);
                date.setDate(day);
                this.state.editDay.eventDate = date.getTime();
                this.setState({ eventDate: this.state.editDay.formattedEventDate(date)});
            }
        });
        Picker.show();
    }

    _pickEventCategory() {
        var _this = this;
        this.props.navigator.push({
            screen: 'CategoryEditPage',
            passProps: {
                category: this.state.category,
                categorySetCallback: function(data) {
                    console.warn(data);
                    _this.setState({ category: data });
                }
            }
        });
    }

    _pickEventRepeat() {
        let repeats = this.daysStore.repeatTypes();
        Picker.init({
            pickerConfirmBtnColor: [255, 255, 255, 1],
            pickerCancelBtnColor: [255, 255, 255, 1],
            pickerTitleColor: [255, 255, 255, 1],
            pickerToolBarBg: [0, 0, 0, 0.7],
            pickerBg: [0, 0, 0, 0.5],
            pickerFontColor: [255, 255 ,255, 1],
            pickerConfirmBtnText: '选择',
            pickerCancelBtnText: '取消',
            pickerTitleText: '选择重复',
            pickerData: repeats,
            selectedValue: [this.state.repeat],
            onPickerConfirm: data => {
                for (var i in repeats) {
                    if (repeats[i] == data) {
                        return this.setState({repeat: repeats[i]});
                    }
                }
            }
        });
        Picker.show();
    }

    _createDateData() {
        let date = [];
        for(let i=1950;i<2050;i++){
            let month = [];
            for(let j = 1;j<13;j++){
                let day = [];
                if(j === 2){
                    for(let k=1;k<29;k++){
                        day.push(k+'日');
                    }
                    //Leap day for years that are divisible by 4, such as 2000, 2004
                    if(i%4 === 0){
                        day.push(29+'日');
                    }
                }
                else if(j in {1:1, 3:1, 5:1, 7:1, 8:1, 10:1, 12:1}){
                    for(let k=1;k<32;k++){
                        day.push(k+'日');
                    }
                }
                else{
                    for(let k=1;k<31;k++){
                        day.push(k+'日');
                    }
                }
                let _month = {};
                _month[j+'月'] = day;
                month.push(_month);
            }
            let _date = {};
            _date[i+'年'] = month;
            date.push(_date);
        }
        return date;
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