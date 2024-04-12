import { useEffect, useMemo, useState } from "react";
import { useIsFocused } from "@react-navigation/native";
import {
  CardProductCommon,
  EmptyDataCommon,
  HeaderSearchCommon,
  LoadingCommon,
  ToastNotificationCommon,
} from "../component";
import { useWareHouse } from "../hook";
import { timeout, timeoutGet } from "../utils";
import UpdatePriceProductModal from "./update-price-product-modal";

const WareHouseScreen = (props) => {
  const isFocused = useIsFocused();
  const [isEmptyList, setIsEmptyList] = useState(false);
  const [listData, setListData] = useState(listWareHouseData);
  const [isUpdatePriceModal, setIsUpdatePriceModal] = useState(false);
  const [productSelected, setProductSelected] = useState({});
  const [isLoading, setLoading] = useState(false);
  const [isNotification, setIsNotification] = useState(notificationData);

  const {
    listWareHouseData,
    listWareHouseSearchData,
    textSearch,
    notificationData,
    dispatchGetListWareHouse,
    dispatchClearNotificationWareHouse,
    dispatchUpdateProductPrice,
    dispatchSearchListWareHouse,
  } = useWareHouse();

  const onGetTextSearch = (data) => {
    setLoading(true);
    setTimeout(() => {
      dispatchSearchListWareHouse(data);
      setLoading(false);
    }, timeout);
  };
  const updateProductPrice = (data) => {
    dispatchUpdateProductPrice(data);
    setIsUpdatePriceModal(false);
  };
  const closeUpdatePriceModal = () => {
    setIsUpdatePriceModal(false);
  };

  const onSelectProduct = (data) => {
    setProductSelected(data);
    setIsUpdatePriceModal(true);
  };

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      dispatchGetListWareHouse();
      setLoading(false);
    }, timeoutGet);
  }, [isFocused]);

  useMemo(() => {
    if (!listWareHouseSearchData?.length && textSearch?.length) {
      setIsEmptyList(true);
      return;
    }
    if (notificationData) {
      setIsNotification(true);
      setTimeout(() => {
        setIsNotification(false);
        dispatchClearNotificationWareHouse();
      }, 1000 * 1.5);
    }
    setIsEmptyList(false);
    if (listWareHouseSearchData?.length && textSearch?.length) {
      setListData(listWareHouseSearchData);
    } else if (!textSearch?.length) {
      setListData(listWareHouseData);
    }
  }, [
    textSearch,
    listWareHouseSearchData,
    listWareHouseData,
    notificationData,
  ]);
  return (
    <>
      <HeaderSearchCommon {...props} onGetTextSearch={onGetTextSearch} />
      {isEmptyList ? (
        <EmptyDataCommon />
      ) : (
        <CardProductCommon
          data={listData}
          {...props}
          onShowModal={onSelectProduct}
        />
      )}
      <LoadingCommon isOpen={isLoading} />
      <UpdatePriceProductModal
        isOpen={isUpdatePriceModal}
        closeModal={closeUpdatePriceModal}
        updatePrice={updateProductPrice}
        data={productSelected}
      />
      {!isNotification ? null : (
        <ToastNotificationCommon
          Info="Cập nhật giá sàn thành công !!!"
          Description="Đã cập nhất giá sàn thành công"
        />
      )}
    </>
  );
};
export default WareHouseScreen;
