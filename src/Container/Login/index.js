import {useNavigation} from '@react-navigation/native';
import React, {useRef, useState} from 'react';
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
import {Verifymodal} from '../../Components/Verifymodal';
import {appConstant} from '../../helper/appconstants';
import {images} from '../../assets/Images';
import {colors} from '../../assets/colors';
import {fonts} from '../../assets/fonts';
import {Loader} from '../../Components/Loader';
import {login, resendmail} from '../../Api/Authentication';
import {useDispatch} from 'react-redux';
import {handleMessage, regemail} from '../../helper/utils';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {
  responsiveFontSize as rf,
  responsiveHeight as rh,
  responsiveWidth as rw,
} from 'react-native-responsive-dimensions';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const Login = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [visible, setVisible] = useState(false);
  const [isshow, setShow] = useState(true);
  const [isLoading, setLoading] = useState(false);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const [erremail, setErrmail] = useState(false);
  const [errpassword, setErrPassword] = useState(false);
  const emailref = useRef(null);
  const passref = useRef(null);

  const handleEmpty = () => {
    setEmail('');
    setPassword('');
  };

  const handleFalse = () => {
    setErrmail(false);
    setErrPassword(false);
  };

  const handleError = async () => {
    var errorstatus = false;
    if (!email || !regemail.test(email)) {
      setErrmail(true);
      errorstatus = true;
    } else if (!password || password.length < 6) {
      setErrPassword(true);
      errorstatus = true;
    } else {
      handleFalse();
      errorstatus = false;
    }
    return errorstatus;
  };

  const handleLogin = async () => {
    if (await handleError()) {
      console.log('Errors encountered. Unable to log in.');
    } else {
      try {
        const data = {
          email: email,
          password: password,
        };

        setLoading(true);

        const response = await login(dispatch, data);
        console.log(response, 'login response');

        if (!response?.error) {
          handleEmpty();
          handleMessage(
            appConstant.Success,
            response?.message,
            appConstant.success,
          );
          const compname = response?.result?.company?.companyName;
          await AsyncStorage.setItem('Data', JSON.stringify(data));

          if (compname) {
            navigation.navigate(appConstant.dashboard);
          } else {
            navigation.navigate(appConstant.companydetails);
          }
        } else {
          if (response?.message === 'Please verify email...') {
            setVisible(true);
          } else {
            handleMessage(
              appConstant.error,
              response?.message ? response?.message : response,
              appConstant.danger,
            );
          }
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleresend = async () => {
    try {
      setVisible(false);
      setLoading(true);

      const data = {email: email};

      const response = await resendmail(dispatch, data);
      console.log(response, 'resend response');
      if (response?.error) {
        handleEmpty();
        handleMessage(appConstant.error, response?.message, appConstant.danger);
      } else {
        handleEmpty();
        handleMessage(
          appConstant.Success,
          response?.message,
          appConstant.success,
        );
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Loader visible={isLoading} />

      <Verifymodal
        visible={visible}
        heading={appConstant.verify}
        message={appConstant.message}
        button={appConstant.resend}
        onClose={() => setVisible(false)}
        onPress={handleresend}
      />

      <ImageBackground source={images.backimg} style={styles.backimg}>
        <View style={styles.head}>
          <SvgIcon.ordertank width={rw(55)} height={rh(55)} />

          <Text style={styles.sign}>{appConstant.signin}</Text>
        </View>
      </ImageBackground>

      <KeyboardAwareScrollView
        bounces={false}
        alwaysBounceVertical={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.mainview}>
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
            onSubmitEditing={async () => {
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
            onSubmitEditing={async () => {
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
          <Text style={styles.errname}>{appConstant.minlength}</Text>
        ) : null}

        <Button
          style={styles.forgotpass}
          text={appConstant.forgotpassword}
          textstyle={styles.forgotetxt}
          onPress={() => {
            navigation.navigate(appConstant.forgot);
            handleEmpty();
          }}
        />

        <Button
          style={styles.touchsignin}
          text={appConstant.signin}
          textstyle={styles.signin}
          onPress={handleLogin}
        />

        <View style={styles.touchsignup}>
          <Text style={styles.noacc1}>{appConstant.noaccount}</Text>
          <TouchableOpacity
            style={styles.noacc2}
            onPress={() => {
              handleEmpty();
              navigation.navigate(appConstant.register);
            }}>
            <Text style={styles.noacc3}>{appConstant.signup}</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
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

  mainview: {marginTop: rh(2)},

  logo: {
    width: rh(30),
    height: rh(6.2),
    marginTop: rh(12),
  },

  forgotpass: {
    marginLeft: rw(55),
  },

  forgotetxt: {
    textAlign: 'right',
    marginRight: rw(6),
    color: colors.primary,
    fontSize: rf(1.9),
    fontFamily: fonts.bold,
  },

  sign: {
    color: colors.primary,
    position: 'absolute',
    fontFamily: fonts.bold,
    bottom: rh(4),
    fontSize: rf(2.7),
  },

  email: {
    color: colors.labelgrey,
    fontSize: rf(2),
    marginLeft: rw(7),
    fontFamily: fonts.medium,
  },

  distouchsignin: {
    alignItems: 'center',
    marginTop: rh(6),
    backgroundColor: colors.grey,
    borderRadius: 10,
    padding: rw(3.4),
    marginLeft: rw(10),
    marginRight: rw(10),
  },

  touchsignin: {
    alignItems: 'center',
    marginTop: rh(6),
    backgroundColor: colors.primary,
    borderRadius: 10,
    padding: rw(3.4),
    marginLeft: rw(10),
    marginRight: rw(10),
  },

  touchsignup: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    margin: rw(4),
  },

  dissignin: {
    color: colors.primary,
    fontSize: rf(2.1),
    fontFamily: fonts.bold,
  },

  signin: {
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
    margin: rh(2),
    flexDirection: 'row',
    backgroundColor: colors.grey,
    alignItems: 'center',
    borderRadius: 20,
    paddingLeft: rw(5),
  },

  mailtextin: {
    padding: rw(4),
    width: rw(76),
    marginLeft: rw(2),
    color: colors.black,
    fontSize: rf(2),
    fontFamily: fonts.medium,
  },

  passtextin: {
    padding: rw(4),
    width: rw(67),
    marginLeft: rw(2),
    color: colors.black,
    fontSize: rf(2),
    fontFamily: fonts.medium,
  },

  errname: {
    color: colors.red,
    fontSize: rf(1.8),
    textAlign: 'right',
    marginRight: rw(7),
    fontFamily: fonts.medium,
  },
});
