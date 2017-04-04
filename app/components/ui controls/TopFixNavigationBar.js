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
    Animated,
    TouchableOpacity
} from 'react-native'

var theme = require('./Theme');
var DaysStore = require('../../components/stores/DaysStore');

export default class TopFixNavigationBar extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Animated.View style={ [styles.navigationBar, this.props.style] } >
                { this._renderLeftItem() }
                <Text style={ styles.mainText }>{ this.props.title }</Text>
                { this._renderRightItem() }
            </Animated.View>
        )
    }

    _renderLeftItem() {
        if (this.props.leftTitle) {
            return (
                <TouchableOpacity onPress={ () => {
                    if (this.props.onLeftPress) {
                        this.props.onLeftPress();
                    }
                } }>
                    <Text style={ styles.mainText }>{ this.props.leftTitle }</Text>
                </TouchableOpacity>
            )
        } else if (this.props.leftImageSource){
            return (
                <TouchableOpacity onPress={ () => {
                    if (this.props.onLeftPress) {
                        this.props.onLeftPress();
                    }
                } }>
                    <Image source={ this.props.leftImageSource } style={{ width: 34, height: 34 }}></Image>
                </TouchableOpacity>
            )
        }
    }

    _renderRightItem() {
        if (this.props.rightTitle) {
            return (
                <TouchableOpacity onPress={ () => {
                    if (this.props.onRightPress) {
                        this.props.onRightPress();
                    }
                } }>
                    <Text style={ styles.mainText }>{ this.props.rightTitle }</Text>
                </TouchableOpacity>
            )
        } else if (this.props.rightImageSource){
            return (
                <TouchableOpacity onPress={ () => {
                    if (this.props.onRightPress) {
                        this.props.onRightPress();
                    }
                } }>
                    <Image source={ this.props.rightImageSource } style={{ width: 34, height: 34 }}></Image>
                </TouchableOpacity>
            )
        }
    }
}

const styles = StyleSheet.create({
    navigationBar: {
        height:64,
        paddingTop:20,
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
    mainText: {
        color: '#fff',
        fontSize: 15,
        backgroundColor: 'rgba(0,0,0,0)'
    }
});