import { AntDesign, EvilIcons } from "@expo/vector-icons";
import {
  FlatList,
  Input,
  InputField,
  InputSlot,
  Modal,
  ModalBackdrop,
  ModalBody,
  ModalContent,
  ModalHeader,
  Pressable,
} from "@gluestack-ui/themed";
import debounce from "lodash/debounce";
import { useEffect, useMemo, useRef, useState } from "react";
import { Keyboard, TouchableWithoutFeedback } from "react-native";
import {
  CardUserInfoCommon,
  EmptyDataCommon,
  ToastNotificationCommon,
} from "../../component";
import { useCustomer } from "../../hook";
import { color, timeout } from "../../utils";
import CreateCustomerModal from "../create-customer-modal";
import styles from "./style";

export default function SearchCustomerModal(props) {
  const { isShowModal, CloseModal, isClearTextSearch } = props;
  const {
    listCustomer,
    listCustomerSearchData,
    dispatchGetListCustomer,
    dispatchSearchCustomer,
  } = useCustomer();

  const refInput = useRef();
  const [isShowModalCreate, setIsShowModalCreate] = useState(false);
  const [isNotification, setIsNotification] = useState(false);
  const [isEmptyList, setIsEmptyList] = useState(false);
  const [listData, setListData] = useState(listCustomer);
  const [textSearch, setTextSearch] = useState("");
  const [isClearTextSearchFormChild, setClearTextSearchFromChild] =
    useState(false);

  useEffect(() => {
    dispatchGetListCustomer();
  }, []);

  useEffect(() => {
    if (isClearTextSearch || isClearTextSearchFormChild) {
      clearTextSearch();
    }
  }, [isClearTextSearch, isClearTextSearchFormChild]);

  useMemo(() => {
    if (!listCustomerSearchData?.length && textSearch?.length) {
      setIsEmptyList(true);
      return;
    }
    setIsEmptyList(false);
    if (listCustomerSearchData?.length && textSearch?.length) {
      setListData(listCustomerSearchData);
    } else if (!textSearch?.length) {
      setListData(listCustomer);
    }
  }, [textSearch, listCustomerSearchData, listCustomer]);

  const onOpenModalCreate = () => {
    setIsShowModalCreate(true);
    setClearTextSearchFromChild(false);
  };

  const onCloseModalCreate = () => {
    refInput?.current?.clear();
    setIsShowModalCreate(false);
  };

  const pushTextSearch = (data) => {
    setTextSearch(data);
    dispatchSearchCustomer(data);
  };
  const onSearch = debounce(pushTextSearch, timeout);

  const onOpenModalToast = () => {
    setIsNotification(true);
    setTimeout(() => {
      setIsNotification(false);
    }, 1000 * 1.5);
  };

  const onClearTextSearchFromModal = (data) => {
    if (data) {
      setClearTextSearchFromChild(true);
    }
  };

  const clearTextSearch = () => {
    refInput?.current?.clear();
    setTextSearch("");
  };

  const onCloseModal = () => {
    refInput?.current?.clear();
    CloseModal();
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Modal isOpen={isShowModal} onClose={onCloseModal}>
        <ModalBackdrop />
        <ModalContent bgColor={color.white} style={styles.modalUser}>
          <ModalHeader>
            <Input w={"100%"} variant="underlined">
              <InputSlot>
                <EvilIcons name="search" size={30} color={color.gray} />
              </InputSlot>
              <InputField
                ref={refInput}
                placeholder="Tìm kiếm..."
                onChangeText={onSearch}
              />
              <InputSlot
                display={textSearch ? "flex" : "none"}
                onPress={clearTextSearch}
                style={{ marginRight: 12 }}
              >
                <AntDesign name="close" size={15} color="gray" />
              </InputSlot>
              <InputSlot>
                <AntDesign
                  onPress={() => CloseModal()}
                  name="close"
                  size={25}
                  color={color.darkGreen}
                />
              </InputSlot>
            </Input>
          </ModalHeader>
          <ModalBody>
            {isEmptyList ? (
              <EmptyDataCommon
                title={"Thêm khách hàng mới"}
                isCheckShowButton={true}
                onHandlePress={() => onOpenModalCreate()}
              />
            ) : (
              <FlatList
                scrollEnabled={false}
                data={listData}
                renderItem={({ item }) => (
                  <Pressable
                    onPress={() => props.onChooseCustomer(item)}
                    marginBottom={"4%"}
                  >
                    <CardUserInfoCommon data={item} />
                  </Pressable>
                )}
              />
            )}
          </ModalBody>
        </ModalContent>
        {!isNotification ? null : (
          <ToastNotificationCommon
            Info="Thêm thành công!!!!!"
            Description="Đã thêm mới 1 khách hàng"
          />
        )}
        <CreateCustomerModal
          onOpenModalToast={onOpenModalToast}
          isShowModalCreate={isShowModalCreate}
          onCloseModalCreate={onCloseModalCreate}
          onClearTextSearch={onClearTextSearchFromModal}
        />
      </Modal>
    </TouchableWithoutFeedback>
  );
}
