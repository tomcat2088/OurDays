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
    ListView
} from 'react-native'

var Overlay = require('react-native-overlay');
import { BlurView, VibrancyView} from 'react-native-blur'
import SegmentedControlTab from 'react-native-segmented-control-tab'
const window = require('Dimensions').get('window')
export default class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            eventMainAreaHeight: 160
        }
    }

    render() {
        let ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });
        return (
            <View style={{ flex: 1, backgroundColor: '#000000' }}>
                <Image source={ require('../resources/bg_01.jpg')} style={{ position: 'absolute',  width:window.width, height:window.height}} >
                    <BlurView blurType="dark" blurAmount={10} style={{ flex:1, width:window.width, height:window.height}}>
                    </BlurView>
                </Image>
                    <View style={{height: this.state.eventMainAreaHeight, overflow: 'hidden'}} >
                        <Image
                            style={{backgroundColor: '#ff0', width:window.width, height:window.height}}
                            source={ require('../resources/bg_01.jpg') }
                        >
                            <View style={{ backgroundColor: '#000', flex: 1, alignItems: 'center',justifyContent: 'center', opacity: 0.4 }}>
                            </View>
                        </Image>
                    </View>
                    <View style={ styles.navigationBar }>
                        <TouchableOpacity>
                            <Text style={ styles.mainText }>菜单</Text>
                        </TouchableOpacity>
                        <Text style={ styles.mainText }>Our Days - Life</Text>
                        <TouchableOpacity>
                            <Text style={ styles.mainText }>添加</Text>
                        </TouchableOpacity>
                    </View>
                    <ListView
                        style={ styles.eventList }
                        dataSource={ ds.cloneWithRows([1, 2, 3, 5, 6]) }
                        renderRow={ (data) => {
                            return (
                                <Text>{data}</Text>
                            )
                        } }
                        onScroll={ (event)=> {
                            let offsetY = event.nativeEvent.contentOffset.y;
                            this.setState({ eventMainAreaHeight: offsetY < 0 ? 160 - offsetY : 160 });
                        }}>

                    </ListView>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    navigationBar: {
        backgroundColor: '#00000000',
        height:44,
        marginTop:20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft:16,
        paddingRight:16,
        alignItems: 'center',
        flex:1,
        position: 'absolute',
        top: 0,
        left:0,
        right:0
    },
    eventDisplayArea: {
        backgroundColor: '#007',
    },
    eventList: {
        overflow: 'visible',
        backgroundColor: '#00000000',
    },
    mainText: {
        color: '#fff',
        fontSize: 15
    }
})