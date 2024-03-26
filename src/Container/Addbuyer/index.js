import React, {useCallback, useEffect, useRef, useState} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {appConstant} from '../../helper/appconstants';
import {
  responsiveFontSize as rf,
  responsiveHeight as rh,
  responsiveWidth as rw,
} from 'react-native-responsive-dimensions';
import {fonts} from '../../assets/fonts';
import {colors} from '../../assets/colors';
import {useNavigation} from '@react-navigation/native';
import {SvgIcon} from '../../assets/SvgIcon';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Button} from '../../Components/Button';
import {Radiobutton} from '../../Components/Radiobutton';
import ImageCropPicker from 'react-native-image-crop-picker';
import {Bottommodal} from '../../Components/Bottommodal';
import {handleMessage, reggst, regpan, states} from '../../helper/utils';
import {Loader} from '../../Components/Loader';
import {useDispatch} from 'react-redux';
import {Statemodal} from '../../Components/Statemodal';
import {Textinputs} from '../../Components/Textinputs';
import {createbuyers, editbuyers} from '../../Api/buyerservice';

export const Addbuyer = ({route}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [value, setValue] = useState(0);
  const [visible, setVisible] = useState(false);
  const [isloading, setLoading] = useState(false);
  const [statemodal, setStatemodal] = useState(false);

  const [gstno, setGstno] = useState();
  const [panno, setPanno] = useState();
  const [comp, setComp] = useState();
  const [name, setName] = useState();
  const [number, setNumber] = useState();
  const [address, setAddress] = useState();
  const [addline, setAddline] = useState();
  const [locality, setLocality] = useState();
  const [pincode, setPincode] = useState();
  const [city, setCity] = useState();
  const [state, setState] = useState();
  const [logo, setLogo] = useState();
  const [filterdata, setFilterdata] = useState(states.sort());
  const statedata = states.sort();

  const [data, setData] = useState([]);
  const [from, setFrom] = useState();
  const [id, setId] = useState();

  const [errgstno, setErrGstno] = useState(false);
  const [errpanno, setErrPanno] = useState(false);
  const [errcomp, setErrComp] = useState(false);
  const [errname, setErrName] = useState(false);
  const [errnumber, setErrNumber] = useState(false);
  const [erraddress, setErrAddress] = useState(false);
  const [erraddline, setErrAddline] = useState(false);
  const [errlocality, setErrLocality] = useState(false);
  const [errpincode, setErrPincode] = useState(false);
  const [errcity, setErrCity] = useState(false);
  const [errstate, setErrState] = useState(false);
  const [errLogo, setErrLogo] = useState(false);

  const gstref = useRef(null);
  const panref = useRef(null);
  const compref = useRef(null);
  const nameref = useRef(null);
  const phoneref = useRef(null);
  const addref = useRef(null);
  const addlineref = useRef(null);
  const localityref = useRef(null);
  const pincoderef = useRef(null);
  const cityref = useRef(null);
  const scrollref = useRef(null);

  const handleData = useCallback(async () => {
    data?.createdByCompany?.gstNo ? value === 0 : value === 1;

    value === 0 ? setGstno(data?.gstNo) : data?.panNo;
    setComp(data?.companyName);
    setName(data?.name);
    setNumber(data?.phone);

    if (data && data?.addresses?.length > 0) {
      setAddress(data.addresses[0]?.addressName || '');
      setAddline(data.addresses[0]?.addressLine || '');
      setLocality(data.addresses[0]?.locality || '');
      setPincode(data.addresses[0]?.pincode || '');
      setCity(data.addresses[0]?.city || '');
      setState(data.addresses[0]?.state || '');
    } else {
      handleEmpty();
    }
  }, [data, value]);

  useEffect(() => {
    if (route?.params) {
      setData(route?.params?.data?.createdByCompany);
      setFrom(route?.params?.from);
      setId(route?.params?.data?.createdByCompany?.id);
      handleData();
    } else {
      setData(null);
      setFrom(null);
      setId(null);
    }
  }, [route?.params, handleData]);

  const handleEmpty = () => {
    setGstno('');
    setPanno('');
    setLogo('');
    setComp('');
    setName('');
    setNumber('');
    setAddress('');
    setAddline('');
    setLocality('');
    setPincode('');
    setCity('');
    setState('');
  };

  const handleError = async () => {
    let errorstatus = false;

    if (!logo) {
      setErrLogo(true);
      errorstatus = true;
    }

    if (!comp || comp.length < 3) {
      setErrComp(true);
      errorstatus = true;
    }

    if (!name || name.length < 3) {
      setErrName(true);
      errorstatus = true;
    }

    if (!number || number.length < 10) {
      setErrNumber(true);
      errorstatus = true;
    }

    if (!address || address.length < 3) {
      setErrAddress(true);
      errorstatus = true;
    }

    if (!addline || addline.length < 3) {
      setErrAddline(true);
      errorstatus = true;
    }

    if (!locality || locality.length < 3) {
      setErrLocality(true);
      errorstatus = true;
    }

    if (!pincode || pincode.length < 6) {
      setErrPincode(true);
      errorstatus = true;
    }

    if (!city || city.length < 3) {
      setErrCity(true);
      errorstatus = true;
    }

    if (!state) {
      setErrState(true);
      errorstatus = true;
    }

    if (value === 0) {
      if (!gstno || !reggst.test(gstno)) {
        setErrGstno(true);
        errorstatus = true;
      }
    } else if (value === 1) {
      if (!panno || !regpan.test(panno)) {
        setErrPanno(true);
        errorstatus = true;
      }
    }

    return errorstatus;
  };

  const handleCamera = async () => {
    ImageCropPicker.openCamera({
      width: 100,
      height: 100,
      cropping: true,
      mediaType: 'photo',
    })
      .then(image => {
        setVisible(false);
        const uri = image.path;
        const file = {
          uri: uri,
          type: image.type,
          name: 'image.jpg',
        };
        setLogo(file);
        setErrLogo(false);
      })
      .catch(error => {
        setVisible(false);
        console.log(error);
      });
  };

  const handleGallery = () => {
    ImageCropPicker.openPicker({
      width: 100,
      height: 100,
      cropping: true,
      mediaType: 'photo',
    })
      .then(image => {
        setVisible(false);
        const uri = image.path;
        const file = {
          uri: uri,
          type: image.type,
          name: 'image.jpg',
        };
        setLogo(file);
        setErrLogo(false);
      })
      .catch(error => {
        setVisible(false);
        console.log(error);
      });
  };

  const handleAddbuyer = async () => {
    if (await handleError()) {
      console.log('Errors encountered. Unable add buyer.');
    } else {
      try {
        setLoading(true);

        const formData = new FormData();

        value === 0
          ? formData.append('gstNo', gstno)
          : formData.append('panNo', panno);
        formData.append('name', name);
        formData.append('companyName', comp);
        formData.append('phone', number);
        formData.append('addressName', address);
        formData.append('addressLine', addline);
        formData.append('locality', locality);
        formData.append('pincode', pincode);
        formData.append('city', city);
        formData.append('state', state);

        console.log(formData, 'data...');

        const response =
          from === 'edit'
            ? await editbuyers(dispatch, id, formData)
            : await createbuyers(dispatch, formData);

        console.log(response, 'buyer response');

        if (!response?.error) {
          handleEmpty();
          handleMessage(
            appConstant.Success,
            response?.message,
            appConstant.success,
          );
        } else {
          handleMessage(
            appConstant.error,
            response?.message,
            appConstant.danger,
          );
        }
        setLoading(false);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleSelect = item => {
    setErrState(false);
    console.log(item);
    setState(item);
    setStatemodal(false);
    setFilterdata(states);
  };

  const handleSearch = text => {
    if (!text) {
      setFilterdata(states);
    } else {
      const filterstate = statedata.filter(s => {
        return s.toLowerCase().includes(text.toLowerCase());
      });
      filterstate.sort();
      setFilterdata(filterstate);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Loader visible={isloading} />

      <Bottommodal
        visible={visible}
        onPress={() => setVisible(false)}
        onGallery={handleGallery}
        OnCamera={handleCamera}
      />

      <Statemodal
        visible={statemodal}
        onPress={() => setStatemodal(false)}
        onselect={handleSelect}
        data={filterdata}
        onChangeText={handleSearch}
      />

      <View style={styles.head}>
        <TouchableOpacity
          style={styles.back}
          onPress={() => navigation.goBack()}>
          <SvgIcon.arrowleft width={rh(3.5)} height={rh(3.5)} />
        </TouchableOpacity>

        <Text style={styles.headtext}>
          {from === 'edit' ? appConstant.editBuyer : appConstant.addBuyer}
        </Text>
      </View>

      <KeyboardAwareScrollView
        ref={scrollref}
        bounces
        alwaysBounceVertical={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.mainview}>
        {logo ? (
          <View style={styles.logoview}>
            <Image source={logo} style={styles.logo} />
            <TouchableOpacity
              style={styles.close}
              onPress={() => {
                setLogo('');
                console.log('logo removed.');
              }}>
              <SvgIcon.close width={rw(4.2)} height={rh(4)} />
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity
            style={styles.uploadview}
            onPress={() => setVisible(true)}>
            <SvgIcon.uploadlogo width={rw(7.5)} height={rh(7.5)} />
          </TouchableOpacity>
        )}

        <Text style={styles.uploadtext}>{appConstant.uplogo}</Text>

        {errLogo ? (
          <Text style={styles.errlogo}>{appConstant.logoerr}</Text>
        ) : null}

        <Radiobutton value={value} onSelect={val => setValue(val)} />

        {value === 0 ? (
          <>
            <View style={styles.gstpan}>
              <Text style={styles.text}>{appConstant.gstno}</Text>
              <Textinputs
                refe={gstref}
                value={gstno}
                onChangeText={text => {
                  !text
                    ? setErrGstno(false)
                    : !reggst.test(text)
                    ? setErrGstno(true)
                    : setErrGstno(false);
                  setGstno(text.toUpperCase());
                }}
                color={colors.black}
                style={styles.textin}
                onSubmitEditing={() => {
                  compref?.current.focus();
                  !gstno
                    ? null
                    : !reggst.test(gstno)
                    ? setErrGstno(true)
                    : setErrGstno(false);
                }}
                returnKeyType="next"
              />
            </View>
            {errgstno ? (
              <Text style={styles.errname}>{appConstant.gsterr}</Text>
            ) : null}
          </>
        ) : (
          <>
            <View style={styles.gstpan}>
              <Text style={styles.text}>{appConstant.panno}</Text>
              <Textinputs
                refe={panref}
                value={panno}
                onChangeText={text => {
                  !text
                    ? setErrPanno(false)
                    : !regpan.test(text)
                    ? setErrPanno(true)
                    : setErrPanno(false);
                  setPanno(text.toUpperCase());
                }}
                color={colors.black}
                style={styles.textin}
                onSubmitEditing={() => {
                  compref?.current.focus();
                  !panno
                    ? null
                    : !regpan.test(panno)
                    ? setErrPanno(true)
                    : setErrPanno(false);
                }}
                returnKeyType="next"
              />
            </View>
            {errpanno ? (
              <Text style={styles.errname}>{appConstant.panerr}</Text>
            ) : null}
          </>
        )}

        {/* COMP SHOP NAME */}
        <View style={styles.compname}>
          <View
            style={[styles.compshop, errcomp ? null : {marginBottom: rh(3.5)}]}>
            <Text style={styles.text}>{appConstant.companyshop}</Text>
            <Textinputs
              refe={compref}
              value={comp}
              onChangeText={text => {
                !text
                  ? setErrComp(false)
                  : text.length < 3
                  ? setErrComp(true)
                  : setErrComp(false);
                setComp(text);
              }}
              color={colors.black}
              style={styles.textin}
              onSubmitEditing={() => {
                nameref?.current.focus();
                !comp
                  ? null
                  : comp.length < 3
                  ? setErrComp(true)
                  : setErrComp(false);
              }}
              returnKeyType="next"
            />
            {errcomp ? (
              <Text style={styles.errname}>{appConstant.comperr}</Text>
            ) : null}
          </View>

          <View
            style={[styles.compshop, errname ? null : {marginBottom: rh(3.5)}]}>
            <Text style={styles.text}>{appConstant.compname}</Text>
            <Textinputs
              refe={nameref}
              value={name}
              onChangeText={text => {
                !text
                  ? setErrName(false)
                  : text.length < 3
                  ? setErrName(true)
                  : setErrName(false);
                setName(text);
              }}
              color={colors.black}
              style={styles.textin}
              onSubmitEditing={() => {
                phoneref?.current.focus();
                !name
                  ? null
                  : name.length < 3
                  ? setErrName(true)
                  : setErrName(false);
              }}
              returnKeyType="next"
            />
            {errname ? (
              <Text style={styles.errname}>{appConstant.nameerr}</Text>
            ) : null}
          </View>
        </View>

        {/* PHONE ADDRESS */}
        <View style={styles.compname}>
          <View
            style={[
              styles.compshop,
              errnumber ? null : {marginBottom: rh(3.5)},
            ]}>
            <Text style={styles.text}>{appConstant.phonenumber}</Text>
            <View style={styles.phone}>
              <Text style={styles.code}>{appConstant.code}</Text>
              <Textinputs
                refe={phoneref}
                value={number}
                color={colors.black}
                onChangeText={text => {
                  !text
                    ? setErrNumber(false)
                    : text.length <= 9
                    ? setErrNumber(true)
                    : setErrNumber(false);
                  setNumber(text);
                }}
                style={styles.phonetext}
                max={10}
                onSubmitEditing={() => {
                  addref?.current.focus();
                  !number
                    ? null
                    : number.length <= 9
                    ? setErrNumber(true)
                    : setErrNumber(false);
                }}
                returnKeyType="next"
                keyboardType="number-pad"
              />
            </View>
            {errnumber ? (
              <Text style={styles.errname}>{appConstant.numerr}</Text>
            ) : null}
          </View>

          <View
            style={[
              styles.compshop,
              erraddress ? null : {marginBottom: rh(3.5)},
            ]}>
            <Text style={styles.text}>{appConstant.address}</Text>
            <Textinputs
              refe={addref}
              value={address}
              color={colors.black}
              onChangeText={text => {
                !text
                  ? setErrAddress(false)
                  : text.length < 3
                  ? setErrAddress(true)
                  : setErrAddress(false);
                setAddress(text);
              }}
              style={styles.textin}
              onSubmitEditing={() => {
                addlineref?.current.focus();
                !address
                  ? null
                  : address.length < 3
                  ? setErrAddress(true)
                  : setErrAddress(false);
              }}
              returnKeyType="next"
            />
            {erraddress ? (
              <Text style={styles.errname}>{appConstant.adderr}</Text>
            ) : null}
          </View>
        </View>

        {/* ADDRESSLINE */}
        <View style={styles.gstpan}>
          <Text style={styles.text}>{appConstant.addline}</Text>
          <Textinputs
            refe={addlineref}
            value={addline}
            p
            color={colors.black}
            onChangeText={text => {
              !text
                ? setErrAddline(false)
                : text.length < 3
                ? setErrAddline(true)
                : setErrAddline(false);
              setAddline(text);
            }}
            style={styles.textin}
            onSubmitEditing={() => {
              localityref?.current.focus();
              !addline
                ? null
                : addline.length < 3
                ? setErrAddline(true)
                : setErrAddline(false);
            }}
            returnKeyType="next"
          />
          {erraddline ? (
            <Text style={styles.errname}>{appConstant.addlineerr}</Text>
          ) : null}
        </View>

        {/* LOCALITY PINCODE */}
        <View style={styles.compname}>
          <View
            style={[
              styles.compshop,
              errlocality ? null : {marginBottom: rh(3.5)},
            ]}>
            <Text style={styles.text}>{appConstant.locality}</Text>
            <Textinputs
              refe={localityref}
              value={locality}
              pl
              onChangeText={text => {
                !text
                  ? setErrLocality(false)
                  : text.length < 3
                  ? setErrLocality(true)
                  : setErrLocality(false);
                setLocality(text);
              }}
              color={colors.black}
              style={styles.textin}
              onSubmitEditing={() => {
                pincoderef?.current.focus();
                !locality
                  ? null
                  : locality.length < 3
                  ? setErrLocality(true)
                  : setErrLocality(false);
              }}
              returnKeyType="next"
            />
            {errlocality ? (
              <Text style={styles.errname}>{appConstant.localerr}</Text>
            ) : null}
          </View>

          <View
            style={[
              styles.compshop,
              errpincode ? null : {marginBottom: rh(3.5)},
            ]}>
            <Text style={styles.text}>{appConstant.pincode}</Text>
            <Textinputs
              refe={pincoderef}
              value={pincode}
              p
              onChangeText={text => {
                !text
                  ? setErrPincode(false)
                  : text.length <= 5
                  ? setErrPincode(true)
                  : setErrPincode(false);
                setPincode(text);
              }}
              color={colors.black}
              style={styles.textin}
              onSubmitEditing={() => {
                cityref?.current.focus();
                !pincode
                  ? null
                  : pincode.length <= 5
                  ? setErrPincode(true)
                  : setErrPincode(false);
              }}
              keyboardType="number-pad"
              returnKeyType="next"
            />
            {errpincode ? (
              <Text style={styles.errname}>{appConstant.pinerr}</Text>
            ) : null}
          </View>
        </View>

        {/* CITY STATE */}
        <View style={styles.compname}>
          <View
            style={[styles.compshop, errcity ? null : {marginBottom: rh(3.5)}]}>
            <Text style={styles.text}>{appConstant.city}</Text>
            <Textinputs
              refe={cityref}
              value={city}
              onChangeText={text => {
                !text
                  ? setErrCity(false)
                  : text.length < 3
                  ? setErrCity(true)
                  : setErrCity(false);
                setCity(text);
              }}
              color={colors.black}
              style={styles.textin}
              onSubmitEditing={() => {
                !city
                  ? null
                  : city.length < 3
                  ? setErrCity(true)
                  : setErrCity(false);
              }}
              returnKeyType="done"
            />
            {errcity ? (
              <Text style={styles.errname}>{appConstant.cityerr}</Text>
            ) : null}
          </View>

          <View
            style={[styles.compshop, errcity ? null : {marginBottom: rh(3.5)}]}>
            <Text style={styles.text}>{appConstant.state}</Text>
            <TouchableOpacity
              style={styles.textin}
              onPress={() => setStatemodal(true)}>
              <Text style={styles.state}>
                {state ? state : appConstant.stateplace}
              </Text>
              <SvgIcon.down_arrow width={rw(7)} height={rh(3)} />
            </TouchableOpacity>
          </View>
        </View>
        {errstate ? (
          <Text style={styles.errname}>{appConstant.staterr}</Text>
        ) : null}

        <Button
          style={styles.touchsignin}
          text={from === 'edit' ? appConstant.editBuyer : appConstant.addBuyer}
          textstyle={styles.submit}
          onPress={handleAddbuyer}
        />
      </KeyboardAwareScrollView>
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

  headtext: {
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

  entercomp: {
    marginLeft: rw(4),
    marginTop: rw(7),
    fontSize: rf(3),
    fontFamily: fonts.bold,
    color: colors.black,
  },

  textin: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.grey,
    color: colors.black,
    borderRadius: 13,
    padding: rh(1.8),
    fontSize: rf(2),
    fontFamily: fonts.medium,
  },

  mainview: {
    marginTop: rh(2),
  },

  close: {
    width: rw(8),
    height: rh(4),
    alignItems: 'center',
    borderRadius: 15,
    justifyContent: 'center',
    backgroundColor: colors.lightblack,
    position: 'absolute',
    top: 0,
    right: rw(29),
  },

  uploadview: {
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: rw(35),
    marginLeft: rw(35),
    height: rh(14),
    borderRadius: 20,
    backgroundColor: colors.grey,
  },

  logoview: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
  },

  logo: {
    width: rw(34),
    height: rh(18),
    borderRadius: 20,
    resizeMode: 'cover',
  },

  uploadtext: {
    textAlign: 'center',
    fontSize: rf(2),
    margin: rw(3),
    marginTop: rw(2),
    fontFamily: fonts.semibold,
    color: colors.black,
  },

  text: {
    fontSize: rf(1.7),
    marginLeft: rw(3),
    margin: rw(1),
    color: colors.labelgrey,
    fontFamily: fonts.semibold,
  },

  code: {
    fontSize: rf(1.8),
    marginLeft: rw(1.7),
    margin: rw(1),
    color: colors.black,
    fontFamily: fonts.semibold,
  },

  touchsignin: {
    alignItems: 'center',
    marginTop: rh(3),
    marginBottom: rh(5),
    backgroundColor: colors.primary,
    borderRadius: 10,
    padding: rw(3.4),
    marginLeft: rw(10),
    marginRight: rw(10),
  },

  submit: {
    color: colors.white,
    fontSize: rf(2.3),
    fontFamily: fonts.bold,
  },

  errname: {
    textAlign: 'right',
    color: colors.red,
    fontSize: rf(1.6),
    marginRight: rw(5),
    fontFamily: fonts.medium,
  },

  errlogo: {
    textAlign: 'center',
    color: colors.red,
    fontSize: rf(1.6),
    marginRight: rw(5),
    marginBottom: rh(1),
    fontFamily: fonts.medium,
  },

  gstpan: {
    margin: rw(1.5),
    marginLeft: rw(4),
    marginRight: rw(4),
  },

  compname: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  compshop: {
    margin: rw(2.5),
    width: rw(43),
  },

  phone: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.grey,
    borderRadius: 13,
    padding: rw(1),
  },

  state: {
    width: rw(30),
    color: colors.black,
    fontFamily: fonts.medium,
    backgroundColor: colors.grey,
    borderRadius: 13,
    fontSize: rf(1.8),
  },

  phonetext: {
    width: rw(32),
    padding: rw(3),
    fontSize: rf(1.9),
    color: colors.black,
    fontFamily: fonts.medium,
  },
});
