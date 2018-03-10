import React, { Component } from 'react';
import { View, Text, Button, TextInput, StyleSheet, ImageBackground, Dimensions } from 'react-native';
import startMainTabs from '../Main/startMainTab';
import DefaultInput from '../../components/UI/DefaultInput'
import HeadingText from '../../components/UI/HeadingText'
import MainText from '../../components/UI/MainText'
import ButtonWithBackground from '../../components/UI/ButtonWithBackground';

import backgroundImage from '../../assets/placeholder.jpg'

class AuthScreen extends Component {
    state = {
        viewMode: Dimensions.get("window").height > 500 ? "portrait" : "landscape"
    }
    
    constructor(props) {
        super(props);
        Dimensions.addEventListener("change", this.updateStyles);
    }

    componentWillUnmount() {
        Dimensions.removeEventListener("change", this.updateStyles);
    }

    updateStyles = (dims) => {
        this.setState({
            viewMode: dims.window.height > 500 ? "portrait" : "landscape"
        })
    }

    loginHandler = () => {
        startMainTabs();
    }

    render () {
        let headingText = null;

        if (this.state.viewMode === "portrait") {
            headingText = (
                <MainText><HeadingText style={styles.textHeading}>Please Log In</HeadingText></MainText>
            )
        }
        return (
            <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
                <View style={styles.container}>

                    {headingText}
                    
                    <ButtonWithBackground color="#29aaf4">Switch to Login</ButtonWithBackground>

                    <View style={styles.inputContainer}>
                        <DefaultInput placeholder="Email Address"/>
                        <View style={this.state.viewMode === "portrait" ? styles.portraitPasswordContainer : styles.landscapePasswordContainer}>
                            <View style={this.state.viewMode === "portrait" ? styles.portraitPasswordWrapper : styles.landscapePasswordWrapper}>
                                <DefaultInput placeholder="Password"/>
                            </View>
                            <View style={this.state.viewMode === "portrait" ? styles.portraitPasswordWrapper : styles.landscapePasswordWrapper}>
                                <DefaultInput placeholder="Confirm Password"/>
                            </View>
                        </View>
                    </View>

                    <ButtonWithBackground color="#29aaf4" onPress={this.loginHandler}>Submit</ButtonWithBackground>
               
                </View>
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },

    backgroundImage: {
        flex: 1,
        width: "100%"
    },

    inputContainer: {
        width: "80%"
    },

    landscapePasswordContainer: {
        flexDirection: "row",
        justifyContent: "space-between"
    },

    portraitPasswordContainer: {
        flexDirection: "column",
        justifyContent: "flex-start"
    },

    landscapePasswordWrapper: {
        width: "45%"
    },

    portraitPasswordWrapper: {
        width: "100%"
    }
})

export default AuthScreen;