import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  TextInput,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {SvgIcon} from '../../assets/SvgIcon';
import {
  responsiveFontSize as rf,
  responsiveHeight as rh,
  responsiveWidth as rw,
} from 'react-native-responsive-dimensions';
import {colors} from '../../assets/colors';
import {fonts} from '../../assets/fonts';
import {appConstant} from '../../helper/appconstants';
import {useNavigation} from '@react-navigation/native';
import {
  addnewcategory,
  deletecategories,
  editcategories,
  getallcategory,
} from '../../Api/categoryservice';
import {useDispatch, useSelector} from 'react-redux';
import {Addcatemodal} from '../../Components/Addcatemodal';
import {Delemodal} from '../../Components/Deletemodal.js';
import {Importcate} from '../../Components/Importcatemodal/index.js';
import {handleMessage} from '../../helper/utils.js';
import {Loader} from '../../Components/Loader/index.js';

export const Category = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const userdetails = useSelector(state => state.login.login_data);
  const compid = userdetails?.result?.company?.id;

  const [visible, setvisisble] = useState(false);
  const [isdelmodal, setDelmodal] = useState(false);
  const [isimportmodal, setImportmodal] = useState(false);
  const [isPublish, setPublish] = useState(false);
  const [isloading, setLoading] = useState(true);
  const [isshow, setShow] = useState(false);
  const [catelist, setCatelist] = useState([]);
  const [filtercatedata, setFiltercatedata] = useState([]);
  const [catcode, setCatcode] = useState();
  const [catname, setCatname] = useState();
  const [catid, setCatid] = useState();
  const [delid, setDelid] = useState();

  const coderef = useRef();
  const nameref = useRef();

  const handleCategory = useCallback(async () => {
    try {
      setLoading(true);

      const response = await getallcategory(dispatch, compid);
      console.log(response, 'category response');

      if (!response?.error) {
        setCatelist(response?.result);
        setFiltercatedata(response?.result);
      } else {
        handleMessage(appConstant.error, response?.message, appConstant.danger);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }, [dispatch, compid]);

  useEffect(() => {
    handleCategory();
  }, [handleCategory]);

  const handleEmpty = () => {
    setCatcode('');
    setCatname('');
  };

  const setEdit = async item => {
    setShow(true);
    console.log(item, 'edit item');
    console.log(item?.id, 'id');
    setCatcode(item?.categoryCode);
    setCatname(item?.categoryName);
    setCatid(item?.id);
    setPublish(item?.isPublished);
  };

  const setDelete = async item => {
    setDelmodal(true);
    console.log(item, 'delete item');
    console.log(item?.id, 'id');
    setDelid(item?.id);
  };

  const handleCode = async text => {
    setCatcode(text);
  };

  const handleName = async text => {
    setCatname(text);
  };

  //ADD NEW CATEGORIES
  const handleAddcategory = async () => {
    try {
      setLoading(true);

      const data = {
        categoryName: catname,
        categoryCode: catcode,
      };

      const response = await addnewcategory(dispatch, data);
      console.log(response, 'add category response');

      if (!response?.error) {
        handleMessage(
          appConstant.Success,
          response?.message,
          appConstant.success,
        );
        setvisisble(false);
        handleEmpty();
        handleCategory();
      } else {
        handleMessage(appConstant.error, response?.message, appConstant.danger);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
    } finally {
    }
  };

  //EDIT CATEGORIES
  const handleEditcategory = async () => {
    try {
      setLoading(true);

      const data = {
        categoryName: catname,
        categoryCode: catcode,
        isPublished: isPublish,
      };

      const response = await editcategories(dispatch, catid, data);
      console.log(response, 'edit category response');

      if (!response?.error) {
        handleMessage(
          appConstant.Success,
          response?.message,
          appConstant.success,
        );
        setShow(false);
        handleEmpty();
        handleCategory();
      } else {
        handleMessage(appConstant.error, response?.message, appConstant.danger);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
    } finally {
    }
  };

  //DELETE CATEGORIES
  const handleDelete = async () => {
    try {
      setLoading(true);

      const data = {
        ids: [delid],
      };
      console.log(data, 'data');

      const response = await deletecategories(dispatch, data);
      console.log(response, 'delete category response');

      if (!response?.error) {
        setDelmodal(false);
        handleMessage(
          appConstant.Success,
          response?.message,
          appConstant.success,
        );
        handleCategory();
      } else {
        handleMessage(appConstant.error, response?.message, appConstant.danger);
        setDelmodal(false);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = text => {
    if (!text) {
      setFiltercatedata(catelist);
    } else {
      const filtercate = catelist.filter(s => {
        return s.categoryName.toLowerCase().includes(text.toLowerCase());
      });
      filtercate.sort();
      setFiltercatedata(filtercate);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Loader visible={isloading} />

      <Addcatemodal
        ref1={coderef}
        ref2={nameref}
        visible={visible}
        onclose={() => setvisisble(false)}
        type={true}
        value1={catcode}
        value2={catname}
        code={handleCode}
        name={handleName}
        onSubmitEditing={() => nameref?.current.focus()}
        onAdd={handleAddcategory}
      />
      <Addcatemodal
        ref1={coderef}
        ref2={nameref}
        visible={isshow}
        value1={catcode}
        value2={catname}
        onclose={() => setShow(false)}
        code={handleCode}
        name={handleName}
        onSubmitEditing={() => nameref?.current.focus()}
        onEdit={handleEditcategory}
      />

      <Delemodal
        visible={isdelmodal}
        onCancel={() => setDelmodal(false)}
        onPress={handleDelete}
        message={appConstant.deletemessage}
        buttontext={appConstant.dele}
      />

      <Importcate
        visible={isimportmodal}
        button={appConstant.selectsvg}
        text={appConstant.importcategory}
        downloadtext={appConstant.downloadcategory}
        onClose={() => setImportmodal(false)}
      />

      <View style={styles.head}>
        <TouchableOpacity
          style={styles.back}
          onPress={() => navigation.goBack()}>
          <SvgIcon.arrowleft width={rh(3.5)} height={rh(3.5)} />
        </TouchableOpacity>
        <Text style={styles.text}>{appConstant.category}</Text>
        <TouchableOpacity
          style={styles.download}
          onPress={() => setImportmodal(true)}>
          <SvgIcon.imp width={rh(3.6)} height={rh(3.6)} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.add}
          onPress={() => {
            handleEmpty();
            setvisisble(true);
          }}>
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
        data={filtercatedata}
        keyExtractor={(item, index) => index}
        renderItem={({item, index}) => {
          return (
            <View style={styles.contain}>
              <View style={styles.editdel}>
                <TouchableOpacity
                  style={styles.edit}
                  onPress={() => setEdit(item)}>
                  <SvgIcon.edit width={rw(3.5)} height={rh(3.5)} />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.del}
                  onPress={() => setDelete(item)}>
                  <SvgIcon.del width={rw(3.5)} height={rh(3.5)} />
                </TouchableOpacity>
              </View>
              <View style={styles.cate}>
                <Text style={styles.cattext}>
                  {appConstant.catcode}
                  <Text style={styles.code}>{item?.categoryCode}</Text>
                </Text>
                <Text style={styles.cattext}>
                  {appConstant.catname}
                  <Text style={styles.code}>{item?.categoryName}</Text>
                </Text>
              </View>
            </View>
          );
        }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.nocat}>
            <Text style={styles.nocatdata}>{appConstant.nocatdata}</Text>
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

  editdel: {
    flexDirection: 'row',
    position: 'absolute',
    right: rw(1),
    margin: rh(0.9),
  },

  edit: {
    width: rw(4),
    height: rh(2.5),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.lightprim,
    borderRadius: 5,
    padding: rw(2.7),
    right: rw(3),
  },

  del: {
    width: rw(4),
    height: rh(2.5),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.lightred,
    borderRadius: 5,
    padding: rw(2.7),
    right: rw(1),
  },

  cate: {
    width: rw(80),
    margin: rw(1),
    marginTop: rh(1.5),
  },

  cattext: {
    fontSize: rf(1.9),
    margin: rw(0.6),
    fontFamily: fonts.medium,
    color: colors.labelgrey,
  },

  code: {
    color: colors.black,
    fontFamily: fonts.medium,
  },
});
