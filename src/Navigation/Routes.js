import React, {useCallback, useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Login} from '../Container/Login';
import {Register} from '../Container/Register';
import {Forgotpassword} from '../Container/Forgotpassword';
import {Companydetails} from '../Container/Companydetails';
import {Dashboard} from '../Container/Dashboard';
import {Category} from '../Container/Category';
import {Product} from '../Container/Product';
import {Buyer} from '../Container/Buyer';
import {Orders} from '../Container/Orders';
import {Profile} from '../Container/Profile';
import {Addproduct} from '../Container/Addproduct';
import {Loader} from '../Components/Loader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {login} from '../Api/Authentication';
import {useDispatch} from 'react-redux';
import {appConstant} from '../helper/appconstants';
import {handleMessage} from '../helper/utils';
import {Addbuyer} from '../Container/Addbuyer';
import {Viewbuyer} from '../Container/Viewbuyer';

export const Routes = () => {
  const Stack = createNativeStackNavigator();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);
  const [screen, setScreen] = useState(appConstant.login);

  useEffect(() => {
    handleUser();
  }, [handleUser]);

  const handleUser = useCallback(async () => {
    try {
      const mailpass = await AsyncStorage.getItem('Data');

      if (mailpass) {
        const data = mailpass;

        setLoading(true);

        const response = await login(dispatch, data);
        console.log(response, 'user login response');

        if (!response?.error) {
          setScreen(
            response?.result?.company?.companyName
              ? appConstant.dashboard
              : appConstant.companydetails,
          );
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
  }, [dispatch]);

  return (
    <NavigationContainer>
      {!loading && (
        <Stack.Navigator
          screenOptions={{headerShown: false}}
          initialRouteName={screen}>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="Forgotpassword" component={Forgotpassword} />
          <Stack.Screen name="Companydetails" component={Companydetails} />
          <Stack.Screen name="Dashboard" component={Dashboard} />
          <Stack.Screen name="Category" component={Category} />
          <Stack.Screen name="Product" component={Product} />
          <Stack.Screen name="Addproduct" component={Addproduct} />
          <Stack.Screen name="Buyer" component={Buyer} />
          <Stack.Screen name="Addbuyer" component={Addbuyer} />
          <Stack.Screen name="Viewbuyer" component={Viewbuyer} />
          <Stack.Screen name="Orders" component={Orders} />
          <Stack.Screen name="Profile" component={Profile} />
        </Stack.Navigator>
      )}
      {loading && <Loader visible={loading} />}
    </NavigationContainer>
  );
};
