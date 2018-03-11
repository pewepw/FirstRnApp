import React, { Component } from 'react';
import { View, Text, Button, TextInput, StyleSheet, ImageBackground, Dimensions, 
    KeyboardAvoidingView, Keyboard, TouchableWithoutFeedback } from 'react-native';
import startMainTabs from '../Main/startMainTab';
import DefaultInput from '../../components/UI/DefaultInput'
import HeadingText from '../../components/UI/HeadingText'
import MainText from '../../components/UI/MainText'
import ButtonWithBackground from '../../components/UI/ButtonWithBackground';
import backgroundImage from '../../assets/placeholder.jpg'
import validate from '../../utility/validation';
import { connect } from 'react-redux';
import { tryAuth } from '../../store/actions/index';

class AuthScreen extends Component {
    state = {
        viewMode: Dimensions.get("window").height > 500 ? "portrait" : "landscape",
        authMode: "login",
        controls: {
            email: {
                value: "",
                valid: false,
                validationRules: {
                    isEmail: true
                },
                touched: false
            },
            password: {
                value: "",
                valid: false,
                validationRules: {
                    minLength: 6
                },
                touched: false
            },
            confirmPassword: {
                value: "",
                valid: false,
                validationRules: {
                    equalTo: "password"
                },
                touched: false
            }
        }
    }
    
    constructor(props) {
        super(props);
        Dimensions.addEventListener("change", this.updateStyles);
    }

    componentWillUnmount() {
        Dimensions.removeEventListener("change", this.updateStyles);
    }

    switchAuthModeHandler = () => {
        this.setState(prevState => {
            return {
                authMode: prevState.authMode === "login" ? "signup" : "login"
            }
        })
    }

    updateStyles = (dims) => {
        this.setState({
            viewMode: dims.window.height > 500 ? "portrait" : "landscape"
        })
    }

    loginHandler = () => {
        const authData = {
            email: this.state.controls.email.value,
            password: this.state.controls.password.value
        };
        this.props.onLogin(authData);
        startMainTabs();
    }

    updateInputState = (key, value) => {
        let connectedValue = {};
        if (this.state.controls[key].validationRules.equalTo) {
            const equalControl = this.state.controls[key].validationRules.equalTo;
            const equalValue = this.state.controls[equalControl].value;
            connectedValue = {
                ...connectedValue,
                equalTo: equalValue
            }
        }

        if (key === "password") {
            connectedValue = {
                ...connectedValue,
                equalTo: value
            }
        }

        this.setState(prevState => {
            return {
                controls: {
                    ...prevState.controls,
                    confirmPassword: {
                        ...prevState.controls.confirmPassword,
                        valid: key === "password" ? validate(
                            prevState.controls.confirmPassword.value, 
                            prevState.controls.confirmPassword.validationRules, 
                            connectedValue)
                            : prevState.controls.confirmPassword.valid
                    },
                    [key]: {
                        ...prevState.controls[key],
                        value: value,
                        valid: validate(value, prevState.controls[key].validationRules, connectedValue),
                        touched: true
                    }
                }
            }
        })
    }

    render () {
        let headingText = null;
        let confirmPasswordControl = null;

        if (this.state.viewMode === "portrait") {
            headingText = (
                <MainText><HeadingText style={styles.textHeading}>Please Log In</HeadingText></MainText>
            )
        }

        if (this.state.authMode === "signup") {
            confirmPasswordControl = (
                <View style={this.state.viewMode === "portrait" ? styles.portraitPasswordWrapper : styles.landscapePasswordWrapper}>
                <DefaultInput 
                placeholder="Confirm Password"
                value={this.state.controls.confirmPassword.value}
                onChangeText={(val) => this.updateInputState("confirmPassword", val)}
                valid={this.state.controls.confirmPassword.valid}
                touched={this.state.controls.confirmPassword.touched}
                secureTextEntry/>
            </View>
            )
        }

        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={{flex:1}}>
                    <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
                        <KeyboardAvoidingView style={styles.container} behavior="padding">

                            {headingText}
                            
                            <ButtonWithBackground 
                            color="#29aaf4"
                            onPress={this.switchAuthModeHandler}
                            >Switch to {this.state.authMode === "login" ? "Sign Up" : "Login"}
                            </ButtonWithBackground>

                                <View style={styles.inputContainer}>
                                    <DefaultInput 
                                    placeholder="Email Address"
                                    value={this.state.controls.email.value}
                                    onChangeText={(val) => this.updateInputState("email", val)}
                                    valid={this.state.controls.email.valid}
                                    touched={this.state.controls.email.touched}
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    keyboardType="email-address"/>
                                    <View style={this.state.viewMode === "portrait" || this.state.authMode === "login" ? styles.portraitPasswordContainer : styles.landscapePasswordContainer}>
                                        <View style={this.state.viewMode === "portrait" || this.state.authMode === "login" ? styles.portraitPasswordWrapper : styles.landscapePasswordWrapper}>
                                            <DefaultInput 
                                            placeholder="Password" 
                                            value={this.state.controls.password.value}
                                            onChangeText={(val) => this.updateInputState("password", val)}
                                            valid={this.state.controls.password.valid}
                                            touched={this.state.controls.password.touched}
                                            secureTextEntry/>
                                        </View>
                                        {confirmPasswordControl}
                                    </View>
                                </View>                        

                            <ButtonWithBackground 
                            color="#29aaf4" 
                            onPress={this.loginHandler}
                            disabled={
                                !this.state.controls.email.valid || 
                                !this.state.controls.password.valid || 
                                !this.state.controls.confirmPassword.valid && this.state.authMode === "signup"}>
                            Submit
                            </ButtonWithBackground>
                    
                        </KeyboardAvoidingView>
                    </ImageBackground>
                </View>
            </TouchableWithoutFeedback>
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

const mapDispatchToProps = dispatch => {
    return {
        onLogin: (authData) => dispatch(tryAuth(authData))
    }
}

export default connect(null, mapDispatchToProps)(AuthScreen);