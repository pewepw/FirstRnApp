import React, { Component } from 'react';
import { View, Image, Text, Button, StyleSheet, TouchableOpacity, Platform, ScrollView, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import { deletePlace } from '../../store/actions/index';
import MapView from 'react-native-maps';

class PlaceDetail extends Component {
    placeDeletedHandler = () => {
        this.props.onDeletePlace(this.props.selectedPlace.key);
        this.props.navigator.pop();
    }

    closeHandler = () => {
        this.props.navigator.pop();
    }

    render () {
        return (
            <ScrollView style={styles.container}>

            <View>
                <Image source={this.props.selectedPlace.image} style={styles.placeImage}/>
            </View>

            <View>
                <MapView 
                initialRegion={{
                    ...this.props.selectedPlace.location,
                    latitudeDelta: 0.0122,
                    longitudeDelta: Dimensions.get("window").width / Dimensions.get("window").height * 0.0122
                }}
                style={styles.map}>
                    <MapView.Marker coordinate={this.props.selectedPlace.location}/>
                </MapView>
            </View>

            <View>
                <Text style={styles.placeName}>{this.props.selectedPlace.name}</Text>
            </View>

            <View>
                <TouchableOpacity onPress={this.placeDeletedHandler}>
                    <View style={styles.deleteButton}>
                        <Icon 
                        name={Platform.OS === "android" ? "md-trash" : "ios-trash"}
                        size={30} color="red"/>
                    </View>  
                </TouchableOpacity>
                <Button title="Delete" color="red" onPress={this.placeDeletedHandler}/>
                <Button title="Close" onPress={this.closeHandler}/>
            </View>

        </ScrollView>
        )
    }
};

const styles = StyleSheet.create({
    container: {
        padding: 30,
    },

    placeImage: {
        width: "100%",
        height: 200,
    },

    placeName: {
        fontWeight: "bold",
        textAlign: "center",
        fontSize: 28,
    },

    deleteButton: {
        alignItems: "center"
    },

    map: {
        width: "100%",
        height: 250
    }
});

const mapDispatchToProps = dispatch => {
    return {
        onDeletePlace: (key) => dispatch(deletePlace(key))
    } 
}

export default connect(null, mapDispatchToProps)(PlaceDetail);