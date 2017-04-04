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
import { BlurView } from 'react-native-blur'

var theme = require('./Theme');
var DaysStore = require('../../components/stores/DaysStore');

export default class BlurImage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Image source={ this.props.source } style={ this.props.style }>
                <BlurView blurType="dark" blurAmount={6} style={ this.props.style } >
                </BlurView>
            </Image>
        )
    }
}

const styles = StyleSheet.create({
});