import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React, {useCallback, useState} from 'react';
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
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {Button} from '../../Components/Button';
import {Textinputs} from '../../Components/Textinputs';
import {Datepicker} from '../../Components/Datepicker';
import {Line} from '../../Components/Line';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {getallbuyers} from '../../Api/buyerservice';
import {useDispatch, useSelector} from 'react-redux';
import {handleMessage} from '../../helper/utils';
import {getallproducts} from '../../Api/productservice';
import {Buyermodal} from '../../Components/Buyermodal';
import {Statusmodal} from '../../Components/Statusmodal';

export const Addorder = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const userdetails = useSelector(state => state.login.login_data);
  const compid = userdetails?.result?.id;

  const [visible, setVisible] = useState(false);
  const [isbuyermodal, setBuyermodal] = useState(false);
  const [isproductmodal, setProductmodal] = useState(false);
  const [isstatusmodal, setStatusmodal] = useState(false);

  const [buyerlist, setBuyerlist] = useState([]);
  const [filterbuyerlist, setFilterbuyerlist] = useState([]);
  const [productlist, setProductlist] = useState([]);
  const [filterproductlist, setFilterproductlist] = useState([]);

  const [pagevalue, setPagevalue] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [buyercomp, setBuyercomp] = useState();
  const [productname, setProductname] = useState();
  const [productprice, setProductprice] = useState(0);

  const [notes, setNotes] = useState();
  const [selecteddate, setSelecteddate] = useState();
  const [deliveryadd, setDeliveryadd] = useState();
  const [billingadd, setBillingadd] = useState();
  const [status, setStatus] = useState();

  const [errbuyer, setErrbuyer] = useState(false);
  const [errproduct, setErrproduct] = useState(false);
  const [errquantity, setErrquantity] = useState(false);
  const [errnotes, setErrnotes] = useState(false);
  const [errapproxdate, setErrapproxdate] = useState(false);
  const [errdeliveryadd, setErrdeliveryadd] = useState(false);
  const [errbillingadd, setErrbillingadd] = useState(false);
  const [errstatus, setErrstatus] = useState(false);

  const handleError1 = async () => {
    let errorstatus = false;

    if (!buyercomp) {
      setErrbuyer(true);
      errorstatus = true;
    }

    if (!productname) {
      setErrproduct(true);
      errorstatus = true;
    }

    if (quantity === 0) {
      setErrquantity(true);
      errorstatus = true;
    }

    return errorstatus;
  };

  const handleError2 = async () => {
    let errorstatus = false;

    if (!notes || !notes.length > 2) {
      setErrnotes(true);
      errorstatus = true;
    }

    if (!selecteddate) {
      setErrapproxdate(true);
      errorstatus = true;
    }

    if (!deliveryadd) {
      setErrdeliveryadd(true);
      errorstatus = true;
    }

    if (!billingadd) {
      setErrbillingadd(true);
      errorstatus = true;
    }

    if (!status) {
      setErrstatus(true);
      errorstatus = true;
    }

    return errorstatus;
  };

  //GETALL BUYERS
  const handleCompany = useCallback(async () => {
    try {
      const response = await getallbuyers(dispatch);
      console.log(response, 'getall company');

      if (!response?.error) {
        setBuyerlist(response?.result?.data);
        setFilterbuyerlist(response?.result?.data);
      } else {
        handleMessage(appConstant.error, response?.message, appConstant.danger);
      }
    } catch (error) {
      console.error(error);
    }
  }, [dispatch]);

  useFocusEffect(
    useCallback(() => {
      handleCompany();
    }, [handleCompany]),
  );

  //GET ALL PRODUCTS
  const getAllProduct = useCallback(async () => {
    try {
      const response = await getallproducts(dispatch, compid);
      console.log(response, 'product response');

      if (!response?.error) {
        setProductlist(response?.result);
        setFilterproductlist(response?.result);
      } else {
        handleMessage(appConstant.error, response?.message, appConstant.danger);
      }
    } catch (error) {
      console.log(error);
    }
  }, [dispatch, compid]);

  useFocusEffect(
    useCallback(() => {
      getAllProduct();
    }, [getAllProduct]),
  );

  const handleBuyersearch = text => {
    if (!text) {
      setFilterbuyerlist(buyerlist);
    } else {
      const filtercate = buyerlist.filter(s => {
        return s?.createdByCompany?.companyName
          ?.toLowerCase()
          .includes(text.toLowerCase());
      });
      filtercate.sort();
      setFilterbuyerlist(filtercate);
    }
  };

  const handleProductsearch = text => {
    if (!text) {
      setFilterproductlist(productlist);
    } else {
      const filtercate = productlist.filter(s => {
        return s?.productName?.toLowerCase().includes(text.toLowerCase());
      });
      filtercate.sort();
      setFilterproductlist(filtercate);
    }
  };

  const handlebuyer = async text => {
    setBuyercomp(text?.createdByCompany?.companyName);
    setErrbuyer(false);
    setBuyermodal(false);
  };

  const handleProduct = async text => {
    setProductname(text?.productName);
    setProductprice(text?.price);
    setErrproduct(false);
    setProductmodal(false);
  };

  const handleStatus = async text => {
    console.log(text);
    setStatus(text);
    setErrstatus(false);
    setStatusmodal(false);
  };

  const handleNext = async () => {
    if (pagevalue === 0) {
      if (await handleError1()) {
        console.log('encounter error...');
      } else {
        console.log('go to next page...');
        setPagevalue(1);
      }
    } else if (pagevalue === 1) {
      if (await handleError2()) {
        console.log('encounter error...');
      } else {
        console.log('go to last page...');
        setPagevalue(2);
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Buyermodal
        visible={isbuyermodal}
        onPress={() => setBuyermodal(false)}
        data={filterbuyerlist}
        onselect={handlebuyer}
        nocategory={appConstant.nobuyerdata}
        onChangeText={handleBuyersearch}
      />

      <Buyermodal
        visible={isproductmodal}
        type={true}
        onPress={() => setProductmodal(false)}
        data={filterproductlist}
        onselect={handleProduct}
        heading={appConstant.selectproduct}
        nocategory={appConstant.noprodata}
        onChangeText={handleProductsearch}
      />

      <Statusmodal
        visible={isstatusmodal}
        heading={appConstant.selectstatus}
        onPress={() => setStatusmodal(false)}
        onselect={handleStatus}
      />

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
          <View style={styles.quantity}>
            <View style={styles.quantity1}>
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
            <TouchableOpacity
              style={styles.catetextin}
              onPress={() => setBuyermodal(true)}>
              <Text style={styles.cate}>
                {buyercomp ? buyercomp : appConstant.selectbuyer}
              </Text>
              <SvgIcon.down_arrow width={rw(9)} height={rh(4)} />
            </TouchableOpacity>
            {errbuyer ? (
              <Text style={styles.errname}>
                {buyercomp ? buyercomp : appConstant.selectbuyer}
              </Text>
            ) : null}

            <Text style={styles.btext}>{appConstant.productName}</Text>

            <View style={styles.promodal}>
              <TouchableOpacity
                style={styles.protextin}
                onPress={() => setProductmodal(true)}>
                <Text style={styles.cate}>
                  {productname ? productname : appConstant.selectproduct}
                </Text>
                <SvgIcon.down_arrow width={rw(9)} height={rh(4)} />
              </TouchableOpacity>

              <View style={styles.incdec}>
                <TouchableOpacity
                  onPress={() =>
                    setQuantity(prevQuantity =>
                      prevQuantity === 0 ? 0 : prevQuantity - 1,
                    )
                  }>
                  <SvgIcon.dec width={rh(2.5)} height={rh(2.8)} />
                </TouchableOpacity>

                <Text style={styles.ctext}>{quantity}</Text>

                <TouchableOpacity
                  onPress={() => {
                    setQuantity(prevQuantity => {
                      const updateqty = prevQuantity + 1;
                      console.log(updateqty, 'COUNT... ');
                      updateqty > 0
                        ? setErrquantity(false)
                        : setErrquantity(true);
                      return updateqty;
                    });
                  }}>
                  <SvgIcon.inc width={rh(2.4)} height={rh(2.4)} />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.promodal}>
              {errproduct ? (
                <Text style={styles.errpro}>{appConstant.selectproduct}</Text>
              ) : null}
              {errquantity ? (
                <Text style={styles.errqty}>{appConstant.selectqty}</Text>
              ) : null}
            </View>
          </View>

          <Button
            style={styles.touchsignin}
            text={appConstant.addpro}
            textstyle={styles.submit}
            onPress={() => navigation.navigate(appConstant.addproduct)}
          />

          <View style={styles.total}>
            <View style={styles.amount}>
              <Text style={styles.submit}>{appConstant.Totalamount}</Text>
              <Text style={styles.submit}>₹{productprice * quantity}.00</Text>
            </View>
          </View>
        </>
      )}

      {/* SCREEN 1 */}
      {pagevalue === 1 && (
        <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.quantity}>
            <View style={styles.quantity1}>
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

          <View style={styles.bcompany}>
            <Text style={styles.btext}>{appConstant.notes}</Text>
            <Textinputs
              placeholder={appConstant.enternotes}
              color={colors.labelgrey}
              style={styles.textin}
              value={notes}
              returnKeyType="next"
              onChangeText={text => {
                setNotes(text);
                !text
                  ? setErrnotes(false)
                  : text.length < 2
                  ? setErrnotes(true)
                  : setErrnotes(false);
              }}
              onBlur={() => {
                !notes
                  ? setErrnotes(false)
                  : !notes.length > 2
                  ? setErrnotes(true)
                  : setErrnotes(false);
              }}
            />
            {errnotes ? (
              <Text style={styles.errname}>{appConstant.errnote}</Text>
            ) : null}

            <Text style={styles.btext}>{appConstant.approxddate}</Text>
            <View style={styles.svgbox}>
              <View style={styles.passtextin}>
                <Text style={styles.date}>
                  {selecteddate ? selecteddate : appConstant.dateplace}
                </Text>
              </View>

              <TouchableOpacity
                style={styles.calender}
                onPress={() => setVisible(true)}>
                <SvgIcon.calender width={rw(6)} height={rh(6)} />
              </TouchableOpacity>
            </View>
            {errapproxdate ? (
              <Text style={styles.errname}>{appConstant.errapproxdate}</Text>
            ) : null}

            <Datepicker
              visible={visible}
              close={() => setVisible(false)}
              onclose={() => setVisible(false)}
              selecteddate={date => {
                setSelecteddate(date);
                setErrapproxdate(false);
                setVisible(false);
              }}
              selected={selecteddate}
            />

            {/* DELIVERY ADDRESS */}
            <Text style={styles.btext}>{appConstant.deliveryadd}</Text>
            <View style={styles.svgbox}>
              <TouchableOpacity style={styles.passtextin}>
                <Text style={styles.date}>{appConstant.deliveryadd}</Text>
              </TouchableOpacity>
              <View style={styles.arrow}>
                <SvgIcon.down_arrow width={rw(7)} height={rh(6)} />
              </View>

              <TouchableOpacity
                style={styles.plus}
                onPress={() => navigation.navigate(appConstant.createadd)}>
                <SvgIcon.whiteplus width={rw(7)} height={rh(6)} />
              </TouchableOpacity>
            </View>
            {errdeliveryadd ? (
              <Text style={styles.errname}>{appConstant.errdeliveryadd}</Text>
            ) : null}

            {/* BILLING ADDRESS */}
            <Text style={styles.btext}>{appConstant.billingadd}</Text>
            <View style={styles.svgbox}>
              <TouchableOpacity style={styles.passtextin}>
                <Text style={styles.date}>{appConstant.billingadd}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.arrow}>
                <SvgIcon.down_arrow width={rw(7)} height={rh(6)} />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.plus}
                onPress={() => navigation.navigate(appConstant.createadd)}>
                <SvgIcon.whiteplus width={rw(7)} height={rh(6)} />
              </TouchableOpacity>
            </View>
            {errbillingadd ? (
              <Text style={styles.errname}>{appConstant.errbillingadd}</Text>
            ) : null}

            {/* STATUS */}
            <Text style={styles.btext}>{appConstant.orderstatus}</Text>
            <TouchableOpacity
              style={styles.catetextin}
              onPress={() => setStatusmodal(true)}>
              <Text style={styles.cate}>
                {status ? status : appConstant.statuss}
              </Text>
              <SvgIcon.down_arrow width={rw(9)} height={rh(4)} />
            </TouchableOpacity>
          </View>
          {errstatus ? (
            <Text style={styles.errname}>{appConstant.errstatus}</Text>
          ) : null}
        </KeyboardAwareScrollView>
      )}

      {pagevalue === 2 && (
        <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.quantity}>
            <View style={styles.quantity1}>
              <View style={styles.one}>
                <Text style={styles.onetxt}>{appConstant.one}</Text>
              </View>

              <View style={styles.line2} />

              <View style={styles.one}>
                <Text style={styles.onetxt}>{appConstant.two}</Text>
              </View>

              <View style={styles.line2} />
              <SvgIcon.three width={rh(5.5)} height={rh(5.5)} />
            </View>
          </View>

          <Text style={styles.confirm}>{appConstant.orderconfirm}</Text>
          <Text style={styles.buyer}>
            {appConstant.buyercompname}
            <Text style={styles.confirmtxt}> jay padhara</Text>
          </Text>

          <Line />

          <View style={styles.product}>
            <Text style={styles.proname}>1.</Text>
            <Text style={styles.pro}>
              {appConstant.productName}
              <Text style={styles.confirmtxt}> item 10</Text>
            </Text>
          </View>

          <View style={styles.proprice}>
            <Text style={styles.pr}>{appConstant.price}</Text>
            <Text style={styles.qty}>₹8.00 x 2 {appConstant.qty}</Text>
            <Text style={styles.pr1}>=</Text>
            <Text style={styles.pr1}> ₹16.00</Text>
          </View>

          <Line />

          <View style={styles.product}>
            <Text style={styles.proname}>{appConstant.notes + ':'} </Text>
            <Text style={styles.notes}>{notes}</Text>
          </View>

          <Line />

          <Text style={styles.proname}>
            {appConstant.approxdate}
            <Text style={styles.confirmtxt}>27-01-2002</Text>
          </Text>

          <Line />

          <View style={styles.product}>
            <Text style={styles.proname}>{appConstant.deliveryadd + ':'} </Text>
            <Text style={styles.deliadd}>
              Lorem Ipsum is simply dummy text of the printing and.
            </Text>
          </View>

          <Line />

          <View style={styles.product}>
            <Text style={styles.proname}>{appConstant.billingadd + ':'} </Text>
            <Text style={styles.deliadd}>
              Lorem Ipsum is simply dummy text of the printing and.
            </Text>
          </View>

          <Line />

          <Text style={styles.proname}>
            {appConstant.shipping}
            <Text style={styles.confirmtxt}>0</Text>
          </Text>

          <Line />

          <Text style={styles.proname}>
            {appConstant.orderstatus + ': '}
            <Text style={styles.confirmtxt}>Pending</Text>
          </Text>

          <Line />

          <Text style={styles.totalam}>
            {appConstant.total}
            <Text style={styles.totaltxt}>₹16.00</Text>
          </Text>
        </KeyboardAwareScrollView>
      )}

      {/* BOTTOM BUTTONS */}
      <View
        style={[
          styles.canceldel,
          pagevalue === 0
            ? {marginTop: rh(4)}
            : {marginBottom: rh(2.3), marginTop: rh(4)},
        ]}>
        <View style={styles.cancelview}>
          <TouchableOpacity
            style={styles.cancel}
            onPress={
              pagevalue === 0
                ? () => navigation.goBack()
                : pagevalue === 1
                ? () => setPagevalue(0)
                : () => setPagevalue(1)
            }>
            <Text style={styles.canceltext}>
              {pagevalue === 0 ? appConstant.cancel : appConstant.back}
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.delete} onPress={handleNext}>
          <Text style={styles.deltext}>
            {pagevalue === 0 || pagevalue === 1
              ? appConstant.next
              : appConstant.addorder}
          </Text>
        </TouchableOpacity>
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
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.8,
  },

  quantity: {
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

  quantity1: {
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

  confirm: {
    margin: rh(2),
    textAlign: 'center',
    color: colors.black,
    fontFamily: fonts.bold,
    fontSize: rf(2.9),
  },

  confirmtxt: {
    marginLeft: rw(3),
    color: colors.labelgrey,
    fontFamily: fonts.medium,
    fontSize: rf(1.8),
  },

  totaltxt: {
    marginLeft: rw(3),
    color: colors.primary,
    fontFamily: fonts.medium,
    fontSize: rf(1.8),
  },

  notes: {
    width: rw(76),
    marginLeft: rw(0.2),
    color: colors.labelgrey,
    fontFamily: fonts.medium,
    fontSize: rf(1.8),
  },

  deliadd: {
    width: rw(56),
    marginLeft: rw(0.2),
    color: colors.labelgrey,
    fontFamily: fonts.medium,
    fontSize: rf(1.8),
  },

  errname: {
    textAlign: 'right',
    color: colors.red,
    fontSize: rf(1.6),
    marginRight: rw(5),
    fontFamily: fonts.medium,
  },

  errpro: {
    position: 'absolute',
    right: rw(33),
    color: colors.red,
    fontSize: rf(1.6),
    marginRight: rw(5),
    fontFamily: fonts.medium,
  },

  errqty: {
    position: 'absolute',
    right: rw(5.5),
    color: colors.red,
    fontSize: rf(1.6),
    fontFamily: fonts.medium,
  },

  buyer: {
    width: rw(90),
    color: colors.black,
    fontFamily: fonts.semibold,
    fontSize: rf(1.8),
    marginLeft: rw(4),
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
    alignItems: 'center',
    justifyContent: 'center',
    bottom: rh(1),
  },

  cancelview: {
    marginRight: rw(3),
  },

  cancel: {
    width: rw(37),
    alignItems: 'center',
    backgroundColor: colors.lightgrey,
    borderRadius: 13,
    padding: rw(3.5),
  },

  delete: {
    width: rw(37),
    alignItems: 'center',
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

  date: {
    padding: rh(0.3),
    fontSize: rf(2),
    fontFamily: fonts.medium,
  },

  calender: {
    position: 'absolute',
    right: rw(5),
  },

  promodal: {
    flexDirection: 'row',
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

  line: {
    alignItems: 'center',
  },

  product: {
    flexDirection: 'row',
  },

  proname: {
    color: colors.black,
    fontFamily: fonts.semibold,
    fontSize: rf(1.8),
    marginLeft: rw(4.6),
  },

  totalam: {
    color: colors.primary,
    fontFamily: fonts.semibold,
    fontSize: rf(1.8),
    marginLeft: rw(4.6),
  },

  pro: {
    marginLeft: rw(7),
    color: colors.black,
    fontSize: rf(1.8),
    fontFamily: fonts.semibold,
  },

  proprice: {
    flexDirection: 'row',
    marginLeft: rw(15),
    margin: rw(1),
  },

  pr: {
    color: colors.black,
    fontSize: rf(1.8),
    fontFamily: fonts.semibold,
  },

  pr1: {
    marginLeft: rw(8),
    color: colors.black,
    fontSize: rf(1.7),
    fontFamily: fonts.semibold,
  },

  qty: {
    marginLeft: rw(4),
    color: colors.black,
    fontSize: rf(1.7),
    fontFamily: fonts.semibold,
  },
});
