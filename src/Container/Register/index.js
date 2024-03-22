import {useNavigation} from '@react-navigation/native';
import React, {useState, useRef} from 'react';
import {
  Text,
  StyleSheet,
  SafeAreaView,
  ImageBackground,
  View,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {Button} from '../../Components/Button';
import {SvgIcon} from '../../assets/SvgIcon';
import {appConstant} from '../../helper/appconstants';
import {images} from '../../assets/Images';
import {colors} from '../../assets/colors';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {fonts} from '../../assets/fonts';
import {register} from '../../Api/Authentication';
import {useDispatch} from 'react-redux';
import {Loader} from '../../Components/Loader';
import {handleMessage, regemail} from '../../helper/utils';
import {
  responsiveFontSize as rf,
  responsiveHeight as rh,
  responsiveWidth as rw,
} from 'react-native-responsive-dimensions';
import {Verifymodal} from '../../Components/Verifymodal';

export const Register = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [isshow, setShow] = useState(true);
  const [isloading, setLoading] = useState(false);
  const [isverify, setVerify] = useState(false);
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState();

  const [errname, setErrname] = useState(false);
  const [errnumber, setErrnumber] = useState(false);
  const [erremail, setErrmail] = useState(false);
  const [errpassword, setErrPassword] = useState(false);

  const nameref = useRef(null);
  const numberref = useRef(null);
  const emailref = useRef(null);
  const passref = useRef(null);

  const handleempty = () => {
    setName('');
    setNumber('');
    setEmail('');
    setPassword('');
  };

  const handleFalse = () => {
    setErrname(false);
    setErrnumber(false);
    setErrmail(false);
    setErrPassword(false);
  };

  const handleError = async () => {
    let errorstatus = false;

    if (!name || name.length < 3) {
      setErrname(true);
      errorstatus = true;
    } else {
      setErrname(false);
    }

    if (!number || number.length <= 9) {
      setErrnumber(true);
      errorstatus = true;
    } else {
      setErrnumber(false);
    }

    if (!email || !regemail.test(email)) {
      setErrmail(true);
      errorstatus = true;
    } else {
      setErrmail(false);
    }

    if (!password || password.length < 6) {
      setErrPassword(true);
      errorstatus = true;
    } else {
      setErrPassword(false);
    }

    if (!errorstatus) {
      handleFalse();
    }

    return errorstatus;
  };

  const handleSignup = async () => {
    if (await handleError()) {
      console.log('Errors encountered. Unable to log in.');
    } else {
      const data = {
        name: name,
        email: email,
        password: password,
        phone: number,
      };

      try {
        setLoading(true);

        const response = await register(data, dispatch);
        console.log(response, 'register response');

        if (!response?.error) {
          handleempty();
          handleMessage(
            appConstant.Success,
            response?.message,
            appConstant.success,
          );
          setVerify(true);
        } else {
          handleMessage(
            appConstant.error,
            response?.message,
            appConstant.danger,
          );
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Loader visible={isloading} />

      <Verifymodal
        visible={isverify}
        heading={appConstant.created}
        message={appConstant.invitaion}
        button={appConstant.ok}
        onClose={() => {
          setVerify(false);
          navigation.navigate(appConstant.login);
        }}
        onPress={() => {
          setVerify(false);
          navigation.navigate(appConstant.login);
        }}
      />

      <ImageBackground source={images.backimg} style={styles.backimg}>
        <View style={styles.head}>
          <SvgIcon.ordertank width={rw(55)} height={rh(55)} />
          <Text style={styles.sign}>{appConstant.signup}</Text>
        </View>
      </ImageBackground>

      <KeyboardAwareScrollView
        bounces={false}
        alwaysBounceVertical={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.mainview}>
        <Text style={styles.email}>{appConstant.name}: </Text>

        <View style={styles.svgbox}>
          <SvgIcon.avtar width={rw(5)} height={rh(5)} />

          <TextInput
            ref={nameref}
            placeholder={appConstant.nameplace}
            placeholderTextColor="black"
            style={styles.nametextin}
            value={name}
            returnKeyType="next"
            onSubmitEditing={() => {
              numberref?.current.focus();
              !name
                ? null
                : name.length < 3
                ? setErrname(true)
                : setErrname(false);
            }}
            keyboardType="name-phone-pad"
            onChangeText={text => {
              !text
                ? setErrname(false)
                : text.length < 3
                ? setErrname(true)
                : setErrname(false);
              setName(text);
            }}
          />
        </View>
        {errname ? (
          <Text style={styles.errname}>{appConstant.validname}</Text>
        ) : null}

        <Text style={styles.email}>{appConstant.mobilenumber}: </Text>

        <View style={styles.svgbox}>
          <SvgIcon.call width={rw(5)} height={rh(5)} />
          <Text style={styles.code}>{appConstant.code}</Text>

          <TextInput
            ref={numberref}
            placeholder={appConstant.numberplace}
            placeholderTextColor="black"
            style={styles.numtextin}
            value={number}
            maxLength={10}
            returnKeyType="next"
            onSubmitEditing={() => {
              emailref?.current.focus();
              !number
                ? null
                : number.length < 9
                ? setErrnumber(true)
                : setErrnumber(false);
            }}
            keyboardType="number-pad"
            onChangeText={text => {
              !text
                ? setErrnumber(false)
                : text.length <= 9
                ? setErrnumber(true)
                : setErrnumber(false);
              setNumber(text);
            }}
          />
        </View>
        {errnumber ? (
          <Text style={styles.errname}>{appConstant.validnumber}</Text>
        ) : null}

        <Text style={styles.email}>{appConstant.email}: </Text>

        <View style={styles.svgbox}>
          <SvgIcon.email width={rw(5)} height={rh(5)} />

          <TextInput
            ref={emailref}
            placeholder={appConstant.emailplace}
            placeholderTextColor="black"
            style={styles.mailtextin}
            value={email}
            blurOnSubmit
            returnKeyType="next"
            onSubmitEditing={() => {
              passref?.current.focus();
              !email
                ? null
                : !regemail.test(email)
                ? setErrmail(true)
                : setErrmail(false);
            }}
            keyboardTpe="email-address"
            onChangeText={text => {
              !text
                ? setErrmail(false)
                : !regemail.test(text)
                ? setErrmail(true)
                : setErrmail(false);
              setEmail(text.trim());
            }}
          />
        </View>
        {erremail ? (
          <Text style={styles.errname}>{appConstant.validemail}</Text>
        ) : null}

        <Text style={styles.email}>{appConstant.password}: </Text>

        <View style={styles.svgbox}>
          <SvgIcon.lock width={rw(5)} height={rh(5)} />

          <TextInput
            ref={passref}
            placeholder={appConstant.passplace}
            placeholderTextColor="black"
            style={styles.passtextin}
            returnKeyType="done"
            blurOnSubmit
            onSubmitEditing={() => {
              !password
                ? null
                : password.length < 6
                ? setErrPassword(true)
                : setErrPassword(false);
            }}
            secureTextEntry={isshow}
            value={password}
            keyboardType="numeric"
            onChangeText={text => {
              !text
                ? setErrPassword(false)
                : text.length < 6
                ? setErrPassword(true)
                : setErrPassword(false);
              setPassword(text);
            }}
          />

          <TouchableOpacity onPress={() => setShow(!isshow)}>
            {isshow ? (
              <SvgIcon.hide width={rw(5)} height={rh(5)} />
            ) : (
              <SvgIcon.show width={rw(5)} height={rh(5)} />
            )}
          </TouchableOpacity>
        </View>
        {errpassword ? (
          <Text style={styles.errname}>{appConstant.validpass}</Text>
        ) : null}

        <Button
          style={styles.touchsignin}
          text={appConstant.signup}
          textstyle={styles.signup}
          onPress={handleSignup}
        />

        <View style={styles.touchsignup}>
          <Text style={styles.noacc1}>{appConstant.haveaccount}</Text>
          <Button
            style={styles.noacc2}
            onPress={() => {
              navigation.navigate(appConstant.login);
              handleempty();
            }}
            textstyle={styles.noacc3}
            text={appConstant.signin}
          />
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },

  backimg: {
    alignItems: 'center',
    justifyContent: 'center',
    width: rw(100),
    height: rh(36),
  },

  head: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  logo: {
    width: rh(30),
    height: rh(6.2),
    marginTop: rh(12),
  },

  sign: {
    color: colors.primary,
    position: 'absolute',
    bottom: rh(4),
    fontSize: rf(2.7),
    fontFamily: fonts.bold,
  },

  email: {
    color: colors.labelgrey,
    fontSize: rf(1.8),
    marginLeft: rw(7),
    fontFamily: fonts.medium,
  },

  mainview: {
    marginTop: rw(4),
  },

  forgot: {
    color: colors.primary,
    fontSize: rf(3),
    fontWeight: 'bold',
    textAlign: 'right',
    marginRight: rw(8),
  },

  distouchsignin: {
    alignItems: 'center',
    marginTop: rh(3),
    backgroundColor: colors.grey,
    borderRadius: 10,
    padding: rw(4),
    marginLeft: rw(10),
    marginRight: rw(10),
  },

  touchsignin: {
    alignItems: 'center',
    marginTop: rh(3),
    backgroundColor: colors.primary,
    borderRadius: 10,
    padding: rw(4),
    marginLeft: rw(10),
    marginRight: rw(10),
  },

  touchsignup: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    margin: rw(3),
    marginBottom: rh(6),
  },

  dissignup: {
    color: colors.primary,
    fontSize: rf(2.1),
    fontFamily: fonts.bold,
  },

  signup: {
    color: colors.white,
    fontSize: rf(2.1),
    fontFamily: fonts.bold,
  },

  noacc1: {
    color: colors.black,
    letterSpacing: 0.5,
    fontSize: rf(1.8),
    fontFamily: fonts.medium,
  },

  noacc2: {
    borderBottomColor: colors.primary,
    borderBottomWidth: 2,
  },

  noacc3: {
    color: colors.primary,
    fontFamily: fonts.bold,
  },

  svgbox: {
    margin: rh(1),
    marginLeft: rw(5),
    marginRight: rw(5),
    flexDirection: 'row',
    backgroundColor: colors.grey,
    alignItems: 'center',
    borderRadius: 20,
    paddingLeft: rw(5),
  },

  nametextin: {
    padding: rw(4),
    width: rw(76),
    marginLeft: rw(2),
    color: colors.black,
    fontSize: rf(1.8),
    fontFamily: fonts.medium,
  },

  numtextin: {
    padding: rw(4),
    width: rw(65),
    color: colors.black,
    fontSize: rf(1.8),
    fontFamily: fonts.medium,
  },

  mailtextin: {
    padding: rw(4),
    width: rw(76),
    marginLeft: rw(2),
    color: colors.black,
    fontSize: rf(1.9),
    fontFamily: fonts.medium,
  },

  passtextin: {
    padding: rw(4),
    width: rw(66.5),
    marginLeft: rw(2),
    color: colors.black,
    fontSize: rf(1.8),
    fontFamily: fonts.medium,
  },

  code: {
    marginLeft: rw(5),
    color: colors.black,
    fontWeight: 'bold',
  },

  errname: {
    color: colors.red,
    fontSize: rf(1.7),
    textAlign: 'right',
    marginRight: rw(7),
    fontFamily: fonts.medium,
  },
});
