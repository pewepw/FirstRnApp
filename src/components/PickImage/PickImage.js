import React, { Component } from 'react';
import { View, Image, Button, StyleSheet } from 'react-native';
import imagePlaceholder from '../../assets/placeholder.jpg';
import ImagePicker from 'react-native-image-picker';

class PickImage extends Component {
    state = {
        pickedImage: null
    }

    pickImageHandler = () => {
        ImagePicker.showImagePicker({title: "Pick an image"}, res => {
            if (res.didCancel) {
                alert("cancel")
            } else if (res.error) {
                alert(res.error)
            } else {
                this.setState({
                    pickedImage: {uri: res.uri}
                })
            }
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.placeholder}>
                    <Image source={this.state.pickedImage} style={styles.previewImage}/>
                </View>

                <View style={styles.button}>
                    <Button title="Pick Image" onPress={this.pickImageHandler}/>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        alignItems: "center"
    },

    placeholder: {
        borderWidth: 1,
        borderColor: "black",
        backgroundColor: "#eee",
        width: "80%",
        height: 150
    },

    previewImage: {
        width: "100%",
        height: "100%"
    },

    button: {
        margin: 8
    }
});

export default PickImage;