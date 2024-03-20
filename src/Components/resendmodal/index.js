import React from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import {
  responsiveFontSize as rf,
  responsiveHeight as rh,
  responsiveWidth as rw,
} from 'react-native-responsive-dimensions';
import {colors} from '../../assets/colors';
import {appConstant} from '../../helper/appconstants';
import {fonts} from '../../assets/fonts';

export const Resendmodal = ({visible, onPress}) => {
  return (
    <>
      <StatusBar
        backgroundColor="transparent"
        translucent={true}
        barStyle="dark-content"
      />
      <Modal transparent animationType="fade" visible={visible}>
        <View style={styles.conatiner}>
          <View style={styles.main}>
            <Text style={styles.message}>{appConstant.resendmessage}</Text>

            <TouchableOpacity style={styles.touchsignin} onPress={onPress}>
              <Text style={styles.signin}>{appConstant.ok}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  conatiner: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },

  main: {
    alignItems: 'center',
    width: rw(93),
    height: rh(25),
    padding: rw(2),
    borderRadius: 20,
    backgroundColor: colors.grey,
  },

  touchsignin: {
    width: rw(80),
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: rh(2),
    backgroundColor: colors.primary,
    borderRadius: 13,
    padding: rw(3.5),
  },

  signin: {
    color: colors.white,
    fontSize: rf(2.1),
    fontWeight: 'bold',
  },

  message: {
    textAlign: 'center',
    marginTop: rw(10),
    fontSize: rf(2.1),
    color: colors.black,
    fontFamily: fonts.medium,
  },
});
