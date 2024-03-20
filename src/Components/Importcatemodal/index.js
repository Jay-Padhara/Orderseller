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

export const Importcate = ({
  visible,
  text,
  onClose,
  onSelect,
  onDownload,
  button,
  downloadtext,
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
            <View style={styles.content}>
              <TouchableOpacity style={styles.closeicon} onPress={onClose}>
                <SvgIcon.close width={rw(4.5)} height={rh(4.5)} />
              </TouchableOpacity>

              <SvgIcon.cart width={rw(15)} height={rh(12)} />
              <Text style={styles.text}>{text}</Text>

              <TouchableOpacity style={styles.touchsignin} onPress={onSelect}>
                <Text style={styles.signin}>{button}</Text>
              </TouchableOpacity>

              <View style={styles.line} />

              <TouchableOpacity style={styles.download} onPress={onDownload}>
                <SvgIcon.download width={rw(4.5)} height={rh(4.5)} />
                <Text style={styles.downloadtxt}>{downloadtext}</Text>
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
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },

  main: {
    width: rw(93),
    height: rh(32),
    borderRadius: 20,
    backgroundColor: colors.white,
  },

  content: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  head: {
    textAlign: 'center',
    fontSize: rf(2.6),
    color: colors.black,
    fontFamily: fonts.bold,
  },

  closeicon: {
    position: 'absolute',
    top: rh(0.5),
    right: rw(4),
  },

  touchsignin: {
    width: rw(50),
    alignItems: 'center',
    marginTop: rh(1.4),
    backgroundColor: colors.primary,
    borderRadius: 13,
    padding: rw(2.9),
  },

  signin: {
    color: colors.white,
    fontSize: rf(2.1),
    fontFamily: fonts.bold,
  },

  text: {
    textAlign: 'center',
    fontSize: rf(2.8),
    color: colors.black,
    fontFamily: fonts.semibold,
  },

  line: {
    backgroundColor: colors.black,
    width: rw(80),
    height: rh(0.1),
    marginTop: rh(1.7),
  },

  download: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  downloadtxt: {
    textAlign: 'center',
    fontSize: rf(1.7),
    marginLeft: rw(1),
    color: colors.primary,
    fontFamily: fonts.semibold,
  },
});
