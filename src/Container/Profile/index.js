import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image,
} from 'react-native';
import React, {useCallback, useRef, useState} from 'react';
import {colors} from '../../assets/colors';
import {fonts} from '../../assets/fonts';
import {
  responsiveFontSize as rf,
  responsiveHeight as rh,
  responsiveWidth as rw,
} from 'react-native-responsive-dimensions';
import {SvgIcon} from '../../assets/SvgIcon';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {appConstant} from '../../helper/appconstants';
import {Delemodal} from '../../Components/Deletemodal.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {handleMessage, reggst, regpan, states} from '../../helper/utils';
import {Textinputs} from '../../Components/Textinputs';
import {Line1} from '../../Components/Line';
import {Button, Customview} from '../../Components/Button';
import {Loader} from '../../Components/Loader/index.js';
import {changepasswords} from '../../Api/Authentication.js';
import {useDispatch, useSelector} from 'react-redux';
import {Bottommodal} from '../../Components/Bottommodal/index.js';
import {Statemodal} from '../../Components/Statemodal/index.js';
import ImageCropPicker from 'react-native-image-crop-picker';
import {getalladdresses} from '../../Api/addressservice.js';
import {getcompany, updatecompanies} from '../../Api/companyservice.js';

export const Profile = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const userdetails = useSelector(state => state.login.login_data);
  // const compdetails = useSelector(state => state.createcomp.createcomp_data);

  const compid = userdetails?.result?.company?.id;

  const [isoldshow, setOldshow] = useState(true);
  const [isloading, setLoading] = useState(false);
  const [isnewshow, setNewshow] = useState(true);
  const [visible, setVisible] = useState(false);
  const [isstatemodal, setStatemodal] = useState(false);
  const [iscamera, setCamera] = useState(false);
  const [isopen, setOpen] = useState({});

  const [gstno, setGstno] = useState();
  const [panno, setPanno] = useState();
  const [compcode, setCompcode] = useState();
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

  const [mail, setMail] = useState();
  const [joindate, setJoindate] = useState();
  const [addressid, setAddressid] = useState();

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

  const compref = useRef(null);
  const nameref = useRef(null);
  const phoneref = useRef(null);
  const addref = useRef(null);
  const addlineref = useRef(null);
  const localityref = useRef(null);
  const pincoderef = useRef(null);
  const cityref = useRef(null);

  const [oldpass, setOldpass] = useState();
  const [newpass, setNewpass] = useState();
  const [confpass, setConfpass] = useState();

  const oldref = useRef(null);
  const newref = useRef(null);
  const confref = useRef(null);

  const [erroldpass, setErrOldpass] = useState(false);
  const [errnewpass, setErrNewpass] = useState(false);
  const [errconfpass, setErrConfpass] = useState(false);
  const [errnotmatch, seterrNotmatch] = useState(false);

  //GETALL ADDRESS
  const handleAddress = useCallback(async () => {
    try {
      const response = await getalladdresses(dispatch, compid);
      console.log(response, 'getall address');

      if (!response?.error) {
        const add = response?.result;
        setAddressid(add[0]?.id);
        setAddress(add[0]?.addressName);
        setAddline(add[0]?.addressLine);
        setLocality(add[0]?.locality);
        setPincode(add[0]?.pincode);
        setCity(add[0]?.city);
        setState(add[0]?.state);
      } else {
        handleMessage(appConstant.error, response?.message, appConstant.danger);
      }
    } catch (error) {
      console.log(error);
    }
  }, [dispatch, compid]);

  useFocusEffect(
    useCallback(() => {
      handleAddress();
    }, [handleAddress]),
  );

  //GET COMPANY
  const handleCompany = useCallback(async () => {
    try {
      const response = await getcompany(dispatch, compid);
      console.log(response, 'get company');

      if (!response?.error) {
        response?.result?.gstNo
          ? setGstno(response?.result?.gstNo)
          : setPanno(response?.result?.panNo);
        setCompcode(response?.result?.companyCode);
        setComp(response?.result?.companyName);
        setName(response?.result?.name);
        setNumber(response?.result?.phone);
        setMail(response?.result?.createdBy?.email);
        setJoindate(response?.result?.createdAt);
      } else {
        handleMessage(appConstant.error, response?.message, appConstant.danger);
      }
    } catch (error) {
      console.log(error);
    }
  }, [dispatch, compid]);

  useFocusEffect(
    useCallback(() => {
      handleCompany();
    }, [handleCompany]),
  );

  const handleEmpty = () => {
    setOldpass('');
    setNewpass('');
    setConfpass('');
  };

  const handleError1 = async () => {
    let errorstatus = false;

    if (gstno) {
      if (!gstno || !reggst.test(gstno)) {
        setErrGstno(true);
        errorstatus = true;
      }
    } else {
      if (!panno || !regpan.test(panno)) {
        setErrPanno(true);
        errorstatus = true;
      }
    }

    if (!comp || comp.length < 3) {
      setErrComp(true);
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

    return errorstatus;
  };

  const handleError = async () => {
    let errorstatus = false;

    if (!oldpass || !oldpass.length > 6) {
      setErrOldpass(true);
      errorstatus = true;
    }

    if (!newpass || !newpass.length > 6) {
      setErrNewpass(true);
      errorstatus = true;
    }

    if (!confpass || !confpass.length > 6) {
      setErrConfpass(true);
      errorstatus = true;
    }

    if (newpass !== confpass) {
      seterrNotmatch(true);
      errorstatus = true;
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
        setCamera(false);
        const uri = image.path;
        const file = {
          uri: uri,
          type: image.type,
          name: 'image.jpg',
        };
        setLogo(file);
      })
      .catch(error => {
        setCamera(false);
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
        setCamera(false);
        const uri = image.path;
        const file = {
          uri: uri,
          type: image.type,
          name: 'image.jpg',
        };
        setLogo(file);
      })
      .catch(error => {
        setCamera(false);
        console.log(error);
      });
  };

  const profiledata = [
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
    setOpen(prevOpen => {
      const newState = {...prevOpen};
      Object.keys(newState).forEach(sectionKey => {
        if (sectionKey !== key) {
          newState[sectionKey] = false;
        }
      });
      newState[key] = !newState[key];
      return newState;
    });
  };

  const renderItem = ({item}) => {
    const Svgicon = iconMapping[item?.icon];

    return (
      <View style={styles.main}>
        <TouchableOpacity
          style={styles.areaview}
          onPress={() => toggleSection(item?.key)}>
          <Svgicon width={rh(2.8)} height={rh(2.8)} />
          <Text style={styles.txt}>{item.title}</Text>
          <TouchableOpacity
            style={styles.arrow}
            onPress={() => toggleSection(item?.key)}>
            <SvgIcon.down_arrow width={rh(4)} height={rh(4)} />
          </TouchableOpacity>
        </TouchableOpacity>

        {/* MY PROFILE */}
        {isopen[item?.key] && item?.key === 'myprofile' && (
          <>
            <Line1 />

            <View>
              <Text style={styles.txt}>{appConstant.name}</Text>
              <View style={styles.name}>
                <Text style={styles.nametxt}>
                  {name ? name : userdetails?.createdBycompany?.name}
                </Text>
              </View>
            </View>

            <View>
              <Text style={styles.txt}>{appConstant.email}</Text>
              <View style={styles.name}>
                <Text style={styles.nametxt}>
                  {mail ? mail : userdetails?.createdBycompany?.email}
                </Text>
              </View>
            </View>

            <View style={styles.phonedate}>
              <View>
                <Text style={styles.txt}>{appConstant.phoneplace}</Text>
                <View style={styles.phone}>
                  <Text style={styles.phonetxt}>
                    {appConstant.code}
                    {number ? number : userdetails?.createdBycompany?.phone}
                  </Text>
                </View>
              </View>

              <View>
                <Text style={styles.txt}>{appConstant.joindate}</Text>
                <View style={styles.phone}>
                  <Text style={styles.phonetxt}>
                    {joindate
                      ? joindate.slice(0, 10)
                      : userdetails?.createdBycompany?.createdAt.slice(0, 10)}
                  </Text>
                </View>
              </View>
            </View>
          </>
        )}

        {/* CHANGE PASSWORD */}
        {isopen[item?.key] && item?.key === 'changepass' && (
          <View>
            <Line1 />

            {/* OLD PASSWORD */}
            <Text style={styles.passtxt}>{appConstant.oldpass}</Text>
            <View style={styles.icontextin}>
              <Textinputs
                refe={oldref}
                style={styles.oldtextin}
                value={oldpass}
                placeholder={appConstant.passplace}
                color={colors.labelgrey}
                secureTextEntry={isoldshow}
                keyboardType="number-pad"
                onChangeText={text => {
                  setOldpass(text);
                  !text
                    ? setErrOldpass(false)
                    : text.length < 6
                    ? setErrOldpass(true)
                    : setErrOldpass(false);
                }}
                onSubmitEditing={() => {
                  newref?.current.focus();
                  !oldpass
                    ? setErrOldpass(false)
                    : oldpass.length < 6
                    ? setErrOldpass(true)
                    : setErrOldpass(false);
                }}
                returnKeyType="next"
              />

              <TouchableOpacity
                style={styles.icon}
                onPress={() => setOldshow(!isoldshow)}>
                {isoldshow ? (
                  <SvgIcon.hide width={rw(5)} height={rh(5)} />
                ) : (
                  <SvgIcon.show width={rw(5)} height={rh(5)} />
                )}
              </TouchableOpacity>
            </View>

            {erroldpass ? (
              <Text style={styles.errname}>{appConstant.validpass}</Text>
            ) : null}

            {/* NEW PASSWORD */}
            <Text style={styles.passtxt}>{appConstant.newpass}</Text>
            <View style={styles.icontextin}>
              <Textinputs
                refe={newref}
                secureTextEntry={isnewshow}
                keyboardType="number-pad"
                style={styles.oldtextin}
                value={newpass}
                placeholder={appConstant.passplace}
                color={colors.labelgrey}
                onChangeText={text => {
                  setNewpass(text);
                  !text
                    ? setErrNewpass(false)
                    : text.length < 6
                    ? setErrNewpass(true)
                    : setErrNewpass(false);
                }}
                onSubmitEditing={() => {
                  confref?.current.focus();
                  !newpass
                    ? setErrNewpass(false)
                    : newpass.length < 6
                    ? setErrNewpass(true)
                    : setErrNewpass(false);
                }}
                returnKeyType="next"
              />

              <TouchableOpacity
                style={styles.icon}
                onPress={() => setNewshow(!isnewshow)}>
                {isnewshow ? (
                  <SvgIcon.hide width={rw(5)} height={rh(5)} />
                ) : (
                  <SvgIcon.show width={rw(5)} height={rh(5)} />
                )}
              </TouchableOpacity>
            </View>
            {errnewpass ? (
              <Text style={styles.errname}>{appConstant.validpass}</Text>
            ) : null}

            <Text style={styles.passtxt}>{appConstant.cofirmnewpass}</Text>
            <Textinputs
              refe={confref}
              style={styles.textin}
              value={confpass}
              keyboardType="number-pad"
              placeholder={appConstant.passplace}
              color={colors.labelgrey}
              onChangeText={text => {
                setConfpass(text);
                !text
                  ? setErrConfpass(false)
                  : text.length < 6
                  ? setErrConfpass(true)
                  : setErrConfpass(false);

                seterrNotmatch(text.length < 6 ? text !== newpass : false);
              }}
              onSubmitEditing={() => {
                !confpass
                  ? setErrConfpass(false)
                  : confpass.length < 6
                  ? setErrConfpass(true)
                  : setErrConfpass(false);

                confpass !== newpass
                  ? seterrNotmatch(true)
                  : seterrNotmatch(false);
              }}
              returnKeyType="done"
            />
            {errconfpass ? (
              <Text style={styles.errname}>{appConstant.validpass}</Text>
            ) : null}
            {errnotmatch ? (
              <Text style={styles.errname}>{appConstant.notmatch}</Text>
            ) : null}

            <Button
              style={styles.touchsignin}
              text={appConstant.changepass}
              textstyle={styles.submit}
              onPress={handleChangepassword}
            />
          </View>
        )}

        {/* CHANGE ADDRESS */}
        {isopen[item?.key] && item?.key === 'address' && (
          <>
            <Line1 />

            <View style={styles.addview}>
              <View style={styles.prodesc}>
                <Customview
                  style={styles.comp}
                  headstyle={styles.htext}
                  head={appConstant.address}
                  text={address}
                  textstyle={styles.btext}
                />

                <Customview
                  style={styles.comp}
                  headstyle={styles.htext}
                  head={appConstant.addline}
                  text={addline}
                  textstyle={styles.btext}
                />
              </View>

              <View style={styles.prodesc}>
                <Customview
                  style={styles.comp}
                  headstyle={styles.htext}
                  head={appConstant.locality}
                  text={locality}
                  textstyle={styles.btext}
                />

                <Customview
                  style={styles.comp}
                  headstyle={styles.htext}
                  head={appConstant.city}
                  text={city}
                  textstyle={styles.btext}
                />
              </View>

              <View style={styles.prodesc}>
                <Customview
                  style={styles.comp}
                  headstyle={styles.htext}
                  head={appConstant.state}
                  text={state}
                  textstyle={styles.btext}
                />

                <Customview
                  style={styles.comp}
                  headstyle={styles.htext}
                  head={appConstant.pincode}
                  text={pincode}
                  textstyle={styles.btext}
                />
              </View>

              <TouchableOpacity
                style={styles.dot}
                onPress={() => {
                  const data = {
                    address: address,
                    addline: addline,
                    locality: locality,
                    city: city,
                    pincode: pincode,
                    state: state,
                    id: addressid,
                  };
                  navigation.navigate(appConstant.createadd, {
                    data: data,
                    from: 'edit',
                  });
                }}>
                <SvgIcon.popedit width={rw(4.5)} height={rh(4)} />
              </TouchableOpacity>
            </View>

            <Button
              style={styles.addresstouch}
              text={appConstant.addnewaddress}
              textstyle={styles.submit}
              onPress={() => navigation.navigate(appConstant.createadd)}
            />
          </>
        )}

        {/* COMPANY DETAILS */}
        {isopen[item?.key] && item?.key === 'compdetail' && (
          <>
            <Line1 />
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
              <View style={styles.areaview1}>
                <TouchableOpacity
                  style={styles.uploadview}
                  onPress={() => setCamera(true)}>
                  <SvgIcon.plus width={rw(7.5)} height={rh(7.5)} />
                </TouchableOpacity>
              </View>
            )}

            <Text style={styles.uploadtext}>{appConstant.updatelogo}</Text>

            <View style={styles.areaview1}>
              <View style={styles.compname}>
                <View
                  style={[
                    styles.compshop,
                    errgstno ? null : {marginBottom: rh(3.5)},
                  ]}>
                  {gstno ? (
                    <>
                      <Text style={styles.comptxt}>{appConstant.gstno}</Text>
                      {/* GST NO */}
                      <Textinputs
                        color={colors.black}
                        value={gstno}
                        style={styles.textin1}
                        onChangeText={text => {
                          setGstno(text.toUpperCase());
                          !text
                            ? setErrGstno(false)
                            : !reggst.test(text)
                            ? setErrGstno(true)
                            : setErrGstno(false);
                        }}
                        onSubmitEditing={() => {
                          compref?.current.focus();
                          !gstno
                            ? setErrGstno(false)
                            : !reggst.test(gstno)
                            ? setErrGstno(true)
                            : setErrGstno(false);
                        }}
                        returnKeyType="next"
                      />

                      {errgstno ? (
                        <Text style={styles.errname}>{appConstant.gsterr}</Text>
                      ) : null}
                    </>
                  ) : (
                    <>
                      <Text style={styles.comptxt}>{appConstant.panno}</Text>
                      {/* PAN NO */}
                      <Textinputs
                        color={colors.black}
                        value={panno}
                        style={styles.textin1}
                        onChangeText={text => {
                          setPanno(text.toUpperCase());
                          !text
                            ? setErrPanno(false)
                            : !regpan.test(text)
                            ? setErrPanno(true)
                            : setErrPanno(false);
                        }}
                        onSubmitEditing={() => {
                          compref?.current.focus();
                          !gstno
                            ? setErrPanno(false)
                            : !regpan.test(panno)
                            ? setErrPanno(true)
                            : setErrPanno(false);
                        }}
                        returnKeyType="next"
                      />

                      {errpanno ? (
                        <Text style={styles.errname}>{appConstant.panerr}</Text>
                      ) : null}
                    </>
                  )}
                </View>

                {/* COMPANYCODE */}
                <View
                  style={[
                    styles.compshop,
                    errgstno
                      ? {marginBottom: rh(3.6)}
                      : {marginBottom: rh(3.6)},
                  ]}>
                  <Text style={styles.comptxt}>{appConstant.compcode}</Text>
                  <View style={styles.textin1}>
                    <Text style={styles.compcode}>{compcode}</Text>
                  </View>
                </View>
              </View>

              {/* COMPANY NAME */}
              <View style={styles.compname}>
                <View
                  style={[
                    styles.compshop,
                    errcomp ? null : {marginBottom: rh(3.5)},
                  ]}>
                  <Text style={styles.comptxt}>{appConstant.complace}</Text>
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
                    style={styles.textin1}
                    onSubmitEditing={() => {
                      nameref?.current.focus();
                      !comp
                        ? setErrComp(false)
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

                {/* NAME */}
                <View
                  style={[
                    styles.compshop,
                    errname ? null : {marginBottom: rh(3.5)},
                  ]}>
                  <Text style={styles.comptxt}>{appConstant.name}</Text>
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
                    style={styles.textin1}
                    onSubmitEditing={() => {
                      addref?.current.focus();
                      !name
                        ? setErrName(false)
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

              {/* ADDRESS NAME */}
              <View style={styles.compname}>
                <View
                  style={[
                    styles.compshop,
                    erraddress ? null : {marginBottom: rh(3.5)},
                  ]}>
                  <Text style={styles.comptxt}>{appConstant.address}</Text>
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
                    style={styles.textin1}
                    onSubmitEditing={() => {
                      phoneref?.current.focus();
                      !address
                        ? setErrAddress(false)
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

                {/* PHONE NUMBER */}
                <View
                  style={[
                    styles.compshop,
                    errnumber ? null : {marginBottom: rh(3.5)},
                  ]}>
                  <Text style={styles.comptxt}>{appConstant.phonenumber}</Text>
                  <View style={styles.phone1}>
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
                        addlineref?.current.focus();
                        !number
                          ? setErrNumber(false)
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
              </View>

              {/* ADDLINE */}
              <View style={styles.addline}>
                <Text style={styles.comptxt}>{appConstant.addline}</Text>
                <Textinputs
                  refe={addlineref}
                  value={addline}
                  onChangeText={text => {
                    !text
                      ? setErrAddline(false)
                      : text.length < 3
                      ? setErrAddline(true)
                      : setErrAddline(false);
                    setAddline(text);
                  }}
                  color={colors.black}
                  style={styles.textin1}
                  onSubmitEditing={() => {
                    localityref?.current.focus();
                    !addline
                      ? setErrAddline(false)
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
                  <Text style={styles.comptxt}>{appConstant.locality}</Text>
                  <Textinputs
                    refe={localityref}
                    value={locality}
                    color={colors.black}
                    onChangeText={text => {
                      !text
                        ? setErrLocality(false)
                        : text.length < 3
                        ? setErrLocality(true)
                        : setErrLocality(false);
                      setLocality(text);
                    }}
                    style={styles.textin1}
                    onSubmitEditing={() => {
                      pincoderef?.current.focus();
                      !locality
                        ? setErrLocality(false)
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

                {/* PINCODE */}
                <View
                  style={[
                    styles.compshop,
                    errpincode ? null : {marginBottom: rh(3.5)},
                  ]}>
                  <Text style={styles.comptxt}>{appConstant.pincode}</Text>
                  <Textinputs
                    refe={pincoderef}
                    value={pincode}
                    color={colors.black}
                    onChangeText={text => {
                      !text
                        ? setErrPincode(false)
                        : text.length < 3
                        ? setErrPincode(true)
                        : setErrPincode(false);
                      setPincode(text);
                    }}
                    style={styles.textin1}
                    onSubmitEditing={() => {
                      cityref?.current.focus();
                      !pincode
                        ? setErrPincode(false)
                        : pincode.length < 3
                        ? setErrPincode(true)
                        : setErrPincode(false);
                    }}
                    returnKeyType="next"
                  />
                  {errpincode ? (
                    <Text style={styles.errname}>{appConstant.pinerr}</Text>
                  ) : null}
                </View>
              </View>

              {/* CITY STATE*/}
              <View style={styles.compname}>
                <View
                  style={[
                    styles.compshop,
                    errcity ? null : {marginBottom: rh(3.5)},
                  ]}>
                  <Text style={styles.comptxt}>{appConstant.city}</Text>
                  <Textinputs
                    refe={cityref}
                    value={city}
                    color={colors.black}
                    onChangeText={text => {
                      !text
                        ? setErrCity(false)
                        : text.length < 3
                        ? setErrCity(true)
                        : setErrCity(false);
                      setCity(text);
                    }}
                    style={styles.textin1}
                    onSubmitEditing={() => {
                      !city
                        ? setErrCity(false)
                        : city.length < 3
                        ? setErrCity(true)
                        : setErrCity(false);
                    }}
                    returnKeyType="next"
                  />
                  {errcity ? (
                    <Text style={styles.errname}>{appConstant.cityerr}</Text>
                  ) : null}
                </View>

                {/* STATE */}
                <View
                  style={[
                    styles.compshop,
                    errstate ? null : {marginBottom: rh(3.5)},
                  ]}>
                  <Text style={styles.comptxt}>{appConstant.state}</Text>
                  <TouchableOpacity
                    style={styles.textin1}
                    onPress={() => setStatemodal(true)}>
                    <Text style={styles.state}>{state ? state : null}</Text>
                    <SvgIcon.down_arrow width={rw(7)} height={rh(3)} />
                  </TouchableOpacity>
                  {errstate ? (
                    <Text style={styles.errname}>{appConstant.staterr}</Text>
                  ) : null}
                </View>
              </View>

              <Button
                style={styles.addresstouch}
                text={appConstant.updateinfo}
                textstyle={styles.submit}
                onPress={handleCompanydetails}
              />
            </View>
          </>
        )}
      </View>
    );
  };

  const handleChangepassword = async () => {
    if (await handleError()) {
      console.log('Encoutered error.....');
    } else {
      try {
        setLoading(true);

        const data = {
          oldPassword: oldpass,
          newPassword: newpass,
        };

        console.log(data);

        const response = await changepasswords(dispatch, data);
        console.log(response, 'change password response');

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
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleCompanydetails = async () => {
    if (await handleError1()) {
      console.log('Encoutered error.....');
    } else {
      try {
        setLoading(true);

        const formData = new FormData();

        gstno
          ? formData.append('gstNo', gstno)
          : formData.append('panNo', panno);
        formData.append('companyName', comp);
        formData.append('name', name);
        formData.append('phone', number);
        formData.append('addressName', address);
        formData.append('addressLine', addline);
        formData.append('locality', locality);
        formData.append('pincode', pincode);
        formData.append('city', city);
        formData.append('state', state);

        console.log(formData, '.....', compid);

        const response = await updatecompanies(dispatch, compid, formData);
        console.log(response, 'update company response');

        if (!response?.error) {
          handleMessage(
            appConstant.Success,
            response?.message,
            appConstant.success,
          );
          handleCompany();
          handleAddress();
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
      }
    }
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.clear();
      handleMessage(
        appConstant.Success,
        appConstant.logoutsuccess,
        appConstant.success,
      );
      navigation.navigate(appConstant.login);
    } catch (error) {
      console.error(error);
      handleMessage(appConstant.error, error, appConstant.danger);
    }
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

  const handleSelect = item => {
    setErrState(false);
    console.log(item);
    setState(item);
    setStatemodal(false);
    setFilterdata(states);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Loader visible={isloading} />

      <Statemodal
        visible={isstatemodal}
        onPress={() => setStatemodal(false)}
        onselect={handleSelect}
        data={filterdata}
        onChangeText={handleSearch}
      />

      <Bottommodal
        visible={iscamera}
        onPress={() => setCamera(false)}
        onGallery={handleGallery}
        OnCamera={handleCamera}
      />

      <Delemodal
        visible={visible}
        onCancel={() => setVisible(false)}
        message={appConstant.logoutmessage}
        buttontext={appConstant.logout}
        onPress={handleLogout}
      />

      <View style={styles.head}>
        <TouchableOpacity
          style={styles.back}
          onPress={() => navigation.goBack()}>
          <SvgIcon.arrowleft width={rh(3.5)} height={rh(3.5)} />
        </TouchableOpacity>

        <Text style={styles.text}>{appConstant.profile}</Text>
      </View>

      <View>
        <FlatList
          data={profiledata}
          keyExtractor={item => item?.key}
          renderItem={renderItem}
        />
      </View>

      <TouchableOpacity style={styles.delete} onPress={() => setVisible(true)}>
        <SvgIcon.del width={rh(2.8)} height={rh(2.8)} />
        <Text style={styles.txt}>{appConstant.logout}</Text>
      </TouchableOpacity>
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
    fontSize: rf(2.5),
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

  areaview1: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: rw(3),
  },

  prodesc: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  delete: {
    backgroundColor: colors.white,
    margin: rw(4),
    borderRadius: 10,
    elevation: 15,
    shadowColor: colors.labelgrey,
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.8,
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

  comptxt: {
    color: colors.black,
    fontFamily: fonts.semibold,
    fontSize: rf(1.7),
    marginLeft: rw(1.5),
  },

  passtxt: {
    color: colors.black,
    fontFamily: fonts.semibold,
    fontSize: rf(1.7),
    marginLeft: rw(4),
    margin: rh(1),
  },

  line: {
    alignItems: 'center',
  },

  addview: {
    backgroundColor: colors.grey,
    borderRadius: 10,
    padding: rw(2),
    marginHorizontal: rw(5),
    margin: rh(1),
  },

  comp: {
    width: rw(35),
    marginRight: rw(1),
  },

  htext: {
    fontSize: rf(1.5),
    color: colors.black,
    fontFamily: fonts.semibold,
  },

  dot: {
    position: 'absolute',
    right: rw(3),
    top: rh(0.3),
  },

  btext: {
    fontSize: rf(1.6),
    color: colors.labelgrey,
    marginBottom: rw(2),
    fontFamily: fonts.medium,
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

  phone1: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.grey,
    borderRadius: 13,
  },

  phonetext: {
    width: rw(32),
    padding: rw(3),
    fontSize: rf(1.9),
    color: colors.labelgrey,
    fontFamily: fonts.medium,
  },

  phonetxt: {
    color: colors.labelgrey,
    fontSize: rf(1.9),
    fontFamily: fonts.semibold,
  },

  icontextin: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.grey,
    color: colors.black,
    marginHorizontal: rw(3),
    borderRadius: 13,
    fontSize: rf(1),
    fontFamily: fonts.medium,
  },

  oldtextin: {
    width: rw(70),
    marginLeft: rw(3),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    color: colors.labelgrey,
    fontSize: rf(1.7),
    fontFamily: fonts.medium,
  },

  textin: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.grey,
    color: colors.labelgrey,
    marginHorizontal: rw(4),
    paddingLeft: rw(4),
    borderRadius: 13,
    fontSize: rf(1.7),
    marginBottom: rh(0.5),
    fontFamily: fonts.medium,
  },

  textin1: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.grey,
    color: colors.labelgrey,
    borderRadius: 13,
    padding: rh(1.4),
    fontSize: rf(1.9),
    fontFamily: fonts.medium,
  },

  compcode: {
    color: colors.labelgrey,
    fontSize: rf(1.9),
    fontFamily: fonts.medium,
    padding: rw(1),
  },

  touchsignin: {
    alignItems: 'center',
    marginTop: rh(2),
    marginBottom: rh(2.5),
    backgroundColor: colors.primary,
    borderRadius: 10,
    padding: rw(3),
    marginLeft: rw(20),
    marginRight: rw(20),
  },

  addresstouch: {
    alignItems: 'center',
    marginTop: rh(1),
    marginBottom: rh(2),
    backgroundColor: colors.primary,
    borderRadius: 10,
    padding: rw(3),
    marginLeft: rw(18),
    marginRight: rw(18),
  },

  submit: {
    color: colors.white,
    fontSize: rf(1.7),
    fontFamily: fonts.bold,
  },

  errname: {
    textAlign: 'right',
    color: colors.red,
    fontSize: rf(1.5),
    marginRight: rw(5),
    fontFamily: fonts.medium,
  },

  icon: {
    right: rw(4),
  },

  uploadview: {
    width: rw(22.5),
    height: rh(12.5),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    backgroundColor: colors.grey,
  },

  uploadtext: {
    textAlign: 'center',
    fontSize: rf(1.9),
    margin: rh(0.6),
    fontFamily: fonts.semibold,
    color: colors.primary,
  },

  compname: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  compshop: {
    margin: rw(2),
    width: rw(41),
  },

  addline: {
    margin: rw(2),
    width: rw(86),
  },

  code: {
    fontSize: rf(1.7),
    marginLeft: rw(2),
    color: colors.black,
    fontFamily: fonts.semibold,
  },

  logoview: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
    marginTop: rh(1),
  },

  logo: {
    width: rw(30),
    height: rh(16.6),
    borderRadius: 20,
    resizeMode: 'cover',
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
    right: rw(27),
  },

  state: {
    width: rw(30),
    color: colors.labelgrey,
    fontFamily: fonts.medium,
    borderRadius: 13,
    padding: rw(0.5),
    fontSize: rf(1.8),
  },
});
