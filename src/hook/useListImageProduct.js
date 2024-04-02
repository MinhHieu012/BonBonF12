import {useDispatch, useSelector }from "react-redux" 
import  imageProductAction  from "../actions"

export const useListImageProduct = ()=> {
    const dispatch = useDispatch();
    const listImageProductData = useSelector(state => state.listImageProduct.listImageProductData);
    function dispatchGetListImageProduct(){
        dispatch( imageProductAction.getListImageProductRequest());
    }
    function dispatchUpdateListImageProduct( payload){
        dispatch( imageProductAction.updateListImageProductRequest(payload));
    }
    return {
        listImageProductData,
        dispatchGetListImageProduct,
        dispatchUpdateListImageProduct
      };
}