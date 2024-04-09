import React from 'react';
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../../assets/colors';
import { fonts } from '../../assets/fonts';
import {
  responsiveFontSize as rf,
  responsiveHeight as rh,
  responsiveWidth as rw,
} from 'react-native-responsive-dimensions';
import { SvgIcon } from '../../assets/SvgIcon';
import { useNavigation } from '@react-navigation/native';
import { appConstant } from '../../helper/appconstants';
import { Customview } from '../../Components/Button';

export const Vieworder = ({ route }) => {
  const navigation = useNavigation();

  const data = route.params.data;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.head}>
        <TouchableOpacity
          style={styles.back}
          onPress={() => navigation.goBack()}>
          <SvgIcon.arrowleft width={rh(3.5)} height={rh(3.5)} />
        </TouchableOpacity>
        <Text style={styles.text}>
          {`${data?.orderId} (${data?.createdBy?.name})`}
        </Text>
      </View>

      <View style={styles.main}>
        <View style={styles.mainview}>
          <View style={styles.prodesc}>
            <Customview
              style={styles.comp}
              headstyle={styles.htext}
              head={appConstant.buyercompname}
              text={data?.createdByCompany?.companyName}
              textstyle={styles.btext}
            />

            <Customview
              style={styles.comp}
              headstyle={styles.htext}
              head={appConstant.phonenumber}
              text={'+91 ' + data?.createdByCompany?.phone}
              textstyle={styles.btext}
            />
          </View>
          <View style={styles.prodesc}>
            <Customview
              style={styles.comp}
              headstyle={styles.htext}
              head={appConstant.email + ': '}
              text={data?.createdByCompany?.createdBy?.email}
              textstyle={styles.btext}
            />
          </View>
        </View>
      </View>

      <View style={styles.main}>
        <View style={styles.mainview}>
          <View style={styles.prodesc}>
            <Customview
              style={styles.comp}
              headstyle={styles.htext}
              head={appConstant.approxdate}
              text={data?.approxDeliveryDate}
              textstyle={styles.btext}
            />

            <Customview
              style={styles.comp}
              headstyle={styles.htext}
              head={appConstant.status}
              text={data?.status}
              textstyle={styles.btext}
            />
          </View>

          <Customview
            style={styles.prodesc1}
            headstyle={styles.htext}
            head={appConstant.Notes}
            text={data?.notes ? data.notes : '--'}
            textstyle={styles.addresstext}
          />

          <Customview
            style={styles.prodesc1}
            headstyle={styles.htext}
            head={appConstant.deliveryadd}
            text={
              data?.billingAddress?.addressName +
              ', ' +
              data?.billingAddress?.addressLine +
              ', ' +
              data?.billingAddress?.locality +
              ', ' +
              data?.billingAddress?.city +
              ', ' +
              data?.billingAddress?.state +
              '- ' +
              data?.billingAddress?.pincode
            }
            textstyle={styles.addresstext}
          />

          <Customview
            style={styles.prodesc1}
            headstyle={styles.htext}
            head={appConstant.billingadd}
            text={
              data?.deliveryAddress?.addressName +
              ', ' +
              data?.deliveryAddress?.addressLine +
              ', ' +
              data?.deliveryAddress?.locality +
              ', ' +
              data?.deliveryAddress?.city +
              ', ' +
              data?.deliveryAddress?.state +
              '- ' +
              data?.deliveryAddress?.pincode
            }
            textstyle={styles.addresstext}
          />
        </View>
      </View>

      <View style={styles.main}>
        <View style={styles.mainview}>
          <View style={styles.prodesc}>
            <Customview
              style={styles.comp}
              headstyle={styles.htext}
              head={appConstant.productName}
              text={data?.createdByCompany?.companyName}
              textstyle={styles.btext}
            />

            <Customview
              style={styles.comp}
              headstyle={styles.htext}
              head={appConstant.price}
              text={'₹' + data?.orderDetails[0]?.price + '.00'}
              textstyle={styles.btext}
            />
          </View>

          <View style={styles.prodesc}>
            <Customview
              style={styles.comp}
              headstyle={styles.htext}
              head={appConstant.quantity}
              text={data?.totalQuantity}
              textstyle={styles.btext}
            />

            <Customview
              style={styles.comp}
              headstyle={styles.htext}
              head={appConstant.totalprice}
              text={'₹' + data?.totalAmount + '.00'}
              textstyle={styles.btext}
            />
          </View>
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

  text: {
    color: colors.black,
    fontFamily: fonts.bold,
    fontSize: rf(2.3),
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
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.8,
  },

  comp: {
    width: rw(35),
    marginRight: rw(10),
  },

  htext: {
    fontSize: rf(1.4),
    color: colors.black,
    marginTop: rw(1.5),
    marginBottom: rw(1),
    fontFamily: fonts.semibold,
  },

  btext: {
    width: rw(40),
    fontSize: rf(1.65),
    color: colors.labelgrey,
    fontFamily: fonts.semibold,
  },

  addresstext: {
    width: rw(82),
    fontSize: rf(1.7),
    color: colors.labelgrey,
    fontFamily: fonts.semibold,
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
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.8,
  },

  prodesc: {
    flexDirection: 'row',
    margin: rw(1),
    alignItems: 'center',
  },

  prodesc1: {
    margin: rw(1),
  },
});
