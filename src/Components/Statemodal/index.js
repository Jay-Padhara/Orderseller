import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  TextInput,
  StatusBar,
} from 'react-native';
import React from 'react';
import {SvgIcon} from '../../assets/SvgIcon';
import {appConstant} from '../../helper/appconstants';
import {fonts} from '../../assets/fonts';
import {
  responsiveFontSize as rf,
  responsiveHeight as rh,
  responsiveWidth as rw,
} from 'react-native-responsive-dimensions';
import {colors} from '../../assets/colors';

export const Statemodal = ({
  visible,
  data,
  onPress,
  onselect,
  onChangeText,
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
            <TouchableOpacity style={styles.close} onPress={onPress}>
              <SvgIcon.close width={rw(5)} height={rh(5)} />
            </TouchableOpacity>
            <Text style={styles.text}>{appConstant.selectstate}</Text>
            <TextInput
              placeholder={appConstant.searchhere}
              placeholderTextColor={colors.labelgrey}
              style={styles.textin}
              onChangeText={text => onChangeText(text)}
            />

            <FlatList
              showsVerticalScrollIndicator={false}
              data={data}
              keyExtractor={(item, index) => index}
              renderItem={({item}) => {
                return (
                  <>
                    <TouchableOpacity onPress={() => onselect(item)}>
                      <Text style={styles.statetext}>{item}</Text>
                    </TouchableOpacity>
                  </>
                );
              }}
            />
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
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },

  head: {
    alignItems: 'center',
    backgroundColor: colors.white,
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    height: rh(40),
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },

  close: {
    position: 'absolute',
    top: rh(1),
    right: rw(5),
  },

  text: {
    margin: rw(3),
    fontSize: rf(2.5),
    fontFamily: fonts.bold,
    color: colors.black,
  },

  statelist: {
    margin: rh(3),
  },

  statetext: {
    color: colors.black,
    fontFamily: fonts.medium,
    fontSize: rf(2),
    margin: rh(2),
  },

  textin: {
    padding: rw(3.4),
    width: rw(86),
    color: colors.black,
    fontSize: rf(2),
    fontFamily: fonts.medium,
    backgroundColor: colors.white,
    borderRadius: 20,
    elevation: 10,
    shadowColor: colors.labelgrey,
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.8,
  },

  list: {
    marginBottom: rh(1),
  },
});