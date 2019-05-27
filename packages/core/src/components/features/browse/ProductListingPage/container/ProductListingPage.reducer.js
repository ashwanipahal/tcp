import { PRODUCTLISTINGPAGE_CONSTANTS } from "../ProductListingPage.constants";

const initialState = {
    products: []
}

export const ProductListingPageReducer = ( state = initialState, action) => {
    switch(action.type) {
        case PRODUCTLISTINGPAGE_CONSTANTS.SET_PRODUCTS:
            return Object.assign({},state,{
                products: action.payload
            });
        default:
            return state;
    }
}