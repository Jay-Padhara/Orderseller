import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  StatusBar,
} from 'react-native';
import React from 'react';
import {SvgIcon} from '../../assets/SvgIcon';
import {appConstant} from '../../helper/appconstants';
import {fonts} from '../../assets/fonts';
import {
  responsiveFontSize as rf,
  responsiveHeight as rh,
  responsiveWidth as rw,
} from 'react-native-responsive-dimensions';
import {colors} from '../../assets/colors';

export const Addressmodal = ({
  visible,
  data,
  onPress,
  onselect,
  nocategory,
  type,
}) => {
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
              <SvgIcon.close width={rw(5)} height={rh(5)} />
            </TouchableOpacity>
            <Text style={styles.text}>
              {type ? appConstant.selectbilling : appConstant.selectdelivery}
            </Text>

            <FlatList
              showsVerticalScrollIndicator={false}
              data={data}
              keyExtractor={(item, index) => index.toString()}
              ListEmptyComponent={
                <View style={styles.nocat}>
                  <Text style={styles.nocatdata}>{nocategory}</Text>
                </View>
              }
              renderItem={({item}) => {
                return (
                  <>
                    <TouchableOpacity onPress={() => onselect(item)}>
                      <Text style={styles.statetext}>
                        {item?.addressName +
                          ' ' +
                          item?.addressLine +
                          ' ' +
                          item?.locality +
                          ', ' +
                          item?.city +
                          ', ' +
                          item?.state +
                          '-' +
                          item?.pincode +
                          '.'}
                      </Text>
                    </TouchableOpacity>
                  </>
                );
              }}
            />
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
    height: rh(40),
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },

  close: {
    position: 'absolute',
    top: rh(1),
    right: rw(5),
  },

  text: {
    margin: rw(3),
    fontSize: rf(2.5),
    fontFamily: fonts.bold,
    color: colors.black,
  },

  statelist: {
    margin: rh(3),
  },

  statetext: {
    color: colors.labelgrey,
    fontFamily: fonts.semibold,
    fontSize: rf(2.2),
    margin: rh(1.5),
    marginTop: rh(3),
  },

  num: {
    margin: rw(3),
    fontSize: rf(1.9),
    fontFamily: fonts.semibold,
    color: colors.black,
  },

  textin: {
    padding: rw(3.4),
    width: rw(86),
    color: colors.black,
    fontSize: rf(2),
    fontFamily: fonts.medium,
    backgroundColor: colors.white,
    borderRadius: 20,
    elevation: 10,
    shadowColor: colors.labelgrey,
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.8,
  },

  list: {
    marginBottom: rh(1),
  },

  nocat: {
    alignItems: 'center',
    marginTop: rh(10),
  },

  nocatdata: {
    color: colors.black,
    fontFamily: fonts.semibold,
    fontSize: rf(2.8),
  },
});