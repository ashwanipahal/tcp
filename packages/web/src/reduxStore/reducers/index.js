import { combineReducers } from 'redux';
import { HomePageReducer } from '../../components/features/content/HomePage/container/HomePage.reducer';
import { ProductListingPageReducer } from '@tcp/core/src/components/features/browse/ProductListingPage/container/ProductListingPage.reducer';

export default combineReducers({ 
    HomePageReducer,
    ProductListingPageReducer
});