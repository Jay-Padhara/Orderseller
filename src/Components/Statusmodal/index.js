import React from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  StatusBar,
} from 'react-native';
import {SvgIcon} from '../../assets/SvgIcon';
import {fonts} from '../../assets/fonts';
import {
  responsiveFontSize as rf,
  responsiveHeight as rh,
  responsiveWidth as rw,
} from 'react-native-responsive-dimensions';
import {colors} from '../../assets/colors';
import {status} from '../../helper/utils';

export const Statusmodal = ({visible, onPress, onselect, heading}) => {
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
            <Text style={styles.text}>{heading}</Text>

            <FlatList
              data={status}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item}) => {
                return (
                  <>
                    <TouchableOpacity onPress={() => onselect(item)}>
                      <Text style={styles.statetext}>{item}</Text>
                    </TouchableOpacity>
                  </>
                );
              }}
              showsVerticalScrollIndicator={false}
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
    height: rh(36),
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

  statetext: {
    color: colors.black,
    fontFamily: fonts.semibold,
    fontSize: rf(2.2),
    margin: rh(2),
    marginTop: rh(2),
  },
});
