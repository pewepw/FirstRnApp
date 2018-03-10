import React, { Component } from 'react';
import { View, Text, Button, TextInput, StyleSheet, ImageBackground } from 'react-native';
import startMainTabs from '../Main/startMainTab';
import DefaultInput from '../../components/UI/DefaultInput'
import HeadingText from '../../components/UI/HeadingText'
import MainText from '../../components/UI/MainText'
import ButtonWithBackground from '../../components/UI/ButtonWithBackground';

import backgroundImage from '../../assets/placeholder.jpg'

class AuthScreen extends Component {
    loginHandler = () => {
        startMainTabs();
    }

    render () {
        return (
            <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
                <View style={styles.container}>

                    <MainText><HeadingText style={styles.textHeading}>Please Log In</HeadingText></MainText>
                    
                    <ButtonWithBackground color="#29aaf4">Switch to Login</ButtonWithBackground>

                    <View style={styles.inputContainer}>
                        <DefaultInput placeholder="Email Address"/>
                        <DefaultInput placeholder="Password"/>
                        <DefaultInput placeholder="Confirm Password"/>
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
})

export default AuthScreen;