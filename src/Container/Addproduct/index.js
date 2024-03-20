import React, {useCallback, useEffect, useRef, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {colors} from '../../assets/colors';
import {SvgIcon} from '../../assets/SvgIcon';
import {useNavigation} from '@react-navigation/native';
import {appConstant} from '../../helper/appconstants';
import {fonts} from '../../assets/fonts';
import {useDispatch, useSelector} from 'react-redux';
import {
  responsiveFontSize as rf,
  responsiveHeight as rh,
  responsiveWidth as rw,
} from 'react-native-responsive-dimensions';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import ImageCropPicker from 'react-native-image-crop-picker';
import {Bottommodal} from '../../Components/Bottommodal';
import {Textinputs} from '../../Components/Textinputs';
import {Button} from '../../Components/Button';
import {handleMessage} from '../../helper/utils';
import {getallcategory} from '../../Api/categoryservice';
import {Categorymodal} from '../../Components/Categorymodal';
import {Loader} from '../../Components/Loader';
import {addproduct, editproduct} from '../../Api/productservice';

export const Addproduct = ({route}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const userdetails = useSelector(state => state.login.login_data);
  const compid = userdetails?.result?.id;

  const [logo, setLogo] = useState();
  const [visible, setVisible] = useState(false);
  const [isloading, setLoading] = useState(false);
  const [isshow, setShow] = useState(false);
  const [ischeck, setcheck] = useState(false);
  const [catelist, setCatelist] = useState([]);
  const [filtercatelist, setFiltercatelist] = useState([]);

  const [data, setData] = useState(null);
  const [from, setFrom] = useState(null);
  const [proid, setProid] = useState();

  const [sku, setSku] = useState();
  const [categoryname, setCategoryname] = useState();
  const [categorycode, setCategorycode] = useState();
  const [name, setName] = useState();
  const [price, setPrice] = useState();
  const [unit, setUnit] = useState();
  const [description, setDescription] = useState();

  const [errlogo, setErrlogo] = useState(false);
  const [errsku, setErrSku] = useState(false);
  const [errcategory, setErrcategory] = useState(false);
  const [errname, setErrName] = useState(false);
  const [errprice, setErrPrice] = useState(false);
  const [errunit, setErrUnit] = useState(false);
  const [errdescription, setErrDescription] = useState(false);

  const skuref = useRef(null);
  const nameref = useRef(null);
  const priceref = useRef(null);
  const unitref = useRef(null);
  const descref = useRef(null);

  const handleData = useCallback(async () => {
    setLogo(data?.image);
    setSku(data?.sku);
    setCategoryname(data?.category?.categoryName);
    setCategorycode(data?.category?.id);
    setName(data?.productName);
    setPrice(data?.price);
    setUnit(data?.unit);
    setDescription(data?.description);
    setProid(data?.id);
  }, [data]);

  useEffect(() => {
    if (route?.params?.data) {
      setData(route?.params?.data);
      setFrom(route?.params?.from);
      handleData();
    } else {
      setData(null);
      setFrom(null);
    }
  }, [route?.params, handleData]);

  useEffect(() => {
    handleCategory();
  }, [handleCategory]);

  const handleEmpty = () => {
    setSku('');
    setCategoryname('');
    setCategorycode('');
    setName('');
    setPrice('');
    setUnit('');
    setDescription('');
    setLogo('');
    setcheck(false);
  };

  const handleError = async () => {
    let errorstatus = false;

    if (!logo) {
      setErrlogo(true);
      errorstatus = true;
    }

    if (!sku || !sku.length > 1) {
      setErrSku(true);
      errorstatus = true;
    }

    if (!categoryname) {
      setErrcategory(true);
      errorstatus = true;
    }

    if (!name || name.length < 3) {
      setErrName(true);
      errorstatus = true;
    }

    if (!price || !price.length > 2) {
      setErrPrice(true);
      errorstatus = true;
    }

    if (!unit || !unit.length > 1) {
      setErrUnit(true);
      errorstatus = true;
    }

    if (!description || !description.length > 3) {
      setErrDescription(true);
      errorstatus = true;
    }

    return errorstatus;
  };

  // GET ALL CATEGORY
  const handleCategory = useCallback(async () => {
    try {
      const response = await getallcategory(dispatch, compid);
      console.log(response, 'category response');

      if (!response?.error) {
        setCatelist(response?.result);
        setFiltercatelist(response?.result);
      } else {
        handleMessage(appConstant.error, response?.message, appConstant.danger);
      }
    } catch (error) {
      console.log(error);
    }
  }, [dispatch, compid]);

  const handleCamera = async () => {
    ImageCropPicker.openCamera({
      width: 100,
      height: 100,
      cropping: true,
      mediaType: 'photo',
    })
      .then(image => {
        setVisible(false);
        const uri = image?.path;
        const file = {
          uri: uri,
          type: image?.mime,
          name: 'image.jpg',
        };
        console.log(file);
        setLogo(file);
        setErrlogo(false);
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
        const uri = image?.path;
        const file = {
          uri: uri,
          type: image?.mime,
          name: 'image.jpg',
        };
        console.log(file);
        setLogo(file);
        setErrlogo(false);
      })
      .catch(error => {
        setVisible(false);
        console.log(error);
      });
  };

  const handleSearch = async text => {
    if (!text) {
      setFiltercatelist(catelist);
    } else {
      const filterlist = catelist.filter(c => {
        return c.categoryName.toLowerCase().includes(text.toLowerCase());
      });
      setFiltercatelist(filterlist);
    }
  };

  const handleSelect = text => {
    console.log(text, '...');
    setCategoryname(text?.categoryName);
    setCategorycode(text?.id);
    console.log(categorycode, 'code');
    setShow(false);
    setErrcategory(false);
    setFiltercatelist(catelist);
  };

  const handleAddproduct = async () => {
    if (await handleError()) {
      console.log('Encountered error...');
    } else {
      try {
        setLoading(true);

        const formData = new FormData();
        formData.append('image', logo);
        formData.append('sku', sku);
        formData.append('category', categorycode);
        formData.append('productName', name);
        formData.append('price', price);
        formData.append('unit', unit);
        formData.append('description', description);

        console.log(formData, '...');

        const response = await addproduct(dispatch, formData);
        console.log(response, 'product response');

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
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleEdit = async () => {
    if (await handleError()) {
      console.log('Encountered error...');
    } else {
      try {
        setLoading(true);

        const formData = new FormData();
        formData.append('image', logo);
        formData.append('sku', sku);
        formData.append('category', categorycode);
        formData.append('productName', name);
        formData.append('price', price);
        formData.append('unit', unit);
        formData.append('description', description);
        formData.append('isPublished', data?.isPublished);

        console.log(formData, '...');
        console.log(proid);

        const response = await editproduct(dispatch, proid, formData);
        console.log(response, 'EDIT product response');

        if (!response?.error) {
          handleEmpty();
          handleMessage(
            appConstant.Success,
            response?.message,
            appConstant.success,
          );
          navigation.navigate(appConstant.product);
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
      <Bottommodal
        visible={visible}
        onGallery={handleGallery}
        onPress={() => setVisible(false)}
        OnCamera={handleCamera}
      />

      <Loader visible={isloading} />

      <Categorymodal
        visible={isshow}
        onPress={() => setShow(false)}
        data={filtercatelist}
        onChangeText={handleSearch}
        onselect={handleSelect}
      />

      <View style={styles.head}>
        <TouchableOpacity
          style={styles.back}
          onPress={() => navigation.goBack()}>
          <SvgIcon.arrowleft width={rh(3.5)} height={rh(3.5)} />
        </TouchableOpacity>
        {from ? (
          <Text style={styles.text}>{appConstant.editpro}</Text>
        ) : (
          <Text style={styles.text}>{appConstant.addpro}</Text>
        )}
      </View>

      <KeyboardAwareScrollView
        bounces
        alwaysBounceVertical={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.mainview}>
        {logo ? (
          <View style={styles.logoview}>
            <Image source={data ? {uri: logo} : logo} style={styles.logo} />
            <TouchableOpacity
              style={styles.close}
              onPress={() => {
                setLogo('');
                console.log('logo removed.');
              }}>
              <SvgIcon.close width={rw(5)} height={rh(4)} />
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity
            style={styles.uploadview}
            onPress={() => setVisible(true)}>
            <SvgIcon.plus width={rw(7.5)} height={rh(7)} />
          </TouchableOpacity>
        )}

        <Text style={styles.imgtext}>{appConstant.image}</Text>

        {errlogo ? (
          <Text style={styles.errname}>{appConstant.errlogo}</Text>
        ) : null}

        <View style={styles.sku}>
          <Text style={styles.skutxt}>{appConstant.sku}</Text>
          <Textinputs
            refe={skuref}
            value={sku}
            placeholder={appConstant.skuplace}
            onChangeText={text => {
              !text
                ? setErrSku(false)
                : text.length < 1
                ? setErrSku(true)
                : setErrSku(false);
              setSku(text);
            }}
            color={colors.black}
            style={styles.textin}
            onSubmitEditing={() => {
              nameref?.current.focus();
              !sku
                ? setErrSku(false)
                : sku.length < 1
                ? setErrSku(true)
                : setErrSku(false);
            }}
            returnKeyType="next"
          />
        </View>
        {errsku ? (
          <Text style={styles.errsku}>{appConstant.errsku}</Text>
        ) : null}

        <View style={styles.sku}>
          <Text style={styles.skutxt}>{appConstant.procate}</Text>
          <TouchableOpacity
            style={styles.catetextin}
            onPress={() => setShow(true)}>
            <Text style={styles.cate}>
              {categoryname ? categoryname : appConstant.category}
            </Text>
            <SvgIcon.down_arrow width={rw(9)} height={rh(4)} />
          </TouchableOpacity>
        </View>
        {errcategory ? (
          <Text style={styles.errname}>{appConstant.errcate}</Text>
        ) : null}

        <View style={styles.sku}>
          <Text style={styles.skutxt}>{appConstant.proname}</Text>
          <Textinputs
            refe={nameref}
            value={name}
            placeholder={appConstant.productname}
            onChangeText={text => {
              !text
                ? setErrName(false)
                : text.length < 2
                ? setErrName(true)
                : setErrName(false);
              setName(text);
            }}
            color={colors.black}
            style={styles.nametextin}
            onSubmitEditing={() => {
              priceref?.current.focus();
              !name
                ? null
                : !name.length > 3
                ? setErrName(true)
                : setErrName(false);
            }}
            returnKeyType="next"
          />
        </View>
        {errname ? (
          <Text style={styles.errname}>{appConstant.errname}</Text>
        ) : null}

        {/* PRICE UNIT */}
        <View style={styles.compname}>
          <View
            style={[
              styles.compshop,
              errprice ? null : {marginBottom: rh(3.6)},
            ]}>
            <Text style={styles.prtxt}>{appConstant.price}</Text>
            <View style={styles.pruni}>
              <Text style={styles.rupee}>₹</Text>
              <Textinputs
                refe={priceref}
                value={price}
                placeholder={appConstant.priceplace}
                onChangeText={text => {
                  !text
                    ? setErrPrice(false)
                    : text.length < 1
                    ? setErrPrice(true)
                    : setErrPrice(false);
                  setPrice(text);
                }}
                color={colors.black}
                style={styles.price}
                returnKeyType="next"
                onSubmitEditing={() => {
                  unitref?.current.focus();
                  !price
                    ? null
                    : !price.length > 1
                    ? setErrPrice(true)
                    : setErrPrice(false);
                }}
                keyboardType="number-pad"
              />
            </View>

            {errprice ? (
              <Text style={styles.errname}>{appConstant.errprice}</Text>
            ) : null}
          </View>

          <View
            style={[styles.compshop, errunit ? null : {marginBottom: rh(3.6)}]}>
            <Text style={styles.prtxt}>{appConstant.unit}</Text>
            <Textinputs
              refe={unitref}
              value={unit}
              placeholder={appConstant.unitplace}
              onChangeText={text => {
                !text
                  ? setErrUnit(false)
                  : text.length < 2
                  ? setErrUnit(true)
                  : setErrUnit(false);
                setUnit(text);
              }}
              color={colors.black}
              style={styles.unit}
              onSubmitEditing={() => {
                descref?.current.focus();
                !unit
                  ? null
                  : !unit.length > 1
                  ? setErrUnit(true)
                  : setErrUnit(false);
              }}
              returnKeyType="next"
            />
            {errunit ? (
              <Text style={styles.errname}>{appConstant.errunit}</Text>
            ) : null}
          </View>
        </View>

        <View style={styles.sku}>
          <Text style={styles.skutxt}>{appConstant.description}</Text>
          <Textinputs
            refe={descref}
            value={description}
            placeholder={appConstant.desc}
            onChangeText={text => {
              !text
                ? setErrDescription(false)
                : text.length < 3
                ? setErrDescription(true)
                : setErrDescription(false);
              setDescription(text);
            }}
            color={colors.black}
            multiline={true}
            style={styles.desctextin}
            onSubmitEditing={() => {
              !description
                ? null
                : !description.length > 3
                ? setErrDescription(true)
                : setErrDescription(false);
            }}
            returnKeyType="done"
          />
          {errdescription ? (
            <Text style={styles.errname}>{appConstant.errdescription}</Text>
          ) : null}
        </View>

        <View style={styles.avail}>
          <Text style={styles.available}>{appConstant.available}</Text>
          <TouchableOpacity
            onPress={() => setcheck(!ischeck)}
            style={styles.checked}>
            {ischeck ? (
              <SvgIcon.check width={rw(8)} height={rh(8)} />
            ) : (
              <SvgIcon.uncheck width={rw(8)} height={rh(8)} />
            )}
          </TouchableOpacity>
        </View>

        {from === 'edit' ? (
          <Button
            style={styles.touchsignin}
            text={appConstant.editpro}
            textstyle={styles.submit}
            onPress={handleEdit}
          />
        ) : (
          <Button
            style={styles.touchsignin}
            text={appConstant.addpro}
            textstyle={styles.submit}
            onPress={handleAddproduct}
          />
        )}
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
    fontSize: rf(2.4),
  },

  imgtext: {
    textAlign: 'center',
    color: colors.black,
    fontFamily: fonts.medium,
    fontSize: rf(2.1),
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

  uploadview: {
    height: rh(15.5),
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: rw(36),
    marginRight: rw(36),
    marginBottom: rh(1),
    borderRadius: 16,
    backgroundColor: colors.grey,
  },

  logoview: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: rh(4),
    borderRadius: 16,
  },

  logo: {
    width: rw(34),
    height: rh(18),
    borderRadius: 20,
    resizeMode: 'cover',
  },

  uploadtext: {
    fontSize: rf(1.7),
    fontFamily: fonts.medium,
    color: colors.black,
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
    right: rw(30),
  },

  skutxt: {
    color: colors.labelgrey,
    fontFamily: fonts.semibold,
    fontSize: rf(2.1),
    margin: rw(2),
  },

  prtxt: {
    color: colors.labelgrey,
    fontFamily: fonts.semibold,
    fontSize: rf(2.1),
    margin: rw(2),
  },

  sku: {
    margin: rw(2),
    marginLeft: rw(5),
    marginRight: rw(5),
  },

  avail: {
    color: colors.labelgrey,
    fontFamily: fonts.semibold,
    marginLeft: rw(6.5),
  },

  available: {
    color: colors.labelgrey,
    fontFamily: fonts.semibold,
    fontSize: rf(2.3),
  },

  textin: {
    width: rw(30),
    borderRadius: 15,
    padding: rw(3.5),
    fontFamily: fonts.medium,
    fontSize: rf(2.1),
    color: colors.black,
    backgroundColor: colors.grey,
  },

  catetextin: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.grey,
    borderRadius: 13,
    padding: rh(1.6),
  },

  cate: {
    fontSize: rf(2.1),
    color: colors.black,
    fontFamily: fonts.medium,
  },

  nametextin: {
    borderRadius: 15,
    padding: rw(3.7),
    fontFamily: fonts.medium,
    fontSize: rf(2.1),
    color: colors.black,
    backgroundColor: colors.grey,
  },

  desctextin: {
    height: rh(16),
    textAlignVertical: 'top',
    borderRadius: 15,
    padding: rw(3.5),
    fontFamily: fonts.medium,
    fontSize: rf(2.2),
    color: colors.black,
    backgroundColor: colors.grey,
  },

  compname: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  compshop: {
    margin: rw(2),
    width: rw(43),
  },

  pruni: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: rw(1),
    borderRadius: 15,
    fontFamily: fonts.medium,
    fontSize: rf(2.1),
    color: colors.black,
    backgroundColor: colors.grey,
  },

  rupee: {
    marginLeft: rw(3),
    marginRight: rw(1),
    fontFamily: fonts.medium,
    fontSize: rf(2.3),
    color: colors.black,
    backgroundColor: colors.grey,
  },

  price: {
    width: rw(33),
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 15,
    fontFamily: fonts.medium,
    fontSize: rf(2.1),
    color: colors.black,
    padding: rw(2.5),
  },

  unit: {
    padding: rw(3.5),
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 15,
    fontFamily: fonts.medium,
    fontSize: rf(2.1),
    color: colors.black,
    backgroundColor: colors.grey,
  },

  checked: {
    justifyContent: 'center',
    alignItems: 'center',
    width: rw(10),
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

  errsku: {
    color: colors.red,
    fontSize: rf(1.6),
    marginLeft: rw(18),
    fontFamily: fonts.medium,
  },

  errname: {
    textAlign: 'right',
    color: colors.red,
    fontSize: rf(1.6),
    marginRight: rw(7),
    fontFamily: fonts.medium,
  },
});
