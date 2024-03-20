import React from 'react';
import {Text, View, Modal, StyleSheet} from 'react-native';
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
import {colors} from '../../assets/colors';

export const Popupmenu = ({visible}) => {
  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={styles.container}>
        <View style={styles.head}>
          <Menu>
            <MenuTrigger text="Select action" />
            <MenuOptions>
              <MenuOption onSelect={() => alert(`Save`)} text="Save" />
              <MenuOption onSelect={() => alert(`Delete`)}>
                <Text style={{color: 'red'}}>Delete</Text>
              </MenuOption>
              <MenuOption
                onSelect={() => alert(`Not called`)}
                disabled={true}
                text="Disabled"
              />
            </MenuOptions>
          </Menu>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  head: {
    width: rw(30),
    height: rw(20),
    alignItems: 'center',
    backgroundColor: colors.grey,
    borderRadius: 15,
    elevation: 10,
    shadowColor: colors.labelgrey,
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.8,
  },
});
