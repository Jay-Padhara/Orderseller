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
import {SvgIcon} from '../../assets/SvgIcon';
import {fonts} from '../../assets/fonts';
import {colors} from '../../assets/colors';
import {appConstant} from '../../helper/appconstants';

export const Bottommodal = ({visible, onPress, OnCamera, onGallery}) => {
  return (
    <>
      <StatusBar
        backgroundColor="transparent"
        translucent={true}
        barStyle="dark-content"
      />
      <Modal transparent animationType="fade" visible={visible}>
        <View style={styles.container}>
          <View style={styles.head}>
            <TouchableOpacity style={styles.close} onPress={onPress}>
              <SvgIcon.close width={rw(5)} height={rh(4)} />
            </TouchableOpacity>
            <Text style={styles.text}>{appConstant.setlogo}</Text>
            <View style={styles.main}>
              <TouchableOpacity style={styles.cam} onPress={OnCamera}>
                <SvgIcon.camera width={46} height={46} />
                <Text style={styles.text1}>{appConstant.camera}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.gall} onPress={onGallery}>
                <SvgIcon.gallery width={42} height={42} />
                <Text style={styles.text1}>{appConstant.gallery}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },

  head: {
    alignItems: 'center',
    backgroundColor: colors.grey,
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    height: rh(20),
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },

  main: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    margin: rh(2),
  },

  close: {
    position: 'absolute',
    top: rh(1),
    right: rw(5),
  },

  text: {
    textAlign: 'center',
    margin: rw(3),
    fontSize: rf(2.5),
    fontFamily: fonts.bold,
    color: colors.black,
  },

  text1: {
    fontSize: rf(2),
    margin: rw(1),
    fontFamily: fonts.medium,
    color: colors.black,
  },

  cam: {
    marginRight: rw(10),
    alignItems: 'center',
  },

  gall: {
    marginTop: rw(1),
    alignItems: 'center',
  },
});
