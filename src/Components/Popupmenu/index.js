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

export const Popupmenu = ({
  opened,
  setPopup,
  onEdit,
  onDelete,
  buyeroption,
  onView,
  onChangestatus,
  status,
}) => {
  return (
    <Menu
      opened={opened}
      onBackdropPress={() => setPopup(false)}
      style={styles.popup}>
      <MenuTrigger />
      <MenuOptions optionsContainerStyle={styles.menu}>
        {buyeroption ? (
          <>
            <CustomMenu onSelect={onEdit} text={appConstant.edit}>
              <SvgIcon.popedit width={rw(4.5)} height={rh(3.2)} />
            </CustomMenu>

            <CustomMenu onSelect={onDelete} text={appConstant.dele}>
              <SvgIcon.popdel width={rw(4.5)} height={rh(3.2)} />
            </CustomMenu>

            <CustomMenu onSelect={onView} text={appConstant.view}>
              <SvgIcon.eye width={rw(4.5)} height={rh(3.2)} />
            </CustomMenu>

            {status ? (
              <CustomMenu onSelect={onChangestatus} text={appConstant.inactive}>
                <SvgIcon.inactive width={rw(4.5)} height={rh(3.2)} />
              </CustomMenu>
            ) : (
              <CustomMenu onSelect={onChangestatus} text={appConstant.active}>
                <SvgIcon.active width={rw(4.5)} height={rh(3.2)} />
              </CustomMenu>
            )}
          </>
        ) : (
          <>
            <CustomMenu onSelect={onEdit} text={appConstant.edit}>
              <SvgIcon.popedit width={rw(4.5)} height={rh(3.2)} />
            </CustomMenu>

            <CustomMenu onSelect={onDelete} text={appConstant.dele}>
              <SvgIcon.popdel width={rw(4.5)} height={rh(3.2)} />
            </CustomMenu>
          </>
        )}
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
    right: rw(1),
    top: rh(2),
  },

  menu: {
    width: rw(32),
    borderRadius: 20,
    padding: rw(1),
    backgroundColor: colors.white,
    elevation: 30,
    shadowColor: colors.labelgrey,
    shadowOffset: {width: 1, height: 4},
    shadowOpacity: 0.8,
  },

  menuOption: {
    flexDirection: 'row',
    borderRadius: 20,
    marginLeft: rw(1.6),
  },

  text: {
    fontSize: rf(2),
    color: colors.black,
    fontFamily: fonts.semibold,
    marginLeft: rw(4),
  },
});
