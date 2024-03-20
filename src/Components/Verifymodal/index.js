import React from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import {colors} from '../../assets/colors';
import {
  responsiveFontSize as rf,
  responsiveHeight as rh,
  responsiveWidth as rw,
} from 'react-native-responsive-dimensions';
import {SvgIcon} from '../../assets/SvgIcon';
import {fonts} from '../../assets/fonts';

export const Verifymodal = ({
  visible,
  heading,
  message,
  onClose,
  onPress,
  button,
}) => {
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
            <TouchableOpacity style={styles.closeicon} onPress={onClose}>
              <SvgIcon.close width={rw(5)} height={rh(5)} />
            </TouchableOpacity>
            <View style={styles.content}>
              <Text style={styles.head}>{heading}</Text>
              <Text style={styles.message}>{message}</Text>
              <TouchableOpacity style={styles.touchsignin} onPress={onPress}>
                <Text style={styles.signin}>{button}</Text>
              </TouchableOpacity>
            </View>
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
    width: rw(93),
    height: rh(34),
    padding: rw(2),
    borderRadius: 20,
    backgroundColor: colors.grey,
  },

  content: {
    alignItems: 'center',
    justifyContent: 'center',
    top: rh(5),
  },

  head: {
    textAlign: 'center',
    fontSize: rf(2.6),
    color: colors.black,
    fontFamily: fonts.bold,
  },

  closeicon: {
    position: 'absolute',
    top: rh(1),
    right: rw(5),
  },

  touchsignin: {
    width: rw(75),
    alignItems: 'center',
    marginTop: rh(3),
    backgroundColor: colors.primary,
    borderRadius: 13,
    padding: rw(3.5),
    marginLeft: rw(20),
    marginRight: rw(20),
  },

  signin: {
    color: colors.white,
    fontSize: rf(2.1),
    fontFamily: fonts.bold,
  },

  message: {
    textAlign: 'center',
    marginTop: rw(5),
    fontSize: rf(1.9),
    color: colors.black,
    marginLeft: rw(3),
    marginRight: rw(3),
    fontFamily: fonts.medium,
  },
});
