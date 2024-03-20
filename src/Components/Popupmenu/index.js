import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {
  MenuOption,
  MenuOptions,
  MenuTrigger,
  Menu,
} from 'react-native-popup-menu';
import {
  responsiveFontSize as rf,
  responsiveHeight as rh,
  responsiveWidth as rw,
} from 'react-native-responsive-dimensions';
import {appConstant} from '../../helper/appconstants';
import {colors} from '../../assets/colors';
import {SvgIcon} from '../../assets/SvgIcon';
import {fonts} from '../../assets/fonts';

export const Popupmenu = ({opened, setPopup, onEdit, onDelete}) => {
  return (
    <Menu
      opened={opened}
      onBackdropPress={() => setPopup(false)}
      style={styles.popup}>
      <MenuTrigger />
      <MenuOptions optionsContainerStyle={styles.menu}>
        <CustomMenu onSelect={onEdit} text={appConstant.edit}>
          <SvgIcon.popedit width={rw(5)} height={rh(4)} />
        </CustomMenu>

        <CustomMenu onSelect={onDelete} text={appConstant.dele}>
          <SvgIcon.popdel width={rw(5)} height={rh(4)} />
        </CustomMenu>
      </MenuOptions>
    </Menu>
  );
};

const CustomMenu = ({onSelect, children, text}) => (
  <MenuOption onSelect={onSelect}>
    <View style={styles.menuOption}>
      {children}
      <Text style={styles.text}>{text}</Text>
    </View>
  </MenuOption>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  popup: {
    position: 'absolute',
    right: rw(4),
    top: rh(5),
  },

  menu: {
    width: rw(32),
    borderRadius: 20,
    backgroundColor: colors.white,
    elevation: 30,
    shadowColor: colors.labelgrey,
    shadowOffset: {width: 1, height: 4},
    shadowOpacity: 0.8,
  },

  menuOption: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
    marginLeft: rw(2),
  },

  text: {
    fontSize: rf(2),
    color: colors.black,
    fontFamily: fonts.semibold,
    marginLeft: rw(4),
  },
});
