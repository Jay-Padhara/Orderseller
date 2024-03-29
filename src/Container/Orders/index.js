import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  FlatList,
} from 'react-native';
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
import {Customview} from '../../Components/Button';
import {Loader} from '../../Components/Loader';
import {useDispatch} from 'react-redux';
import {handleMessage} from '../../helper/utils';
import {getallorders, updateorderstatus} from '../../Api/orderservice';
import {Popupmenu} from '../../Components/Popupmenu';

export const Orders = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [isloading, setLoading] = useState(false);
  const [orderdata, setOrderdata] = useState([]);
  const [filterorderdata, setFilterorderdata] = useState([]);

  const [selectedorder, setSelectedorder] = useState();
  const [selectedorderstatus, setSelectedorderstatus] = useState();

  const handleCompany = useCallback(async () => {
    try {
      setLoading(true);

      const response = await getallorders(dispatch);
      console.log(response, 'getall orders');

      if (!response?.error) {
        setOrderdata(response?.result?.data);
        setFilterorderdata(response?.result?.data);
      } else {
        handleMessage(appConstant.error, response?.message, appConstant.danger);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [dispatch]);

  useFocusEffect(
    useCallback(() => {
      handleCompany();
    }, [handleCompany]),
  );

  const handleSearch = async text => {
    console.log(text);
    if (!text) {
      setFilterorderdata(orderdata);
    } else {
      const filterlist = orderdata.filter(O => {
        return O?.createdByCompany?.companyName
          .toUpperCase()
          .includes(text?.toUpperCase());
      });
      filterlist.sort();
      setFilterorderdata(filterlist);
    }
  };

  const handleChangestatus = async (id, orderstatus) => {
    try {
      setLoading(true);
      setSelectedorderstatus('');

      const data = {
        status: orderstatus,
      };

      const response = await updateorderstatus(dispatch, id, data);
      console.log(response, 'status response');

      if (!response?.error) {
        handleMessage(
          appConstant.Success,
          response?.message,
          appConstant.success,
        );
        handleCompany();
      } else {
        handleMessage(appConstant.error, response?.message, appConstant.danger);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Loader visible={isloading} />

      <View style={styles.head}>
        <TouchableOpacity
          style={styles.back}
          onPress={() => navigation.goBack()}>
          <SvgIcon.arrowleft width={rh(3.5)} height={rh(3.5)} />
        </TouchableOpacity>
        <Text style={styles.text}>{appConstant.order}</Text>
        <TouchableOpacity
          style={styles.add}
          onPress={() => navigation.navigate(appConstant.addOrder)}>
          <SvgIcon.add width={rh(3.6)} height={rh(3.6)} />
        </TouchableOpacity>
      </View>

      <View style={styles.textin}>
        <View style={styles.search}>
          <SvgIcon.search width={rw(6.2)} height={rh(6.2)} />
        </View>
        <TextInput
          style={styles.svgbox}
          placeholder={appConstant.searchhere}
          placeholderTextColor={colors.labelgrey}
          onChangeText={text => handleSearch(text)}
        />
        <TouchableOpacity style={styles.filter}>
          <SvgIcon.filter width={rw(7)} height={rh(7)} />
        </TouchableOpacity>
      </View>

      <FlatList
        data={filterorderdata}
        keyExtractor={(item, index) => index}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.nocat}>
            <Text style={styles.nocatdata}>{appConstant.noorderdata}</Text>
          </View>
        }
        renderItem={({item}) => {
          return (
            <View style={styles.main}>
              <View style={styles.areaview1}>
                <Customview
                  style={styles.orderno}
                  head={appConstant.orderno}
                  text={item?.orderId}
                  headstyle={styles.htext}
                  textstyle={styles.ttext}
                />

                <Customview
                  style={styles.comp}
                  head={appConstant.Compname}
                  text={item?.createdByCompany?.companyName}
                  headstyle={styles.htext}
                  textstyle={styles.ttext}
                />

                <TouchableOpacity
                  style={styles.dot}
                  onPress={() => {
                    console.log(item?.orderDetails[0]?.id);
                    setSelectedorder(item?.id);
                  }}>
                  <SvgIcon.dot width={rw(3)} height={rh(2)} />
                </TouchableOpacity>
              </View>

              {/* POPUP-MENU */}
              <Popupmenu
                opened={selectedorder !== null && selectedorder === item?.id}
                order={true}
                setPopup={() => setSelectedorder()}
                onEdit={() => {
                  navigation.navigate(appConstant.addOrder, {
                    data: item,
                    from: true,
                  });
                  setSelectedorder('');
                }}
                onView={() => {
                  navigation.navigate(appConstant.vieworder, {data: item});
                  setSelectedorder('');
                }}
              />

              <View style={styles.areaview1}>
                <Customview
                  style={styles.orderno}
                  head={appConstant.orderdate}
                  text={item?.createdAt.slice(0, 10)}
                  headstyle={styles.htext}
                  textstyle={styles.ttext}
                />

                <Customview
                  style={styles.comp}
                  head={appConstant.approxdate}
                  text={item?.approxDeliveryDate}
                  headstyle={styles.htext}
                  textstyle={styles.ttext}
                />

                <Customview
                  style={styles.date}
                  head={appConstant.ddate}
                  text={item?.deliveryAt ? item.deliveryAt.slice(0, 10) : '-'}
                  headstyle={styles.htext}
                  textstyle={styles.ttext}
                />
              </View>

              <View style={styles.areaview1}>
                <Customview
                  style={styles.orderno}
                  head={appConstant.items}
                  text={item?.totalQuantity}
                  headstyle={styles.htext}
                  textstyle={styles.ttext}
                />

                <Customview
                  style={styles.comp}
                  head={appConstant.Totalamount}
                  text={'₹' + item?.totalAmount}
                  headstyle={styles.htext}
                  textstyle={styles.ttext}
                />

                <View style={styles.statuss}>
                  <Text style={styles.htext}>{appConstant.status}</Text>
                  <View style={styles.iconstatus}>
                    <View
                      style={[
                        styles.statustype,
                        item?.status === 'pending'
                          ? {backgroundColor: colors.green}
                          : item?.status === 'partialDelivered'
                          ? {backgroundColor: colors.skyblue}
                          : item?.status === 'delivered'
                          ? {backgroundColor: colors.primary}
                          : {backgroundColor: colors.red},
                      ]}>
                      <Text style={styles.stext}>{item?.status}</Text>
                    </View>

                    {item?.status === 'pending' ||
                    item?.status === 'partialDelivered' ? (
                      <TouchableOpacity
                        style={styles.icon}
                        onPress={() => {
                          setSelectedorderstatus(item?.id);
                        }}>
                        <SvgIcon.popedit width={rw(5)} height={rh(2)} />
                      </TouchableOpacity>
                    ) : null}

                    {/* POPUP-MENU */}
                    <Popupmenu
                      opened={
                        selectedorderstatus !== null &&
                        selectedorderstatus === item?.id
                      }
                      setPopup={() => setSelectedorderstatus('')}
                      orderstatus={true}
                      status1={item?.status}
                      onpending={() => handleChangestatus(item?.id, 'pending')}
                      onPartial={() =>
                        handleChangestatus(item?.id, 'partialDelivered')
                      }
                      onDeliver={() =>
                        handleChangestatus(item?.id, 'delivered')
                      }
                      onCancel={() => handleChangestatus(item?.id, 'cancelled')}
                    />
                  </View>
                </View>
              </View>
            </View>
          );
        }}
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

  download: {
    position: 'absolute',
    right: 60,
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

  add: {
    position: 'absolute',
    right: 0,
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

  nocat: {
    alignItems: 'center',
    marginTop: rh(30),
  },

  nocatdata: {
    color: colors.black,
    fontFamily: fonts.semibold,
    fontSize: rf(2.5),
  },

  svgbox: {
    width: rw(63),
    color: colors.black,
    fontSize: rf(1.9),
    fontFamily: fonts.medium,
    marginLeft: rw(3),
  },

  search: {
    marginLeft: rw(2),
  },

  textsearch: {
    width: rw(60),
    color: colors.black,
    fontSize: rf(1.9),
    fontFamily: fonts.medium,
    marginLeft: rw(3),
  },

  textin: {
    width: rw(78),
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: colors.white,
    borderRadius: 15,
    margin: rh(2),
    marginLeft: rw(4),
    padding: rw(0.5),
    elevation: 10,
    shadowColor: colors.labelgrey,
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.8,
  },

  filter: {
    alignItems: 'center',
    justifyContent: 'center',
    width: rw(12.5),
    height: rh(6.5),
    backgroundColor: colors.primary,
    marginLeft: rw(5.4),
    borderRadius: 12,
  },

  main: {
    backgroundColor: colors.white,
    marginVertical: rh(1),
    marginHorizontal: rw(3),
    justifyContent: 'center',
    borderRadius: 15,
    elevation: 10,
    shadowColor: colors.labelgrey,
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.8,
  },

  areaview1: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: rw(1),
    margin: rw(2),
  },

  orderno: {
    width: rw(30),
    marginRight: rw(0.6),
  },

  comp: {
    width: rw(33),
  },

  date: {
    width: rw(26),
    marginLeft: rw(1),
  },

  htext: {
    fontFamily: fonts.semibold,
    color: colors.labelgrey,
    fontSize: rf(1.45),
  },

  ttext: {
    fontFamily: fonts.semibold,
    color: colors.black,
    fontSize: rf(1.6),
  },

  stext: {
    fontFamily: fonts.semibold,
    color: colors.white,
    fontSize: rf(1.1),
  },

  dot: {
    position: 'absolute',
    right: rw(3),
  },

  statuss: {
    marginLeft: rw(1),
  },

  statustype: {
    padding: rw(0.5),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
  },

  iconstatus: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  icon: {
    marginLeft: rw(0.1),
  },
});
