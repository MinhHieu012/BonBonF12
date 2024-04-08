import { useDispatch, useSelector } from 'react-redux'
import { cartAction } from '../actions'
export default function useCart() {
    const dispatch = useDispatch();
    const listCartData = useSelector(state => state.cart.listCartData);
    const dispatchGetListCart = () => {
        dispatch(cartAction.CartRequest());
    }

    const dispatchUpdateCart = (payload) => {
        return dispatch(cartAction.updateCartRequest(payload));
    };

    return {
        listCartData,
        dispatchGetListCart,
        dispatchUpdateCart
    };
}