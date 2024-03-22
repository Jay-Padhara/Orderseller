import React from 'react';
import {
  View,
  StyleSheet,
  ActivityIndicator,
  Modal,
  Platform,
  StatusBar,
} from 'react-native';
import {colors} from '../../assets/colors';

export const Loader = ({visible}) => {
  const statusBarStyle =
    Platform.OS === 'ios' ? 'dark-content' : 'light-content';

  return (
    <>
      <StatusBar backgroundColor="transparent" barStyle={statusBarStyle} />
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
