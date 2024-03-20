import React, {useEffect} from 'react';
import {Routes} from './src/Navigation/Routes';
import {Provider} from 'react-redux';
import FlashMessage from 'react-native-flash-message';
import {fonts} from './src/assets/fonts';
import {
  responsiveFontSize as rf,
  responsiveHeight as rh,
} from 'react-native-responsive-dimensions';
import {store} from './src/Redux/Store';
import {StatusBar} from 'react-native';
import SplashScreen from 'react-native-splash-screen';

export default function App() {
  useEffect(() => {
    setTimeout(async () => {
      SplashScreen.hide();
    }, 1100);
  }, []);

  return (
    <Provider store={store}>
      <StatusBar
        backgroundColor="transparent"
        translucent={true}
        barStyle="dark-content"
      />
      <Routes />
      <FlashMessage
        position="top"
        statusBarHeight={rh(6)}
        textStyle={{fontFamily: fonts.bold, fontSize: rf(2)}}
      />
    </Provider>
  );
}
