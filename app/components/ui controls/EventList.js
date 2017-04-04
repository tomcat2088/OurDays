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
    ActivityIndicator,
    TouchableHighlight
} from 'react-native'

var theme = require('./Theme');
var DaysStore = require('../../components/stores/DaysStore');

export default class EventList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            daysStore: this.props.daysStore,
            days: [],
        };
        this.state.days = this.state.daysStore.fetchDays();
    }
    
    render() {
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });
        let dataSource = ds.cloneWithRows(this.state.days);
        return (
            <ListView
                style={[styles.listView, this.props.style]}
                dataSource={ dataSource }
                renderRow={ this._renderRow.bind(this) }
                scrollEventThrottle = {16.0}
                onScroll={ this.props.onScroll }
                >
            </ListView>
        )
    }

    _renderRow(data) {
        let dateString = '目标日:' + (new Date(data.eventDate)).toLocaleDateString();
        var distance = Math.ceil(parseInt((data.eventDate - (new Date()).getTime())  / 1000 / 60 / 60) / 24);
        if (distance == 0) {
            distance = (new Date(data.eventDate)).getDay() - (new Date()).getDay();
        }
        return (
            <TouchableHighlight
                onPress={ () => {
                if (this.props.onRowSelected) {
                    this.props.onRowSelected(0, data);
                }} }
                underlayColor="rgba(0,0,0,0.2)">
                <View style={ styles.listViewRow }>
                    <View style={{ flexDirection: 'column'}}>
                        <Text style={{color: '#fff', marginBottom: 7, fontSize: 16 }}>{ data.eventName }</Text>
                        <Text style={{color: 'rgba(255,255,255,0.6)', fontSize: 11 }}>{ dateString }</Text>
                    </View>
                    <Text style={{color: '#fff', fontSize: 28 }}>{ distance }</Text>
                </View>
            </TouchableHighlight>

        )
    }
}

const styles = StyleSheet.create({
    listView: {
        overflow: 'visible',
        backgroundColor: '#00000000',
    },
    listViewRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 60,
        paddingLeft:16,
        paddingRight:16,
        paddingTop:10,
        paddingBottom:10,
        borderBottomColor: 'rgba(120,120,120,0.3)',
        borderBottomWidth: 1
    }
});