import { Navigation } from 'react-native-navigation';
import { Provider } from 'react-redux';

import AuthScreen from './src/screens/Auth/Auth'
import SharePlaceScreen from './src/screens/SharePlace/SharePlace';
import FindPlaceScreen from './src/screens/FindPlace/FindPlace';
import PlaceDetailScreen from './src/screens/PlaceDetail/PlaceDetail';
import SideDrawer from './src/screens/SideDrawer/SideDrawer'

import configureStore from './src/store/configureStore';

const store = configureStore();

Navigation.registerComponent("AuthScreen", () => AuthScreen, store, Provider);
Navigation.registerComponent("SharePlaceScreen", () => SharePlaceScreen, store, Provider);
Navigation.registerComponent("FindPlaceScreen", () => FindPlaceScreen, store, Provider);
Navigation.registerComponent("PlaceDetailScreen", () => PlaceDetailScreen, store, Provider);
Navigation.registerComponent("SideDrawer", () => SideDrawer);

Navigation.startSingleScreenApp({
  screen: {
    screen: "AuthScreen",
    title: "Login"
  }
})