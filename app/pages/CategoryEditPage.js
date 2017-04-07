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
    RefreshControl,
    TextInput,
    TouchableOpacity,
    Alert
} from 'react-native'
import BlurImage from "../components/ui controls/BlurImage";
import TopFixNavigationBar from "../components/ui controls/TopFixNavigationBar";

const window = require('Dimensions').get('window')
var theme = require('../components/ui controls/Theme');
var DaysStore = require('../components/stores/DaysStore');
var MessageBarAlert = require('react-native-message-bar').MessageBar;
var MessageBarManager = require('react-native-message-bar').MessageBarManager;

export default class CategoryEditPage extends Component {
    static navigatorStyle = {
        navBarHidden: true,
        screenBackgroundColor: '#000'
    };

    constructor(props) {
        super(props);

        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });
        this.state = {
            dataSource: ds.cloneWithRows([]),
            edit: false,
            selectedCategory: this.props.category
        }
        DaysStore.fetchCategory();
    }

    componentWillReceiveProps(nextProps) {
    }

    componentDidMount() {
        DaysStore.listenOn(this);
        MessageBarManager.registerMessageBar(this.refs.alert);
    }

    componentWillUnmount() {
        DaysStore.listenOff(this);
        MessageBarManager.unregisterMessageBar();
    }

    daysStoreUpdated() {
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });
        let categories = DaysStore.categories.slice();
        categories.push(new Object());
        this.setState({dataSource: ds.cloneWithRows(categories)});
    }

    render() {
        return (
            <View style={ styles.container }>
                <BlurImage
                    source={ require('../resources/bg_01.jpg')}
                    style={{position: 'absolute', width: window.width, height: window.height}}
                />
                <ListView
                    style={[styles.listView]}
                    dataSource={ this.state.dataSource }
                    renderRow={ this._renderRow.bind(this) }
                >
                </ListView>
                <TopFixNavigationBar
                    onLeftPress={ this._goBack.bind(this) }
                    onRightPress={ this._edit.bind(this) }
                    leftTitle={ '保存' }
                    rightTitle={ '编辑' }
                    title={ '选择分类' }
                />
            </View>
        )
    }

    _renderRow(data) {
        if (typeof(data) == 'string') {
            let deleteWidth = this.state.edit ? 60 : 0;
            let rowBg = this.state.selectedCategory == data ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.0)';
            return (
                <TouchableOpacity onPress={ () => this._onRowSelected(data) }>
                    <View style={ [styles.listViewRow, {backgroundColor: rowBg}] }>
                        <Text style={[theme.lightText, theme.middleText]}>{ data }</Text>
                        <TouchableOpacity onPress={ () => {
                            this._delete(data);
                        } }>
                            <View style={[styles.deleteButton, {width: deleteWidth}]}>
                                <Text style={[theme.lightText, theme.middleText]}>删除</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
            )
        } else {
            return this._renderEditRow();
        }

    }

    _renderEditRow() {
        return (
            <View style={ [styles.listViewRow] }>
                <TextInput
                    style={[theme.lightText, theme.middleText, styles.input]}
                    placeholder='在此输入并回车添加新的分类'
                    placeholderTextColor='#aaa'
                    onSubmitEditing={ (event)=>{
                        DaysStore.addCategory(event.nativeEvent.text);
                    }}>
                </TextInput>
            </View>
        )
    }

    _goBack() {
        this.props.navigator.pop();
    }

    _edit() {
        this.setState({edit: !this.state.edit});
    }

    _delete(category) {
        Alert.alert(
            '警告',
            '确定要删除分类<' + category + '>吗？',
            [
                {text: '取消', style: 'cancel'},
                {
                    text: '删除', onPress: () => {
                    DaysStore.deleteCategory(category);
                }
                },
            ],
            {cancelable: false}
        )
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
        paddingLeft:16,
        paddingTop:10,
        paddingBottom:10,
        borderBottomColor: 'rgba(120,120,120,0.3)',
        borderBottomWidth: 1
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