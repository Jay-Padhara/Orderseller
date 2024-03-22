import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Modal,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import React from 'react';
import {colors} from '../../assets/colors';
import {
  responsiveFontSize as rf,
  responsiveHeight as rh,
  responsiveWidth as rw,
} from 'react-native-responsive-dimensions';
import {SvgIcon} from '../../assets/SvgIcon';
import {appConstant} from '../../helper/appconstants';
import {fonts} from '../../assets/fonts';
import {Button} from '../Button';

export const Addcatemodal = ({
  ref1,
  ref2,
  visible,
  onclose,
  type,
  code,
  name,
  value1,
  value2,
  onAdd,
  onEdit,
  onSubmitEditing,
}) => {
  return (
    <>
      <StatusBar
        backgroundColor="transparent"
        translucent={true}
        barStyle="dark-content"
      />
      <Modal transparent animationType="fade" visible={visible}>
        <View style={styles.container}>
          <View style={styles.head}>
            <TouchableOpacity style={styles.close} onPress={onclose}>
              <SvgIcon.close width={rw(5)} height={rh(4)} />
            </TouchableOpacity>
            {type ? (
              <Text style={styles.text}>{appConstant.addcate}</Text>
            ) : (
              <Text style={styles.text}>{appConstant.editcate}</Text>
            )}

            <View style={styles.main}>
              <Text style={styles.codetext}>{appConstant.catecode}</Text>
              <TextInput
                ref={ref1}
                style={styles.textin}
                blurOnSubmit
                value={value1}
                returnKeyType="next"
                onChangeText={text => code(text)}
                onSubmitEditing={onSubmitEditing}
              />

              <Text style={styles.codetext}>{appConstant.catename}</Text>
              <TextInput
                ref={ref2}
                style={styles.textin}
                blurOnSubmit
                value={value2}
                returnKeyType="next"
                onChangeText={text => name(text)}
              />

              {type ? (
                <Button
                  style={styles.touchsignin}
                  text={appConstant.addcate}
                  textstyle={styles.signin}
                  onPress={onAdd}
                />
              ) : (
                <Button
                  style={styles.touchsignin}
                  text={appConstant.editcate}
                  textstyle={styles.signin}
                  onPress={onEdit}
                />
              )}
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },

  head: {
    alignItems: 'center',
    backgroundColor: colors.white,
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    height: rh(50),
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },

  main: {
    margin: rh(3),
    marginLeft: rw(2),
    marginRight: rw(2),
  },

  close: {
    position: 'absolute',
    top: rh(1),
    right: rw(5),
  },

  text: {
    textAlign: 'center',
    margin: rw(3),
    fontSize: rf(2.5),
    fontFamily: fonts.bold,
    color: colors.black,
  },

  textin: {
    width: rw(85),
    margin: rw(2.5),
    padding: rh(1.9),
    borderRadius: 13,
    fontSize: rf(1.9),
    color: colors.black,
    fontFamily: fonts.medium,
    borderColor: colors.labelgrey,
    backgroundColor: colors.lightgrey,
  },

  codetext: {
    fontSize: rf(2),
    fontFamily: fonts.medium,
    color: colors.labelgrey,
    marginLeft: rw(4),
  },

  touchsignin: {
    alignItems: 'center',
    marginTop: rh(6),
    backgroundColor: colors.primary,
    borderRadius: 10,
    padding: rw(4),
    marginLeft: rw(16),
    marginRight: rw(16),
  },

  signin: {
    color: colors.white,
    fontSize: rf(2.1),
    fontFamily: fonts.bold,
  },
});
