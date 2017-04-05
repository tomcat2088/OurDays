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
            <Image source={ this.props.source } style={ [this.props.style, {opacity: 0.4}] }>
                {/*<BlurView blurType="dark" blurAmount={10} style={ this.props.style } >*/}
                {/*</BlurView>*/}
                <View style={ [this.props.style, { backgroundColor: 'rgba(0,0,0,0.5)'} ] }></View>
            </Image>
        )
    }
}

const styles = StyleSheet.create({
});