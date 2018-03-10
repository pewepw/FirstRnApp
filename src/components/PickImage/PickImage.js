import React, { Component } from 'react';
import { View, Image, Button, StyleSheet } from 'react-native';
import imagePlaceholder from '../../assets/placeholder.jpg';

class PickImage extends Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.placeholder}>
                    <Image source={imagePlaceholder} style={styles.previewImage}/>
                </View>

                <View style={styles.button}>
                    <Button title="Pick Image" onPress={() => alert("Pick Image!")}/>
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