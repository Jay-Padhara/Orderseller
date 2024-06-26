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
import {fonts} from '../../assets/fonts';
import {appConstant} from '../../helper/appconstants';
import {SvgIcon} from '../../assets/SvgIcon';

export const Delemodal = ({
  visible,
  onCancel,
  onPress,
  message,
  buttontext,
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
              <View style={styles.del}>
                <SvgIcon.dele width={rw(7)} height={rh(7)} />
              </View>
              <Text style={styles.head}>{message}</Text>

              <View style={styles.canceldel}>
                <View style={styles.cancelview}>
                  <TouchableOpacity style={styles.cancel} onPress={onCancel}>
                    <Text style={styles.canceltext}>{appConstant.cancel}</Text>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.delete} onPress={onPress}>
                  <Text style={styles.deltext}>{buttontext}</Text>
                </TouchableOpacity>
              </View>
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
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
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
    top: rh(2),
  },

  head: {
    textAlign: 'center',
    fontSize: rf(2.1),
    color: colors.black,
    fontFamily: fonts.medium,
    top: rh(2),
    marginLeft: rw(10),
    marginRight: rw(10),
  },

  closeicon: {
    position: 'absolute',
    top: rh(1),
    right: rw(5),
  },

  cancel: {
    width: rw(33),
    alignItems: 'center',
    marginTop: rh(3),
    backgroundColor: ' rgba(245, 245, 245, 1)',
    borderRadius: 13,
    padding: rw(3),
  },

  delete: {
    width: rw(33),
    alignItems: 'center',
    marginTop: rh(3),
    backgroundColor: colors.red,
    borderRadius: 13,
    padding: rw(3),
  },

  canceltext: {
    color: colors.black,
    fontSize: rf(2),
    fontFamily: fonts.medium,
  },

  deltext: {
    color: colors.white,
    fontSize: rf(2),
    fontFamily: fonts.medium,
  },

  del: {
    width: rw(16.5),
    height: rh(9),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.extralightred,
    borderRadius: 15,
  },

  cancelview: {
    marginRight: rw(3),
  },

  canceldel: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    top: rh(2),
  },
});
