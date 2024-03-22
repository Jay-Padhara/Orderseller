import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  responsiveFontSize as rf,
  responsiveHeight as rh,
  responsiveWidth as rw,
} from 'react-native-responsive-dimensions';
import {colors} from '../../assets/colors';
import {appConstant} from '../../helper/appconstants';
import {SvgIcon} from '../../assets/SvgIcon';
import {useNavigation} from '@react-navigation/native';
import {fonts} from '../../assets/fonts';
import {Customview} from '../../Components/Button';

export const Buyerrequest = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.head}>
        <TouchableOpacity
          style={styles.back}
          onPress={() => navigation.goBack()}>
          <SvgIcon.arrowleft width={rh(3.5)} height={rh(3.5)} />
        </TouchableOpacity>

        <Text style={styles.text}>{appConstant.buyer}</Text>
      </View>

      <View style={styles.textin}>
        <View style={styles.search}>
          <SvgIcon.search width={rw(6.2)} height={rh(6.2)} />
        </View>
        <TextInput
          style={styles.svgbox}
          placeholderTextColor={colors.labelgrey}
          placeholder={appConstant.searchhere}
        />
      </View>

      <View style={styles.main}>
        <View style={styles.mainview}>
          <View style={styles.prodesc}>
            <Customview
              style={styles.comp}
              headstyle={styles.htext}
              head={appConstant.cname}
              text="Jay"
              textstyle={styles.btext}
            />

            <Customview
              style={styles.comp}
              headstyle={styles.htext}
              head={appConstant.buyername}
              text="Jay"
              textstyle={styles.btext}
            />
          </View>

          <Customview
            style={styles.comp}
            headstyle={styles.htext}
            head={appConstant.buyername}
            text="Jay"
            textstyle={styles.btext}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },

  head: {
    marginTop: rh(3),
    margin: rw(4),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  back: {
    position: 'absolute',
    left: 0,
    width: rw(12),
    height: rh(6),
    padding: rw(2),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
    borderRadius: 20,
    elevation: 15,
    shadowColor: colors.labelgrey,
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.8,
  },

  text: {
    color: colors.black,
    fontFamily: fonts.bold,
    fontSize: rf(2.3),
  },

  textin: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    margin: rw(1.5),
    marginLeft: rw(4),
    marginRight: rw(4),
    borderRadius: 15,
    elevation: 10,
    shadowColor: colors.labelgrey,
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.8,
  },

  svgbox: {
    width: rw(75),
    color: colors.black,
    fontSize: rf(1.9),
    fontFamily: fonts.medium,
    marginLeft: rw(3),
  },

  search: {
    marginLeft: rw(4),
  },

  main: {
    alignItems: 'center',
  },

  mainview: {
    backgroundColor: colors.white,
    width: rw(93),
    margin: rw(1.5),
    borderRadius: 15,
    elevation: 15,
    padding: rw(5),
    shadowColor: colors.labelgrey,
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.8,
  },

  prodesc: {
    flexDirection: 'row',
    margin: rw(1),
    alignItems: 'center',
  },

  comp: {
    width: rw(35),
    marginRight: rw(1),
  },

  htext: {
    fontSize: rf(1.5),
    color: colors.labelgrey,
    fontFamily: fonts.semibold,
  },

  btext: {
    fontSize: rf(1.6),
    color: colors.black,
    fontFamily: fonts.bold,
  },
});
