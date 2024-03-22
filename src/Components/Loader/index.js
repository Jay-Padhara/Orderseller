import React from 'react';
import {
  View,
  StyleSheet,
  ActivityIndicator,
  Modal,
  StatusBar,
} from 'react-native';
import {colors} from '../../assets/colors';

export const Loader = ({visible}) => {
  return (
    <>
      <StatusBar
        backgroundColor="transparent"
        translucent={true}
        barStyle="dark-content"
      />
      <Modal visible={visible} transparent animationType="fade">
        <View style={styles.main}>
          <ActivityIndicator size="large" color={colors.primary} />
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
