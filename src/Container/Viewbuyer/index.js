import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {SvgIcon} from '../../assets/SvgIcon';
import {
  responsiveFontSize as rf,
  responsiveHeight as rh,
  responsiveWidth as rw,
} from 'react-native-responsive-dimensions';
import {colors} from '../../assets/colors';
import {fonts} from '../../assets/fonts';
import {appConstant} from '../../helper/appconstants';
import {useNavigation} from '@react-navigation/native';
import {Customview} from '../../Components/Button';
import {Images} from '../../helper/utils';

export const Viewbuyer = ({route}) => {
  const navigation = useNavigation();

  const [isopen, setOpen] = useState(false);

  const data = route?.params?.data?.createdByCompany;
  console.log(data, 'data');

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.head}>
          <TouchableOpacity
            style={styles.back}
            onPress={() => navigation.goBack()}>
            <SvgIcon.arrowleft width={rh(3.5)} height={rh(3.5)} />
          </TouchableOpacity>

          <Text style={styles.text}>{appConstant.viewBuyer}</Text>
        </View>

        <View style={styles.main}>
          <View style={styles.mainview}>
            <View style={styles.prodesc}>
              <Text style={styles.detailtext}>{appConstant.buyerdetail}</Text>
              <View style={styles.line}>
                <SvgIcon.line width={rw(83)} height={rh(2)} />
              </View>
            </View>

            <View style={styles.detailsimg}>
              <View>
                <Customview
                  style={styles.comp}
                  headstyle={styles.protext1}
                  head={appConstant.gstno}
                  text={data?.gstNo}
                  textstyle={styles.protext2}
                />
                <Customview
                  style={styles.comp}
                  headstyle={styles.protext1}
                  head={appConstant.shopname}
                  text={data?.companyName}
                  textstyle={styles.protext2}
                />

                <Customview
                  style={styles.comp}
                  headstyle={styles.protext1}
                  head={appConstant.Name}
                  text={data?.name}
                  textstyle={styles.protext2}
                />

                <Customview
                  style={styles.comp}
                  headstyle={styles.protext1}
                  head={appConstant.phonenumber}
                  text={data?.phone}
                  textstyle={styles.protext2}
                />

                <Customview
                  style={styles.comp}
                  headstyle={styles.protext1}
                  head={appConstant.address}
                  text={data?.addresses[0]?.addressName}
                  textstyle={styles.protext2}
                />
              </View>
              <Image source={{uri: Images[0]}} style={styles.img} />
            </View>

            <Customview
              style={styles.addline}
              headstyle={styles.protext1}
              head={appConstant.addline}
              text={data?.addresses[0]?.locality}
              textstyle={styles.protext2}
            />

            <View style={styles.address}>
              <Customview
                style={styles.comp}
                headstyle={styles.protext1}
                head={appConstant.locality}
                text={data?.addresses[0]?.locality}
                textstyle={styles.protext2}
              />

              <Customview
                style={styles.comp}
                headstyle={styles.protext1}
                head={appConstant.state}
                text={data?.addresses[0]?.state}
                textstyle={styles.protext2}
              />
            </View>

            <View style={styles.address}>
              <Customview
                style={styles.comp}
                headstyle={styles.protext1}
                head={appConstant.city}
                text={data?.addresses[0]?.city}
                textstyle={styles.protext2}
              />

              <Customview
                style={styles.comp}
                headstyle={styles.protext1}
                head={appConstant.pincode}
                text={data?.addresses[0]?.pincode}
                textstyle={styles.protext2}
              />
            </View>
          </View>
        </View>

        <View style={styles.main}>
          <View style={styles.orderview}>
            <View style={styles.orderhead}>
              <Text style={styles.detailtext}>{appConstant.orderdetail}</Text>
              <TouchableOpacity
                style={[
                  styles.arrow,
                  {
                    transform: isopen
                      ? [{rotate: '0deg'}]
                      : [{rotate: '180deg'}],
                  },
                ]}
                onPress={() => setOpen(!isopen)}>
                <SvgIcon.up_arrow width={rw(5)} height={rh(2)} />
              </TouchableOpacity>
            </View>

            {isopen ? (
              <>
                <View style={styles.line}>
                  <SvgIcon.line width={rw(83)} height={rh(2)} />
                </View>
                <View style={styles.address}>
                  <View>
                    <Customview
                      style={styles.order1}
                      headstyle={styles.ordertext}
                      head={appConstant.orderno}
                      text="#987"
                      textstyle={styles.protext3}
                    />

                    <Customview
                      style={styles.order1}
                      headstyle={styles.ordertext}
                      head={appConstant.orderdate}
                      text="08-02-2002"
                      textstyle={styles.protext3}
                    />

                    <Customview
                      style={styles.order1}
                      headstyle={styles.ordertext}
                      head={appConstant.items}
                      text="100"
                      textstyle={styles.protext3}
                    />
                  </View>

                  <View style={styles.order2}>
                    <Customview
                      headstyle={styles.ordertext}
                      head={appConstant.Compname}
                      text="#987"
                      textstyle={styles.protext3}
                    />

                    <Customview
                      headstyle={styles.ordertext}
                      head={appConstant.approxdate}
                      text="02-2-2002"
                      textstyle={styles.protext3}
                    />

                    <Customview
                      headstyle={styles.ordertext}
                      head={appConstant.Totalamount}
                      text="₹500"
                      textstyle={styles.protext3}
                    />
                  </View>

                  <View style={styles.order3}>
                    <TouchableOpacity style={styles.dot}>
                      <SvgIcon.dot width={rw(1.8)} height={rh(1.8)} />
                    </TouchableOpacity>

                    <Customview
                      headstyle={styles.ordertext}
                      head={appConstant.ddate}
                      text="-"
                      textstyle={styles.protext3}
                    />

                    <Text style={styles.ordertext}>{appConstant.status}</Text>
                    <View style={styles.partial}>
                      <Text style={styles.status}>{appConstant.partial}</Text>
                    </View>
                  </View>
                </View>
              </>
            ) : null}
          </View>
        </View>
      </ScrollView>
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

  detailtext: {
    color: colors.black,
    fontFamily: fonts.semibold,
    fontSize: rf(2),
  },

  main: {
    alignItems: 'center',
  },

  mainview: {
    backgroundColor: colors.white,
    width: rw(93),
    margin: rw(2.5),
    borderRadius: 15,
    elevation: 15,
    padding: rw(5),
    shadowColor: colors.labelgrey,
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.8,
  },

  prodesc: {
    margin: rw(1),
  },

  orderhead: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: rw(1),
  },

  line: {
    alignItems: 'center',
  },

  detailsimg: {
    flexDirection: 'row',
  },

  img: {
    position: 'absolute',
    right: 0,
    width: rw(45),
    height: rh(27),
    borderRadius: 15,
  },

  protext1: {
    color: colors.black,
    fontFamily: fonts.bold,
    fontSize: rf(1.6),
  },

  protext2: {
    color: colors.labelgrey,
    fontFamily: fonts.semibold,
    fontSize: rf(1.7),
  },

  protext3: {
    color: colors.labelgrey,
    fontFamily: fonts.semibold,
    fontSize: rf(1.7),
    marginBottom: rh(1.7),
  },

  comp: {
    width: rw(35),
    padding: rw(0.4),
    marginBottom: rh(1),
  },

  addline: {
    width: rw(80),
    margin: rw(0.5),
    marginBottom: rh(1),
  },

  orderview: {
    backgroundColor: colors.white,
    width: rw(93),
    margin: rw(2),
    borderRadius: 15,
    elevation: 15,
    padding: rw(4.5),
    shadowColor: colors.labelgrey,
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.8,
  },

  ordertext: {
    color: colors.black,
    fontFamily: fonts.bold,
    fontSize: rf(1.47),
  },

  address: {flexDirection: 'row'},

  dot: {
    marginBottom: rh(3.7),
    marginLeft: rw(13),
    padding: rw(1),
    right: 0,
    top: 0,
  },

  order1: {
    width: rw(27),
  },

  order2: {
    width: rw(32.5),
    marginLeft: rw(1.5),
  },

  order3: {
    width: rw(22.5),
    marginLeft: rw(3),
  },

  status: {
    fontSize: rf(1.2),
    color: colors.white,
    fontFamily: fonts.bold,
  },

  partial: {
    backgroundColor: colors.skyblue,
    borderRadius: 6,
    padding: rw(0.7),
  },

  arrow: {
    position: 'absolute',
    right: 10,
  },
});
