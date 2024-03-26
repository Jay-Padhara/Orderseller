import {View, Text, TouchableOpacity, StyleSheet, FlatList} from 'react-native';
import React, {useState} from 'react';
import {colors} from '../../assets/colors';
import {fonts} from '../../assets/fonts';
import {
  responsiveFontSize as rf,
  responsiveHeight as rh,
  responsiveWidth as rw,
} from 'react-native-responsive-dimensions';
import {SvgIcon} from '../../assets/SvgIcon';
import {useNavigation} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {appConstant} from '../../helper/appconstants';

export const Profile = () => {
  const navigation = useNavigation();

  const [isopen, setOpen] = useState({});

  const data = [
    {title: appConstant.myprofile, icon: 'pavtar', key: 'myprofile'},
    {title: appConstant.compdetails, icon: 'pcomp', key: 'compdetail'},
    {title: appConstant.changepass, icon: 'plock', key: 'changepass'},
    {title: appConstant.addres, icon: 'paddress', key: 'address'},
  ];

  const iconMapping = {
    pavtar: SvgIcon.pavtar,
    plock: SvgIcon.plock,
    pcomp: SvgIcon.pcomp,
    paddress: SvgIcon.paddress,
  };

  const toggleSection = key => {
    setOpen(prevopen => ({
      ...prevopen,
      [key]: !prevopen[key],
    }));
  };

  console.log(isopen, '.......');

  const renderItem = ({item}) => {
    const Svgicon = iconMapping[item?.icon];

    return (
      <View style={styles.main}>
        <TouchableOpacity
          style={styles.areaview}
          onPress={() => toggleSection(item.key)}>
          <Svgicon width={rh(2.8)} height={rh(2.8)} />
          <Text style={styles.txt}>{item.title}</Text>
          <TouchableOpacity style={styles.arrow}>
            <SvgIcon.down_arrow width={rh(4)} height={rh(4)} />
          </TouchableOpacity>
        </TouchableOpacity>

        {isopen[item?.key] ||
          (item?.key === 'myprofile' && (
            <>
              <View style={styles.line}>
                <SvgIcon.line width={rw(83)} height={rh(2)} />
              </View>

              <View>
                <Text style={styles.txt}>{appConstant.name}</Text>
                <View style={styles.name}>
                  <Text style={styles.nametxt}>Vision infotech</Text>
                </View>
              </View>

              <View>
                <Text style={styles.txt}>{appConstant.email}</Text>
                <View style={styles.name}>
                  <Text style={styles.nametxt}>Visioninfo@gmail.com</Text>
                </View>
              </View>

              <View style={styles.phonedate}>
                <View>
                  <Text style={styles.txt}>{appConstant.phoneplace}</Text>
                  <View style={styles.phone}>
                    <Text style={styles.phonetxt}>
                      {appConstant.code} 145864658
                    </Text>
                  </View>
                </View>

                <View>
                  <Text style={styles.txt}>{appConstant.joindate}</Text>
                  <View style={styles.phone}>
                    <Text style={styles.phonetxt}>02-02-2002</Text>
                  </View>
                </View>
              </View>
            </>
          ))}

        {isopen[item?.key] ||
          (item?.key === 'compdetail' && (
            <>
              <View style={styles.line}>
                <SvgIcon.line width={rw(83)} height={rh(2)} />
              </View>
            </>
          ))}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.head}>
        <TouchableOpacity
          style={styles.back}
          onPress={() => navigation.goBack()}>
          <SvgIcon.arrowleft width={rh(3.5)} height={rh(3.5)} />
        </TouchableOpacity>

        <Text style={styles.text}>{appConstant.profile}</Text>
      </View>

      {/* <View style={styles.main}>
        <View style={styles.areaview}>
          <SvgIcon.pavtar width={rh(2.8)} height={rh(2.8)} />
          <Text style={styles.txt}>{appConstant.myprofile}</Text>
          <TouchableOpacity
            style={[
              styles.arrow,
              {
                transform: isMyProfileOpen
                  ? [{rotate: '180deg'}]
                  : [{rotate: '0deg'}],
              },
            ]}
            onPress={() => setMyProfileOpen(!isMyProfileOpen)}>
            <SvgIcon.down_arrow width={rh(4)} height={rh(4)} />
          </TouchableOpacity>
        </View>

        {isMyProfileOpen ? (
          <>
            <View style={styles.line}>
              <SvgIcon.line width={rw(83)} height={rh(2)} />
            </View>

            <View>
              <Text style={styles.txt}>{appConstant.name}</Text>
              <View style={styles.name}>
                <Text style={styles.nametxt}>Vision infotech</Text>
              </View>
            </View>

            <View>
              <Text style={styles.txt}>{appConstant.email}</Text>
              <View style={styles.name}>
                <Text style={styles.nametxt}>Visioninfo@gmail.com</Text>
              </View>
            </View>

            <View style={styles.phonedate}>
              <View>
                <Text style={styles.txt}>{appConstant.phoneplace}</Text>
                <View style={styles.phone}>
                  <Text style={styles.phonetxt}>
                    {appConstant.code} 145864658
                  </Text>
                </View>
              </View>

              <View>
                <Text style={styles.txt}>{appConstant.joindate}</Text>
                <View style={styles.phone}>
                  <Text style={styles.phonetxt}>02-02-2002</Text>
                </View>
              </View>
            </View>
          </>
        ) : null}
      </View>

      <View style={styles.main}>
        <View style={styles.areaview}>
          <SvgIcon.pcomp width={rh(2.8)} height={rh(2.8)} />
          <Text style={styles.txt}>{appConstant.compdetails}</Text>
          <TouchableOpacity style={styles.arrow}>
            <SvgIcon.down_arrow width={rh(4)} height={rh(4)} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.main}>
        <View style={styles.areaview}>
          <SvgIcon.plock width={rh(2.8)} height={rh(2.8)} />
          <Text style={styles.txt}>{appConstant.changepass}</Text>
          <TouchableOpacity style={styles.arrow}>
            <SvgIcon.down_arrow width={rh(4)} height={rh(4)} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.main}>
        <View style={styles.areaview}>
          <SvgIcon.paddress width={rh(2.8)} height={rh(2.8)} />
          <Text style={styles.txt}>{appConstant.addres}</Text>
          <TouchableOpacity style={styles.arrow}>
            <SvgIcon.down_arrow width={rh(4)} height={rh(4)} />
          </TouchableOpacity>
        </View>
      </View> */}

      <FlatList
        data={data}
        keyExtractor={item => item?.key}
        renderItem={renderItem}
      />
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

  main: {
    backgroundColor: colors.white,
    margin: rw(4),
    borderRadius: 10,
    elevation: 15,
    shadowColor: colors.labelgrey,
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.8,
  },

  areaview: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: rw(4.6),
  },

  arrow: {
    position: 'absolute',
    right: rw(4),
  },

  txt: {
    color: colors.black,
    fontFamily: fonts.semibold,
    fontSize: rf(2),
    marginLeft: rw(4),
  },

  line: {
    alignItems: 'center',
  },

  name: {
    backgroundColor: colors.grey,
    marginHorizontal: rw(4),
    color: colors.labelgrey,
    borderRadius: 10,
    margin: rh(1.1),
  },

  nametxt: {
    color: colors.labelgrey,
    fontSize: rf(1.9),
    padding: rw(3),
    fontFamily: fonts.semibold,
  },

  phonedate: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: rh(1),
  },

  phone: {
    width: rw(41),
    backgroundColor: colors.grey,
    borderRadius: 10,
    padding: rw(3),
    margin: rh(1),
  },

  phonetxt: {
    color: colors.labelgrey,
    fontSize: rf(1.9),
    fontFamily: fonts.semibold,
  },
});
