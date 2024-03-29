import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  FlatList,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
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
import {Button, Customview} from '../../Components/Button';
import {useDispatch} from 'react-redux';
import {Loader} from '../../Components/Loader';
import {handleMessage} from '../../helper/utils';
import {acceptrejectrequest, buyerrequests} from '../../Api/buyerservice';
import {Delemodal} from '../../Components/Deletemodal.js';

export const Buyerrequest = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [isloading, setLoading] = useState(false);
  const [isdelmodal, setdelmodal] = useState(false);
  const [delid, setDelid] = useState();
  const [requestdata, setRequestdata] = useState([]);
  const [filterrequest, setFilterequest] = useState([]);

  const handleRequest = useCallback(async () => {
    try {
      setLoading(true);

      const response = await buyerrequests(dispatch);
      console.log(response, 'getall request');

      if (!response?.error) {
        console.log(response?.result?.data);
        setRequestdata(response?.result?.data);
        setFilterequest(response?.result?.data);
      } else {
        handleMessage(appConstant.error, response?.message, appConstant.danger);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }, [dispatch]);

  useEffect(() => {
    handleRequest();
  }, [handleRequest]);

  //ACCEPT BUYER REQUEST
  const acceptBuyer = async id => {
    try {
      setLoading(true);

      console.log(id, '........');

      const response = await acceptrejectrequest(
        dispatch,
        id,
        'isAccepted=true',
      );
      console.log(response, 'accept request response');

      if (!response?.error) {
        handleMessage(
          appConstant.Success,
          response?.message,
          appConstant.success,
        );
        handleRequest();
      } else {
        handleMessage(appConstant.error, response?.message, appConstant.danger);
      }

      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  //REJECT BUYER REQUEST
  const rejectBuyer = async () => {
    try {
      setLoading(true);
      console.log(delid, '........');

      const response = await acceptrejectrequest(
        dispatch,
        delid,
        'isRejected=true',
      );
      console.log(response, 'reject buyer request response');

      if (!response?.error) {
        handleMessage(
          appConstant.Success,
          response?.message,
          appConstant.success,
        );
        handleRequest();
      } else {
        handleMessage(appConstant.error, response?.message, appConstant.danger);
      }

      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = text => {
    if (!text) {
      setFilterequest(requestdata);
    } else {
      const filtercate = requestdata.filter(s => {
        return s?.company?.name.toLowerCase().includes(text.toLowerCase());
      });
      filtercate.sort();
      setFilterequest(filtercate);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Loader visible={isloading} />

      <Delemodal
        visible={isdelmodal}
        onCancel={() => setdelmodal(false)}
        message={appConstant.delerequest}
        buttontext={appConstant.reject}
        onPress={rejectBuyer}
      />

      <View style={styles.head}>
        <TouchableOpacity
          style={styles.back}
          onPress={() => navigation.goBack()}>
          <SvgIcon.arrowleft width={rh(3.5)} height={rh(3.5)} />
        </TouchableOpacity>

        <Text style={styles.text}>{appConstant.request}</Text>
      </View>

      <View style={styles.textin}>
        <View style={styles.search}>
          <SvgIcon.search width={rw(6.2)} height={rh(6.2)} />
        </View>
        <TextInput
          style={styles.svgbox}
          placeholderTextColor={colors.labelgrey}
          placeholder={appConstant.searchhere}
          onChangeText={text => handleSearch(text)}
        />
      </View>

      <FlatList
        data={filterrequest}
        keyExtractor={(item, index) => index}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.nocat}>
            <Text style={styles.nocatdata}>{appConstant.norequestdata}</Text>
          </View>
        }
        renderItem={({item}) => {
          return (
            <View style={styles.main}>
              <View style={styles.mainview}>
                <View style={styles.prodesc}>
                  <Customview
                    style={styles.comp}
                    headstyle={styles.htext}
                    head={appConstant.cname}
                    text={item?.company?.companyName}
                    textstyle={styles.btext}
                  />

                  <Customview
                    style={styles.comp}
                    headstyle={styles.htext}
                    head={appConstant.buyername}
                    text={item?.company?.name}
                    textstyle={styles.btext}
                  />
                </View>

                <View style={styles.prodesc}>
                  <Customview
                    style={styles.comp}
                    headstyle={styles.htext}
                    head={appConstant.phonenumber}
                    text={item?.company?.phone}
                    textstyle={styles.btext}
                  />

                  <View style={styles.button}>
                    <Button
                      style={styles.accept}
                      text={appConstant.accept}
                      textstyle={styles.acctext}
                      onPress={() => acceptBuyer(item?.id)}
                    />

                    <Button
                      style={styles.reject}
                      text={appConstant.reject}
                      textstyle={styles.rejetext}
                      onPress={() => {
                        setdelmodal(true);
                        console.log(item?.id);
                        setDelid(item?.id);
                      }}
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
    width: rw(38),
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

  accept: {
    backgroundColor: colors.lightgreen,
    padding: rw(1.5),
    borderRadius: 10,
    marginRight: rw(1.2),
    paddingHorizontal: rw(2.8),
  },

  reject: {
    backgroundColor: colors.red,
    padding: rw(1.5),
    borderRadius: 10,
    paddingHorizontal: rw(2.8),
  },

  acctext: {
    padding: rw(0.2),
    color: colors.white,
    fontSize: rf(1.6),
    fontFamily: fonts.semibold,
  },

  button: {
    flexDirection: 'row',
  },

  rejetext: {
    padding: rw(0.2),
    color: colors.white,
    fontSize: rf(1.6),
    fontFamily: fonts.semibold,
  },

  nocat: {
    alignItems: 'center',
    marginTop: rh(32),
  },

  nocatdata: {
    color: colors.black,
    fontFamily: fonts.semibold,
    fontSize: rf(2.8),
  },
});
