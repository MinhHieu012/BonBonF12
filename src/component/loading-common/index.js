import { Modal, ModalBackdrop, Spinner } from "@gluestack-ui/themed";
import { color } from "../../utils/color";

const LoadingCommon = (props) => {
  return (
    <Modal isOpen={props.isOpen}>
      <ModalBackdrop />
      <Spinner size="large" color={color.darkGreen} />
    </Modal>
  );
};

export default LoadingCommon;
