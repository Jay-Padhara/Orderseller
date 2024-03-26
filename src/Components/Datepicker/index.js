import React from 'react';
import {StatusBar, View, Modal, StyleSheet} from 'react-native';
import {colors} from '../../assets/colors';
import {
  responsiveHeight as rh,
  responsiveWidth as rw,
} from 'react-native-responsive-dimensions';
import DatePicker from 'react-native-modern-datepicker';

export const Datepicker = ({visible}) => {
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
            <DatePicker />
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
    backgroundColor: colors.lightblack1,
  },

  main: {
    width: rw(90),
    height: rh(50),
    backgroundColor: colors.white,
  },
});
