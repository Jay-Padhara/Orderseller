import React, {useCallback, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  FlatList,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {colors} from '../../assets/colors';
import {SvgIcon} from '../../assets/SvgIcon';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {
  responsiveFontSize as rf,
  responsiveHeight as rh,
  responsiveWidth as rw,
} from 'react-native-responsive-dimensions';
import {appConstant} from '../../helper/appconstants';
import {fonts} from '../../assets/fonts';
import {Loader} from '../../Components/Loader';
import {deleteproduct, getallproducts} from '../../Api/productservice';
import {useDispatch, useSelector} from 'react-redux';
import {handleMessage} from '../../helper/utils';
import {Filtermodal} from '../../Components/Filtermodal';
import {Importcate} from '../../Components/Importcatemodal';
import {Popupmenu} from '../../Components/Popupmenu';
import {Delemodal} from '../../Components/Deletemodal.js';

export const Product = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const userdetails = useSelector(state => state.login.login_data);
  const compid = userdetails?.result?.id;

  const [product, setProduct] = useState([]);
  const [filteredproduct, setFilteredproduct] = useState([]);
  const [isloading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [isdelmodal, setDelmodal] = useState(false);
  const [ispopup, setPopup] = useState(false);
  const [isshow, setShow] = useState(false);

  const [selectedpro, setSelectedpro] = useState('');
  const [delid, setDelid] = useState();

  //GET ALL PRODUCTS
  const handleProduct = useCallback(async () => {
    try {
      setLoading(true);

      const response = await getallproducts(dispatch, compid);
      console.log(response, 'product response');

      if (!response?.error) {
        setProduct(response?.result);
        setFilteredproduct(response?.result);
      } else {
        handleMessage(appConstant.error, response?.message, appConstant.danger);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [dispatch, compid]);

  useFocusEffect(
    useCallback(() => {
      handleProduct();
    }, [handleProduct]),
  );

  const handleEdit = async item => {
    console.log(item);
    navigation.navigate(appConstant.addproduct, {data: item, from: 'edit'});
    setSelectedpro();
  };

  const handleDel = async item => {
    console.log(item?.id);
    setDelid(item?.id);
    setDelmodal(true);
    setSelectedpro();
  };

  const handleDeletepro = async () => {
    try {
      setLoading(true);

      const data = {
        ids: [delid],
      };
      console.log(data, 'data');

      const response = await deleteproduct(dispatch, data);
      console.log(response, 'delete product response');

      if (!response?.error) {
        setDelmodal(false);
        handleMessage(
          appConstant.Success,
          response?.message,
          appConstant.success,
        );
        handleProduct();
      } else {
        handleMessage(appConstant.error, response?.message, appConstant.danger);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async text => {
    console.log(text);
    if (!text) {
      setFilteredproduct(product);
    } else {
      const filterlist = product.filter(p => {
        return p?.productName.toUpperCase().includes(text?.toUpperCase());
      });
      filterlist.sort();
      setFilteredproduct(filterlist);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Loader visible={isloading} />

      <Filtermodal visible={visible} onClose={() => setVisible(false)} />

      <Importcate
        visible={isshow}
        onClose={() => setShow(false)}
        text={appConstant.importproduct}
        button={appConstant.selectsvg}
        downloadtext={appConstant.downloadproduct}
      />

      <Delemodal
        visible={isdelmodal}
        onCancel={() => setDelmodal(false)}
        onPress={handleDeletepro}
      />

      <View style={styles.head}>
        <TouchableOpacity
          style={styles.back}
          onPress={() => navigation.goBack()}>
          <SvgIcon.arrowleft width={rh(3.5)} height={rh(3.5)} />
        </TouchableOpacity>
        <Text style={styles.text}>{appConstant.product}</Text>
        <TouchableOpacity style={styles.download} onPress={() => setShow(true)}>
          <SvgIcon.imp width={rh(3.6)} height={rh(3.6)} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.add}
          onPress={() => navigation.navigate(appConstant.addproduct)}>
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
        <TouchableOpacity
          style={styles.filter}
          onPress={() => setVisible(true)}>
          <SvgIcon.filter width={rw(7)} height={rh(7)} />
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredproduct}
        keyExtractor={(item, index) => index}
        renderItem={({item}) => {
          return (
            <View style={styles.main}>
              <View style={styles.mainview}>
                <View style={styles.proname}>
                  <Image
                    source={{
                      uri:
                        item?.image !== undefined && item?.image !== null
                          ? item.image
                          : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTinGCfuvtIzNvb6AsRFE7LtRJrTEKDxVxe6g&usqp=CAU',
                    }}
                    style={styles.img}
                  />

                  <View style={styles.categ}>
                    <Text style={styles.catetext}>
                      {appConstant.proname}
                      <Text style={styles.product}>{item?.productName}</Text>
                    </Text>

                    <Text style={styles.catetext}>
                      {appConstant.procate}
                      <Text style={styles.product}>
                        {item?.category?.categoryName}
                      </Text>
                    </Text>
                  </View>

                  <TouchableOpacity
                    style={styles.dot}
                    onPress={() => {
                      setPopup(true);
                      console.log(ispopup);
                      setSelectedpro(item?.id);
                    }}>
                    <SvgIcon.dot width={rw(2.2)} height={rh(2.2)} />
                  </TouchableOpacity>
                </View>

                {/* POPUP-MENU */}
                <Popupmenu
                  opened={selectedpro !== null && selectedpro === item?.id}
                  setPopup={() => setSelectedpro()}
                  onEdit={() => handleEdit(item)}
                  onDelete={() => handleDel(item)}
                />

                <View style={styles.line}>
                  <SvgIcon.line width={rw(80)} height={rh(1)} />
                </View>

                <View style={styles.prodesc}>
                  <View>
                    <Text style={styles.protext}>{appConstant.sku}</Text>
                    <Text style={styles.protext2}>{item?.sku}</Text>
                  </View>

                  <View>
                    <Text style={styles.protext}>{appConstant.unit}</Text>
                    <Text style={styles.protext2}>{item?.unit}</Text>
                  </View>

                  <View>
                    <Text style={styles.protext}>{appConstant.price}</Text>
                    <Text style={styles.protext2}>
                      {appConstant.ruppee}
                      {item?.price}
                    </Text>
                  </View>

                  <View>
                    <Text style={styles.protext}>{appConstant.available}</Text>
                    <SvgIcon.cross
                      width={rw(2.8)}
                      height={rh(2.8)}
                      marginLeft={rw(1)}
                    />
                  </View>
                </View>

                <View style={styles.desc}>
                  <View>
                    <Text style={styles.protext}>
                      {appConstant.description}
                    </Text>
                    <Text style={styles.description}>{item?.description}</Text>
                  </View>
                </View>
              </View>
            </View>
          );
        }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.nocat}>
            <Text style={styles.nocatdata}>{appConstant.noprodata}</Text>
          </View>
        }
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
    fontSize: rf(2.4),
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
    fontSize: rf(2.8),
  },

  contain: {
    margin: rw(3.5),
    borderRadius: 20,
    backgroundColor: colors.white,
    elevation: 10,
    shadowColor: colors.labelgrey,
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.8,
    padding: rh(1.5),
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

  filter: {
    alignItems: 'center',
    justifyContent: 'center',
    width: rw(13.5),
    height: rh(6.5),
    backgroundColor: colors.primary,
    marginLeft: rw(5.4),
    borderRadius: 12,
  },

  main: {
    alignItems: 'center',
  },

  mainview: {
    backgroundColor: colors.white,
    width: rw(90),
    height: rh(30),
    borderRadius: 15,
    margin: rh(1),
    elevation: 30,
    shadowColor: colors.labelgrey,
    shadowOffset: {width: 2, height: 5},
    shadowOpacity: 0.8,
  },

  proname: {
    flexDirection: 'row',
    margin: rw(4),
    alignItems: 'center',
  },

  img: {
    width: rw(15),
    height: rh(7.5),
    resizeMode: 'cover',
    borderRadius: 10,
  },

  categ: {
    marginLeft: rw(3),
  },

  catetext: {
    fontFamily: fonts.semibold,
    fontSize: rf(1.9),
    color: colors.black,
  },

  product: {
    color: colors.labelgrey,
    fontFamily: fonts.semibold,
    fontSize: rf(1.8),
  },

  dot: {
    padding: rw(1),
    position: 'absolute',
    right: 2,
    top: 7,
  },

  line: {
    alignItems: 'center',
  },

  prodesc: {
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
    margin: rw(1),
  },

  protext: {
    color: colors.black,
    fontFamily: fonts.bold,
    fontSize: rf(1.7),
  },

  protext2: {
    color: colors.labelgrey,
    fontFamily: fonts.semibold,
    fontSize: rf(1.8),
  },

  desc: {
    marginTop: rh(1.6),
    marginLeft: rw(5),
    marginRight: rw(1),
  },

  description: {
    fontFamily: fonts.medium,
    color: colors.labelgrey,
    fontSize: rf(1.8),
    marginRight: rw(3),
  },
});
