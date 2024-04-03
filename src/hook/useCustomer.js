import { useDispatch, useSelector } from "react-redux"
import { customerAction } from '../actions'

export default useCustomer = () => {

    const dispatch = useDispatch()

    const listCustomer = useSelector (
        (state) => state.customer.listCustomerData
    )
    
    const listCustomerSearchData = useSelector (
        (state) => state.customer.listCustomerSearchData
    )
    const dispatchGetListCustomer = () => {
        dispatch(customerAction.listCustomerRequest())
    }

    const dispatchSearchCustomer = (payload) => {
        dispatch(customerAction.searchListCustomerRequest(payload))
    }
    const dispatchCreateCustomer =(payload) =>{
        return dispatch(customerAction.addCustomerRequest(payload))
    }
    return { listCustomer, listCustomerSearchData, dispatchGetListCustomer, dispatchSearchCustomer,dispatchCreateCustomer }
}