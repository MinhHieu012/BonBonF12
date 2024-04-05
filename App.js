import { config } from '@gluestack-ui/config';
import { GluestackUIProvider, View } from '@gluestack-ui/themed';
import * as SplashScreen from 'expo-splash-screen';
import { useCallback, useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import store from './configStore';
import { useLocalStorage } from './src/hook';
import { adminCartData, listCustomerData, listImageProductData, listOrderData, listProductData, saleCartData } from './src/mockup';
import Navigation from './src/navigation';

SplashScreen.preventAutoHideAsync();
const App = () => {
  const [appIsReady, setAppIsReady] = useState(false);
  const { setData,getItemData } = useLocalStorage();
  useEffect(() => {
    const prepare = async () => {
      try {
        await setData(adminCartData.key, adminCartData.adminCart);
        await setData(listCustomerData.key, listCustomerData.listCustomer);
        await setData(listOrderData.key, listOrderData.listOrder);
        await setData(listProductData.key, listProductData.listProduct);
        await setData(saleCartData.key, saleCartData.saleCart);
        await setData(listImageProductData.key, listImageProductData.listImageProduct);
        await new Promise((resolve) => setTimeout(resolve, 2000));
      } catch (error) {
        console.log(error);
      } finally {
        setAppIsReady(true);
      }
    };
    prepare();
  }, []);
  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }
  return (
    <>
      <Provider store={store}>
        <GluestackUIProvider config={config}>
          <View onLayout={onLayoutRootView}></View>
          <Navigation/>
        </GluestackUIProvider>
      </Provider>
    </>

  );
}
export default App;
