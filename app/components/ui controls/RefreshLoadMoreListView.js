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
    ActivityIndicator
} from 'react-native'


export default class RefreshLoadMoreListView extends Component {
    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });

        this.state = {
            rows: [],
            dataSource: ds.cloneWithRows([]),
            isRefreshing: false,
            isLoadingMore: false,
            onLoadMore: this.props.onLoadMore,
            onRefresh: this.props.onRefresh,
            renderRow: this.props.renderRow
        };
    }

    componentDidMount() {
        this._loadMore();
    }

    _loadMore() {
        this.setState({ isLoadingMore: true });
        if (this.state.onLoadMore) {
            this.state.onLoadMore().then((items) => {
                this.state.rows = this.state.rows.concat(items);
                const ds = new ListView.DataSource({
                    rowHasChanged: (r1, r2) => r1 !== r2
                });
                this.setState({dataSource: ds.cloneWithRows(this.state.rows), isLoadingMore: false});
            })
        }
    }
    _onRefresh() {
        this.setState({ isRefreshing: true });
        if (this.state.onRefresh) {
            this.state.onRefresh().then((items) => {
                this.state.rows = items;
                const ds = new ListView.DataSource({
                    rowHasChanged: (r1, r2) => r1 !== r2
                });
                this.setState({dataSource: ds.cloneWithRows(this.state.rows), isRefreshing: false});
            })
        }
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={this.state.renderRow}
                    onEndReachedThreshold={10}
                    onEndReached={this._loadMore.bind(this)}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.isRefreshing}
                            onRefresh={this._onRefresh.bind(this)}
                        />
                    }>
                </ListView>
                <View style={{ height: this.state.isLoadingMore ? 44 : 0, justifyContent: 'center', alignItems: 'center'}}>
                    <Text>加载中...</Text>
                </View>

            </View>

        )
    }
}