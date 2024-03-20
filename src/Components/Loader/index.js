import React from 'react';
import {
  View,
  StyleSheet,
  ActivityIndicator,
  Modal,
  StatusBar,
} from 'react-native';
import {colors} from '../../assets/colors';
import {responsiveWidth as rw} from 'react-native-responsive-dimensions';

export const Loader = ({visible}) => {
  return (
    <>
      <StatusBar backgroundColor="transparent" barStyle="dark-content" />
      <Modal visible={visible} transparent animationType="fade">
        <View style={styles.main}>
          <ActivityIndicator size={rw(10)} color={colors.primary} />
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.lightblack1,
  },
});
