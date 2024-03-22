import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import {SvgIcon} from '../../assets/SvgIcon';
import {appConstant} from '../../helper/appconstants';
import {
  responsiveWidth as rw,
  responsiveFontSize as rf,
} from 'react-native-responsive-dimensions';
import {fonts} from '../../assets/fonts';
import {colors} from '../../assets/colors';

export const Radiobutton = ({value, onSelect}) => {
  return (
    <View style={styles.radio}>
      <TouchableOpacity onPress={() => onSelect(0)}>
        {value === 0 ? (
          <SvgIcon.selected width={20} height={20} />
        ) : (
          <SvgIcon.unselected width={20} height={20} />
        )}
      </TouchableOpacity>
      <Text style={styles.radiotext}>{appConstant.gst}</Text>

      <TouchableOpacity onPress={() => onSelect(1)}>
        {value === 1 ? (
          <SvgIcon.selected width={20} height={20} />
        ) : (
          <SvgIcon.unselected width={20} height={20} />
        )}
      </TouchableOpacity>
      <Text style={styles.radiotext}>{appConstant.pan}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  radio: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: rw(4),
  },

  radiotext: {
    fontSize: rf(1.8),
    fontFamily: fonts.semibold,
    color: colors.black,
    marginLeft: rw(2),
    marginRight: rw(3),
  },
});
