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
    ListView,
    Animated
} from 'react-native'

var Overlay = require('react-native-overlay');
import { BlurView, VibrancyView} from 'react-native-blur'
import SegmentedControlTab from 'react-native-segmented-control-tab'
const window = require('Dimensions').get('window')
export default class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            eventMainAreaInitHeight: 200,
            eventMainAreaHeight: 200,
            eventMainAreaImageScale: 1
        }
    }

    render() {
        let ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });
        let fontScale = this.state.eventMainAreaImageScale > 0.5 ? this.state.eventMainAreaImageScale : 0.5;
        let opacity = 1 - 3*( 1 - this.state.eventMainAreaImageScale);
        return (
            <View style={{ flex: 1, backgroundColor: '#000000' }}>
                <Image source={ require('../resources/bg_01.jpg')} style={{ position: 'absolute', width:window.width, height:window.height}} >
                </Image>
                <BlurView blurType="dark" blurAmount={10} style={{ position:'absolute', width:window.width, height:window.height}}>
                </BlurView>
                <Animated.View style={{
                    backgroundColor: 'rgba(0,0,0, 0.0)',
                    position: 'absolute',
                    width: window.width,
                    height: this.state.eventMainAreaHeight - 64,
                    alignItems: 'center',
                    justifyContent: 'center',
                    top: 64,
                    overflow: 'hidden',
                    opacity: opacity,
                    transform: [{
                        scaleX: fontScale
                    }, {
                        scaleY: fontScale
                    }]
                }}>
                    <Text style={{
                        fontSize: 44,
                        color: '#fff'
                    }}>3</Text>
                    <Text style={{
                        fontSize: 14,
                        color: '#fff',
                        marginTop: 3,
                        marginBottom: 2
                    }}>Event content</Text>
                    <Text style={{
                        fontSize: 10,
                        color: '#fff'
                    }}>2017-6-4(周五)</Text>
                </Animated.View>
                <View style={ styles.navigationBar } >
                    <TouchableOpacity>
                        <Text style={ styles.mainText }>菜单</Text>
                    </TouchableOpacity>
                    <Text style={ styles.mainText }>Our Days - Life</Text>
                    <TouchableOpacity>
                        <Text style={ styles.mainText }>添加</Text>
                    </TouchableOpacity>
                </View>
                <ListView
                    style={{
                        overflow: 'visible',
                        backgroundColor: '#00000000',
                        marginTop: this.state.eventMainAreaInitHeight
                    }}
                    dataSource={ ds.cloneWithRows([1, 2, 3, 5, 6,7,8,9,3,4,5,6,7,8]) }
                    renderRow={ (data) => {
                        return (
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            height: 60,
                            paddingLeft:16,
                            paddingRight:16,
                            paddingTop:10,
                            paddingBottom:10,
                            borderBottomColor: 'rgba(200,200,200,0.5)',
                            borderBottomWidth: 1
                        }}>
                            <View style={{ flexDirection: 'column'}}>
                                <Text style={{color: '#fff', marginBottom: 5 }}>Event Name</Text>
                                <Text style={{color: 'rgba(255,255,255,0.6)' }}>2017-8-9 (周日)</Text>
                            </View>
                            <Text style={{color: '#fff', fontSize: 28 }}>40</Text>
                        </View>

                        )
                    } }
                    scrollEventThrottle = {16.0}
                    onScroll={ (event)=> {
                        let offsetY = event.nativeEvent.contentOffset.y;
                        var scale = this.state.eventMainAreaHeight / this.state.eventMainAreaInitHeight;
                        if (scale < 0) {
                            scale = 0;
                        }
                        this.setState({ eventMainAreaHeight:  this.state.eventMainAreaInitHeight - offsetY });
                        this.setState({ eventMainAreaImageScale: scale })
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

    },
    mainText: {
        color: '#fff',
        fontSize: 15
    }
})