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
  orderstatus,
  order,
  status1,
  onpending,
  onPartial,
  onDeliver,
  onCancel,
}) => {
  return (
    <Menu
      opened={opened}
      onBackdropPress={() => setPopup(false)}
      style={
        buyeroption
          ? styles.popup1
          : orderstatus
          ? styles.popup3
          : styles.popup2
      }>
      <MenuTrigger />
      <MenuOptions
        optionsContainerStyle={orderstatus ? styles.menu1 : styles.menu}>
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
        ) : order ? (
          <>
            <CustomMenu onSelect={onEdit} text={appConstant.edit}>
              <SvgIcon.popedit width={rw(4.5)} height={rh(3.2)} />
            </CustomMenu>

            <CustomMenu onSelect={onView} text={appConstant.view}>
              <SvgIcon.eye width={rw(4.5)} height={rh(3.2)} />
            </CustomMenu>
          </>
        ) : orderstatus ? (
          <>
            <StatusMenu
              onSelect={onpending}
              text={appConstant.pending}
              orderstatus={true}>
              {status1 === 'pending' ? (
                <SvgIcon.down_arrow width={rw(5.5)} height={rh(3)} />
              ) : null}
            </StatusMenu>

            <StatusMenu
              onSelect={onPartial}
              text={appConstant.partialdelivered}
              orderstatus={true}>
              {status1 === 'partialDelivered' ? (
                <SvgIcon.down_arrow width={rw(5.5)} height={rh(3)} />
              ) : null}
            </StatusMenu>

            <StatusMenu
              onSelect={onDeliver}
              text={appConstant.delivered}
              orderstatus={true}>
              {status1 === 'delivered' ? (
                <SvgIcon.down_arrow width={rw(5.5)} height={rh(3)} />
              ) : null}
            </StatusMenu>

            <StatusMenu
              onSelect={onCancel}
              text={appConstant.Cancel}
              orderstatus={true}>
              {status1 === 'cancelled' ? (
                <SvgIcon.down_arrow width={rw(5.5)} height={rh(3)} />
              ) : null}
            </StatusMenu>
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

const StatusMenu = ({onSelect, children, text, orderstatus}) => (
  <MenuOption onSelect={onSelect}>
    <View style={styles.menuOption}>
      <Text style={orderstatus ? styles.text1 : styles.text}>{text}</Text>
      <View style={styles.icon}>{children}</View>
    </View>
  </MenuOption>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  popup1: {
    position: 'absolute',
    right: rw(1),
    top: rh(3.5),
  },

  popup2: {
    position: 'absolute',
    right: rw(6),
    top: rh(5),
  },

  popup3: {
    position: 'absolute',
    right: rw(2),
    top: rh(3),
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

  menu1: {
    borderRadius: 9,
    padding: rw(0.5),
    backgroundColor: colors.white,
    elevation: 30,
    shadowColor: colors.labelgrey,
    shadowOffset: {width: 1, height: 4},
    shadowOpacity: 0.8,
  },

  menuOption: {
    flexDirection: 'row',
    borderRadius: 20,
    marginLeft: rw(1),
  },

  text: {
    fontSize: rf(1.9),
    color: colors.black,
    fontFamily: fonts.semibold,
    marginLeft: rw(4),
  },

  text1: {
    fontSize: rf(1.8),
    color: colors.black,
    fontFamily: fonts.semibold,
    marginLeft: rw(2),
  },

  icon: {
    position: 'absolute',
    right: 0,
  },
});
