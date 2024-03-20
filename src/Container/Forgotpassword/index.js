import {
  View,
  SafeAreaView,
  Text,
  ImageBackground,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useRef, useState} from 'react';
import {colors} from '../../assets/colors';
import {fonts} from '../../assets/fonts';
import {appConstant} from '../../helper/appconstants';
import {images} from '../../assets/Images';
import {SvgIcon} from '../../assets/SvgIcon';
import {handleMessage, regemail} from '../../helper/utils';
import {useNavigation} from '@react-navigation/native';
import {Button} from '../../Components/Button';
import {Resendmodal} from '../../Components/resendmodal';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {
  responsiveFontSize as rf,
  responsiveHeight as rh,
  responsiveWidth as rw,
} from 'react-native-responsive-dimensions';
import {forgotpass} from '../../Api/Authentication';
import {useDispatch} from 'react-redux';
import {Loader} from '../../Components/Loader';

export const Forgotpassword = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [email, setEmail] = useState();
  const [erremail, setErrmail] = useState(false);
  const [visible, setVisible] = useState(false);
  const [isshow, setShow] = useState(false);

  const emailref = useRef(null);

  const handleForgotpass = async () => {
    if (!email || !regemail.test(email)) {
      setErrmail(true);
    } else {
      const data = {
        email: email,
      };

      try {
        setShow(true);

        const response = await forgotpass(dispatch, data);
        console.log(response, 'forgot response');

        if (!response?.error) {
          setEmail('');
          handleMessage(
            appConstant.Success,
            response?.message,
            appConstant.success,
          );
          setVisible(true);
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
        setShow(false);
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Loader visible={isshow} />

      <Resendmodal
        visible={visible}
        onPress={() => {
          setVisible(false);
          navigation.navigate(appConstant.login);
        }}
      />
      <ImageBackground source={images.backimg} style={styles.backimg}>
        <View style={styles.head}>
          <SvgIcon.ordertank width={rw(55)} height={rh(55)} />

          <Text style={styles.sign}>{appConstant.forgotpassword}</Text>
        </View>
      </ImageBackground>

      <View style={styles.main}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.back}>
          <SvgIcon.back width={rw(7.5)} height={rh(7.5)} />
        </TouchableOpacity>
      </View>

      <KeyboardAwareScrollView
        bounces={false}
        alwaysBounceVertical={false}
        showsVerticalScrollIndicator={false}>
        <Text style={styles.email}>{appConstant.email}: </Text>

        <View style={styles.svgbox}>
          <SvgIcon.email width={rw(5)} height={rh(5)} />
          <TextInput
            ref={emailref}
            placeholder={appConstant.emailplace}
            placeholderTextColor="black"
            style={styles.textin}
            value={email}
            blurOnSubmit
            returnKeyType="done"
            onBlur={() => {
              !email
                ? null
                : !regemail.test(email)
                ? setErrmail(true)
                : setErrmail(false);
            }}
            keyboardTpe="email-address"
            onChangeText={text => setEmail(text)}
          />
        </View>
        {erremail ? (
          <Text style={styles.errname}>{appConstant.validemail}</Text>
        ) : null}

        <Button
          style={styles.touchsignin}
          text={appConstant.signup}
          textstyle={styles.signin}
          onPress={handleForgotpass}
        />
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

  back: {
    width: rw(10),
    alignItems: 'center',
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

  main: {
    margin: rw(2),
    marginLeft: rw(3),
  },

  email: {
    color: colors.labelgrey,
    fontSize: rf(1.9),
    marginLeft: rw(7),
    fontFamily: fonts.medium,
  },

  textin: {
    padding: rw(3.5),
    width: rw(76),
    marginLeft: rw(2),
    color: colors.black,
    fontSize: rf(1.9),
    fontFamily: fonts.medium,
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
    padding: rw(0.5),
  },

  errname: {
    color: colors.red,
    fontSize: rf(1.8),
    textAlign: 'right',
    marginRight: rw(7),
    fontFamily: fonts.medium,
  },

  touchsignin: {
    alignItems: 'center',
    marginTop: rh(6),
    backgroundColor: colors.primary,
    borderRadius: 10,
    padding: rw(4),
    marginLeft: rw(10),
    marginRight: rw(10),
  },

  signin: {
    color: colors.white,
    fontSize: rf(2.1),
    fontFamily: fonts.bold,
  },

  distouchsignin: {
    alignItems: 'center',
    marginTop: rh(6),
    backgroundColor: colors.grey,
    borderRadius: 10,
    padding: rw(3),
    marginLeft: rw(10),
    marginRight: rw(10),
  },

  dissignin: {
    color: colors.primary,
    fontSize: rf(2.1),
    fontFamily: fonts.bold,
  },
});
