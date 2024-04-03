import React from 'react';
import {Text, StyleSheet, View, TouchableOpacity, Image} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {SvgIcon} from '../../assets/SvgIcon';
import {
  responsiveFontSize as rf,
  responsiveHeight as rh,
  responsiveWidth as rw,
} from 'react-native-responsive-dimensions';
import {fonts} from '../../assets/fonts';
import {colors} from '../../assets/colors';
import {appConstant} from '../../helper/appconstants';
import {useNavigation} from '@react-navigation/native';
import {Carousel} from 'react-native-auto-carousel';
import {Images} from '../../helper/utils';
import {useSelector} from 'react-redux';

export const Dashboard = () => {
  const navigation = useNavigation();
  const userdetails = useSelector(state => state.login.login_data);
  const compdetails = useSelector(state => state.createcomp.createcomp_data);

  const usercmp = userdetails?.result?.company?.companyName;
  const compname = compdetails?.result?.companyName;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.main}>
        <View>
          <Text style={styles.hello}>{appConstant.greet}</Text>
          <Text style={styles.name}>{usercmp ? usercmp : compname}</Text>
        </View>
        <TouchableOpacity style={styles.bell}>
          <SvgIcon.bell width={rw(7)} height={rh(7)} />
        </TouchableOpacity>
      </View>

      <View style={styles.slider}>
        <Carousel
          data={Images}
          autoPlay={true}
          autoPlayTime={2000}
          renderItem={(item, index) => (
            <View key={index} style={styles.sliding}>
              <Image source={{uri: item}} style={styles.slideimg} />
            </View>
          )}
        />
      </View>

      <View style={styles.contain}>
        <View style={styles.categpro}>
          <TouchableOpacity
            style={styles.category}
            onPress={() => navigation.navigate(appConstant.category)}>
            <SvgIcon.category width={rw(8)} height={rh(8)} />
            <Text style={styles.text}>{appConstant.category}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.category}
            onPress={() => navigation.navigate(appConstant.product)}>
            <SvgIcon.product width={rw(8)} height={rh(8)} />
            <Text style={styles.text}>{appConstant.product}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.buyordo}>
          <TouchableOpacity
            style={styles.category}
            onPress={() => navigation.navigate(appConstant.buyer)}>
            <SvgIcon.buyer width={rw(8)} height={rh(8)} />
            <Text style={styles.text}>{appConstant.buyer}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.category}
            onPress={() => navigation.navigate(appConstant.orders)}>
            <SvgIcon.orders width={rw(8)} height={rh(8)} />
            <Text style={styles.text}>{appConstant.orders}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.buyordo}>
          <TouchableOpacity
            style={styles.category}
            onPress={() => navigation.navigate(appConstant.profile)}>
            <SvgIcon.profile width={rw(8)} height={rh(8)} />
            <Text style={styles.text}>{appConstant.profile}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightblack,
  },

  main: {
    marginTop: rh(4),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: rw(5),
  },

  hello: {
    fontSize: rf(2.3),
    color: colors.labelgrey,
    fontFamily: fonts.medium,
  },

  name: {
    fontSize: rf(2.1),
    color: colors.black,
    fontFamily: fonts.bold,
  },

  bell: {
    width: rw(13),
    height: rh(7),
    padding: rw(2),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
    borderRadius: 20,
  },

  slider: {
    alignItems: 'center',
    justifyContent: 'center',
    height: rh(16),
    marginLeft: rw(2),
    marginRight: rw(2),
  },

  sliding: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: rw(4.1),
  },

  slideimg: {
    width: rw(90),
    height: rh(18),
    resizeMode: 'cover',
    borderRadius: 15,
  },

  contain: {
    flex: 1,
    backgroundColor: colors.white,
    borderTopRightRadius: 50,
    borderTopLeftRadius: 50,
    alignItems: 'center',
    marginTop: rh(2),
  },

  categpro: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: rw(10),
  },

  buyordo: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  category: {
    width: rw(43),
    height: rh(12),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
    borderRadius: 20,
    margin: rw(2),
    elevation: 15,
    shadowColor: colors.labelgrey,
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.8,
  },

  text: {
    color: colors.black,
    fontFamily: fonts.medium,
    fontSize: rf(1.8),
  },
});
