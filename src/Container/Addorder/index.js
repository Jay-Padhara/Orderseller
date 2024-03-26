import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {colors} from '../../assets/colors';
import {fonts} from '../../assets/fonts';
import {
  responsiveFontSize as rf,
  responsiveHeight as rh,
  responsiveWidth as rw,
} from 'react-native-responsive-dimensions';
import {SvgIcon} from '../../assets/SvgIcon';
import {appConstant} from '../../helper/appconstants';
import {useNavigation} from '@react-navigation/native';
import {Button} from '../../Components/Button';
import {Textinputs} from '../../Components/Textinputs';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Datepicker} from '../../Components/Datepicker';

export const Addorder = () => {
  const navigation = useNavigation();

  const [count, setCount] = useState(0);
  const [pagevalue, setPagevalue] = useState(0);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.head}>
        {pagevalue === 0 ? (
          <TouchableOpacity
            style={styles.back}
            onPress={() => navigation.goBack()}>
            <SvgIcon.arrowleft width={rh(3.5)} height={rh(3.5)} />
          </TouchableOpacity>
        ) : null}

        <Text style={styles.text}>{appConstant.addorder}</Text>
      </View>

      {/* SCREEN 0*/}
      {pagevalue === 0 && (
        <>
          <View style={styles.count}>
            <View style={styles.count1}>
              <SvgIcon.one width={rh(5.5)} height={rh(5.5)} />
              <View style={styles.line1} />
              <View style={styles.two}>
                <Text style={styles.txt}>{appConstant.two}</Text>
              </View>
              <View style={styles.line1} />
              <View style={styles.two}>
                <Text style={styles.txt}>{appConstant.three}</Text>
              </View>
            </View>
          </View>

          <View style={styles.bcompany}>
            <Text style={styles.btext}>{appConstant.bcompany}</Text>
            <TouchableOpacity style={styles.catetextin}>
              <Text style={styles.cate}>{appConstant.product}</Text>
              <SvgIcon.down_arrow width={rw(9)} height={rh(4)} />
            </TouchableOpacity>

            <Text style={styles.btext}>{appConstant.productName}</Text>

            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity style={styles.protextin}>
                <Text style={styles.cate}>{appConstant.product}</Text>
                <SvgIcon.down_arrow width={rw(9)} height={rh(4)} />
              </TouchableOpacity>

              <View style={styles.incdec}>
                <TouchableOpacity
                  onPress={() => setCount(count === 0 ? 0 : count - 1)}>
                  <SvgIcon.dec width={rh(2.6)} height={rh(2.8)} />
                </TouchableOpacity>

                <Text style={styles.ctext}>{count}</Text>

                <TouchableOpacity onPress={() => setCount(count + 1)}>
                  <SvgIcon.inc width={rh(2.4)} height={rh(2.5)} />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <Button
            style={styles.touchsignin}
            text={appConstant.addpro}
            textstyle={styles.submit}
          />

          <View style={styles.total}>
            <View style={styles.amount}>
              <Text style={styles.submit}>{appConstant.Totalamount}</Text>
              <Text style={styles.submit}>₹16.00</Text>
            </View>
          </View>

          <View style={styles.canceldel}>
            <View style={styles.cancelview}>
              <TouchableOpacity
                style={styles.cancel}
                onPress={() => navigation.goBack()}>
                <Text style={styles.canceltext}>{appConstant.cancel}</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={styles.delete}
              onPress={() => setPagevalue(1)}>
              <Text style={styles.deltext}>{appConstant.next}</Text>
            </TouchableOpacity>
          </View>
        </>
      )}

      {/* SCREEN 1 */}
      {pagevalue === 1 && (
        <>
          <View style={styles.count}>
            <View style={styles.count1}>
              <View style={styles.one}>
                <Text style={styles.onetxt}>{appConstant.one}</Text>
              </View>

              <View style={styles.line2} />

              <SvgIcon.two width={rh(5.5)} height={rh(5.5)} />

              <View style={styles.line1} />
              <View style={styles.two}>
                <Text style={styles.txt}>{appConstant.three}</Text>
              </View>
            </View>
          </View>

          <KeyboardAwareScrollView
            bounces
            alwaysBounceVertical={false}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.mainview}>
            <View style={styles.bcompany}>
              <Text style={styles.btext}>{appConstant.notes}</Text>
              <Textinputs
                placeholder={appConstant.enternotes}
                color={colors.labelgrey}
                style={styles.textin}
                returnKeyType="next"
              />

              <Text style={styles.btext}>{appConstant.approxddate}</Text>
              <View style={styles.svgbox}>
                <Textinputs
                  placeholder={appConstant.dateplace}
                  placeholderTextColor="black"
                  style={styles.passtextin}
                  returnKeyType="done"
                />
                <TouchableOpacity style={styles.calender}>
                  <SvgIcon.calender width={rw(6)} height={rh(6)} />
                </TouchableOpacity>
              </View>

              <Text style={styles.btext}>{appConstant.deliveryadd}</Text>
              <View style={styles.svgbox}>
                <Textinputs
                  placeholder={appConstant.deliveryadd}
                  placeholderTextColor="black"
                  style={styles.passtextin}
                  returnKeyType="done"
                />
                <TouchableOpacity style={styles.arrow}>
                  <SvgIcon.down_arrow width={rw(6)} height={rh(6)} />
                </TouchableOpacity>

                <TouchableOpacity style={styles.plus}>
                  <SvgIcon.whiteplus width={rw(7)} height={rh(6)} />
                </TouchableOpacity>
              </View>

              <Text style={styles.btext}>{appConstant.billingadd}</Text>
              <View style={styles.svgbox}>
                <Textinputs
                  placeholder={appConstant.billingadd}
                  placeholderTextColor="black"
                  style={styles.passtextin}
                  returnKeyType="done"
                />
                <TouchableOpacity style={styles.arrow}>
                  <SvgIcon.down_arrow width={rw(6)} height={rh(6)} />
                </TouchableOpacity>

                <TouchableOpacity style={styles.plus}>
                  <SvgIcon.whiteplus width={rw(7)} height={rh(6)} />
                </TouchableOpacity>
              </View>

              <Datepicker />

              <Text style={styles.btext}>{appConstant.orderstatus}</Text>
              <TouchableOpacity style={styles.catetextin}>
                <Text style={styles.cate}>{appConstant.statuss}</Text>
                <SvgIcon.down_arrow width={rw(9)} height={rh(4)} />
              </TouchableOpacity>
            </View>
          </KeyboardAwareScrollView>

          <View style={styles.canceldel}>
            <View style={styles.cancelview}>
              <TouchableOpacity
                style={styles.cancel}
                onPress={() => setPagevalue(0)}>
                <Text style={styles.canceltext}>{appConstant.back}</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={styles.delete}
              onPress={() => setPagevalue(2)}>
              <Text style={styles.deltext}>{appConstant.next}</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
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
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.8,
  },

  count: {
    alignItems: 'center',
    marginTop: rh(2),
  },

  line1: {
    alignItems: 'center',
    backgroundColor: colors.labelgrey,
    height: rh(0.1),
    width: rh(10),
  },

  line2: {
    alignItems: 'center',
    backgroundColor: colors.primary,
    height: rh(0.1),
    width: rh(10),
  },

  count1: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  one: {
    backgroundColor: colors.primary,
    paddingHorizontal: rw(4.3),
    paddingVertical: rh(1.5),
    borderRadius: 13,
  },

  onetxt: {
    color: colors.white,
    fontFamily: fonts.medium,
    fontSize: rf(2),
  },

  two: {
    backgroundColor: colors.grey,
    paddingHorizontal: rw(4.3),
    paddingVertical: rh(1.5),
    borderRadius: 13,
  },

  txt: {
    color: colors.labelgrey,
    fontFamily: fonts.medium,
    fontSize: rf(2),
  },

  bcompany: {
    marginTop: rw(7),
  },

  catetextin: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.grey,
    borderRadius: 13,
    padding: rh(1.6),
    marginHorizontal: rw(4),
  },

  protextin: {
    width: rw(60),
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    backgroundColor: colors.grey,
    borderRadius: 13,
    padding: rh(1.6),
    marginHorizontal: rw(4),
  },

  cate: {
    fontSize: rf(2.1),
    color: colors.labelgrey,
    fontFamily: fonts.medium,
  },

  btext: {
    marginLeft: rw(5),
    margin: rw(3),
    fontSize: rf(2),
    color: colors.black,
    fontFamily: fonts.medium,
  },

  ctext: {
    marginHorizontal: rw(3),
    fontSize: rf(2.9),
    color: colors.black,
    fontFamily: fonts.medium,
  },

  incdec: {
    justifyContent: 'center',
    width: rw(28),
    borderRadius: 15,
    alignItems: 'center',
    flexDirection: 'row',
    borderColor: colors.primary,
    borderWidth: 2,
  },

  touchsignin: {
    alignItems: 'center',
    width: rw(45),
    marginTop: rh(3),
    backgroundColor: colors.primary,
    borderRadius: 10,
    padding: rw(3.1),
    marginLeft: rw(5),
  },

  submit: {
    color: colors.white,
    fontSize: rf(2),
    fontFamily: fonts.bold,
  },

  total: {
    marginTop: rh(26),
    backgroundColor: colors.primary,
    padding: rh(1.6),
  },

  amount: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  canceldel: {
    flexDirection: 'row',
    position: 'absolute',
    left: rw(10),
    right: rw(10),
    bottom: rh(3),
  },

  cancelview: {
    marginRight: rw(3),
  },

  cancel: {
    width: rw(37),
    alignItems: 'center',
    marginTop: rh(3),
    backgroundColor: colors.lightgrey,
    borderRadius: 13,
    padding: rw(3.5),
  },

  delete: {
    width: rw(37),
    alignItems: 'center',
    marginTop: rh(3),
    backgroundColor: colors.primary,
    borderRadius: 13,
    padding: rw(3.5),
  },

  canceltext: {
    color: colors.black,
    fontSize: rf(2.1),
    fontFamily: fonts.semibold,
  },

  deltext: {
    color: colors.white,
    fontSize: rf(2),
    fontFamily: fonts.medium,
  },

  del: {
    width: rw(16.5),
    height: rh(9),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.extralightred,
    borderRadius: 15,
  },

  textin: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: rw(4),
    backgroundColor: colors.grey,
    borderRadius: 13,
    padding: rh(1.8),
    fontSize: rf(2),
    fontFamily: fonts.medium,
  },

  svgbox: {
    marginHorizontal: rw(4),
    flexDirection: 'row',
    backgroundColor: colors.grey,
    alignItems: 'center',
    borderRadius: 20,
  },

  passtextin: {
    width: rw(67),
    padding: rh(1.8),
    fontSize: rf(2),
    fontFamily: fonts.medium,
  },

  calender: {
    position: 'absolute',
    right: rw(5),
  },

  arrow: {
    position: 'absolute',
    right: rw(15),
  },

  plus: {
    paddingHorizontal: rw(3),
    paddingVertical: rh(0.3),
    position: 'absolute',
    right: rw(1),
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    backgroundColor: colors.primary,
  },
});
