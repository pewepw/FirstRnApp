import React from 'react';
import { StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import { addPlace, deletePlace, selectPlace, deselectPlace } from './src/store/actions/index'

import PlaceInput from './src/components/PlaceInput/PlaceInput';
import PlaceList from './src/components/PlaceList/PlaceList';
import PlaceDetail from './src/components/PlaceDetail/PlaceDetail';


// import placeImage from './src/assets/placeholder.jpg';

class App extends React.Component {

  componentDidMount() {

  }

  placeDeletedHandler = () => {
    this.props.onDeletePlace();
  }

  onModalClosedHandler = () => {
    this.props.onDeselectPlace();
  }

  placeAddedHandler = placeName => {
     this.props.onAddPlace(placeName);
  }

  placeSelectedHandler = key => {
    this.props.onSelectPlace(key);
  }
  
  render() {
    return (
      <View style={styles.container}>
          <PlaceDetail
           selectedPlace={this.props.selectedPlace} 
           onItemDeleted={this.placeDeletedHandler} 
           onModalClosed={this.onModalClosedHandler}/>
          <PlaceInput 
          onPlaceAdded={this.placeAddedHandler}/>
          <PlaceList 
          places={this.props.places}
          onItemSelected={this.placeSelectedHandler}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start"
  }

});

const mapStateToProps = state => {
  return {
    places: state.places.places,
    selectedPlace: state.places.selectedPlace
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAddPlace: (name) => dispatch(addPlace(name)),
    onDeletePlace: () => dispatch(deletePlace()),
    onSelectPlace: (key) => dispatch(selectPlace(key)),
    onDeselectPlace: () => dispatch(deselectPlace()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);