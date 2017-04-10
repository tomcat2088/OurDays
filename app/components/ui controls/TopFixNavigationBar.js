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

import Menu, { MenuContext, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';

var theme = require('./Theme');
var DaysStore = require('../../components/stores/DaysStore');
const window = require('Dimensions').get('window')

export default class TopFixNavigationBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentTitle: props.title instanceof Array ? (props.title.length > 0 ? props.title[0] : '') : props.title
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.title) {
           if (this.state.currentTitle == '') {
               this.setState({
                   currentTitle: nextProps.title instanceof Array ? (nextProps.title.length > 0 ? nextProps.title[0] : '') : nextProps.title,
               });
           }
        }
    }

    componentWillUnmount() {
    }

    render() {
        return (
            <Animated.View style={ [styles.navigationBar, this.props.style] } >
                { this._renderLeftItem() }
                { this._renderTitle() }
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
                    <Text style={ [theme.middleText, theme.lightText] }>{ this.props.leftTitle }</Text>
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
        } else {
            return (
                <Text style={ [theme.middleText, theme.lightText] }>{ '        ' }</Text>
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
                    <Text style={ [theme.middleText, theme.lightText] }>{ this.props.rightTitle }</Text>
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
        } else {
            return (
                <Text style={ [theme.middleText, theme.lightText] }>{ '        ' }</Text>
            )
        }
    }

    _renderTitle() {
        if (this.props.title instanceof Array) {
            return this._renderMenu(this.props.title);
        } else {
            return (
                <Text style={ [theme.middleText, theme.lightText, styles.navTitle] }>{ this.props.titlePrefix }{ this.props.title }</Text>
            )
        }
    }

    _renderMenu(options) {
        var menuOptions = [];
        console.warn(JSON.stringify(options))
        for(let i = 0; i < options.length; i++){
            menuOptions.push(
                (<MenuOption key={options[i]} onSelect={() => this._menuOptionSelected(options[i])} text={ this.props.titlePrefix + options[i] } />)
            )
        }
        return (
            <Menu>
                <MenuTrigger text={ this.props.titlePrefix + this.state.currentTitle } customStyles={ triggerStyles }/>
                <MenuOptions customStyles={optionsStyles}>
                    { menuOptions }
                </MenuOptions>
            </Menu>
        )
    }

    _menuOptionSelected(option) {
        this.setState({ currentTitle: option });
        if (this.props.onTitleChanged) {
            this.props.onTitleChanged(option);
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
        right:0,
    },
    mainText: {
        color: '#fff',
        fontSize: 15,
        backgroundColor: 'rgba(0,0,0,0)'
    },
    navTitle: {
        textAlign: 'center'
    }
});

const triggerStyles = {
    triggerText: {
        color: 'white',
        fontSize: 16
    },
    triggerOuterWrapper: {
        padding: 5,
        flex: 1,
    },
    triggerWrapper: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    triggerTouchable: {
        style : {
            flex: 1,
        },
    },
};

const optionsStyles = {
    optionsContainer: {
        backgroundColor: '#fff',
        padding: 3,
        width:window.width
    },
    optionsWrapper: {
    },
    optionWrapper: {
        margin: 5,
        justifyContent: 'center',
        alignItems:'center'
    },
    optionText: {
        color: '#000',
        fontSize: 14
    },
};