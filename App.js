import React from 'react';
import { StyleSheet, View } from 'react-native';
import PlaceInput from './src/components/PlaceInput/PlaceInput';
import PlaceList from './src/components/PlaceList/PlaceList';
import PlaceDetail from './src/components/PlaceDetail/PlaceDetail';
// import placeImage from './src/assets/placeholder.jpg';

export default class App extends React.Component {
  state = {
    places: [],
    selectedPlace: null
  }

  placeDeletedHandler = () => {
    this.setState(prevState => {
      return {
        places: prevState.places.filter(place => {
          return place.key !== prevState.selectedPlace.key;
        }),
        selectedPlace: null
      }
    });
  }

  onModalClosedHandler = () => {
    this.setState({
      selectedPlace: null
    });
  }

  placeAddedHandler = placeName => {
      this.setState(prevState => {
        return {
          places: prevState.places.concat({
            key: Math.random(), 
            name: placeName,
            image: {
              uri: "https://i0.wp.com/lovecuteanimals.objects.cdn.dream.io/wp-content/uploads/2016/01/Cute-Netherland-Dwarf-Rabbit.jpg?w=1160"
            }})
        };
      });
  }

  placeSelectedHandler = key => {
    this.setState(prevState => {
      return {
        selectedPlace: prevState.places.find(place => {
          return place.key === key;
        })
      }
    });
  }
  
  render() {
    return (
      <View style={styles.container}>
          <PlaceDetail
           selectedPlace={this.state.selectedPlace} 
           onItemDeleted={this.placeDeletedHandler} 
           onModalClosed={this.onModalClosedHandler}/>
          <PlaceInput 
          onPlaceAdded={this.placeAddedHandler}/>
          <PlaceList 
          places={this.state.places}
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
