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

        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });
        var _this = this;
        DaysStore.fetchDays(function(days) {
            _this.setState({ dataSource: ds.cloneWithRows(days) });
        });
        this.state = {
            dataSource: ds.cloneWithRows([])
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.category) {
            const ds = new ListView.DataSource({
                rowHasChanged: (r1, r2) => r1 !== r2
            });
            this.setState({ dataSource: ds.cloneWithRows(DaysStore.sortedDays(nextProps.category)) });
        }
    }

    componentDidMount() {
        DaysStore.listenOn(this);
    }

    componentWillUnmount() {
        DaysStore.listenOff(this);
    }

    daysStoreUpdated() {
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });
        this.setState({ dataSource: ds.cloneWithRows(DaysStore.sortedDays(this.props.category)) });
    }
    
    render() {
        return (
            <ListView
                style={[styles.listView, this.props.style]}
                dataSource={ this.state.dataSource }
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
                    this.props.onRowSelected(DaysStore.days.indexOf(data), data);
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