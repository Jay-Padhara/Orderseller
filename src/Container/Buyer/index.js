import React, {useCallback, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  FlatList,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  responsiveFontSize as rf,
  responsiveHeight as rh,
  responsiveWidth as rw,
} from 'react-native-responsive-dimensions';
import {colors} from '../../assets/colors';
import {SvgIcon} from '../../assets/SvgIcon';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {appConstant} from '../../helper/appconstants';
import {fonts} from '../../assets/fonts';
import {Customview} from '../../Components/Button';
import {Popupmenu} from '../../Components/Popupmenu';
import {Loader} from '../../Components/Loader';
import {useDispatch} from 'react-redux';
import {handleMessage} from '../../helper/utils';
import {
  changebuyerstatus,
  deletebuyers,
  getallbuyers,
} from '../../Api/buyerservice';
import {Delemodal} from '../../Components/Deletemodal.js';

export const Buyer = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [ispopup, setPopup] = useState(false);
  const [visible, setVisible] = useState(false);
  const [isloading, setLoading] = useState(false);
  const [companylist, setCompanylist] = useState([]);
  const [filtercompanylist, setFiltercompanylist] = useState([]);
  const [selectedbuyer, setSelectedbuyer] = useState('');
  const [id, setId] = useState();

  const handleCompany = useCallback(async () => {
    try {
      setLoading(true);

      const response = await getallbuyers(dispatch);
      console.log(response, 'getall company');

      if (!response?.error) {
        console.log(response?.result?.data);
        setCompanylist(response?.result?.data);
        setFiltercompanylist(response?.result?.data);
      } else {
        handleMessage(appConstant.error, response?.message, appConstant.danger);
      }
      setLoading(false);
    } catch (error) {
      console.error(error);
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
    if (!text) {
      setFiltercompanylist(companylist);
    } else {
      const filterlist = companylist.filter(p => {
        return p?.createdByCompany?.name
          .toUpperCase()
          .includes(text?.toUpperCase());
      });
      filterlist.sort();
      setFiltercompanylist(filterlist);
    }
  };

  const handleStatus = async item => {
    try {
      setLoading(true);
      setSelectedbuyer('');

      const status = item?.isActive ? 'false' : 'true';

      const response = await changebuyerstatus(dispatch, item?.id, status);
      console.log(response, 'buyer status changed');

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
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = async item => {
    console.log(item);
    setSelectedbuyer('');
    navigation.navigate(appConstant.addbuyer, {data: item, from: 'edit'});
  };

  const handleDelete = async () => {
    try {
      setLoading(true);
      setSelectedbuyer('');

      const response = await deletebuyers(dispatch, id);
      console.log(response, 'delete buyer response');

      if (!response?.error) {
        handleMessage(
          appConstant.Success,
          response?.message,
          appConstant.success,
        );
        setVisible(false);
        handleCompany();
      } else {
        handleMessage(appConstant.error, response?.message, appConstant.danger);
      }
      setLoading(false);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Loader visible={isloading} />

      <Delemodal
        visible={visible}
        onCancel={() => setVisible(false)}
        onPress={handleDelete}
        message={appConstant.delmessage}
        buttontext={appConstant.dele}
      />

      <View style={styles.head}>
        <TouchableOpacity
          style={styles.back}
          onPress={() => navigation.goBack()}>
          <SvgIcon.arrowleft width={rh(3.5)} height={rh(3.5)} />
        </TouchableOpacity>

        <Text style={styles.text}>{appConstant.buyer}</Text>
        <TouchableOpacity
          style={styles.profile}
          onPress={() => navigation.navigate(appConstant.buyerrequest)}>
          <SvgIcon.prologo width={rh(3.6)} height={rh(3.6)} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.add}
          onPress={() => navigation.navigate(appConstant.addbuyer)}>
          <SvgIcon.add width={rh(3.6)} height={rh(3.6)} />
        </TouchableOpacity>
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
        data={filtercompanylist}
        keyExtractor={(item, index) => index}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.nocat}>
            <Text style={styles.nocatdata}>{appConstant.nobuyerdata}</Text>
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
                    text={item?.createdByCompany?.companyName}
                    textstyle={styles.btext}
                  />

                  <Customview
                    style={styles.comp}
                    headstyle={styles.htext}
                    head={appConstant.buyername}
                    text={item?.createdByCompany?.name}
                    textstyle={styles.btext}
                  />

                  <TouchableOpacity
                    style={styles.dot}
                    onPress={() => {
                      setPopup(true);
                      console.log(ispopup);
                      setSelectedbuyer(item?.id);
                    }}>
                    <SvgIcon.dot width={rw(1.7)} height={rh(1.7)} />
                  </TouchableOpacity>

                  <Popupmenu
                    buyeroption={true}
                    opened={
                      setSelectedbuyer !== null && selectedbuyer === item?.id
                    }
                    status={item?.isActive}
                    setPopup={() => setSelectedbuyer()}
                    onEdit={() => handleEdit(item)}
                    onDelete={() => {
                      setId(item?.createdByCompany?.id);
                      setSelectedbuyer('');
                      setVisible(true);
                    }}
                    onView={() => {
                      setSelectedbuyer('');
                      navigation.navigate(appConstant.viewbuyer, {
                        data: item,
                      });
                    }}
                    onChangestatus={() => handleStatus(item)}
                  />
                </View>

                <View style={styles.prodesc}>
                  <Customview
                    style={styles.comp}
                    headstyle={styles.htext}
                    head={appConstant.phonenumber}
                    text={`+91 ${item?.createdByCompany?.phone}`}
                    textstyle={styles.btext}
                  />

                  <Customview
                    style={styles.verify}
                    headstyle={styles.htext}
                    head={appConstant.verifybuyer}
                    text={
                      item?.createdByCompany?.isVerified
                        ? appConstant.yes
                        : appConstant.no
                    }
                    textstyle={styles.btext}
                  />

                  <View style={styles.status}>
                    <Text style={styles.htext}>{appConstant.status}</Text>
                    <View
                      style={item?.isActive ? styles.active : styles.inactive}>
                      <Text style={styles.actext}>
                        {item?.isActive
                          ? appConstant.active
                          : appConstant.inactive}
                      </Text>
                    </View>
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

  profile: {
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

  verify: {
    width: rw(22),
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

  protext: {
    fontSize: rf(1.5),
    color: colors.labelgrey,
    fontFamily: fonts.semibold,
    borderRadius: 20,
  },

  ctext: {
    fontSize: rf(1.6),
    color: colors.black,
    fontFamily: fonts.semibold,
  },

  dot: {
    padding: rw(1.5),
    position: 'absolute',
    right: 0,
    top: 0,
  },

  status: {
    marginLeft: rw(6),
  },

  active: {
    borderRadius: 3,
    backgroundColor: colors.green,
    padding: rw(0.3),
    marginTop: rh(0.2),
  },

  actext: {
    textAlign: 'center',
    color: colors.white,
    fontSize: rf(1.3),
    fontFamily: fonts.semibold,
  },

  inactive: {
    borderRadius: 3,
    backgroundColor: colors.red,
    padding: rw(0.3),
    marginTop: rh(0.2),
  },

  inactext: {
    textAlign: 'center',
    color: colors.white,
    fontSize: rf(1.3),
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
