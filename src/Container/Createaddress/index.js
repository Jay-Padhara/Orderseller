import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useRef, useState} from 'react';
import {colors} from '../../assets/colors';
import {fonts} from '../../assets/fonts';
import {appConstant} from '../../helper/appconstants';
import {useNavigation} from '@react-navigation/native';
import {SvgIcon} from '../../assets/SvgIcon';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  responsiveFontSize as rf,
  responsiveHeight as rh,
  responsiveWidth as rw,
} from 'react-native-responsive-dimensions';
import {Textinputs} from '../../Components/Textinputs';
import {Statemodal} from '../../Components/Statemodal';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {handleMessage, states} from '../../helper/utils';
import {Button} from '../../Components/Button';
import {Loader} from '../../Components/Loader';
import {useDispatch, useSelector} from 'react-redux';
import {createaddresses} from '../../Api/addressservice';

export const Createaddress = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const userdetails = useSelector(state => state.login.login_data);
  const compid = userdetails?.result?.company?.id;

  const [visible, setVisible] = useState(false);
  const [isshow, setShow] = useState(false);

  const [address, setAddress] = useState();
  const [addline, setAddline] = useState();
  const [locality, setLocality] = useState();
  const [pincode, setPincode] = useState();
  const [city, setCity] = useState();
  const [state, setState] = useState();

  const [filterdata, setFilterdata] = useState(states.sort());
  const statedata = states.sort();

  const [erraddress, setErrAddress] = useState(false);
  const [erraddline, setErrAddline] = useState(false);
  const [errlocality, setErrLocality] = useState(false);
  const [errpincode, setErrPincode] = useState(false);
  const [errcity, setErrCity] = useState(false);
  const [errstate, setErrState] = useState(false);

  const addref = useRef(null);
  const addlineref = useRef(null);
  const localityref = useRef(null);
  const pincoderef = useRef(null);
  const cityref = useRef(null);

  const handleEmpty = () => {
    setAddress('');
    setAddline('');
    setLocality('');
    setPincode('');
    setCity('');
    setState('');
  };

  const handleError = async () => {
    let errorstatus = false;

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
    return errorstatus;
  };

  const handleSelect = item => {
    setErrState(false);
    setState(item);
    setVisible(false);
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

  const handleSubmit = async () => {
    if (await handleError()) {
      console.log('Encountered error....');
    } else {
      try {
        setShow(true);

        const data = {
          addressName: address,
          addressLine: addline,
          locality: locality,
          pincode: pincode,
          city: city,
          state: state,
        };

        const response = await createaddresses(dispatch, compid, data);
        console.log(response, 'company response');

        if (!response?.error) {
          handleMessage(
            appConstant.Success,
            response?.message,
            appConstant.success,
          );
          handleEmpty();
        } else {
          handleMessage(
            appConstant.error,
            response?.message,
            appConstant.danger,
          );
        }
        setShow(false);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Statemodal visible={visible} />

      <Loader visible={isshow} />

      <Statemodal
        visible={visible}
        onPress={() => setVisible(false)}
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

        <Text style={styles.text}>{appConstant.createAdd}</Text>
      </View>

      <KeyboardAwareScrollView
        bounces
        alwaysBounceVertical={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.mainview}>
        <View style={styles.gstpan}>
          <Text style={styles.txt}>{appConstant.address}</Text>
          <Textinputs
            refe={addref}
            value={address}
            onChangeText={text => {
              !text
                ? setErrAddress(false)
                : !text.length > 2
                ? setErrAddress(true)
                : setErrAddress(false);
              setAddress(text);
            }}
            color={colors.black}
            style={styles.textin}
            onSubmitEditing={() => {
              addlineref?.current.focus();
              !address
                ? null
                : !address.length > 2
                ? setErrAddress(true)
                : setErrAddress(false);
            }}
            returnKeyType="next"
          />
        </View>
        {erraddress ? (
          <Text style={styles.errname}>{appConstant.adderr}</Text>
        ) : null}

        <View style={styles.gstpan}>
          <Text style={styles.txt}>{appConstant.addline}</Text>
          <Textinputs
            refe={addlineref}
            value={addline}
            onChangeText={text => {
              !text
                ? setErrAddline(false)
                : !text.length > 2
                ? setErrAddline(true)
                : setErrAddline(false);
              setAddline(text);
            }}
            color={colors.black}
            style={styles.textin}
            onSubmitEditing={() => {
              localityref?.current.focus();
              !addline
                ? null
                : !addline.length > 2
                ? setErrAddline(true)
                : setErrAddline(false);
            }}
            returnKeyType="next"
          />
        </View>
        {erraddline ? (
          <Text style={styles.errname}>{appConstant.addlineerr}</Text>
        ) : null}

        <View style={styles.gstpan}>
          <Text style={styles.txt}>{appConstant.locality}</Text>
          <Textinputs
            refe={localityref}
            value={locality}
            onChangeText={text => {
              !text
                ? setErrLocality(false)
                : !text.length > 2
                ? setErrLocality(true)
                : setErrLocality(false);
              setLocality(text);
            }}
            color={colors.black}
            style={styles.textin}
            onSubmitEditing={() => {
              pincoderef?.current.focus();
              !addline
                ? null
                : !addline.length > 2
                ? setErrLocality(true)
                : setErrLocality(false);
            }}
            returnKeyType="next"
          />
        </View>
        {errlocality ? (
          <Text style={styles.errname}>{appConstant.localerr}</Text>
        ) : null}

        <View style={styles.gstpan}>
          <Text style={styles.txt}>{appConstant.pincode}</Text>
          <Textinputs
            refe={pincoderef}
            value={pincode}
            onChangeText={text => {
              !text
                ? setErrPincode(false)
                : !text.length > 2
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
                : !pincode.length > 2
                ? setErrPincode(true)
                : setErrPincode(false);
            }}
            keyboardType="numeric"
            returnKeyType="next"
          />
        </View>
        {errpincode ? (
          <Text style={styles.errname}>{appConstant.pinerr}</Text>
        ) : null}

        <View style={styles.gstpan}>
          <Text style={styles.txt}>{appConstant.city}</Text>
          <Textinputs
            refe={cityref}
            value={city}
            onChangeText={text => {
              !text
                ? setErrCity(false)
                : !text.length > 2
                ? setErrCity(true)
                : setErrCity(false);
              setCity(text);
            }}
            color={colors.black}
            style={styles.textin}
            onSubmitEditing={() => {
              !city
                ? null
                : !city.length > 2
                ? setErrCity(true)
                : setErrCity(false);
            }}
            returnKeyType="done"
          />
        </View>
        {errcity ? (
          <Text style={styles.errname}>{appConstant.cityerr}</Text>
        ) : null}

        <View style={styles.gstpan}>
          <Text style={styles.txt}>{appConstant.state}</Text>
          <TouchableOpacity
            style={styles.state}
            onPress={() => setVisible(true)}>
            <Text style={styles.stat}>{state}</Text>
            <SvgIcon.down_arrow width={rw(7)} height={rh(4)} />
          </TouchableOpacity>
        </View>
        {errstate ? (
          <Text style={styles.errname}>{appConstant.staterr}</Text>
        ) : null}

        <Button
          style={styles.touchsignin}
          text={appConstant.submit}
          textstyle={styles.submit}
          onPress={handleSubmit}
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

  gstpan: {
    marginTop: rh(3),
    marginLeft: rw(4),
    marginRight: rw(4),
  },

  txt: {
    fontSize: rf(1.9),
    marginLeft: rw(3),
    margin: rw(0.3),
    color: colors.labelgrey,
    fontFamily: fonts.semibold,
  },

  textin: {
    backgroundColor: colors.grey,
    color: colors.black,
    borderRadius: 13,
    padding: rh(1.8),
    fontSize: rf(2),
    fontFamily: fonts.medium,
  },

  state: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.grey,
    color: colors.black,
    borderRadius: 13,
    padding: rh(1.8),
  },

  stat: {
    fontSize: rf(2),
    color: colors.black,
    fontFamily: fonts.medium,
  },

  errname: {
    textAlign: 'right',
    color: colors.red,
    fontSize: rf(1.6),
    marginRight: rw(5),
    fontFamily: fonts.medium,
  },

  touchsignin: {
    alignItems: 'center',
    marginTop: rh(4),
    marginBottom: rh(3),
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
});
