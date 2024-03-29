import {View, StyleSheet} from 'react-native';
import React from 'react';
import {SvgIcon} from '../../assets/SvgIcon';
import {
  responsiveHeight as rh,
  responsiveWidth as rw,
} from 'react-native-responsive-dimensions';

export const Line = () => {
  return (
    <View style={styles.line}>
      <SvgIcon.line2 width={rw(90)} height={rh(5)} />
    </View>
  );
};

export const Line1 = () => {
  return (
    <View style={styles.line}>
      <SvgIcon.line width={rw(83)} height={rh(2)} />
    </View>
  );
};

const styles = StyleSheet.create({
  line: {
    alignItems: 'center',
  },
});
