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
    ActivityIndicator,
    Slider
} from 'react-native'

export default class HomePage extends Component {
    static navigationOptions = {
        title: '详情'
    };
    constructor(props) {
        super(props);
        this.state = {value: 0}
    }
    render() {
        const {navigate} = this.props.navigation;
        return (
            <View>
                <Text>{this.props.name}</Text>
                <Button onPress={() => {
                    console.warn('asdasd');
                }} title="Warn"></Button>
                <Slider onValueChange={ (value) => this.setState({ value: value })} minimumValue={0} maximumValue={33.0} ></Slider>
                <Text>{ this.state.value }</Text>
            </View>
        )
    }
}