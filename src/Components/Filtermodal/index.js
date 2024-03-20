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

export const Filtermodal = ({visible, onClose, onReset, onApply, onSelect}) => {
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
            <TouchableOpacity onPress={onClose} style={styles.close}>
              <SvgIcon.close width={rw(4.5)} height={rh(4)} />
            </TouchableOpacity>
            <Text style={styles.text}>{appConstant.filter}</Text>

            <View style={styles.sku}>
              <Text style={styles.skutxt}>{appConstant.selectcate + ' :'}</Text>
              <TouchableOpacity style={styles.catetextin} onPress={onSelect}>
                <Text style={styles.cate}>{appConstant.category}</Text>
                <SvgIcon.down_arrow width={rw(9)} height={rh(4)} />
              </TouchableOpacity>
            </View>

            <View style={styles.canceldel}>
              <View style={styles.cancelview}>
                <TouchableOpacity style={styles.cancel} onPress={onReset}>
                  <Text style={styles.canceltext}>{appConstant.reset}</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity style={styles.delete} onPress={onApply}>
                <Text style={styles.deltext}>{appConstant.apply}</Text>
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
    justifyContent: 'center',
    backgroundColor: colors.lightblack1,
  },

  head: {
    alignItems: 'center',
    backgroundColor: colors.white,
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    height: rh(35),
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },

  sku: {
    margin: rw(2),
    marginLeft: rw(5),
    marginRight: rw(5),
  },

  skutxt: {
    color: colors.labelgrey,
    fontFamily: fonts.semibold,
    fontSize: rf(2),
    margin: rw(2),
  },

  catetextin: {
    width: rw(90),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.grey,
    borderRadius: 13,
    padding: rh(1.8),
  },

  cate: {
    fontSize: rf(2.1),
    color: colors.black,
    fontFamily: fonts.medium,
  },

  text: {
    textAlign: 'center',
    margin: rw(3),
    fontSize: rf(2.5),
    fontFamily: fonts.bold,
    color: colors.black,
  },

  close: {
    position: 'absolute',
    right: rw(6),
    top: rh(0.8),
  },

  cancel: {
    width: rw(44),
    alignItems: 'center',
    marginTop: rh(3),
    backgroundColor: colors.grey,
    borderRadius: 10,
    padding: rw(4),
  },

  delete: {
    width: rw(44),
    alignItems: 'center',
    marginTop: rh(3),
    backgroundColor: colors.primary,
    borderRadius: 10,
    padding: rw(4),
  },

  canceltext: {
    color: colors.black,
    fontSize: rf(2),
    fontFamily: fonts.bold,
  },

  deltext: {
    color: colors.white,
    fontSize: rf(2),
    fontFamily: fonts.bold,
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
    marginRight: rw(2),
  },

  canceldel: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
