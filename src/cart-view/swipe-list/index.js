import { Dimensions, Keyboard, TouchableWithoutFeedback } from 'react-native'
import KeyboardAwareScrollView from 'react-native-keyboard-aware-scroll-view'
import { SwipeListView } from 'react-native-swipe-list-view'
import ProductCard from '../product-card'
import PropTypes from 'prop-types';
import HiddenItem from './hidden-item'

function SwipeList({ listProductSwipe,
    updateCartCurrentData,
    listCartProduct,
    isValidateDataCart,
    onOpenDeleteProductModal }) {
    return (
        <TouchableWithoutFeedback
            onPress={Keyboard.dismiss} >
            <KeyboardAwareScrollView>
                <SwipeListView
                    previewRowKey={"0"}
                    previewOpenValue={40}
                    previewOpenDelay={3000}
                    data={listProductSwipe}
                    renderItem={({ item, index }) => (
                        <ProductCard
                            data={item}
                            index={index}
                            onUpdateCart={updateCartCurrentData}
                            validateData={listCartProduct}
                            isValidateDataCart={isValidateDataCart}
                        />
                    )}
                    renderHiddenItem={({ data, _rowMap }) => (
                        <HiddenItem
                            data={data}
                            onOpenDeleteProductModal={onOpenDeleteProductModal}
                            _rowMap={_rowMap}
                        />
                    )}
                    rightOpenValue={-1 * Dimensions.get('window').width * 0.3} />
            </KeyboardAwareScrollView>
        </TouchableWithoutFeedback>
    )
}

SwipeList.propTypes = {
    listProductSwipe: PropTypes.object.isRequired,
    updateCartCurrentData: PropTypes.func.isRequired,
    listCartProduct: PropTypes.array.isRequired,
    isValidateDataCart: PropTypes.bool.isRequired,
    onOpenDeleteProductModal: PropTypes.func.isRequired
}

export default SwipeList