import React from 'react';
import {
  StatusBar,
  View,
  Modal,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import {colors} from '../../assets/colors';
import {
  responsiveWidth as rw,
  responsiveFontSize as rf,
} from 'react-native-responsive-dimensions';
import DatePicker, {getToday} from 'react-native-modern-datepicker';

export const Datepicker = ({
  visible,
  close,
  selecteddate,
  onclose,
  selected,
}) => {
  return (
    <>
      <StatusBar
        backgroundColor="transparent"
        translucent={true}
        barStyle="dark-content"
      />
      <Modal
        transparent
        animationType="fade"
        visible={visible}
        onRequestClose={close}>
        <TouchableWithoutFeedback onPress={onclose}>
          <View style={styles.conatiner}>
            <View style={styles.main}>
              <DatePicker
                onDateChange={selecteddate}
                options={{
                  backgroundColor: colors.white,
                  textHeaderColor: colors.primary,
                  textDefaultColor: colors.black,
                  selectedTextColor: '#fff',
                  mainColor: '#F4722B',
                  textSecondaryColor: colors.primary,
                  textFontSize: rf(2),
                }}
                selected={selected ? selected : getToday()}
                mode="calendar"
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
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
    backgroundColor: colors.white,
  },
});
